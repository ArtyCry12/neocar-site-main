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
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import useMeasure from "react-use-measure";

import { heroStages } from "@/content/stages";
import type { LucideOrbitIcon, OrbitItem } from "@/content/stages";

const ICONS: Record<LucideOrbitIcon, LucideIcon> = {
  Warehouse,
  Truck,
  Forklift: ForkliftIcon,
  Wrench,
  Package,
  ShieldCheck,
  Phone,
};

function mobileSlotItems(items: OrbitItem[]): OrbitItem[] {
  const a = items[0];
  const b = items[1];
  const c = items[2];
  const d = items[4] ?? items[3];
  const e = items[5] ?? items[3];
  const f = items[6] ?? items[3];
  return [a, b, c, d, e, f].filter(Boolean) as OrbitItem[];
}

function renderMobileItem(
  item: OrbitItem,
  key: string,
  left: number,
  top: number,
  size: number,
  tOrbit: ReturnType<typeof useTranslations>,
) {
  const posStyle: CSSProperties = {
    position: "absolute",
    left,
    top,
    transform: "translate(-50%, -50%)",
  };

  if (item.kind === "icon") {
    const Icon = ICONS[item.icon];
    return (
      <div
        key={key}
        className="absolute flex items-center justify-center rounded-full border border-accent-burnt/25 bg-black/45 shadow-lg backdrop-blur-md"
        style={{
          ...posStyle,
          width: size,
          height: size,
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
    <div key={key} className="absolute" style={posStyle}>
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
}

export default function HeroOrbitItems({
  stageIdx,
}: {
  stageIdx: number;
}) {
  const reduceMotion = useReducedMotion();
  const tOrbit = useTranslations("HeroOrbit");
  const ringRef = useRef<HTMLDivElement>(null);
  const [ref, bounds] = useMeasure();
  const [isLgDown, setIsLgDown] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setIsLgDown(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const sidePinLayout = isLgDown;

  useEffect(() => {
    if (reduceMotion || sidePinLayout) return;
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
  }, [reduceMotion, sidePinLayout]);

  const stage = heroStages[Math.min(3, Math.max(0, stageIdx))];
  const isNarrowDesktop =
    bounds.width > 0 && bounds.width < 640 && !sidePinLayout;
  const radiusFactor = isNarrowDesktop ? 0.18 : 0.22;
  const radiusPx = Math.min(bounds.width, bounds.height) * radiusFactor || 140;

  const items = useMemo(() => stage.orbit.items, [stage]);

  const mobilePositions = useMemo(() => {
    const w = bounds.width;
    const h = bounds.height;
    if (!w || !h) return null;
    return [
      { x: w * 0.07, y: h * 0.2 },
      { x: w * 0.07, y: h * 0.52 },
      { x: w * 0.07, y: h * 0.78 },
      { x: w * 0.93, y: h * 0.15 },
      { x: w * 0.93, y: h * 0.42 },
      { x: w * 0.93, y: h * 0.68 },
    ];
  }, [bounds.width, bounds.height]);

  const slotItems = useMemo(() => mobileSlotItems(items), [items]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[5] overflow-visible"
      aria-hidden
    >
      {sidePinLayout && mobilePositions ? (
        <>
          {slotItems.map((item, idx) => {
            const pos = mobilePositions[idx];
            if (!pos) return null;
            const size = Math.round(item.size * 0.6);
            return renderMobileItem(
              item,
              `${stage.id}-m-${idx}`,
              pos.x,
              pos.y,
              size,
              tOrbit,
            );
          })}
        </>
      ) : (
        <div
          ref={ringRef}
          className="absolute left-1/2 top-[45%]"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {items.map((item, idx) => {
            const angle = item.angleStart;
            const x = Math.cos(angle) * radiusPx;
            const y = Math.sin(angle) * radiusPx;
            const size = Math.round(item.size * (isNarrowDesktop ? 0.7 : 1));

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
      )}
    </div>
  );
}
