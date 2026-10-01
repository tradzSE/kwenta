import type { Metadata } from "next";
import Link from "next/link";
import UniversityMark from "@/components/UniversityMark";
import { universities } from "@/data/universities/registry";

export const metadata: Metadata = {
  title: "Supported Universities",
  description: "Browse GWA calculator presets for Philippine universities, including UP, PUP, UST, DLSU, CLSU, NEUST, BulSU, ASCOT, and more.",
  keywords: ["supported universities", "NEUST GWA calculator", "BulSU GWA calculator", "ASCOT GWA calculator", "PSAU GWA calculator", "DHVSU GWA calculator", "UP GWA calculator", "PUP GWA calculator", "CLSU GWA calculator"],
  alternates: { canonical: "/universities" },
};

export default function UniversitiesPage() {
  const supported = universities
    .filter((university) => university.slug !== "custom")
    .sort((first, second) => first.name.localeCompare(second.name));
  return (
    <section className="text-page universities-page">
      <p className="kicker">Directory · {supported.length} supported</p>
      <h1>Supported calculators</h1>
      <p>Choose your university to use its available grade options and calculation settings. Can&apos;t find yours? <Link href="/custom">Use the custom calculator</Link>.</p>
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
