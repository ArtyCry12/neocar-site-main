"use client";

import dynamic from "next/dynamic";

const HeroMiniCanvas = dynamic(() => import("@/components/hero/HeroMiniCanvas"), {
  ssr: false,
});

export function HeroMiniCanvasRoot() {
  return <HeroMiniCanvas />;
}
