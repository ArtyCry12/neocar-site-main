"use client";

import { startTransition, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

const STORAGE_KEY = "neocar:announcement-dismissed";

export default function AnnouncementBanner() {
  const t = useTranslations("Announcement");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    startTransition(() => {
      try {
        const dismissed = window.localStorage.getItem(STORAGE_KEY);
        if (dismissed == null) {
          setVisible(true);
        }
      } catch {
        setVisible(true);
      }
    });
  }, []);

  if (!visible) return null;

  return (
    <div className="border-b border-white/10 bg-accent-burnt/95 px-4 py-2 text-center text-xs text-white md:text-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-3">
        <p className="flex-1">{t("text")}</p>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide hover:bg-white/25"
          onClick={() => {
            try {
              window.localStorage.setItem(STORAGE_KEY, "1");
            } catch {
              /* ignore */
            }
            setVisible(false);
          }}
          aria-label={t("close")}
        >
          <X className="h-3.5 w-3.5" />
          {t("close")}
        </button>
      </div>
    </div>
  );
}
