import type { Metadata } from "next";
import Link from "next/link";
import UniversityMark from "@/components/UniversityMark";
import { universities } from "@/data/universities/registry";

export const metadata: Metadata = {
  title: "Supported Universities",
  description: "Browse all supported university GWA calculator presets — UP, PUP, UST, DLSU, CLSU, BatStateU and more. Every preset is verified against an official grading policy.",
  keywords: ["supported universities", "UP GWA calculator", "PUP GWA calculator", "UST GWA calculator", "DLSU GWA calculator", "CLSU GWA calculator"],
  alternates: { canonical: "/universities" },
};

export default function UniversitiesPage() {
  const supported = universities.filter((university) => university.slug !== "custom");
  return (
    <section className="text-page universities-page">
      <p className="kicker">Directory · {supported.length} supported</p>
      <h1>Supported calculators</h1>
      <p>Every preset below is verified against an official grading policy. Can&apos;t find yours? <Link href="/custom">Use the custom calculator</Link>.</p>
      <ul className="universities-grid">
        {supported.map((university) => (
          <li key={university.slug}>
            <Link href={`/${university.slug}`}>
              <UniversityMark logoSrc={university.logoSrc} shortName={university.shortName} size={44} />
              <span>
                <strong>{university.shortName}</strong>
                <small>{university.name}</small>
              </span>
              <b aria-hidden="true">→</b>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
