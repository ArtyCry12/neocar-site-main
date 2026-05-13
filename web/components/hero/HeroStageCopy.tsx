"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.055,
        delayChildren: reduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.28,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="relative z-10 flex max-lg:min-h-0 w-full flex-1 flex-col justify-start px-5 pb-6 pt-4 text-center lg:min-h-[100svh] lg:justify-between lg:px-8 lg:pb-24 lg:pt-24 lg:text-left">
      <div className="flex max-w-xl flex-col items-center lg:items-start">
        <span className="mb-4 inline-flex self-center rounded-full border border-accent-burnt/30 bg-black/35 px-4 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-amber/90 backdrop-blur-sm lg:self-start">
          {tHero("badge")}
        </span>
        <div aria-live="polite" className="relative w-full">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={stageKey}
              layout
              initial={{
                opacity: 0,
                filter: reduceMotion ? "blur(0px)" : "blur(10px)",
                y: reduceMotion ? 0 : 12,
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
              }}
              exit={{
                opacity: 0,
                filter: reduceMotion ? "blur(0px)" : "blur(6px)",
                y: reduceMotion ? 0 : -8,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.38,
                ease: [0.25, 0.46, 0.45, 0.94],
                filter: { duration: reduceMotion ? 0 : 0.32 },
              }}
            >
              <h1 className="text-balance bg-gradient-to-r from-[#FFB76B] via-[#FF8D21] to-[#FF7B00] bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-3xl lg:text-5xl">
                {title}
              </h1>
              <motion.ul
                className="mt-4 space-y-2 text-sm text-white/75 md:text-base lg:text-left"
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                {bullets.map((line, i) => (
                  <motion.li
                    key={i}
                    variants={itemVariants}
                    className="flex items-start justify-center gap-2.5 lg:justify-start"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-amber" />
                    <span className="text-left">{line}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex w-full max-w-md items-center justify-center gap-2 lg:justify-start">
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
        <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-8">
          <Button
            size="lg"
            type="button"
            className="w-full sm:w-auto"
            onClick={() => scrollToId("contact")}
          >
            {tHero("ctaPrimary")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            type="button"
            className="w-full sm:w-auto"
            onClick={() => scrollToId("catalog")}
          >
            {tHero("ctaSecondary")}
          </Button>
        </div>
      </div>

      <div className="hidden flex-col gap-6 px-0 pt-10 md:flex-row md:items-end md:justify-between lg:flex lg:px-1">
        <SocialProof />
        <p className="max-w-sm text-xs leading-relaxed text-white/50 lg:text-right">
          {tHero("hint")}
        </p>
      </div>
    </div>
  );
}
