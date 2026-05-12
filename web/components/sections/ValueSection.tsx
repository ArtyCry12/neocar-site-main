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
    <div className="overflow-hidden rounded-2xl border border-accent-burnt/30 bg-[image:var(--background-image-card-gradient)] shadow-lg backdrop-blur-md">
      <div className="grid min-h-[200px] grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className="border-b border-accent-burnt/30 bg-[image:var(--background-image-typical-warm-gradient)] p-5 sm:border-b-0">
          <span className="inline-flex rounded-full bg-white/8 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
            {typicalLabel}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{typical}</p>
        </div>
        <div
          className="hidden w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-[#FF8D21]/50 to-transparent sm:block"
          aria-hidden
        />
        <div className="bg-[image:var(--background-image-us-gradient)] p-5">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-vivid" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-white">
              {usLabel}
            </span>
          </div>
          <p className="text-base font-bold leading-snug text-white">{us}</p>
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
