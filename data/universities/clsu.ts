import type { UniversityConfig } from "./types";

const numericGrades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const clsu: UniversityConfig = {
  slug: "clsu",
  shortName: "CLSU",
  name: "Central Luzon State University",
  calculatorName: "CLSU GPA/GWA Calculator",
  resultLabel: "GPA / GWA",
  description: "Estimate your Central Luzon State University weighted average using the grading options published in the CLSU Student Handbook.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...numericGrades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "D — Dropped", value: "D", behavior: "exclude" },
    { label: "IP — In Progress", value: "IP", behavior: "exclude" },
    { label: "Inc — Incomplete", value: "Inc", behavior: "block" },
    { label: "NG — No Grade", value: "NG", behavior: "block" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://oad.clsu.edu.ph/student-handbook",
  policyYear: "2024–2025",
  lastVerified: "October 2026",
  logoSrc: "/universities/clsu-optimized.webp",
  brandColors: { primary: "#008000", secondary: "#FFD700" },
  scholarshipRules: { universityMax: 1.5, collegeMax: 1.75, deansListMax: 2, minimumUnits: 15 },
};
