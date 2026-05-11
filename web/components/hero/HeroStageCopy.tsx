"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import SocialProof from "@/components/hero/SocialProof";
import { Button } from "@/components/ui/button";

const STAGE_KEYS = ["intro", "catalog", "service", "cta"] as const;
const STAGE_COUNT = STAGE_KEYS.length;

export default function HeroStageCopy({ stageIdx }: { stageIdx: number }) {
  const reduceMotion = useReducedMotion();
  const tHero = useTranslations("Hero");
  const tStages = useTranslations("HeroStages");

  const safeIdx = Math.min(STAGE_COUNT - 1, Math.max(0, stageIdx));
  const stageKey = STAGE_KEYS[reduceMotion ? 0 : safeIdx];

  const title = tStages(`${stageKey}.title`);
  const bullets = tStages.raw(`${stageKey}.bullets`) as string[];

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative z-10 flex min-h-[55svh] w-full flex-1 flex-col justify-between px-5 pb-20 pt-10 lg:min-h-[100svh] lg:px-8 lg:pb-24 lg:pt-24">
      <div className="flex max-w-xl flex-col items-start text-left">
        <span className="mb-4 inline-flex rounded-full border border-accent-burnt/30 bg-black/35 px-4 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-amber/90 backdrop-blur-sm">
          {tHero("badge")}
        </span>
        <div className="relative min-h-[10rem] lg:min-h-[12rem]" aria-live="polite">
          <motion.h1
            key={stageKey}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-balance bg-gradient-to-r from-[#FEC04D] to-[#E29303] bg-clip-text text-2xl font-semibold tracking-tight text-transparent md:text-3xl lg:text-5xl"
          >
            {title}
          </motion.h1>
          <ul className="mt-5 max-w-xl space-y-2 text-left text-sm text-white/80 md:text-base">
            {bullets.map((line, lineIdx) => (
              <motion.li
                key={`${stageKey}-${lineIdx}`}
                initial={{
                  opacity: 0,
                  clipPath: reduceMotion ? "none" : "inset(0 100% 0 0)",
                }}
                animate={{
                  opacity: 1,
                  clipPath: reduceMotion ? "none" : "inset(0 0% 0 0)",
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  delay: reduceMotion ? 0 : lineIdx * 0.05,
                }}
              >
                {line}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex w-full max-w-md items-center gap-2">
          {Array.from({ length: STAGE_COUNT }).map((_, i) => (
            <span
              key={i}
              className={
                i === safeIdx
                  ? "h-2 w-6 rounded-full bg-accent-burnt"
                  : "h-2 w-2 rounded-full bg-white/25"
              }
              aria-hidden
            />
          ))}
        </div>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button size="lg" type="button" onClick={() => scrollToId("contact")}>
            {tHero("ctaPrimary")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            type="button"
            onClick={() => scrollToId("catalog")}
          >
            {tHero("ctaSecondary")}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-0 pt-10 md:flex-row md:items-end md:justify-between lg:px-1">
        <SocialProof />
        <p className="max-w-sm text-xs leading-relaxed text-white/50 lg:text-right">
          {tHero("hint")}
        </p>
      </div>
    </div>
  );
}
