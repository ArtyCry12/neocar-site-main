import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SITE_ORIGIN } from "@/lib/site";

export type LegalNamespace = "Privacy" | "Terms" | "Cookies";

type Props = {
  params: Promise<{ locale: string }>;
  namespace: LegalNamespace;
};

export async function legalMetadata(
  paramsPromise: Props["params"],
  namespace: LegalNamespace,
): Promise<Metadata> {
  const { locale } = await paramsPromise;
  const t = await getTranslations({ locale, namespace });
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: `${t("title")} · NEOCAR`,
    robots: { index: true, follow: true },
  };
}

export default async function LegalDocument({ params, namespace }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace });

  const sections = t.raw("sections") as { heading: string; body: string }[];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 text-white md:px-8 md:py-24">
      <p className="text-xs uppercase tracking-[0.24em] text-white/45">{t("updated")}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-6 text-base leading-relaxed text-white/75">{t("lead")}</p>
      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-lg font-semibold text-white">{section.heading}</h2>
            <p className="text-sm leading-relaxed text-white/70">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
