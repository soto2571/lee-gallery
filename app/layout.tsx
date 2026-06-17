import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lee's Gallery — Photography",
  description:
    "Lee's Gallery — Portrait, brand and product photography. Captura tu historia con una mirada moderna y editorial.",
  openGraph: {
    title: "Lee's Gallery — Photography",
    description:
      "Portrait, brand and product photography. Fotografía de retrato, marca y producto.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable}`}
    >
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
