import type { Metadata } from "next";
import InformationAccordion from "@/components/InformationAccordion";
import { IconCalculator, IconChevronDown, IconInfoCircle, IconShieldLock } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Information",
  description: "Learn how Kwenta calculates GWA estimates, why the project exists, and how your calculator data stays private.",
  keywords: ["GWA formula", "how to compute GWA Philippines", "Kwenta privacy", "about Kwenta"],
  alternates: { canonical: "/information" },
};

const faqs = [
  { question: "How is GWA computed in the Philippines?", answer: "Each numerical grade is multiplied by its course units. Those products are added together and divided by the total included units." },
  { question: "Which grades are included?", answer: "Only numerical grades with valid units are included. Dropped, withdrawn, or non-credit marks are excluded. Unresolved marks such as Incomplete prevent a final result until resolved." },
  { question: "Is this an official GWA?", answer: "No. Kwenta provides an estimate based on published grading policies. Always confirm the official result with your registrar or student records." },
  { question: "Where do the university presets come from?", answer: "Each verified preset cites an official source such as a student handbook or registrar page and includes the date the policy was checked." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

export default function InformationPage() {
  return (
    <article className="text-page information-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <header className="information-header">
        <h1>Information</h1>
        <p>Methodology, project notes, and privacy.</p>
      </header>

      <InformationAccordion>
        <details id="methodology" open>
          <summary><IconCalculator className="accordion-icon" size={22} stroke={1.7} aria-hidden="true" /><span><strong>Methodology</strong><small>Calculation and university presets</small></span><IconChevronDown className="accordion-chevron" size={19} stroke={1.7} aria-hidden="true" /></summary>
          <div className="accordion-content">
            <h2>Weighted-average formula</h2>
            <p>Each numerical grade is multiplied by its course units. Those products are added together and divided by the total included units.</p>
            <code>Σ (grade × units) ÷ Σ included units</code>
            <h2>University presets</h2>
            <p>Each preset defines accepted grades, excluded marks, blocking marks, rounding precision, and optional academic-standing indicators.</p>
            <h2>Frequently asked questions</h2>
            <div className="information-faqs">{faqs.map((faq) => <section key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></section>)}</div>
          </div>
        </details>

        <details id="about">
          <summary><IconInfoCircle className="accordion-icon" size={22} stroke={1.7} aria-hidden="true" /><span><strong>About Kwenta</strong><small>Purpose and authorship</small></span><IconChevronDown className="accordion-chevron" size={19} stroke={1.7} aria-hidden="true" /></summary>
          <div className="accordion-content">
            <h2>A clearer grade calculator for students</h2>
            <p>Kwenta is an independent student tool built by software engineer Ranier Teraldico. It turns university grading policies into transparent, mobile-friendly calculators.</p>
            <p>The project is not affiliated with Central Luzon State University or any other listed institution.</p>
          </div>
        </details>

        <details id="privacy">
          <summary><IconShieldLock className="accordion-icon" size={22} stroke={1.7} aria-hidden="true" /><span><strong>Privacy</strong><small>What stays on your device</small></span><IconChevronDown className="accordion-chevron" size={19} stroke={1.7} aria-hidden="true" /></summary>
          <div className="accordion-content">
            <h2>Your grades stay on your device</h2>
            <p>Kwenta does not require an account and does not send subject names, grades, or units to a server. Saved calculator data uses your browser&apos;s local storage.</p>
            <p>You can remove saved information at any time by using Reset or clearing site data in your browser.</p>
          </div>
        </details>
      </InformationAccordion>
    </article>
  );
}
