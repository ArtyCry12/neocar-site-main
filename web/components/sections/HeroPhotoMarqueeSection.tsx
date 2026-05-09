"use client";

import { useTranslations } from "next-intl";

import { AnimatedMarqueeHero } from "@/components/ui/hero-3";

const MARQUEE_IMAGES = [
  "/media/hero/marquee-1.jpg",
  "/media/hero/marquee-2.jpg",
  "/media/hero/marquee-3.jpg",
  "/media/hero/marquee-4.jpg",
  "/media/hero/marquee-5.jpg",
];

export default function HeroPhotoMarqueeSection() {
  const t = useTranslations("Marquee");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatedMarqueeHero
      tagline={t("tagline")}
      title={
        <>
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </>
      }
      description={t("description")}
      ctaText={t("cta")}
      images={MARQUEE_IMAGES}
      className="bg-zinc-950"
      onCtaClick={() => scrollTo("catalog")}
    />
  );
}
