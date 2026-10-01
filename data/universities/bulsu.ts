import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const bulsu: UniversityConfig = {
  slug: "bulsu",
  shortName: "BulSU",
  name: "Bulacan State University",
  calculatorName: "BulSU GWA Calculator",
  resultLabel: "GWA",
  description: "Estimate your Bulacan State University general weighted average using its numerical grading scale.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "INC - Incomplete", value: "INC", behavior: "block" },
    { label: "DRP - Dropped", value: "DRP", behavior: "exclude" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://bulsu.edu.ph/",
  policyYear: "Current university policy",
  lastVerified: "October 2026",
  logoSrc: "/universities/bulsu.png",
  brandColors: { primary: "#7A1F24", secondary: "#B87333" },
};
