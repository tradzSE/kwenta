import type { Metadata } from "next";
import Link from "next/link";
import SchoolSelector from "@/components/SchoolSelector";
import UniversityMark from "@/components/UniversityMark";
import { universities } from "@/data/universities/registry";

export const metadata: Metadata = { title: "Page not found" };

const popularSlugs = ["up", "pup", "ust", "dlsu", "clsu", "batstateu"];
const popular = popularSlugs
  .map((slug) => universities.find((university) => university.slug === slug))
  .filter((university) => university !== undefined);

export default function NotFound() {
  return (
    <div className="not-found-page">
      <section className="not-found-hero">
        <p className="kicker">404 — Page not found</p>
        <h1>That calculator doesn&apos;t exist.</h1>
        <p>
          The page you&apos;re looking for isn&apos;t here — maybe a typo in the school name.
          Search below or jump straight to a popular calculator.
        </p>
        <SchoolSelector />
      </section>

      <section className="not-found-popular" aria-labelledby="not-found-popular-title">
        <h2 id="not-found-popular-title">Popular calculators</h2>
        <ul>
          {popular.map((university) => (
            <li key={university.slug}>
              <Link href={`/${university.slug}`}>
                <UniversityMark logoSrc={university.logoSrc} shortName={university.shortName} size={40} />
                <span>
                  <strong>{university.shortName}</strong>
                  <small>{university.name}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="not-found-actions" aria-label="Other options">
        <Link className="not-found-button primary" href="/">Back to home</Link>
        <Link className="not-found-button" href="/universities">Browse all universities</Link>
        <Link className="not-found-button" href="/custom">Open custom calculator</Link>
      </section>
    </div>
  );
}

