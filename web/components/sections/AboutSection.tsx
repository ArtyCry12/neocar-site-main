"use client";

import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("About");
  const stats = useTranslations("Stats");

  const tiles = [
    {
      label: stats("foundedLabel"),
      value: stats("foundedValue"),
      hint: stats("foundedHint"),
    },
    {
      label: stats("brandsLabel"),
      value: stats("brandsValue"),
      hint: stats("brandsHint"),
    },
    {
      label: stats("directionsLabel"),
      value: stats("directionsValue"),
      hint: stats("directionsHint"),
    },
    {
      label: stats("cityLabel"),
      value: stats("cityValue"),
      hint: stats("cityHint"),
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-28 border-t border-white/5 bg-zinc-950 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent-burnt/30 bg-[#1A1A1A] px-4 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-amber">
          {t("kicker")}
        </span>
        <h2 className="mt-2 bg-gradient-to-r from-white to-accent-soft bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
          {t("title")}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <p className="text-lg leading-relaxed text-white/85">{t("p_lead")}</p>
          <p className="text-base leading-relaxed text-white/70">
            {t("p_support")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="rounded-2xl border border-accent-burnt/25 bg-[image:var(--background-image-card-gradient)] p-5 backdrop-blur-md"
            >
              <div className="text-xs uppercase tracking-wide text-white/45">
                {tile.label}
              </div>
              <div className="mt-2 text-3xl font-semibold text-accent-amber">
                {tile.value}
              </div>
              <div className="mt-2 text-sm text-white/65">{tile.hint}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
