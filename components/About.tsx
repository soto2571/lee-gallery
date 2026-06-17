"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

export function About() {
  const { t, lang } = useLanguage();

  return (
    <section id="about" className="bg-forest px-4 py-24 text-cream-50 sm:py-32">
      <div className="mx-auto grid max-w-container items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl">
            <Image
              src="/images/shay1.JPG"
              alt={
                lang === "es"
                  ? "Retrato de Lee, la fotógrafa"
                  : "Portrait of Lee, the photographer"
              }
              fill
              sizes="(max-width: 1024px) 80vw, 380px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-forest-100">
            {t.about.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tightest sm:text-5xl">
            {t.about.title}
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-cream-200">
            {t.about.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
