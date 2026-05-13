"use client";

import { useLocale, useTranslations } from "next-intl";

import { whyRows } from "@/content/why";
import { pickLocale } from "@/content/types";

function WhyComparisonMini({
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
    <div className="rounded-xl border border-accent-burnt/20 bg-black/30 px-4 py-3 backdrop-blur-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-amber">
            {typicalLabel}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{typical}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-amber">
            {usLabel}
          </p>
          <p className="mt-2 text-sm font-semibold leading-snug text-white">
            {us}
          </p>
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
      className="scroll-mt-28 border-t border-white/5 bg-gradient-to-b from-zinc-950 via-[#110F06] to-zinc-950 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="max-w-3xl">
          <h2 className="bg-gradient-to-r from-white to-accent-soft bg-clip-text text-3xl font-semibold tracking-tight text-transparent md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-white/75">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <WhyComparisonMini
            typicalLabel={t("typicalLabel")}
            usLabel={t("usLabel")}
            typical={t("v1Typical")}
            us={t("v1Us")}
          />
          <WhyComparisonMini
            typicalLabel={t("typicalLabel")}
            usLabel={t("usLabel")}
            typical={t("v2Typical")}
            us={t("v2Us")}
          />
          <WhyComparisonMini
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
