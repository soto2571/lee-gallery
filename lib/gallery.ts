export type Category = "portraits" | "brands" | "products";

export const CATEGORY_IDS = ["portraits", "brands", "products"] as const;

export type CategoryMeta = {
  id: Category;
  /** Display order shown in the horizontal strip, e.g. "01". */
  order: string;
  /** Cover image for the strip card; null = no photos yet. */
  cover: string | null;
};

export const categories: CategoryMeta[] = [
  { id: "portraits", order: "01", cover: "/images/portrait2.JPG" },
  { id: "brands", order: "02", cover: "/images/brand1.JPG" },
  { id: "products", order: "03", cover: null },
];

export function imagesByCategory(category: Category) {
  return galleryImages.filter((img) => img.category === category);
}

export function isCategory(value: string): value is Category {
  return (CATEGORY_IDS as readonly string[]).includes(value);
}

export type GalleryImage = {
  id: string;
  src: string;
  category: Category;
  alt: { es: string; en: string };
  // Real pixel dimensions — used to preserve aspect ratio in the masonry grid.
  width: number;
  height: number;
};

/**
 * Lee's real photography, served from /public/images.
 * To add more: drop the file in /public/images and add an entry here with its
 * real width/height (run `sips -g pixelWidth -g pixelHeight file.JPG`).
 *
 * "products" has no photos yet — the gallery shows a "coming soon" state for it.
 */
