import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const neust: UniversityConfig = {
  slug: "neust",
  shortName: "NEUST",
  name: "Nueva Ecija University of Science and Technology",
  calculatorName: "NEUST GWA Calculator",
  resultLabel: "GWA",
  description: "Estimate your NEUST general weighted average using its numerical grading scale.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "INC - Incomplete", value: "INC", behavior: "block" },
    { label: "DRP - Dropped", value: "DRP", behavior: "exclude" },
    { label: "UD - Unofficially Dropped", value: "UD", numericValue: 5, behavior: "include" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://neust.edu.ph/coed/",
  policyYear: "Current university policy",
  lastVerified: "October 2026",
  logoSrc: "/universities/neust.png",
  brandColors: { primary: "#003B7A", secondary: "#F4B223" },
};
