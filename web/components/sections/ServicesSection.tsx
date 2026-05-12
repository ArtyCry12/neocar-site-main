"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { serviceLines } from "@/content/services";
import { pickLocale } from "@/content/types";

export default function ServicesSection() {
  const t = useTranslations("Services");
  const locale = useLocale();

  return (
    <section
      id="services"
      className="scroll-mt-28 border-t border-white/5 bg-gradient-to-br from-[#0D0C08] to-black py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <motion.h2
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
        >
          <span className="block text-2xl font-medium text-white/80 md:text-3xl">
            {t("titlePart1")}
          </span>
          <span className="mt-2 block text-4xl font-bold leading-tight md:text-6xl">
            <span className="bg-gradient-to-r from-[#FFB76B] to-[#FF7B00] bg-clip-text text-transparent">
              {t("titlePart2")}
            </span>
          </span>
        </motion.h2>

        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {serviceLines.map((row, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{ duration: 0.4, delay: idx * 0.025 }}
              className="flex gap-4 rounded-3xl border border-accent-burnt/20 bg-[image:var(--background-image-card-gradient)] p-5 backdrop-blur-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent-burnt text-sm font-bold text-white">
                {idx + 1}
              </span>
              <p className="text-sm leading-relaxed text-white/75">
                {pickLocale(locale, row)}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
