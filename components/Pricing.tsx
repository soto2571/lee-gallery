"use client";

import { useLanguage } from "./LanguageProvider";
import { pricingPlans } from "@/lib/pricing";
import { whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";
import { CheckIcon } from "./icons";

export function Pricing() {
  const { t, lang } = useLanguage();

  return (
    <section id="pricing" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-forest-500">
            {t.pricing.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tightest text-forest sm:text-5xl">
            {t.pricing.title}
          </h2>
          <p className="mt-5 text-lg text-ink-muted">{t.pricing.subtitle}</p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 100}>
              <div
                className={`flex h-full flex-col rounded-3xl p-8 transition-transform duration-300 ease-smooth hover:-translate-y-1 ${
                  plan.highlighted
                    ? "bg-forest text-cream-50 shadow-[0_24px_60px_rgba(30,58,47,0.25)]"
                    : "border border-cream-300/70 bg-cream-50"
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-5 w-fit rounded-full bg-cream-50/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-cream-50">
                    {t.pricing.popular}
                  </span>
                )}
                <h3
                  className={`font-display text-2xl font-normal ${
                    plan.highlighted ? "text-cream-50" : "text-forest"
                  }`}
                >
                  {plan.name[lang]}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    plan.highlighted ? "text-cream-200" : "text-ink-muted"
                  }`}
                >
                  {plan.description[lang]}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span
                    className={`font-display text-4xl font-light ${
                      plan.highlighted ? "text-cream-50" : "text-forest"
                    }`}
                  >
                    {plan.price[lang]}
                  </span>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features[lang].map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckIcon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.highlighted ? "text-cream-100" : "text-forest-400"
                        }`}
                      />
                      <span
                        className={
                          plan.highlighted ? "text-cream-100" : "text-ink"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(lang, plan.whatsapp[lang])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex cursor-pointer items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    plan.highlighted
                      ? "bg-cream-50 text-forest hover:bg-cream-200"
                      : "bg-forest text-cream-50 hover:bg-forest-500"
                  }`}
                >
                  {plan.contactOnly ? t.pricing.contact : t.pricing.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center text-sm text-ink-muted">
          {t.pricing.customNote}
        </Reveal>
      </div>
    </section>
  );
}
