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

export type Stage = {
  id: HeroStageId;
  copyKey: keyof Messages["HeroStages"];
  model: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    lookAt: [number, number, number];
  };
  orbit: {
    items: Array<ImageOrbitItem | IconOrbitItem>;
  };
  background: string;
};

export const heroStages = [
  {
    id: "intro",
    copyKey: "intro",
    model: {
      position: [0, -0.35, 0],
      rotation: [0.08, 0.65, 0],
      scale: 1,
      lookAt: [0, 0.35, 0],
    },
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
      "linear-gradient(135deg, rgb(9 9 11 / 0.92), rgb(24 24 27 / 0.55), rgb(127 29 29 / 0.35))",
  },
  {
    id: "catalog",
    copyKey: "catalog",
    model: {
      position: [0.15, -0.42, 0.12],
      rotation: [0.12, -0.55, 0.02],
      scale: 1.06,
      lookAt: [0, 0.25, 0],
    },
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
      "linear-gradient(145deg, rgb(9 9 11 / 0.94), rgb(39 39 42 / 0.45), rgb(185 28 28 / 0.28))",
  },
  {
    id: "service",
    copyKey: "service",
    model: {
      position: [-0.12, -0.38, -0.08],
      rotation: [0.05, 1.15, -0.03],
      scale: 1.03,
      lookAt: [0, 0.32, 0],
    },
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
      "linear-gradient(155deg, rgb(9 9 11 / 0.93), rgb(24 24 27 / 0.6), rgb(234 88 12 / 0.22))",
  },
  {
    id: "cta",
    copyKey: "cta",
    model: {
      position: [0, -0.4, 0],
      rotation: [0.06, 2.35, 0],
      scale: 1.08,
      lookAt: [0, 0.38, 0],
    },
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
      ],
    },
    background:
      "linear-gradient(160deg, rgb(9 9 11 / 0.95), rgb(59 7 100 / 0.38), rgb(220 38 38 / 0.25))",
  },
] as const satisfies readonly Stage[];
