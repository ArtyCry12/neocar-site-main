"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

type SliderAltKey =
  | "slideAlt1"
  | "slideAlt2"
  | "slideAlt3"
  | "videoDeliveryAlt"
  | "videoInspectionAlt";

type Slide =
  | { kind: "image"; src: string; altKey: SliderAltKey }
  | { kind: "video"; src: string; altKey: SliderAltKey };

const BASE_SLIDES: Slide[] = [
  { kind: "image", src: "/media/slider/slide-1.jpg", altKey: "slideAlt1" },
  { kind: "video", src: "/media/video/delivery.mp4", altKey: "videoDeliveryAlt" },
  { kind: "image", src: "/media/slider/slide-2.jpg", altKey: "slideAlt2" },
  { kind: "video", src: "/media/video/inspection.mp4", altKey: "videoInspectionAlt" },
  { kind: "image", src: "/media/slider/slide-3.jpg", altKey: "slideAlt3" },
];

export default function ImageAutoSliderSection() {
  const t = useTranslations("Slider");
  const reduceMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const fn = () => setDesktop(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const slides = useMemo(() => [...BASE_SLIDES, ...BASE_SLIDES, ...BASE_SLIDES], []);

  const autoplay = desktop && !reduceMotion;

  return (
    <section className="border-t border-white/5 bg-black py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-10">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="animate-neo-marquee flex w-max gap-6">
            {slides.map((slide, idx) => (
              <SlideTile
                key={`${slide.kind}-${slide.src}-${idx}`}
                slide={slide}
                autoplay={autoplay}
                desktop={desktop}
                alt={t(slide.altKey)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideTile({
  slide,
  autoplay,
  desktop,
  alt,
}: {
  slide: Slide;
  autoplay: boolean;
  desktop: boolean;
  alt: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || slide.kind !== "video") return;
    if (autoplay) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [autoplay, slide.kind]);

  const tileWidth = desktop ? 320 : 256;
  const tileHeight = desktop ? 224 : 192;

  return (
    <div
      className="shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
      style={{ position: "relative", width: tileWidth, height: tileHeight }}
    >
      {slide.kind === "image" ? (
        <Image
          src={slide.src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1023px) 256px, 320px"
        />
      ) : (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={slide.src}
          muted
          playsInline
          preload="metadata"
          loop
          aria-label={alt}
        />
      )}
    </div>
  );
}
