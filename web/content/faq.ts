import type { TriLocale } from "./types";

export type FaqItemRow = TriLocale<{ question: string; answer: string }>;

export const faqItems = [
  {
    ru: {
      question: "Как быстро можно получить технику в аренду?",
      answer:
        "Срок зависит от модели и подготовки — типичные заявки закрываем за 1–3 рабочих дня после согласования условий.",
    },
    ro: {
      question: "Cât de rapid pot obține utilaj în chirie?",
      answer:
        "Termenul depinde de model și pregătire — solicitările tipice le rezolvăm în 1–3 zile lucrătoare după acord.",
    },
    en: {
      question: "How quickly can we get rental equipment?",
      answer:
        "Timing depends on model and readiness — typical requests are fulfilled within 1–3 business days after agreement.",
    },
  },
  {
    ru: {
      question: "Есть ли у вас запчасти и РВД с собственного склада?",
      answer:
        "Да — склад и производство РВД в Кишинёве; помогаем минимизировать простой парка.",
    },
    ro: {
      question: "Aveți piese și furtunuri HID din stoc propriu?",
      answer:
        "Da — depozit și producție HID în Chișinău; reducem downtime-ul parcului.",
    },
    en: {
      question: "Do you stock parts and hydraulic hoses?",
      answer:
        "Yes — warehouse and hose fabrication in Chișinău to reduce fleet downtime.",
    },
  },
  {
    ru: {
      question: "Какие бренды вы сервируете?",
      answer:
        "Toyota, Mitsubishi, Komatsu и другие линейки из каталога — диагностика и ремонт по регламентам производителя где это применимо.",
    },
    ro: {
      question: "Ce branduri deserviți?",
      answer:
        "Toyota, Mitsubishi, Komatsu și altele din catalog — diagnostic și reparații conform procedurilor acolo unde se aplică.",
    },
    en: {
      question: "Which brands do you service?",
      answer:
        "Toyota, Mitsubishi, Komatsu and others from our catalog — diagnostics and repairs aligned with OEM guidance where applicable.",
    },
  },
] as FaqItemRow[];
