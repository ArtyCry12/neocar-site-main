"use client";

import HeroSection from "@/components/hero/HeroSection";
import HeroStageCopy from "@/components/hero/HeroStageCopy";

export default function HomeHero() {
  return <HeroSection copy={(stageIdx) => <HeroStageCopy stageIdx={stageIdx} />} />;
}
