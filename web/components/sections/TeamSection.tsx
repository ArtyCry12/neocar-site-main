"use client";

import { useLocale, useTranslations } from "next-intl";

import { teamGroups, teamMembers } from "@/content/team";
import { pickLocale } from "@/content/types";

export default function TeamSection() {
  const t = useTranslations("Team");
  const locale = useLocale();

  const renderGroup = (
    groupKey: string,
    title: string,
    start: number,
    end: number,
  ) => (
    <div key={groupKey} className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
        {title}
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {teamMembers.slice(start, end).map((row, index) => {
          const m = pickLocale(locale, row);
          return (
            <div
              key={`${groupKey}-${start + index}-${m.email}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-lg font-semibold text-white">{m.name}</div>
              <div className="mt-1 text-sm text-white/60">{m.role}</div>
              <div className="mt-3 space-y-1 text-sm text-white/75">
                <a className="block hover:text-white" href={`tel:${m.phone.replace(/\s+/g, "")}`}>
                  {m.phone}
                </a>
                <a className="block hover:text-white" href={`mailto:${m.email}`}>
                  {m.email}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="border-t border-white/5 bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {t("title")}
        </h2>
        {teamGroups.map((g) =>
          renderGroup(g.titleKey, t(g.titleKey), g.slice[0], g.slice[1]),
        )}
      </div>
    </section>
  );
}
