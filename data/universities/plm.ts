import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const plm: UniversityConfig = {
  slug: "plm", shortName: "PLM", name: "Pamantasan ng Lungsod ng Maynila", calculatorName: "PLM GWA Calculator", resultLabel: "GWA",
  description: "Calculate a weighted grade estimate for Pamantasan ng Lungsod ng Maynila.", gradeDirection: "lower-is-better",
  gradeOptions: grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
  passingGrade: 3, roundingDecimals: 2, sourceUrl: "https://plm.edu.ph/", lastVerified: "October 2026", logoSrc: "/universities/plm-optimized.webp",
  brandColors: { primary: "#0055A4", secondary: "#F4C542" },
};
