import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const batstateu: UniversityConfig = {
  slug: "batstateu",
  shortName: "BatStateU",
  name: "Batangas State University",
  calculatorName: "BatStateU GWA Calculator",
  resultLabel: "GWA",
  description: "Estimate your Batangas State University weighted average using its official numerical grading scale.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "INC - Incomplete", value: "INC", behavior: "block" },
    { label: "DRP - Dropped", value: "DRP", behavior: "exclude" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://www.batstate-u.edu.ph/sites/files/osas/New-Student-Handbook-AY-2017-2018.pdf",
  policyYear: "AY 2017-2018 Student Handbook",
  lastVerified: "October 2026",
  logoSrc: "/universities/batstateu.webp",
  brandColors: { primary: "#A71930", secondary: "#F2B134" },
};
