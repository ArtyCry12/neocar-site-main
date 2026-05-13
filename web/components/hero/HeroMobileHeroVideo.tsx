"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { MOBILE_HERO_CANVAS_MIN_H } from "./hero-canvas-layout";

const VIDEO_SRC = "/media/hero/mobile-hero.mp4";

type Props = {
  active: boolean;
};

export default function HeroMobileHeroVideo({ active }: Props) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [failed, setFailed] = useState(false);

  const showStatic = reduceMotion === true || failed;

  useEffect(() => {
    if (showStatic) return;
    const v = videoRef.current;
    if (!v) return;
    const run = async () => {
      try {
        if (active) {
          await v.play();
        } else {
          v.pause();
        }
      } catch {
        /* Autoplay policies / interrupted load — ignore */
      }
    };
    void run();
  }, [active, showStatic]);

  return (
    <div
      className={`pointer-events-none relative h-full w-full ${MOBILE_HERO_CANVAS_MIN_H}`}
    >
      {showStatic ? (
        <Image
          src="/media/hero/marquee-1.jpg"
          alt="NEOCAR — складская техника, фоновое фото"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 55vw"
          className="object-cover brightness-[0.38]"
        />
      ) : (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          className="h-full w-full object-cover object-center select-none"
          aria-hidden
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
