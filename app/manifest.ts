import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kwenta — GWA Calculator Philippines",
    short_name: "Kwenta",
    description: "Calculate your GWA using Philippine university grading presets or a custom weighted average.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5ed",
    theme_color: "#145c3b",
    icons: [
      {
        src: "/icon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
