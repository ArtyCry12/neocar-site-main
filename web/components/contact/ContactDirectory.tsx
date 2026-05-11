"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  Building2,
  Calculator,
  Mail,
  Phone,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { contactGroups, type ContactGroup } from "@/content/contacts";
import { pickLocale } from "@/content/types";

const GROUP_ICONS: Record<ContactGroup["iconKey"], LucideIcon> = {
  Building2,
  Wrench,
  Calculator,
};

export default function ContactDirectory() {
  const t = useTranslations("Contact");
  const locale = useLocale();

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
      <div>
        <h3 className="text-lg font-semibold text-white">{t("directoryTitle")}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/75">{t("aboutLead")}</p>
        <p className="mt-4 text-sm text-white/80">{t("address")}</p>
      </div>

      <div className="space-y-8">
        {contactGroups.map((group) => {
          const Icon = GROUP_ICONS[group.iconKey];
          return (
            <div key={group.id} className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/45">
                <Icon className="h-4 w-4 text-accent-amber/90" aria-hidden />
                <span>{t(group.titleKey)}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {group.members.map((row, idx) => {
                  const person = pickLocale(locale, row);
                  const telHref = `tel:${person.phone.replace(/\s+/g, "")}`;
                  return (
                    <div
                      key={`${group.id}-${idx}-${person.phone}`}
                      className="rounded-2xl border border-white/10 bg-black/35 p-4"
                    >
                      <div className="text-base font-semibold text-white">{person.name}</div>
                      <div className="mt-1 text-sm text-white/60">{person.role}</div>
                      <div className="mt-3 space-y-2 text-sm text-white/75">
                        <a
                          className="flex items-center gap-2 hover:text-white"
                          href={telHref}
                        >
                          <Phone className="h-4 w-4 shrink-0 text-white/50" aria-hidden />
                          <span>{person.phone}</span>
                        </a>
                        {person.email ? (
                          <a
                            className="flex items-center gap-2 hover:text-white"
                            href={`mailto:${person.email}`}
                          >
                            <Mail className="h-4 w-4 shrink-0 text-white/50" aria-hidden />
                            <span>{person.email}</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
