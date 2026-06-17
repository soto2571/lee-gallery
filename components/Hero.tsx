"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { whatsappLink } from "@/lib/site";
import { ArrowDownIcon, ArrowRightIcon } from "./icons";

export function Hero() {
  const { t, lang } = useLanguage();
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  // Parallax: the background photo drifts slower than the page scroll.
  // Disabled when the user prefers reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setOffset(window.scrollY * 0.4));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[600px] items-center justify-center overflow-hidden"
    >
      {/* Parallax background photo of Lee */}
      <div
        ref={imageRef}
        className="absolute inset-x-0 top-0 -bottom-[20%] will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <Image
          src="/images/shay.JPG"
          alt={
            lang === "es"
              ? "Lee, fotógrafa de Lee's Gallery"
              : "Lee, photographer at Lee's Gallery"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Legibility overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/55 via-forest-900/25 to-forest-900/75" />
      </div>

      {/* Title overlay */}
      <div className="relative z-10 px-4 text-center text-cream-50">
        <p className="mb-6 animate-fade-in text-xs font-medium uppercase tracking-[0.3em] text-cream-100/90 [animation-delay:200ms]">
          {t.hero.eyebrow}
        </p>

        <h1 className="animate-fade-up font-display text-6xl font-light tracking-tightest text-cream-50 drop-shadow-[0_2px_24px_rgba(11,26,22,0.55)] sm:text-7xl lg:text-8xl">
          {t.nav.work}
        </h1>

        <p className="mx-auto mt-8 max-w-xl animate-fade-up text-base leading-relaxed text-cream-100/90 [animation-delay:120ms] sm:text-lg">
          {t.hero.subtitle}
        </p>

        <div className="mt-10 flex animate-fade-up flex-wrap items-center justify-center gap-4 [animation-delay:240ms]">
          <a
            href="#work"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-cream-50 px-7 py-3.5 text-sm font-medium text-forest transition-colors duration-200 hover:bg-cream-200"
          >
            {t.hero.cta}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a
            href={whatsappLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cream-50/40 px-7 py-3.5 text-sm font-medium text-cream-50 backdrop-blur-sm transition-colors duration-200 hover:bg-cream-50/10"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#work"
        aria-label="Scroll"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-cream-50/80 transition-colors duration-200 hover:text-cream-50"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDownIcon className="h-5 w-5 animate-bounce [animation-duration:2s]" />
      </a>
    </section>
  );
}
