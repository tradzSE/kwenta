import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    const legacyLogos = [
      ["ateneo.webp", "ateneo.png"],
      ["batstateu.webp", "batstateu.png"],
      ["clsu-optimized.webp", "clsu.png"],
      ["dlsu-optimized.webp", "dlsu.png"],
      ["feu.webp", "feu.png"],
      ["mapua.svg", "mapua-clean.png"],
      ["mapua.png", "mapua-clean.png"],
      ["msu.webp", "msu.png"],
      ["nu.svg", "nu-clean.png"],
      ["nu.png", "nu-clean.png"],
      ["plm-optimized.webp", "plm.png"],
      ["pup-optimized.webp", "pup.png"],
      ["tip-optimized.webp", "tip.png"],
      ["tsu.webp", "tsu.png"],
      ["ue-optimized.webp", "ue.png"],
      ["up-optimized.webp", "up.png"],
      ["usep.webp", "usep.png"],
      ["ust-optimized.webp", "ust.png"],
    ];

    return [
      ...legacyLogos.map(([source, destination]) => ({
      source: `/universities/${source}`,
      destination: `/universities/${destination}`,
      permanent: true,
      })),
      { source: "/methodology", destination: "/information#methodology", permanent: true },
      { source: "/about", destination: "/information#about", permanent: true },
      { source: "/privacy", destination: "/information#privacy", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
      {
        source: "/universities/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(web-logo.png|icon.ico|favicon.ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/og-image.jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
