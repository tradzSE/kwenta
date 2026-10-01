import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const psau: UniversityConfig = {
  slug: "psau",
  shortName: "PSAU",
  name: "Pampanga State Agricultural University",
  calculatorName: "PSAU GWA Calculator",
  resultLabel: "GWA",
  description: "Estimate your Pampanga State Agricultural University general weighted average.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "INC - Incomplete", value: "INC", behavior: "block" },
    { label: "DRP - Dropped", value: "DRP", behavior: "exclude" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://psau.edu.ph/",
  policyYear: "Current university policy",
  lastVerified: "October 2026",
  logoSrc: "/universities/psau.png",
  brandColors: { primary: "#176B35", secondary: "#E3B11F" },
};
