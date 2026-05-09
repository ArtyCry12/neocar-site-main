"use client";

import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AVATARS = [
  { initials: "AP", className: "bg-zinc-700" },
  { initials: "MS", className: "bg-zinc-600" },
  { initials: "ID", className: "bg-zinc-700" },
  { initials: "NK", className: "bg-zinc-600" },
];

export default function SocialProof() {
  const t = useTranslations("SocialProof");

  return (
    <div className="flex items-center rounded-full border border-white/10 bg-black/45 px-2 py-1.5 shadow-lg backdrop-blur-md">
      <div className="flex -space-x-2">
        {AVATARS.map((a, i) => (
          <Avatar key={i} className="h-7 w-7 ring-2 ring-black/60">
            <AvatarFallback
              delayMs={0}
              className={`text-[10px] font-semibold text-white ${a.className}`}
            >
              {a.initials}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <p className="px-3 text-[11px] leading-snug text-white/70">
        <span className="font-semibold text-white">{t("bold")}</span>{" "}
        {t("rest")}
      </p>
    </div>
  );
}
