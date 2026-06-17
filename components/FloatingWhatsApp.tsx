"use client";

import { useLanguage } from "./LanguageProvider";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp() {
  const { lang } = useLanguage();

  return (
    <a
      href={whatsappLink(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
