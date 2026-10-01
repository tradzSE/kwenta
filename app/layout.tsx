import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#145c3b",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kwenta.ranierteraldico.me"),
  title: { default: "Kwenta — Free GWA Calculator for Filipino Students", template: "%s | Kwenta" },
  description: "Kwenta is a free GWA calculator for Filipino students. Calculate your GWA using verified Philippine university grading presets or a custom weighted-average calculator.",
  keywords: ["GWA calculator", "GWA calculator Philippines", "grade weighted average", "UP GWA calculator", "PUP GWA calculator", "college grades Philippines", "Kwenta"],
  authors: [{ name: "Ranier Teraldico" }],
  creator: "Ranier Teraldico",
  applicationName: "Kwenta",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Kwenta — Free GWA Calculator for Filipino Students",
    description: "Free GWA calculator for Filipino students. University-specific weighted grade calculators with transparent formulas and policy sources.",
    url: "/",
    siteName: "Kwenta",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kwenta — GWA made simple" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kwenta — Free GWA Calculator for Filipino Students",
    description: "Free GWA calculator for Filipino students. University-specific weighted grade calculators with transparent formulas and policy sources.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${geistMono.variable}`}><body><SiteHeader /><main id="main-content">{children}</main><footer className="site-footer"><span>Built by Ranier Teraldico</span><nav><a href="https://ranierteraldico.me">Portfolio</a><Link href="/privacy">Privacy</Link></nav></footer></body></html>;
}
