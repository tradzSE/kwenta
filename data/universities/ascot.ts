import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const ascot: UniversityConfig = {
  slug: "ascot",
  shortName: "ASCOT",
  name: "Aurora State College of Technology",
  calculatorName: "ASCOT GWA Calculator",
  resultLabel: "GWA",
  description: "Estimate your Aurora State College of Technology general weighted average.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "INC - Incomplete", value: "INC", behavior: "block" },
    { label: "DRP - Dropped", value: "DRP", behavior: "exclude" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://www.ascot.edu.ph/transparency-seal-2020/",
  policyYear: "ASCOT student policies",
  lastVerified: "October 2026",
  logoSrc: "/universities/ascot.png",
  brandColors: { primary: "#A71922", secondary: "#F5C400" },
};
