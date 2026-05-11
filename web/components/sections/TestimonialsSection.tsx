"use client";

import { useLocale, useTranslations } from "next-intl";
import { Quote } from "lucide-react";

import { testimonials } from "@/content/testimonials";
import { pickLocale } from "@/content/types";

export default function TestimonialsSection() {
  const t = useTranslations("Testimonials");
  const locale = useLocale();

  return (
    <section
      id="reviews"
      className="scroll-mt-28 border-t border-white/5 bg-gradient-to-b from-black via-zinc-950 to-zinc-950 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-2xl text-base text-white/70">{t("subtitle")}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((row) => {
            const item = pickLocale(locale, row);
            return (
              <article
                key={item.name}
                className="flex flex-col rounded-3xl border border-accent-burnt/25 bg-[image:var(--background-image-card-gradient)] p-6 backdrop-blur-md"
              >
                <Quote
                  className="mb-4 h-8 w-8 shrink-0 text-accent-amber/90"
                  aria-hidden
                />
                <blockquote className="flex-1 text-sm leading-relaxed text-white/80">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 border-t border-white/10 pt-4">
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="mt-1 text-xs text-white/55">{item.role}</div>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
