import Link from "next/link";
import SchoolSelector from "@/components/SchoolSelector";
import UniversityMark from "@/components/UniversityMark";
import { universities } from "@/data/universities/registry";

export default function Home() {
  const supportedUniversities = universities.filter((university) => university.slug !== "custom");

  return <div className="home-page">
    <section className="home-intro">
      <h1>GWA made simple.</h1>
      <p>Free GWA calculator for Filipino students, choose your university, enter your grades and units, and get your estimated weighted average.</p>
      <SchoolSelector />
      <p className="privacy-note">No sign-up. Your entries stay in this browser only.</p>
    </section>

    <section className="supported-universities" aria-labelledby="supported-universities-title">
      <h2 id="supported-universities-title">Supported Universities</h2>
      <div className="logo-marquee">
        <div className="logo-track">
          <div className="logo-track-group">
            {supportedUniversities.map((university) => <Link href={`/${university.slug}`} key={university.slug} aria-label={`Open ${university.name} calculator`} data-university={university.name}><UniversityMark logoSrc={university.logoSrc} shortName={university.shortName} /></Link>)}
          </div>
          <div className="logo-track-group logo-track-copy" aria-hidden="true">
            {supportedUniversities.map((university) => <span key={university.slug} data-university={university.name}><UniversityMark logoSrc={university.logoSrc} shortName={university.shortName} /></span>)}
          </div>
        </div>
      </div>
      <div className="custom-calculator-callout">
        <span><strong>University not listed?</strong><small>Use your own grading scale.</small></span>
        <Link className="custom-calculator-link" href="/custom">Open custom calculator</Link>
      </div>
    </section>
  </div>;
}
