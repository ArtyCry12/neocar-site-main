import { faqItems } from "@/content/faq";

type AppLocale = "ru" | "ro" | "en";

export function faqPageJsonLd(locale: string) {
  const loc = (["ru", "ro", "en"].includes(locale) ? locale : "ru") as AppLocale;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((row) => ({
      "@type": "Question",
      name: row[loc].question,
      acceptedAnswer: {
        "@type": "Answer",
        text: row[loc].answer,
      },
    })),
  } as const;
}
