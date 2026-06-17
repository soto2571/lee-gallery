"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { GalleryImage } from "@/lib/gallery";
import { useLanguage } from "./LanguageProvider";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const { lang } = useLanguage();
  const image = images[index];

  const goPrev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate]
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt[lang]}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-900/90 p-4 animate-fade-in backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors duration-200 hover:bg-cream-50/20"
      >
        <CloseIcon className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Previous"
        className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors duration-200 hover:bg-cream-50/20 sm:left-6"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Next"
        className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors duration-200 hover:bg-cream-50/20 sm:right-6"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <figure
        className="relative flex max-h-[85vh] w-full max-w-4xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[70vh] w-full">
          <Image
            src={image.src}
            alt={image.alt[lang]}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-4 text-center text-sm text-cream-200">
          {image.alt[lang]}
          <span className="ml-3 text-cream-300/70">
            {index + 1} / {images.length}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
