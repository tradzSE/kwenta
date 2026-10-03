import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import HomeSearch from "@/components/HomeSearch";
import UniversityMark from "@/components/UniversityMark";
import { universities } from "@/data/universities/registry";

export const metadata: Metadata = {
  title: "GWA Calculator Philippines — Free University Grade Calculator",
  description: "Calculate your General Weighted Average with Kwenta, a free GWA calculator for Philippine universities. Choose your school, enter grades and units, and get an instant private estimate.",
  keywords: ["GWA calculator", "GWA calculator Philippines", "General Weighted Average calculator", "calculate GWA", "university grade calculator Philippines"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "GWA Calculator Philippines — Free University Grade Calculator",
    description: "Choose your Philippine university, enter grades and units, and calculate your GWA instantly with Kwenta.",
    url: "/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kwenta GWA Calculator Philippines" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GWA Calculator Philippines — Kwenta",
    description: "Free university-specific GWA calculator for Filipino students.",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  const orbit = universities.filter((u) => u.slug !== "custom").slice(0, 10);
  const tilts = ["-8deg", "6deg", "-5deg", "7deg", "7deg", "-7deg", "-8deg", "6deg", "-6deg", "6deg"];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kwenta GWA Calculator Philippines",
    url: "https://kwenta.ranierteraldico.me/",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
    description: "A free university-specific General Weighted Average calculator for Filipino students.",
    featureList: ["University grading presets", "Weighted GWA calculation", "Academic standing estimates", "Saved semesters", "CSV export", "Private browser storage"],
  };

  return (
    <div className="kwenta-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="kwenta-hero" aria-label="Find your university calculator">
        <div className="kwenta-orbit" aria-hidden="true">
          <span className="kwenta-orbit-ring kwenta-orbit-ring-1" />
          <span className="kwenta-orbit-ring kwenta-orbit-ring-2" />
          <span className="kwenta-sparkle kwenta-sparkle-1">+</span>
          <span className="kwenta-sparkle kwenta-sparkle-2">+</span>
          <span className="kwenta-sparkle kwenta-sparkle-3">+</span>
          <span className="kwenta-sparkle kwenta-sparkle-4">+</span>
          <span className="kwenta-sparkle kwenta-sparkle-5">+</span>
        </div>
        <div className="kwenta-floaters" aria-label="Featured universities">
          {orbit.map((university, index) => (
            <Link className={`kwenta-floater kwenta-floater-${index + 1}`} href={`/${university.slug}`} key={university.slug} style={{ "--tilt": tilts[index % tilts.length] } as CSSProperties} aria-label={`Open ${university.name} calculator`} title={university.name}>
              <UniversityMark logoSrc={university.logoSrc} shortName={university.shortName} size={62} />
            </Link>
          ))}
        </div>
        <div className="kwenta-hero-content">
          <h1>Calculate your <em>GWA</em></h1>
          <p className="kwenta-sub">Find your university to use its grading scale and calculation settings. Fast, simple, and made for Filipino students.</p>
          <HomeSearch />
        </div>
      </section>
    </div>
  );
}
