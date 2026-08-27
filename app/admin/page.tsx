import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getGallery } from "@/lib/gallery-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { images } = await getGallery();

  return <AdminDashboard images={images} />;
}
