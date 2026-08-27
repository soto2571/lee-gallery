export type PreparedImage = {
  blob: Blob;
  width: number;
  height: number;
  name: string;
};

/** Long edge of the stored photo — plenty for full-screen viewing on retina. */
const MAX_SIDE = 2560;
/** Stay comfortably under Vercel's 4.5 MB request-body limit. */
const MAX_BYTES = 3.5 * 1024 * 1024;

function toBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality)
  );
}

/**
 * Downscales a camera original in the browser before uploading: a 20 MB RAW-ish
 * JPEG straight off a phone becomes a ~500 KB web file, so uploads finish over
 * mobile data and the gallery stays fast. EXIF rotation is baked in.
 *
 * Anything the browser can't decode (some HEIC files) is uploaded untouched.
 */
export async function prepareImage(file: File): Promise<PreparedImage> {
  try {
    const bitmap = await createImageBitmap(file, {
      imageOrientation: "from-image",
    });

    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas unavailable");
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    let quality = 0.85;
    let blob = await toBlob(canvas, quality);
    while (blob && blob.size > MAX_BYTES && quality > 0.5) {
      quality -= 0.1;
      blob = await toBlob(canvas, quality);
    }
    if (!blob) throw new Error("encoding failed");

    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return { blob, width, height, name };
  } catch {
    return { blob: file, width: 0, height: 0, name: file.name };
  }
}
