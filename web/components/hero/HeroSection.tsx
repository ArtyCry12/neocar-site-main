"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { useIsMobileLayout } from "@/hooks/use-match-media";

import { MOBILE_HERO_CANVAS_MIN_H } from "./hero-canvas-layout";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className={`relative h-full ${MOBILE_HERO_CANVAS_MIN_H} w-full bg-[radial-gradient(circle_at_center,#18181b_0%,#050506_65%)] lg:min-h-[100svh]`}
    />
  ),
});

const STAGE_COUNT = 4;
const CAROUSEL_MS = 4500;

export default function HeroSection({
  copy,
}: {
  copy: (stageIdx: number) => ReactNode;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(true);
  const [stageIdx, setStageIdx] = useState(0);
  const isMobile = useIsMobileLayout();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting && e.intersectionRatio > 0.02),
      { threshold: [0, 0.02, 0.05, 0.1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setStageIdx((i) => (i + 1) % STAGE_COUNT);
    }, CAROUSEL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const effectiveStage = reduceMotion ? 0 : stageIdx;

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      data-testid="home-hero"
      className="relative isolate min-h-[100svh] scroll-mt-20 overflow-visible lg:overflow-hidden bg-[radial-gradient(ellipse_80%_55%_at_15%_0%,rgba(255,141,33,0.22)_0%,transparent_60%),radial-gradient(ellipse_50%_35%_at_90%_85%,rgba(196,90,0,0.18)_0%,transparent_50%),linear-gradient(165deg,#0F0E0A_0%,#1A1400_30%,#0C0C0C_65%,#070707_100%)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-5 z-20 flex justify-center md:top-7">
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
          <Image
            src="/media/neocar-logo-hero.png"
            alt="NEOCAR"
            width={32}
            height={32}
            priority
            className="h-8 w-8 object-contain"
          />
          <span className="font-sans text-base font-bold tracking-tight text-white">
            NEOCAR
          </span>
        </div>
      </div>

      <div className="relative flex min-h-[100svh] flex-col pt-16 lg:flex-row lg:pt-20">
        <div className="relative order-first flex w-full min-h-0 items-start lg:order-last lg:w-[42%] lg:min-h-[100svh] lg:shrink-0 lg:items-center">
          {copy(effectiveStage)}
        </div>

        <div
          className={`relative order-last flex ${MOBILE_HERO_CANVAS_MIN_H} flex-1 flex-col max-lg:justify-start lg:order-first lg:min-h-[100svh] lg:justify-start lg:flex-[1.15]`}
        >
          <div
            className="pointer-events-none absolute inset-x-4 top-0 z-[6] h-px bg-gradient-to-r from-transparent via-[#FF8D21]/25 to-transparent lg:hidden"
            aria-hidden
          />
          <div className="w-full max-lg:min-h-0 max-lg:flex-1 lg:h-full lg:flex-1 lg:min-h-0">
            <HeroCanvas active={active} isMobile={isMobile} />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-zinc-950/85" />
    </section>
  );
}
