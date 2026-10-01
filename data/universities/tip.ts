import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const tip: UniversityConfig = {
  slug: "tip", shortName: "TIP", name: "Technological Institute of the Philippines", calculatorName: "T.I.P. GWA Calculator", resultLabel: "GWA",
  description: "Calculate a weighted grade estimate for the Technological Institute of the Philippines.", gradeDirection: "lower-is-better",
  gradeOptions: grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
  passingGrade: 3, roundingDecimals: 2, sourceUrl: "https://dru.tip.edu.ph/", lastVerified: "October 2026", logoSrc: "/universities/tip.png",
  brandColors: { primary: "#111111", secondary: "#F6C900" },
};
