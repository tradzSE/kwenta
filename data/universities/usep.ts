import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const usep: UniversityConfig = {
  slug: "usep",
  shortName: "USeP",
  name: "University of Southeastern Philippines",
  calculatorName: "USeP GWA Calculator",
  resultLabel: "GWA",
  description: "Estimate your University of Southeastern Philippines weighted average using its uniform grading scale.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "INC - Incomplete", value: "INC", behavior: "block" },
    { label: "DRP - Dropped", value: "DRP", behavior: "exclude" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://www.usep.edu.ph/wp-content/uploads/2020/03/Student-Handbook-2016-EDITION.pdf",
  policyYear: "2016 Student Handbook",
  lastVerified: "October 2026",
  logoSrc: "/universities/usep.png",
  brandColors: { primary: "#B51F1F", secondary: "#F3D21B" },
};
