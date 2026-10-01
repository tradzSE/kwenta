import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const tsu: UniversityConfig = {
  slug: "tsu",
  shortName: "TSU",
  name: "Tarlac State University",
  calculatorName: "TSU GWA Calculator",
  resultLabel: "GWA",
  description: "Estimate your Tarlac State University weighted average using the 2024 Student Manual grading system.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "4.00 - Conditional Failure", value: "4", behavior: "block" },
    { label: "INC - Incomplete", value: "INC", behavior: "block" },
    { label: "DRP - Dropped", value: "DRP", behavior: "exclude" },
    { label: "UD - Unofficially Dropped", value: "UD", numericValue: 5, behavior: "include" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://tsu.edu.ph/media/nbjlvnvm/student-manual-2024-edition.pdf",
  policyYear: "2024 Student Manual",
  lastVerified: "October 2026",
  logoSrc: "/universities/tsu.webp",
  brandColors: { primary: "#8A1538", secondary: "#F2C300" },
};
