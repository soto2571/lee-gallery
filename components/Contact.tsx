"use client";

import { useLanguage } from "./LanguageProvider";
import { siteConfig, whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";
import { MailIcon, PinIcon, WhatsAppIcon, ArrowRightIcon } from "./icons";

export function Contact() {
  const { t, lang } = useLanguage();

  return (
    <section id="contact" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-container">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-forest px-6 py-16 text-cream-50 sm:px-16 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-forest-100">
                  {t.contact.eyebrow}
                </p>
                <h2 className="font-display text-4xl font-light leading-tight tracking-tightest sm:text-5xl">
                  {t.contact.title}
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-cream-200">
                  {t.contact.subtitle}
                </p>

                <a
                  href={whatsappLink(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-9 inline-flex cursor-pointer items-center gap-3 rounded-full bg-cream-50 px-7 py-4 text-sm font-medium text-forest transition-colors duration-200 hover:bg-cream-200"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.contact.whatsapp}
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>

              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex cursor-pointer items-center gap-4 rounded-2xl border border-cream-50/15 px-5 py-4 transition-colors duration-200 hover:bg-cream-50/5"
                  >
                    <MailIcon className="h-5 w-5 text-cream-100" />
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-cream-200">
                        {t.contact.email}
                      </span>
                      <span className="text-cream-50">{siteConfig.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-4 rounded-2xl border border-cream-50/15 px-5 py-4">
                    <PinIcon className="h-5 w-5 text-cream-100" />
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-cream-200">
                        {t.contact.location}
                      </span>
                      <span className="text-cream-50">{siteConfig.location}</span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
