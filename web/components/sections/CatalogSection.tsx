"use client";

import { useLocale, useTranslations } from "next-intl";

import { catalogCards } from "@/content/catalog";
import { pickLocale } from "@/content/types";

export default function CatalogSection() {
  const t = useTranslations("Catalog");
  const locale = useLocale();

  return (
    <section
      id="catalog"
      className="scroll-mt-28 border-t border-white/5 bg-gradient-to-b from-zinc-950 via-zinc-950 to-black py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-white/70">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {catalogCards.map((row) => {
            const item = pickLocale(locale, row);
            return (
              <article
                key={item.title}
                className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-sm leading-relaxed text-white/70">{t("brands")}</p>
      </div>
    </section>
  );
}
