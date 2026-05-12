import type { Messages } from "@/messages/types";

export type HeroStageId = "intro" | "catalog" | "service" | "cta";

export type LucideOrbitIcon =
  | "Warehouse"
  | "Truck"
  | "Forklift"
  | "Wrench"
  | "Package"
  | "ShieldCheck"
  | "Phone";

type ImageOrbitItem = {
  kind: "image";
  image: string;
  altKey: keyof Messages["HeroOrbit"];
  angleStart: number;
  radius: number;
  size: number;
};

type IconOrbitItem = {
  kind: "icon";
  icon: LucideOrbitIcon;
  angleStart: number;
  radius: number;
  size: number;
};

export type OrbitItem = ImageOrbitItem | IconOrbitItem;

export type Stage = {
  id: HeroStageId;
  copyKey: keyof Messages["HeroStages"];
  orbit: {
    items: OrbitItem[];
  };
  background: string;
};

function doubleOrbitItems(items: readonly OrbitItem[]): OrbitItem[] {
  const next: OrbitItem[] = [...items];
  for (const it of items) {
    next.push({
      ...it,
      angleStart: it.angleStart + Math.PI,
      radius: it.radius * 1.05,
    });
  }
  return next;
}

const stageBases = [
  {
    id: "intro",
    copyKey: "intro",
    orbit: {
      items: [
        {
          kind: "image",
          image: "/media/hero/marquee-1.jpg",
          altKey: "marquee1",
          angleStart: 0.05,
          radius: 3.35,
          size: 56,
        },
        {
          kind: "image",
          image: "/media/hero/marquee-2.jpg",
          altKey: "marquee2",
          angleStart: 2.1,
          radius: 3.55,
          size: 52,
        },
        {
          kind: "icon",
          icon: "Warehouse",
          angleStart: 4.2,
          radius: 3.15,
          size: 46,
        },
        {
          kind: "icon",
          icon: "Truck",
          angleStart: 5.4,
          radius: 3.45,
          size: 44,
        },
      ],
    },
    background:
      "linear-gradient(135deg, rgb(10 10 12 / 0.92), rgb(26 26 26 / 0.75), rgba(255, 141, 33, 0.20))",
  },
  {
    id: "catalog",
    copyKey: "catalog",
    orbit: {
      items: [
        {
          kind: "image",
          image: "/media/hero/marquee-3.jpg",
          altKey: "marquee3",
          angleStart: 0.4,
          radius: 3.5,
          size: 54,
        },
        {
          kind: "image",
          image: "/media/hero/marquee-4.jpg",
          altKey: "marquee4",
          angleStart: 2.35,
          radius: 3.25,
          size: 50,
        },
        {
          kind: "icon",
          icon: "Forklift",
          angleStart: 3.9,
          radius: 3.4,
          size: 48,
        },
        {
          kind: "icon",
          icon: "Package",
          angleStart: 5.1,
          radius: 3.2,
          size: 42,
        },
      ],
    },
    background:
      "linear-gradient(145deg, rgb(10 10 12 / 0.94), rgb(32 32 34 / 0.8), rgba(255, 141, 33, 0.18))",
  },
  {
    id: "service",
    copyKey: "service",
    orbit: {
      items: [
        {
          kind: "image",
          image: "/media/hero/marquee-5.jpg",
          altKey: "marquee5",
          angleStart: 0.25,
          radius: 3.3,
          size: 53,
        },
        {
          kind: "image",
          image: "/media/hero/marquee-1.jpg",
          altKey: "marquee1",
          angleStart: 2.05,
          radius: 3.6,
          size: 48,
        },
        {
          kind: "icon",
          icon: "Wrench",
          angleStart: 3.8,
          radius: 3.28,
          size: 46,
        },
        {
          kind: "icon",
          icon: "ShieldCheck",
          angleStart: 5,
          radius: 3.42,
          size: 44,
        },
      ],
    },
    background:
      "linear-gradient(155deg, rgb(10 10 12 / 0.93), rgb(26 26 26 / 0.78), rgba(255, 166, 82, 0.16))",
  },
  {
    id: "cta",
    copyKey: "cta",
    orbit: {
      items: [
        {
          kind: "image",
          image: "/media/hero/marquee-2.jpg",
          altKey: "marquee2",
          angleStart: 0.55,
          radius: 3.38,
          size: 52,
        },
        {
          kind: "image",
          image: "/media/hero/marquee-4.jpg",
          altKey: "marquee4",
          angleStart: 2.55,
          radius: 3.48,
          size: 50,
        },
        {
          kind: "icon",
          icon: "Phone",
          angleStart: 4.35,
          radius: 3.22,
          size: 46,
        },
        {
          kind: "icon",
          icon: "Forklift",
          angleStart: 5.55,
          radius: 3.3,
          size: 44,
        },
      ],
    },
    background:
      "linear-gradient(160deg, rgb(10 10 12 / 0.95), rgb(64 64 64 / 0.35), rgba(255, 123, 0, 0.22))",
  },
] as const;

export const heroStages: Stage[] = stageBases.map((s) => ({
  id: s.id,
  copyKey: s.copyKey,
  background: s.background,
  orbit: { items: doubleOrbitItems(s.orbit.items) },
}));
