import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Calculation Methodology",
  description: "Learn how weighted GPA and GWA estimates are calculated, how university presets are verified, and what the limits of an estimate are.",
  keywords: ["GWA formula", "how to compute GWA Philippines", "weighted average grades", "GWA vs GPA"],
  alternates: { canonical: "/methodology" },
};
const faqs = [
  { question: "How is GWA computed in the Philippines?", answer: "Each numerical grade is multiplied by its course units. Those products are added together and divided by the total included units: Σ (grade × units) ÷ Σ included units." },
  { question: "Which grades are included in the GWA?", answer: "Only numerical grades with valid units are included. Dropped, withdrawn, or non-credit marks are excluded, while unresolved marks such as Incomplete prevent a final result until resolved." },
  { question: "Is this an official GWA?", answer: "No. Kwenta is an estimate based on published grading policies. Registrars may apply additional curriculum, residency, repetition, or academic-honor rules, so always confirm with your official records." },
  { question: "Where do the university presets come from?", answer: "Each preset is verified against an official source such as a student handbook or registrar page. Every calculator page lists its source and the date it was last checked." },
];
const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
export default function MethodologyPage() {
  return (
    <article className="text-page prose-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <p className="kicker">Methodology</p>
      <h1>Simple math, documented rules.</h1>
      <h2>Weighted-average formula</h2>
      <p>Each numerical grade is multiplied by its course units. Those products are added together and divided by the total included units.</p>
      <pre>Σ (grade × units) ÷ Σ included units</pre>
      <h2>University presets</h2>
      <p>Each preset defines accepted grades, excluded marks, blocking marks, rounding precision, and optional academic-standing indicators. Every verified preset includes its source and policy year.</p>
      <h2>Frequently asked questions</h2>
      {faqs.map((faq) => (<div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>))}
      <h2>Limitations</h2>
      <p>The result is an estimate. Registrars may apply additional curriculum, residency, repetition, or academic-honor policies that are outside the calculator.</p>
    </article>
  );
}
