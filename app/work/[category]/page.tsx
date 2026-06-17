import { notFound } from "next/navigation";
import { CategoryGallery } from "@/components/CategoryGallery";
import { CATEGORY_IDS, isCategory } from "@/lib/gallery";

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

  return <CategoryGallery category={category} />;
}
