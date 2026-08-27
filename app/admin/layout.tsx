import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel — Lee's Gallery",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-cream-50">{children}</div>;
}
