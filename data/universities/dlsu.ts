import type { UniversityConfig } from "./types";

const numericGrades = [4, 3.5, 3, 2.5, 2, 1.5, 1, 0];

export const dlsu: UniversityConfig = {
  slug: "dlsu",
  shortName: "DLSU",
  name: "De La Salle University",
  calculatorName: "DLSU GPA Calculator",
  resultLabel: "GPA",
  description: "Estimate your De La Salle University term GPA and Dean's Honors standing.",
  gradeDirection: "higher-is-better",
  gradeOptions: [
    ...numericGrades.map((grade) => ({ label: grade.toFixed(1), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "Audit", value: "AUD", behavior: "exclude" },
    { label: "6.5 - Withdrawn", value: "6.5", behavior: "exclude" },
    { label: "7.0 - Passed (Pass/Fail)", value: "7.0", behavior: "exclude" },
    { label: "8.0 - Failed (Pass/Fail)", value: "8.0", behavior: "block" },
    { label: "9.9 - Incomplete / Deferred", value: "9.9", behavior: "block" },
  ],
  passingGrade: 1,
  roundingDecimals: 3,
  sourceUrl: "https://old.dlsu.edu.ph/offices/registrar/faculty-attendance/grades/",
  policyYear: "2021–2025 Student Handbook",
  lastVerified: "October 2026",
  logoSrc: "/universities/dlsu-optimized.webp",
  brandColors: { primary: "#00703C", secondary: "#000000" },
  scholarshipRules: {
    universityMax: 3.4,
    collegeMax: 3,
    minimumUnits: 12,
    minimumSubjectGrade: 2,
    universityLabel: "Dean's First Honors",
    collegeLabel: "Dean's Second Honors",
    eligibilityNote: "Estimate only. DLSU also requires at least 12 academic units, no academic grade below 2.0, and compliance with its other honors rules.",
  },
};
