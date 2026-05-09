"use client";

import HeroOrbitItems from "@/components/hero/HeroOrbitItems";
import HeroSection from "@/components/hero/HeroSection";
import HeroStageCopy from "@/components/hero/HeroStageCopy";

export default function HomeHero() {
  return (
    <HeroSection>
      {(progress) => (
        <>
          <HeroOrbitItems progress={progress} />
          <HeroStageCopy progress={progress} />
        </>
      )}
    </HeroSection>
  );
}
