import type { MetadataRoute } from "next";

import ru from "@/messages/ru";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NEOCAR SRL",
    short_name: "NEOCAR",
    description: ru.Meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/media/neocar-logo.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/media/neocar-logo-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
