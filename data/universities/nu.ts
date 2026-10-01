import type { UniversityConfig } from "./types";

export const nu: UniversityConfig = {
  slug: "nu", shortName: "NU", name: "National University Philippines", calculatorName: "NU GPA Calculator", resultLabel: "GPA",
  description: "Estimate your National University Philippines weighted GPA.", gradeDirection: "higher-is-better",
  gradeOptions: [...[4, 3.5, 3, 2.5, 2, 1.5, 1, 0].map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })), { label: "R - Repeat", value: "R", behavior: "block" }, { label: "Dr - Dropped", value: "DR", behavior: "exclude" }, { label: "Inc - Incomplete", value: "INC", behavior: "block" }],
  passingGrade: 1, roundingDecimals: 2, sourceUrl: "https://www.national-u.edu.ph/wp-content/uploads/2024/04/COE-CPTHS32D-Syllabus.pdf", lastVerified: "October 2026", logoSrc: "/universities/nu.svg",
  brandColors: { primary: "#263B80", secondary: "#F4C542" },
};
