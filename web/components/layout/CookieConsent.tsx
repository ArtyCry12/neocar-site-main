"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "neocar:consent";

export default function CookieConsent() {
  const t = useTranslations("CookieConsent");
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);

  const persistDecision = useCallback((value: "accepted" | "rejected") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }, []);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!visible) return;
    acceptRef.current?.focus();

    const el = panelRef.current;
    if (!el) return;

    const focusables =
      el.querySelectorAll<HTMLElement>("button, [href], textarea, select");

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        persistDecision("rejected");
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !el.contains(active)) return;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible, persistDecision]);

  if (!visible) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-label={t("title")}
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-white/10 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-lg md:p-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-white">{t("title")}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {t("description")}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3 md:justify-end">
          <button
            ref={acceptRef}
            type="button"
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-white/90"
            onClick={() => persistDecision("accepted")}
          >
            {t("accept")}
          </button>
          <button
            type="button"
            className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            onClick={() => persistDecision("rejected")}
          >
            {t("reject")}
          </button>
        </div>
      </div>
    </div>
  );
}
