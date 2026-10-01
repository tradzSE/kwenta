import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const dhvsu: UniversityConfig = {
  slug: "dhvsu",
  shortName: "DHVSU",
  name: "Pampanga State University (formerly DHVSU)",
  calculatorName: "Pampanga State U / DHVSU GWA Calculator",
  resultLabel: "GWA",
  description: "Estimate your Pampanga State University general weighted average using the former DHVSU grading scale.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "INC - Incomplete", value: "INC", behavior: "block" },
    { label: "DRP - Dropped", value: "DRP", behavior: "exclude" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://oldsite.dhvsu.edu.ph/announcements-menu/949-advisory-on-the-grant-of-latin-honors",
  policyYear: "2019 Student Manual",
  lastVerified: "October 2026",
  logoSrc: "/universities/dhvsu.png",
  brandColors: { primary: "#8D121C", secondary: "#E0A21A" },
};
