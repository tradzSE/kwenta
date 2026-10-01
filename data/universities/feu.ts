import type { UniversityConfig } from "./types";

export const feu: UniversityConfig = {
  slug: "feu", shortName: "FEU", name: "Far Eastern University", calculatorName: "FEU QPA Calculator", resultLabel: "QPA",
  description: "Estimate your Far Eastern University semestral QPA and Dean's List standing.", gradeDirection: "higher-is-better",
  gradeOptions: [{ label: "A - 4.0", value: "A", numericValue: 4, behavior: "include" }, { label: "B+ - 3.5", value: "B+", numericValue: 3.5, behavior: "include" }, { label: "B - 3.0", value: "B", numericValue: 3, behavior: "include" }, { label: "C+ - 2.5", value: "C+", numericValue: 2.5, behavior: "include" }, { label: "C - 2.0", value: "C", numericValue: 2, behavior: "include" }, { label: "D+ - 1.5", value: "D+", numericValue: 1.5, behavior: "include" }, { label: "D - 1.0", value: "D", numericValue: 1, behavior: "include" }, { label: "F - 0.0", value: "F", numericValue: 0, behavior: "include" }],
  passingGrade: 1, roundingDecimals: 2, sourceUrl: "https://www.feu.edu.ph/registrar-services/computation-of-grade-point-average-gpa/", lastVerified: "October 2026", logoSrc: "/universities/feu.webp",
  brandColors: { primary: "#006341", secondary: "#F2C75C" },
  scholarshipRules: { universityMax: 3.51, collegeMax: 3.35, minimumUnits: 0, universityLabel: "Dean's List - First Honors", collegeLabel: "Dean's List - Second Honors", eligibilityNote: "Estimate only. FEU also requires the curriculum load, no dropped courses, no failing grades, and no disciplinary case for the semester." },
};
