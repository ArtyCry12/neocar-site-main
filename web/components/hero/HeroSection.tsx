"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

import HeroOrbitItems from "@/components/hero/HeroOrbitItems";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="relative h-full min-h-[50svh] w-full bg-[radial-gradient(circle_at_center,#18181b_0%,#050506_65%)] lg:min-h-[100svh]" />
  ),
});

const STAGE_COUNT = 4;
const CAROUSEL_MS = 6000;

export default function HeroSection({
  copy,
}: {
  copy: (stageIdx: number) => ReactNode;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(true);
  const [stageIdx, setStageIdx] = useState(0);

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
      className="relative isolate min-h-[100svh] scroll-mt-20 overflow-hidden bg-gradient-to-br from-[#FEC04D]/15 via-[#1A1A1A] to-[#0a0a0a]"
    >
      <div className="pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 md:top-6">
        <Image
          src="/media/neocar-logo-hero.png"
          alt="NEOCAR"
          width={240}
          height={240}
          priority
          sizes="(max-width: 1023px) 160px, 240px"
          className="h-40 w-40 object-contain md:h-60 md:w-60"
        />
      </div>

      <div className="relative flex min-h-[100svh] flex-col lg:flex-row lg:pt-8">
        <div className="relative flex min-h-[45svh] flex-1 flex-col lg:min-h-[100svh] lg:flex-[1.15]">
          <HeroCanvas active={active} />
          <HeroOrbitItems stageIdx={effectiveStage} />
        </div>

        <div className="relative flex w-full min-h-[55svh] items-center lg:w-[42%] lg:min-h-[100svh] lg:shrink-0">
          {copy(effectiveStage)}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-zinc-950/80" />
    </section>
  );
}
