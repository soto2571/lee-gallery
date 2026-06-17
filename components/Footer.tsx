"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { siteConfig, whatsappLink } from "@/lib/site";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream-300/60 px-4 py-12">
      <div className="mx-auto flex max-w-container flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/logo-dark.png"
            alt="Lee's Gallery"
            width={465}
            height={415}
            className="h-14 w-auto"
          />
          <p className="mt-3 text-sm text-ink-muted">{t.footer.tagline}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cream-300/70 text-forest transition-colors duration-200 hover:bg-forest hover:text-cream-50"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cream-300/70 text-forest transition-colors duration-200 hover:bg-forest hover:text-cream-50"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cream-300/70 text-forest transition-colors duration-200 hover:bg-forest hover:text-cream-50"
          >
            <MailIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-container border-t border-cream-300/40 pt-6 text-center text-xs text-ink-muted">
        © {year} Lee&apos;s Gallery. {t.footer.rights}
      </div>
    </footer>
  );
}
