import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Calculator from "@/components/Calculator";
import { universities, universityRegistry } from "@/data/universities/registry";

export function generateStaticParams() { return universities.map(({ slug }) => ({ university: slug })); }

export async function generateMetadata({ params }: { params: Promise<{ university: string }> }): Promise<Metadata> {
  const { university: slug } = await params;
  const university = universityRegistry[slug];
  if (!university) return {};
  const keywords = [`${university.shortName} GWA calculator`, `${university.name} grades`, "GWA calculator Philippines", "compute GWA", university.calculatorName];
  return { title: university.calculatorName, description: university.description, keywords, alternates: { canonical: `/${slug}` }, openGraph: { title: university.calculatorName, description: university.description, url: `/${slug}`, images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `Kwenta — ${university.calculatorName}` }] }, twitter: { card: "summary_large_image", title: university.calculatorName, description: university.description, images: ["/og-image.jpg"] } };
}

export default async function UniversityPage({ params }: { params: Promise<{ university: string }> }) {
  const { university: slug } = await params;
  const university = universityRegistry[slug];
  if (!university) notFound();
  const structuredData = { "@context": "https://schema.org", "@type": "WebApplication", name: `Kwenta — ${university.calculatorName}`, url: `https://kwenta.ranierteraldico.me/${slug}`, applicationCategory: "EducationalApplication", operatingSystem: "Any", description: university.description };
  const theme = university.brandColors ? {
    "--green": university.brandColors.primary,
    "--green-2": university.brandColors.secondary,
  } as CSSProperties : undefined;

  return <div className={`university-page university-${university.slug}`} style={theme}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <section className="calculator-hero">
      {university.logoSrc && <Image className="calculator-hero-mark" src={university.logoSrc} alt="" width={280} height={280} priority aria-hidden="true" />}
      <h1>{university.calculatorName}</h1>
      <p>{university.description}</p>
      {(university.policyYear || university.lastVerified) && (
        <p className="verification-line">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2.5 7.5l3.5 3.5 5.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>
            {university.sourceUrl && university.policyYear ? (
              <>Source: <a href={university.sourceUrl} target="_blank" rel="noreferrer">{university.policyYear}</a></>
            ) : (
              <>Source: {university.policyYear ?? "official policy"}</>
            )}
            {university.lastVerified ? ` · checked ${university.lastVerified}` : ""}
          </span>
        </p>
      )}
    </section>
    <Calculator university={university} />
    <section className="policy-section"><p>This calculator is an estimate, not an official university record. Numerical grades with valid units are included; unresolved grades can prevent a final result.</p>{university.sourceUrl && <a href={university.sourceUrl} target="_blank" rel="noreferrer">View official policy</a>}</section>
  </div>;
}
