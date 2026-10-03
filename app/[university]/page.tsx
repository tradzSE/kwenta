import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconBook2 } from "@tabler/icons-react";
import Calculator from "@/components/Calculator";
import { universities, universityRegistry } from "@/data/universities/registry";

export function generateStaticParams() { return universities.map(({ slug }) => ({ university: slug })); }

export async function generateMetadata({ params }: { params: Promise<{ university: string }> }): Promise<Metadata> {
  const { university: slug } = await params;
  const university = universityRegistry[slug];
  if (!university) return {};
  const keywords = [`${university.shortName} GWA calculator`, `${university.name} grades`, "GWA calculator Philippines", "compute GWA", university.calculatorName];
  const socialImage = `/${slug}/opengraph-image`;
  const socialImageAlt = `${university.name} ${university.resultLabel} calculator on Kwenta`;

  return {
    title: university.calculatorName,
    description: university.description,
    keywords,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: university.calculatorName,
      description: university.description,
      url: `/${slug}`,
      images: [{ url: socialImage, width: 1200, height: 630, alt: socialImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: university.calculatorName,
      description: university.description,
      images: [{ url: socialImage, alt: socialImageAlt }],
    },
  };
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
      <Link className="calculator-back" href="/universities"><IconArrowLeft size={18} stroke={1.8} />Change university</Link>
      <div className={`calculator-identity${university.logoSrc ? "" : " calculator-identity-no-logo"}`}>
        {university.logoSrc && <span className="calculator-logo"><Image src={university.logoSrc} alt={`${university.name} logo`} width={92} height={92} priority /></span>}
        <div><h1>{university.calculatorName}</h1><p>{university.description}</p></div>
      </div>
      {(university.policyYear || university.lastVerified) && (
        <p className="verification-line">
          <IconBook2 size={18} stroke={1.7} aria-hidden="true" />
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
