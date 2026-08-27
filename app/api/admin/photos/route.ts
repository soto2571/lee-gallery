import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { addImages, savePhotoFile } from "@/lib/gallery-store";
import { isCategory, type GalleryImage } from "@/lib/gallery";

/**
 * One photo per request: the browser downscales each file and posts them one
 * at a time, which keeps every body well under Vercel's 4.5 MB request limit
 * and keeps the read-modify-write of the gallery JSON serialised.
 */
export async function POST(request: Request) {
  const store = await cookies();
  if (!(await verifySessionToken(store.get(SESSION_COOKIE)?.value))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const category = String(form.get("category") ?? "");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Falta la foto" }, { status: 400 });
  }
  if (!isCategory(category)) {
    return NextResponse.json({ error: "Sección inválida" }, { status: 400 });
  }

  const description = String(form.get("description") ?? "").trim();
  const width = Number(form.get("width")) || 1000;
  const height = Number(form.get("height")) || 1500;

  const { src, storageKey } = await savePhotoFile(file, file.name || "foto.jpg");

  const image: GalleryImage = {
    id: `up_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    src,
    category,
    width,
    height,
    alt: {
      es: description || DEFAULT_ALT[category].es,
      en: description || DEFAULT_ALT[category].en,
    },
    storageKey,
    uploadedAt: new Date().toISOString(),
  };

  await addImages([image]);

  return NextResponse.json({ image });
}

const DEFAULT_ALT = {
  portraits: { es: "Retrato por Lee's Gallery", en: "Portrait by Lee's Gallery" },
  brands: { es: "Sesión de marca", en: "Brand shoot" },
  products: { es: "Fotografía de producto", en: "Product photography" },
} as const;
