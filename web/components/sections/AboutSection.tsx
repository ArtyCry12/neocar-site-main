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
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {t("title")}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-base leading-relaxed text-white/75">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-white/75">
            <p>{t("p3")}</p>
            <p>{t("p4")}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
            >
              <div className="text-xs uppercase tracking-wide text-white/45">
                {tile.label}
              </div>
              <div className="mt-2 text-3xl font-semibold text-white">
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
