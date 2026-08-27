import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

/** Chrome for the public site only — /admin renders without it. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LanguageProvider>
      <Navbar />
      {children}
      <Footer />
      <FloatingWhatsApp />
    </LanguageProvider>
  );
}
