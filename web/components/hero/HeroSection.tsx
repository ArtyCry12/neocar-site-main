"use client";

import dynamic from "next/dynamic";
import type { MotionValue } from "framer-motion";
import { useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,#18181b_0%,#050506_65%)]" />
  ),
});

export default function HeroSection({
  children,
}: {
  children: (progress: MotionValue<number>) => ReactNode;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.35,
  });

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

  return (
    <section
      ref={sectionRef}
      data-testid="home-hero"
      className="relative h-[400svh] scroll-mt-20"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <HeroCanvas progress={smoothProgress} active={active} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-zinc-950" />
        <div className="pointer-events-auto relative z-10 flex flex-1 flex-col">
          {children(smoothProgress)}
        </div>
      </div>
    </section>
  );
}
