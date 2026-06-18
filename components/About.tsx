"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function About() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="about"
      className="bg-forest text-cream-50"
    >
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        {/* Image flush to the left edge, full height, with the title overlaid */}
        <div className="relative min-h-[70vh] lg:min-h-[90vh]">
          <Image
            src="/images/shay1.JPG"
            alt={
              lang === "es"
                ? "Retrato de Lee, la fotógrafa"
                : "Portrait of Lee, the photographer"
            }
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-forest-900/75 via-forest-900/10 to-transparent"
          />
          <h2 className="absolute bottom-8 left-6 font-display text-5xl font-light tracking-tightest text-cream-50 drop-shadow-[0_2px_20px_rgba(11,26,22,0.5)] sm:bottom-10 sm:left-10 sm:text-6xl lg:text-7xl">
            {t.about.title}
          </h2>
        </div>

        {/* Message */}
        <div className="flex items-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <Reveal>
            <p className="max-w-xl font-display text-2xl font-light leading-relaxed text-cream-100 sm:text-3xl lg:text-[2rem] lg:leading-[1.5]">
              {t.about.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
