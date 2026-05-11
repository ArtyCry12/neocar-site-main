"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import {
  Forklift as ForkliftIcon,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  Warehouse,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef } from "react";
import useMeasure from "react-use-measure";

import { heroStages } from "@/content/stages";
import type { LucideOrbitIcon } from "@/content/stages";

const ICONS: Record<LucideOrbitIcon, LucideIcon> = {
  Warehouse,
  Truck,
  Forklift: ForkliftIcon,
  Wrench,
  Package,
  ShieldCheck,
  Phone,
};

export default function HeroOrbitItems({
  stageIdx,
}: {
  stageIdx: number;
}) {
  const reduceMotion = useReducedMotion();
  const tOrbit = useTranslations("HeroOrbit");
  const ringRef = useRef<HTMLDivElement>(null);
  const [ref, bounds] = useMeasure();

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    let angle = 0;
    let last = performance.now();
    const tick = (now: number) => {
      angle += (now - last) * 0.00004;
      last = now;
      const el = ringRef.current;
      if (el) {
        el.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const stage = heroStages[Math.min(3, Math.max(0, stageIdx))];
  const isMobile = bounds.width > 0 && bounds.width < 640;
  const radiusFactor = isMobile ? 0.18 : 0.22;
  const radiusPx = Math.min(bounds.width, bounds.height) * radiusFactor || 140;

  const items = useMemo(() => stage.orbit.items, [stage]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[5] overflow-visible"
      aria-hidden
    >
      <div
        ref={ringRef}
        className="absolute left-1/2 top-[45%]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {items.map((item, idx) => {
          const angle = item.angleStart;
          const x = Math.cos(angle) * radiusPx;
          const y = Math.sin(angle) * radiusPx;
          const size = Math.round(item.size * (isMobile ? 0.7 : 1));

          if (item.kind === "icon") {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={`${stage.id}-icon-${idx}`}
                className="absolute flex items-center justify-center rounded-full border border-accent-burnt/25 bg-black/45 shadow-lg backdrop-blur-md"
                style={{
                  width: size,
                  height: size,
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  left: 0,
                  top: 0,
                }}
              >
                <Icon
                  className="h-[55%] w-[55%] text-white/85"
                  strokeWidth={1.35}
                />
              </div>
            );
          }

          const tile = Math.round(size + 24);

          return (
            <div
              key={`${stage.id}-img-${idx}`}
              className="absolute left-0 top-0"
              style={{
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
              }}
            >
              <div
                className="overflow-hidden rounded-full border border-accent-burnt/25 shadow-xl shadow-black/60"
                style={{ position: "relative", width: tile, height: tile }}
              >
                <Image
                  src={item.image}
                  alt={tOrbit(item.altKey)}
                  fill
                  sizes={`${tile}px`}
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
