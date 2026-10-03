import type { Metadata } from "next";
import UniversityDirectory from "@/components/UniversityDirectory";
import { universities } from "@/data/universities/registry";

export const metadata: Metadata = {
  title: "Supported Universities",
  description: "Browse GWA calculator presets for Philippine universities, including UP, PUP, UST, DLSU, CLSU, NEUST, BulSU, ASCOT, and more.",
  keywords: ["supported universities", "NEUST GWA calculator", "BulSU GWA calculator", "ASCOT GWA calculator", "PSAU GWA calculator", "DHVSU GWA calculator", "UP GWA calculator", "PUP GWA calculator", "CLSU GWA calculator"],
  alternates: { canonical: "/universities" },
};

export default function UniversitiesPage() {
  const supported = [...universities]
    .sort((first, second) => first.name.localeCompare(second.name));

  return (
    <section className="text-page universities-page">
      <header className="directory-header"><div><h1>Choose your university</h1><p>Select a school to open its calculator.</p></div><span>{supported.length - 1} supported</span></header>
      <UniversityDirectory universities={supported.map(({ slug, name, shortName, logoSrc }) => ({ slug, name, shortName, logoSrc }))} />
    </section>
  );
}
