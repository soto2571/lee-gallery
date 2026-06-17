"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { whatsappLink } from "@/lib/site";

export function Navbar() {
  const { t, lang, toggle } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#work", label: t.nav.work },
    { href: "/#about", label: t.nav.about },
    { href: "/#pricing", label: t.nav.pricing },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-container items-center justify-between rounded-full border border-cream-300/60 bg-cream-50/85 px-5 py-3 backdrop-blur-md transition-all duration-300 ease-smooth ${
          scrolled
            ? "shadow-[0_8px_30px_rgba(30,58,47,0.12)]"
            : "shadow-[0_4px_20px_rgba(30,58,47,0.06)]"
        }`}
      >
        <a href="/" aria-label="Lee's Gallery" className="block">
          <Image
            src="/logo-black.png"
            alt="Lee's Gallery"
            width={465}
            height={415}
            priority
            className="h-9 w-auto"
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="cursor-pointer text-sm text-ink-muted transition-colors duration-200 hover:text-forest"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle language"
            className="cursor-pointer rounded-full border border-cream-300/70 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-forest transition-colors duration-200 hover:bg-forest hover:text-cream-50"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <a
            href={whatsappLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden cursor-pointer rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream-50 transition-colors duration-200 hover:bg-forest-500 sm:inline-block"
          >
            {t.nav.book}
          </a>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-cream-300/70 text-forest md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1">
              <span
                className={`h-0.5 w-4 bg-current transition-transform duration-200 ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-4 bg-current transition-transform duration-200 ${
                  menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mx-auto mt-2 max-w-container rounded-3xl border border-cream-300/60 bg-cream-50/95 p-4 shadow-lg backdrop-blur-md md:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block cursor-pointer rounded-2xl px-4 py-3 text-base text-ink transition-colors duration-200 hover:bg-cream-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={whatsappLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-2 block cursor-pointer rounded-2xl bg-forest px-4 py-3 text-center text-base font-medium text-cream-50"
              >
                {t.nav.book}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
