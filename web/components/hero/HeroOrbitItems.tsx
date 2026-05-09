"use client";

import Image from "next/image";
import {
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  motion,
  type MotionValue,
} from "framer-motion";
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
import { useMemo, useState } from "react";
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

const STAGE_COUNT = 4;

export default function HeroOrbitItems({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const tOrbit = useTranslations("HeroOrbit");
  const [stageIdx, setStageIdx] = useState(0);
  const [ref, bounds] = useMeasure();

  useMotionValueEvent(progress, "change", (v) => {
    setStageIdx(Math.min(STAGE_COUNT - 1, Math.floor(v * STAGE_COUNT)));
  });

  const ringRotate = useTransform(progress, [0, 1], [0, reduceMotion ? 0 : 360]);

  const stage = heroStages[stageIdx];
  const radiusPx = Math.min(bounds.width, bounds.height) * 0.22 || 140;

  const items = useMemo(() => stage.orbit.items, [stage]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[5] hidden overflow-visible md:block"
      aria-hidden
    >
      <motion.div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
        style={{ rotate: reduceMotion ? 0 : ringRotate }}
      >
        {items.map((item, idx) => {
          const angle = item.angleStart;
          const x = Math.cos(angle) * radiusPx;
          const y = Math.sin(angle) * radiusPx;
          const size = item.size;

          if (item.kind === "icon") {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={`${stage.id}-icon-${idx}`}
                className="absolute flex items-center justify-center rounded-full border border-white/15 bg-black/45 shadow-lg backdrop-blur-md"
                style={{
                  width: size,
                  height: size,
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  left: 0,
                  top: 0,
                }}
              >
                <Icon className="h-[55%] w-[55%] text-white/85" strokeWidth={1.35} />
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
                className="overflow-hidden rounded-full border border-white/15 shadow-xl shadow-black/60"
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
      </motion.div>
    </div>
  );
}
