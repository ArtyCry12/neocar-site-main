"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to `window.matchMedia(query)` with correct SSR snapshot.
 * Use the same breakpoints as Tailwind (`lg` = 1024px).
 */
export function useMatchMedia(
  query: string,
  getServerSnapshot: () => boolean,
): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => (typeof window === "undefined" ? getServerSnapshot() : window.matchMedia(query).matches),
    getServerSnapshot,
  );
}

/** `max-lg` — mobile / narrow layout (matches HeroSection `isMobile`). */
export function useIsMobileLayout(): boolean {
  return useMatchMedia("(max-width: 1023px)", () => false);
}

/** `lg:` — desktop layout (matches Tailwind `lg`). */
export function useIsDesktopLayout(): boolean {
  return useMatchMedia("(min-width: 1024px)", () => true);
}
