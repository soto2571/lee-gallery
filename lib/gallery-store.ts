/**
 * Where the live gallery lives.
 *
 * Two backends, picked automatically:
 *  - Vercel Blob (production) — used whenever BLOB_READ_WRITE_TOKEN is set,
 *    which Vercel injects once a Blob store is connected to the project.
 *  - Local filesystem (`npm run dev` without a token) — JSON in /.data and
 *    photos in /public/uploads, so the panel is fully usable offline.
 *
 * The gallery JSON is written under a fresh, timestamped key on every save and
 * the previous versions are deleted. A new URL per version means the Blob CDN
 * can never hand back a stale gallery.
 */
import { del, list, put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";
import { seedImages, type GalleryData, type GalleryImage } from "./gallery";

const DATA_PREFIX = "gallery/data-";
const PHOTO_PREFIX = "photos/";
const LOCAL_DATA_FILE = path.join(process.cwd(), ".data", "gallery.json");
const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export function hasBlobStore() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

// ---------------------------------------------------------------- read/write

async function readData(): Promise<GalleryData | null> {
  if (hasBlobStore()) {
    const { blobs } = await list({ prefix: DATA_PREFIX });
    if (blobs.length === 0) return null;
    const latest = blobs.reduce((a, b) =>
      new Date(a.uploadedAt) > new Date(b.uploadedAt) ? a : b
    );
    const res = await fetch(latest.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as GalleryData;
  }

  try {
    return JSON.parse(await fs.readFile(LOCAL_DATA_FILE, "utf8")) as GalleryData;
  } catch {
    return null;
  }
}

async function writeData(data: GalleryData) {
  if (hasBlobStore()) {
    const { blobs } = await list({ prefix: DATA_PREFIX });
    await put(`${DATA_PREFIX}${Date.now()}.json`, JSON.stringify(data, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: true,
      cacheControlMaxAge: 0,
    });
    // Drop the superseded versions; a failure here is harmless (readData only
    // ever reads the newest one).
    if (blobs.length > 0) {
      await del(blobs.map((b) => b.url)).catch(() => {});
    }
    return;
  }

  await fs.mkdir(path.dirname(LOCAL_DATA_FILE), { recursive: true });
  await fs.writeFile(LOCAL_DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

/**
 * The gallery as the site should render it. Falls back to the seed in
 * lib/gallery.ts until the first save from the admin panel.
 *
 * Deliberately not memoised per request: a server action mutates and then
 * re-renders the page within the same request, and a cached read there would
 * hand the panel back the pre-mutation gallery.
 */
export async function getGallery(): Promise<GalleryData> {
  const stored = await readData();
  return stored?.images ? stored : { images: seedImages };
}

// -------------------------------------------------------------------- photos

/** Stores one uploaded photo and returns the URL the site should render. */
export async function savePhotoFile(
  file: Blob,
  filename: string
): Promise<{ src: string; storageKey: string }> {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "-");
  const key = `${PHOTO_PREFIX}${Date.now()}-${safe}`;

  if (hasBlobStore()) {
    const blob = await put(key, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type || "image/jpeg",
    });
    return { src: blob.url, storageKey: blob.pathname };
  }

  await fs.mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  const localName = key.replace(PHOTO_PREFIX, "");
  await fs.writeFile(
    path.join(LOCAL_UPLOAD_DIR, localName),
    Buffer.from(await file.arrayBuffer())
  );
  return { src: `/uploads/${localName}`, storageKey: `${PHOTO_PREFIX}${localName}` };
}

/** Removes the stored file behind a photo. Seed photos have no storageKey. */
async function deletePhotoFile(image: GalleryImage) {
  if (!image.storageKey) return;

  if (hasBlobStore()) {
    await del(image.src).catch(() => {});
    return;
  }

  const localName = image.storageKey.replace(PHOTO_PREFIX, "");
  await fs.unlink(path.join(LOCAL_UPLOAD_DIR, localName)).catch(() => {});
}

// ----------------------------------------------------------------- mutations

async function mutate(fn: (images: GalleryImage[]) => GalleryImage[]) {
  const { images } = await getGallery();
  await writeData({ images: fn([...images]) });
}

export async function addImages(newImages: GalleryImage[]) {
  await mutate((images) => [...images, ...newImages]);
}

export async function removeImage(id: string) {
  const { images } = await getGallery();
  const target = images.find((img) => img.id === id);
  if (!target) return;

  await writeData({ images: images.filter((img) => img.id !== id) });
  await deletePhotoFile(target);
}

export async function updateAlt(id: string, alt: { es: string; en: string }) {
  await mutate((images) =>
    images.map((img) => (img.id === id ? { ...img, alt } : img))
  );
}

/**
 * Moves a photo one slot earlier/later *within its own category*, swapping it
 * with its neighbour in the flat list so the stored order stays the render
 * order for every category at once.
 */
export async function moveImage(id: string, direction: -1 | 1) {
  await mutate((images) => {
    const index = images.findIndex((img) => img.id === id);
    if (index === -1) return images;

    const category = images[index].category;
    let neighbour = -1;
    for (
      let i = index + direction;
      i >= 0 && i < images.length;
      i += direction
    ) {
      if (images[i].category === category) {
        neighbour = i;
        break;
      }
    }
    if (neighbour === -1) return images;

    [images[index], images[neighbour]] = [images[neighbour], images[index]];
    return images;
  });
}
