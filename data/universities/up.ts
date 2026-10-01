import type { UniversityConfig } from "./types";

const numericGrades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 4, 5];

export const up: UniversityConfig = {
  slug: "up",
  shortName: "UP",
  name: "University of the Philippines",
  calculatorName: "UP GWA Calculator",
  resultLabel: "GWA",
  description: "Estimate your University of the Philippines general weighted average and honorific scholar standing.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...numericGrades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "INC - Incomplete", value: "INC", behavior: "block" },
    { label: "DRP - Dropped", value: "DRP", behavior: "exclude" },
    { label: "P - Pass", value: "P", behavior: "exclude" },
    { label: "S - Satisfactory", value: "S", behavior: "exclude" },
    { label: "U - Unsatisfactory", value: "U", behavior: "exclude" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://nip.upd.edu.ph/academic-resources/frequently-asked-questions/",
  lastVerified: "October 2026",
  logoSrc: "/universities/up-optimized.webp",
  brandColors: { primary: "#7B1113", secondary: "#014421" },
  scholarshipRules: { universityMax: 1.45, collegeMax: 1.75, minimumUnits: 15 },
};
