"use client";

import { useLocale, useTranslations } from "next-intl";

import { serviceLines } from "@/content/services";
import { pickLocale } from "@/content/types";

export default function ServicesSection() {
  const t = useTranslations("Services");
  const locale = useLocale();

  return (
    <section
      id="services"
      className="scroll-mt-28 border-t border-white/5 bg-black py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {t("title")}
        </h2>

        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {serviceLines.map((row, idx) => (
            <li
              key={idx}
              className="flex gap-4 rounded-3xl border border-white/10 bg-zinc-950/70 p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-sm font-bold text-white">
                {idx + 1}
              </span>
              <p className="text-sm leading-relaxed text-white/75">
                {pickLocale(locale, row)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
