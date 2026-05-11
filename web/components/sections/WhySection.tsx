"use client";

import { useLocale, useTranslations } from "next-intl";

import { whyRows } from "@/content/why";
import { pickLocale } from "@/content/types";

export default function WhySection() {
  const t = useTranslations("Why");
  const locale = useLocale();

  return (
    <section className="border-t border-white/5 bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-white/70">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyRows.map((row) => {
            const r = pickLocale(locale, row);
            return (
              <div
                key={r.advantage}
                className="rounded-3xl border border-accent-burnt/25 bg-[image:var(--background-image-card-gradient)] p-6 backdrop-blur-md"
              >
                <div className="text-lg font-semibold text-white">{r.advantage}</div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>

        <blockquote className="mt-14 rounded-3xl border border-accent-burnt/30 bg-accent-burnt/10 px-6 py-5 text-base italic text-white/85 md:text-lg">
          {t("quote")}
        </blockquote>
      </div>
    </section>
  );
}
