import type { MetadataRoute } from "next";
import { universities } from "@/data/universities/registry";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://kwenta.ranierteraldico.me"; return ["", "/universities", "/information", ...universities.map(({ slug }) => `/${slug}`)].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path ? "monthly" : "weekly", priority: path ? 0.8 : 1 })); }
