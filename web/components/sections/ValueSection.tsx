"use client";

import { useLocale, useTranslations } from "next-intl";

import { whyRows } from "@/content/why";
import { pickLocale } from "@/content/types";

function SplitCard({
  typical,
  us,
  typicalLabel,
  usLabel,
}: {
  typical: string;
  us: string;
  typicalLabel: string;
  usLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-accent-burnt/30 bg-[image:var(--background-image-card-gradient)] shadow-lg backdrop-blur-md">
      <div className="grid min-h-[200px] grid-cols-1 sm:grid-cols-2">
        <div className="border-b border-accent-burnt/30 p-5 sm:border-b-0 sm:border-r sm:border-accent-burnt/40">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
            {typicalLabel}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{typical}</p>
        </div>
        <div className="bg-accent-burnt/10 p-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-amber">
            {usLabel}
          </div>
          <p className="mt-3 text-sm font-medium leading-relaxed text-white/90">{us}</p>
        </div>
      </div>
    </div>
  );
}

export default function ValueSection() {
  const t = useTranslations("Why");
  const locale = useLocale();

  return (
    <section
      id="value"
      className="scroll-mt-28 border-t border-white/5 bg-zinc-950 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="max-w-3xl">
          <h2 className="bg-gradient-to-r from-white to-accent-soft bg-clip-text text-3xl font-semibold tracking-tight text-transparent md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-white/75">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <SplitCard
            typicalLabel={t("typicalLabel")}
            usLabel={t("usLabel")}
            typical={t("v1Typical")}
            us={t("v1Us")}
          />
          <SplitCard
            typicalLabel={t("typicalLabel")}
            usLabel={t("usLabel")}
            typical={t("v2Typical")}
            us={t("v2Us")}
          />
          <SplitCard
            typicalLabel={t("typicalLabel")}
            usLabel={t("usLabel")}
            typical={t("v3Typical")}
            us={t("v3Us")}
          />
        </div>

        <div className="mt-14">
          <ul className="columns-1 gap-x-8 sm:columns-2 lg:columns-3">
            {whyRows.map((row) => {
              const r = pickLocale(locale, row);
              return (
                <li
                  key={r.advantage}
                  className="mb-3 break-inside-avoid rounded-xl border border-accent-burnt/20 bg-black/30 px-4 py-3 text-sm backdrop-blur-sm"
                >
                  <span className="font-semibold text-accent-amber">
                    {r.advantage}
                  </span>
                  <span className="text-white/40"> · </span>
                  <span className="text-white/70">{r.description}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
