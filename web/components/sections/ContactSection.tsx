"use client";

import { useLocale, useTranslations } from "next-intl";

import ContactDirectory from "@/components/contact/ContactDirectory";
import NeocarLocation from "@/components/ui/neocar-location";

import { faqItems } from "@/content/faq";
import { pickLocale } from "@/content/types";

export default function ContactSection() {
  const t = useTranslations("Contact");
  const tf = useTranslations("Faq");
  const locale = useLocale();

  return (
    <section
      id="contact"
      className="scroll-mt-28 border-t border-white/5 bg-black py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-6 grid gap-3 text-sm text-white/75 md:grid-cols-2">
          <div>{t("address")}</div>
          <div className="space-y-1 md:text-right">
            <div>
              <a className="hover:text-white" href={`tel:${t("phoneOffice").replace(/\s+/g, "")}`}>
                {t("phoneOffice")}
              </a>
            </div>
            <div>
              <a className="hover:text-white" href={`tel:${t("phoneMobile").replace(/\s+/g, "")}`}>
                {t("phoneMobile")}
              </a>
            </div>
            <div>
              <a className="hover:text-white" href={`mailto:${t("email")}`}>
                {t("email")}
              </a>
            </div>
            <div>
              <a
                className="hover:text-white"
                href={`https://${t("site")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("site")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <ContactDirectory />
          <NeocarLocation />
        </div>

        <div className="mt-16 border-t border-white/10 pt-12">
          <h3 className="text-xl font-semibold text-white">{tf("title")}</h3>
          <dl className="mt-6 space-y-5">
            {faqItems.map((row, idx) => {
              const item = pickLocale(locale, row);
              return (
                <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <dt className="font-medium text-white">{item.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-white/70">{item.answer}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