export const galleryImages: GalleryImage[] = [
  // ---------- Retratos ----------
  { id: "portrait1", src: "/images/portrait.JPG", category: "portraits", width: 3349, height: 5023, alt: { es: "Retrato editorial", en: "Editorial portrait" } },
  { id: "portrait2", src: "/images/portrait2.JPG", category: "portraits", width: 3456, height: 5184, alt: { es: "Retrato con luz natural", en: "Portrait in natural light" } },
  { id: "portrait3", src: "/images/portrait3.JPG", category: "portraits", width: 3381, height: 5071, alt: { es: "Retrato de estudio", en: "Studio portrait" } },
  { id: "portrait4", src: "/images/portrait4.JPG", category: "portraits", width: 3456, height: 5184, alt: { es: "Retrato al aire libre", en: "Outdoor portrait" } },
  { id: "portrait5", src: "/images/portrait5.JPG", category: "portraits", width: 3456, height: 5184, alt: { es: "Retrato editorial", en: "Editorial portrait" } },
  { id: "portrait6", src: "/images/portrait6.JPG", category: "portraits", width: 2444, height: 3666, alt: { es: "Retrato cercano", en: "Close-up portrait" } },
  { id: "playa1", src: "/images/playa.JPG", category: "portraits", width: 3391, height: 5086, alt: { es: "Retrato en la playa", en: "Beach portrait" } },
  { id: "playa2", src: "/images/playa2.JPG", category: "portraits", width: 3027, height: 4540, alt: { es: "Sesión en la playa", en: "Beach session" } },
  { id: "playa3", src: "/images/playa3.JPG", category: "portraits", width: 3456, height: 5184, alt: { es: "Retrato junto al mar", en: "Seaside portrait" } },
  { id: "playa4", src: "/images/playa4.JPG", category: "portraits", width: 3337, height: 5006, alt: { es: "Lifestyle en la playa", en: "Beach lifestyle" } },
  { id: "playa5", src: "/images/playa5.JPG", category: "portraits", width: 1392, height: 1355, alt: { es: "Detalle en la playa", en: "Beach detail" } },
  { id: "playa6", src: "/images/playa6.JPG", category: "portraits", width: 3094, height: 4641, alt: { es: "Atardecer en la playa", en: "Beach at sunset" } },
  { id: "playa7", src: "/images/playa7.JPG", category: "portraits", width: 3115, height: 4672, alt: { es: "Retrato con luz dorada", en: "Golden hour portrait" } },

  // ---------- Brands ----------
  { id: "brand1", src: "/images/brand1.JPG", category: "brands", width: 3456, height: 5184, alt: { es: "Sesión de marca", en: "Brand shoot" } },
  { id: "brand2", src: "/images/brand2.JPG", category: "brands", width: 3456, height: 5184, alt: { es: "Campaña de marca", en: "Brand campaign" } },
  { id: "brand3", src: "/images/brand3.JPG", category: "brands", width: 3456, height: 5184, alt: { es: "Contenido de marca", en: "Brand content" } },
  { id: "brand4", src: "/images/brand4.JPG", category: "brands", width: 3456, height: 5184, alt: { es: "Lifestyle de marca", en: "Brand lifestyle" } },
  { id: "editorial1_1", src: "/images/editorial1.1.JPG", category: "portraits", width: 3380, height: 5070, alt: { es: "Retrato editorial", en: "Editorial portrait" } },
  { id: "editorial1_2", src: "/images/editorial1.2.JPG", category: "portraits", width: 1285, height: 1404, alt: { es: "Detalle editorial", en: "Editorial detail" } },
  { id: "editorial2", src: "/images/editorial2.JPG", category: "portraits", width: 3274, height: 4427, alt: { es: "Retrato editorial", en: "Editorial portrait" } },
  { id: "editorial3", src: "/images/editorial3.JPG", category: "portraits", width: 3360, height: 5040, alt: { es: "Retrato editorial", en: "Editorial portrait" } },
  { id: "editorial4", src: "/images/editorial4.JPG", category: "portraits", width: 3456, height: 5184, alt: { es: "Retrato editorial", en: "Editorial portrait" } },
  { id: "editorial1", src: "/images/editorial1.JPG", category: "portraits", width: 3368, height: 4910, alt: { es: "Retrato editorial", en: "Editorial portrait" } },
  { id: "alo1", src: "/images/alo_1.jpg", category: "portraits", width: 3456, height: 5184, alt: { es: "Retrato editorial", en: "Editorial portrait" } },
  { id: "alo2", src: "/images/alo_2.jpg", category: "portraits", width: 3390, height: 5085, alt: { es: "Editorial con luz natural", en: "Editorial in natural light" } },
  { id: "alo3", src: "/images/alo_3.jpg", category: "portraits", width: 3456, height: 5184, alt: { es: "Retrato editorial", en: "Editorial portrait" } },
  { id: "alo4", src: "/images/alo_4.jpg", category: "portraits", width: 3379, height: 5068, alt: { es: "Editorial de moda", en: "Fashion editorial" } },
  { id: "alo5", src: "/images/alo_5.jpg", category: "portraits", width: 3456, height: 5184, alt: { es: "Retrato editorial", en: "Editorial portrait" } },
  { id: "alo6", src: "/images/alo_6.jpg", category: "portraits", width: 3423, height: 5134, alt: { es: "Editorial de moda", en: "Fashion editorial" } },
  { id: "alo7", src: "/images/alo_7.jpg", category: "portraits", width: 3456, height: 5184, alt: { es: "Retrato editorial", en: "Editorial portrait" } },
  { id: "alo8", src: "/images/alo_8.jpg", category: "portraits", width: 3456, height: 5184, alt: { es: "Editorial con luz natural", en: "Editorial in natural light" } },
  { id: "alo9", src: "/images/alo_9.jpg", category: "portraits", width: 3338, height: 5019, alt: { es: "Retrato editorial", en: "Editorial portrait" } },

  // ---------- Products ----------
  { id: "product1", src: "/images/product1.JPG", category: "products", width: 3358, height: 5037, alt: { es: "Producto en bodegón", en: "Product still life" } },
  { id: "product3", src: "/images/product3.JPG", category: "products", width: 3456, height: 5184, alt: { es: "Producto sobre fondo limpio", en: "Product on clean background" } },
  { id: "product2", src: "/images/product2.JPG", category: "products", width: 3456, height: 5184, alt: { es: "Fotografía de producto", en: "Product photography" } },
  { id: "product", src: "/images/product.JPG", category: "products", width: 3456, height: 5184, alt: { es: "Fotografía de producto", en: "Product photography" } },
  { id: "product4", src: "/images/product4.JPG", category: "products", width: 3456, height: 5184, alt: { es: "Detalle de producto", en: "Product detail" } },
  { id: "product5", src: "/images/product5.JPG", category: "products", width: 2890, height: 4971, alt: { es: "Producto editorial", en: "Editorial product" } },
  { id: "product6", src: "/images/product6.JPG", category: "products", width: 3456, height: 5184, alt: { es: "Fotografía de producto", en: "Product photography" } },
  { id: "product13", src: "/images/product13.JPG", category: "products", width: 2837, height: 4892, alt: { es: "Detalle de producto", en: "Product detail" } },
  { id: "product7", src: "/images/product7.JPG", category: "products", width: 3220, height: 4593, alt: { es: "Producto lifestyle", en: "Lifestyle product" } },
  { id: "product8", src: "/images/product8.JPG", category: "products", width: 3008, height: 3956, alt: { es: "Bodegón de producto", en: "Product still life" } },
  { id: "product9", src: "/images/product9.JPG", category: "products", width: 3008, height: 4357, alt: { es: "Detalle de producto", en: "Product detail" } },
  { id: "product10", src: "/images/product10.JPG", category: "products", width: 3456, height: 5184, alt: { es: "Fotografía de producto", en: "Product photography" } },
  { id: "product11", src: "/images/product11.JPG", category: "products", width: 3361, height: 5041, alt: { es: "Producto sobre fondo limpio", en: "Product on clean background" } },
  { id: "product12", src: "/images/product12.JPG", category: "products", width: 3361, height: 4664, alt: { es: "Producto editorial", en: "Editorial product" } },
];
