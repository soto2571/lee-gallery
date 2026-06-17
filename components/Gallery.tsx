"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  categories,
  imagesByCategory,
  type GalleryImage,
} from "@/lib/gallery";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";
import { ArrowRightIcon } from "./icons";

type ActiveStrip = { images: GalleryImage[]; index: number };

export function Gallery() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState<ActiveStrip | null>(null);

  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="mx-auto mb-14 max-w-container px-4">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-forest-500">
            {t.work.title}
          </p>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tightest text-forest sm:text-5xl">
            {t.work.subtitle}
          </h2>
        </Reveal>
      </div>

      <div className="space-y-16">
        {categories.map((cat) => {
          const images = imagesByCategory(cat.id);
          const label = t.work.categories[cat.id];

          return (
            <Reveal key={cat.id}>
              {/* Row title */}
              <div className="mx-auto mb-5 flex max-w-container items-end justify-between gap-4 px-4">
                <h3 className="flex items-baseline gap-3 font-display text-2xl font-normal text-forest sm:text-3xl">
                  <span className="text-sm font-medium tracking-[0.18em] text-forest-400">
                    {cat.order}
                  </span>
                  {label}
                </h3>
                {images.length > 0 && (
                  <div className="flex items-center gap-4">
                    <span className="hidden text-xs uppercase tracking-[0.18em] text-ink-muted sm:inline">
                      {images.length} {lang === "es" ? "fotos" : "photos"}
                    </span>
                    <Link
                      href={`/work/${cat.id}`}
                      className="group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-forest/25 px-4 py-2 text-xs font-medium text-forest transition-colors duration-200 hover:bg-forest hover:text-cream-50"
                    >
                      {t.work.viewAll}
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                )}
              </div>

              {images.length === 0 ? (
                <div className="mx-auto max-w-container px-4">
                  <div className="border border-dashed border-cream-300 py-16 text-center">
                    <p className="text-sm uppercase tracking-[0.18em] text-ink-muted">
                      {t.work.empty}
                    </p>
                  </div>
                </div>
              ) : (
                /* Film-strip: photos flush against each other, scroll horizontally */
                <div className="flex gap-0 overflow-x-auto pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-cream-300">
                  {/* left edge spacer */}
                  <div className="shrink-0 w-[max(1rem,calc((100vw-1200px)/2))]" />

                  {images.map((image, i) => (
                    <figure key={image.id} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setActive({ images, index: i })}
                        aria-label={image.alt[lang]}
                        className="group relative block aspect-[3/4] h-72 cursor-pointer overflow-hidden bg-cream-200 sm:h-80 lg:h-96"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt[lang]}
                          fill
                          sizes="(max-width: 640px) 216px, (max-width: 1024px) 240px, 288px"
                          className="object-cover transition-transform duration-[600ms] ease-smooth group-hover:scale-[1.04]"
                        />
                      </button>
                      <figcaption className="px-1 pt-2 font-display text-xs tracking-wide text-ink-muted">
                        {String(i + 1).padStart(2, "0")}.
                      </figcaption>
                    </figure>
                  ))}

                  {/* right edge spacer */}
                  <div className="shrink-0 w-[max(1rem,calc((100vw-1200px)/2))]" />
                </div>
              )}
            </Reveal>
          );
        })}
      </div>

      {active && (
        <Lightbox
          images={active.images}
          index={active.index}
          onClose={() => setActive(null)}
          onNavigate={(index) => setActive({ images: active.images, index })}
        />
      )}
    </section>
  );
}
