"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  images: string[];
  className?: string;
  onCtaClick?: () => void;
}

const ActionButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <motion.button
    type="button"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="mt-8 rounded-full bg-red-600 px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400/75"
  >
    {children}
  </motion.button>
);

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  images,
  className,
  onCtaClick,
}) => {
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  const duplicatedImages = [...images, ...images];

  return (
    <section
      className={cn(
        "relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-background px-4 pb-32 pt-24 text-center md:pb-40",
        className,
      )}
    >
      <div className="z-10 flex max-w-4xl flex-col items-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-4 inline-block rounded-full border border-white/10 bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm"
        >
          {tagline}
        </motion.div>

        <motion.h2
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="text-4xl font-bold tracking-tighter text-foreground md:text-6xl"
        >
          {typeof title === "string"
            ? title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={FADE_IN_ANIMATION_VARIANTS}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))
            : title}
        </motion.h2>

        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.45 }}
          className="mt-6 max-w-xl text-lg text-muted-foreground"
        >
          {description}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.55 }}
        >
          <ActionButton onClick={onCtaClick}>{ctaText}</ActionButton>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-[38%] w-full [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)] md:h-[42%]">
        <motion.div
          className="flex gap-4 will-change-transform transform-gpu"
          animate={{
            x: ["0%", "-50%"],
            transition: {
              ease: "linear",
              duration: 48,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative aspect-[3/4] h-44 w-[11rem] shrink-0 md:h-56 md:w-[14rem]"
              style={{
                rotate: `${index % 2 === 0 ? -2 : 5}deg`,
              }}
            >
              <Image
                src={src}
                alt={`NEOCAR фото ${index + 1}`}
                fill
                className="rounded-2xl object-cover shadow-md"
                sizes="(max-width: 768px) 176px, 224px"
                loading={index < 3 ? "eager" : "lazy"}
                priority={index < 3}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
