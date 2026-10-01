import type { Metadata } from "next";
import Link from "next/link";
import SchoolSelector from "@/components/SchoolSelector";
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

const faqs = [
  {
    question: "How do I calculate my GWA?",
    answer: "Multiply each subject grade by its number of units, add all weighted grade points, then divide by the total included units. Kwenta performs this calculation automatically.",
  },
  {
    question: "What is the GWA formula?",
    answer: "GWA equals the sum of each grade multiplied by its units, divided by the sum of all included units: Σ(grade × units) ÷ Σ units.",
  },
  {
    question: "Does every Philippine university calculate GWA the same way?",
    answer: "The weighted-average formula is common, but grade scales, excluded subjects, incomplete marks, rounding, and academic-standing rules differ by university. Kwenta provides separate presets based on published school policies.",
  },
  {
    question: "Are my grades uploaded or stored online?",
    answer: "No. Kwenta calculates and saves entries in your browser. Your grades are not sent to a server or shared with the university.",
  },
];

export default function Home() {
  const supportedUniversities = universities.filter((university) => university.slug !== "custom");
  const structuredData = [
    {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    },
  ];

  return <div className="home-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <section className="home-intro">
      <h1>GWA Calculator Philippines</h1>
      <p>Calculate your General Weighted Average for free. Choose your university, enter your grades and units, and get an instant GWA, GPA, or QPI estimate based on your school&apos;s grading preset.</p>
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

    <section className="seo-section" aria-labelledby="how-gwa-works">
      <p className="kicker">General Weighted Average</p>
      <h2 id="how-gwa-works">How to calculate your GWA</h2>
      <p>Your GWA gives subjects with more units a greater effect on your final average. Gather the final grade and units for every included subject, then follow these steps:</p>
      <ol className="calculation-steps">
        <li><strong>Choose your university.</strong><span>Kwenta loads its grade scale, included marks, rounding, and available academic-standing rules.</span></li>
        <li><strong>Enter grades and units.</strong><span>Add each subject and select the grade shown on your record.</span></li>
        <li><strong>Review your estimate.</strong><span>Your weighted result updates immediately and remains saved only on your device.</span></li>
      </ol>
      <div className="formula-block"><span>GWA formula</span><strong>Σ (grade × units) ÷ Σ units</strong></div>
      <p className="methodology-link">Need the full explanation? <Link href="/methodology">Read the calculation methodology</Link>.</p>
    </section>

    <section className="seo-section" aria-labelledby="university-calculators-title">
      <h2 id="university-calculators-title">GWA calculators by university</h2>
      <p>University rules are not always interchangeable. Open your school&apos;s calculator to use its supported grade options and see the source used for the preset.</p>
      <ul className="seo-university-links">
        {supportedUniversities.map((university) => <li key={university.slug}><Link href={`/${university.slug}`}>{university.name} <span>{university.shortName}</span></Link></li>)}
      </ul>
    </section>

    <section className="seo-section faq-section" aria-labelledby="gwa-faq-title">
      <h2 id="gwa-faq-title">GWA calculator questions</h2>
      {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
    </section>
  </div>;
}
