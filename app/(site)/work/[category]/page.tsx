import { notFound } from "next/navigation";
import { CategoryGallery } from "@/components/CategoryGallery";
import { CATEGORY_IDS, imagesByCategory, isCategory } from "@/lib/gallery";
import { getGallery } from "@/lib/gallery-store";

// Read fresh on every request — the gallery changes from /admin.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return CATEGORY_IDS.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isCategory(category)) {
    notFound();
  }

  const { images } = await getGallery();

  return (
    <CategoryGallery
      category={category}
      images={imagesByCategory(images, category)}
    />
  );
}
