"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Category, GalleryImage } from "@/lib/gallery";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";
import { ChevronLeftIcon } from "./icons";

// Repeating bento pattern: mixes big, tall and wide tiles for a collage feel.
// Grid is 2 cols on mobile, 4 on desktop — these spans scale across both.
const BENTO_SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

export function CategoryGallery({
  category,
  images,
}: {
  category: Category;
  images: GalleryImage[];
}) {
  const { t, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const title = t.work.categories[category];

  return (
    <main className="px-4 pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-container">
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex cursor-pointer items-center gap-2 text-sm text-ink-muted transition-colors duration-200 hover:text-forest"
          >
            <ChevronLeftIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {t.nav.work}
          </Link>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-cream-300/70 pb-8">
            <h1 className="font-display text-5xl font-light tracking-tightest text-forest sm:text-6xl">
              {title}
            </h1>
            {images.length > 0 && (
              <span className="text-sm uppercase tracking-[0.2em] text-ink-muted">
                {images.length} {lang === "es" ? "fotos" : "photos"}
              </span>
            )}
          </div>
        </Reveal>

        {images.length === 0 ? (
          <Reveal className="mt-16 rounded-3xl border border-dashed border-cream-300 py-24 text-center">
            <p className="text-lg text-ink-muted">{t.work.empty}</p>
            <Link
              href="/#work"
              className="mt-6 inline-block cursor-pointer rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream-50 transition-colors duration-200 hover:bg-forest-500"
            >
              {t.nav.work}
            </Link>
          </Reveal>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-3 [grid-auto-rows:11rem] sm:[grid-auto-rows:13rem] md:grid-cols-4 md:gap-4 lg:[grid-auto-rows:15rem]">
            {images.map((image, i) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={image.alt[lang]}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-cream-200 ${
                  BENTO_SPANS[i % BENTO_SPANS.length]
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt[lang]}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[700ms] ease-smooth group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 left-4 font-display text-sm text-cream-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {String(i + 1).padStart(2, "0")}.
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={images}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </main>
  );
}
