"use client";

import { useLocale, useTranslations } from "next-intl";

import { comparisonRows } from "@/content/comparison";
import { pickLocale } from "@/content/types";

export default function ComparisonSection() {
  const t = useTranslations("Comparison");
  const locale = useLocale();

  return (
    <section className="border-t border-white/5 bg-black py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-white/55">
              <tr>
                <th className="px-4 py-3 font-semibold">{t("colFeature")}</th>
                <th className="px-4 py-3 font-semibold">{t("colOther")}</th>
                <th className="px-4 py-3 font-semibold">{t("colUs")}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => {
                const r = pickLocale(locale, row);
                return (
                  <tr
                    key={r.feature}
                    className="border-t border-white/10 odd:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3 font-medium text-white">
                      {r.feature}
                    </td>
                    <td className="px-4 py-3 text-white/65">{r.other}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-300">
                      {r.us}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
