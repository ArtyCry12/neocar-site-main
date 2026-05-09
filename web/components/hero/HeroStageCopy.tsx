"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

import SocialProof from "@/components/hero/SocialProof";
import { Button } from "@/components/ui/button";

const STAGE_KEYS = ["intro", "catalog", "service", "cta"] as const;
const STAGE_COUNT = STAGE_KEYS.length;

export default function HeroStageCopy({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const tHero = useTranslations("Hero");
  const tStages = useTranslations("HeroStages");
  const [stageIdx, setStageIdx] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    setStageIdx(Math.min(STAGE_COUNT - 1, Math.floor(v * STAGE_COUNT)));
  });

  const stageKey = STAGE_KEYS[reduceMotion ? 0 : stageIdx];

  const title = tStages(`${stageKey}.title`);
  const bullets = tStages.raw(`${stageKey}.bullets`) as string[];

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-1 flex-col justify-between px-5 pb-24 pt-28 md:px-12 md:pb-28 md:pt-36">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
          {tHero("badge")}
        </span>
        <div className="relative min-h-[11rem] md:min-h-[10rem]" aria-live="polite">
          <motion.h1
            key={stageKey}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl"
          >
            {title}
          </motion.h1>
          <ul className="mx-auto mt-5 max-w-xl space-y-2 text-left text-sm text-white/75 md:text-base">
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
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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

      <div className="flex flex-col gap-6 px-1 md:flex-row md:items-end md:justify-between md:px-4">
        <SocialProof />
        <p className="hidden max-w-sm text-right text-xs leading-relaxed text-white/45 md:block">
          {tHero("hint")}
        </p>
      </div>
    </div>
  );
}
