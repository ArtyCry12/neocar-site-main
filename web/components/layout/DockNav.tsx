"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Building2,
  Forklift,
  Phone,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type DockItem = {
  id: string;
  labelKey: "about" | "catalog" | "services" | "contact";
  icon: LucideIcon;
};

const ITEMS: DockItem[] = [
  { id: "about", labelKey: "about", icon: Building2 },
  { id: "catalog", labelKey: "catalog", icon: Forklift },
  { id: "services", labelKey: "services", icon: Wrench },
  { id: "contact", labelKey: "contact", icon: Phone },
];

export default function DockNav() {
  const t = useTranslations("Dock");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="pointer-events-auto flex items-center gap-1 rounded-2xl border border-accent-burnt/20 bg-[#1A1A1A]/90 px-2 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
      >
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              type="button"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "relative rounded-xl px-3 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white",
              )}
              aria-label={t(item.labelKey)}
            >
              <Icon className="mx-auto h-5 w-5" />
              <span className="mt-1 block text-[10px] font-medium uppercase tracking-wide">
                {t(item.labelKey)}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
