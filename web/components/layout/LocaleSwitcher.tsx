"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import { cn } from "@/lib/utils";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "flex rounded-full border border-white/15 bg-black/40 p-0.5 text-[11px] font-semibold backdrop-blur-md",
        pending && "opacity-70",
      )}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          className={cn(
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            locale === l
              ? "bg-white text-black"
              : "text-white/65 hover:text-white",
          )}
          onClick={() =>
            startTransition(() => {
              router.replace(pathname, { locale: l });
            })
          }
        >
          {l}
        </button>
      ))}
    </div>
  );
}
