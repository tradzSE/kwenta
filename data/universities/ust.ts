import type { UniversityConfig } from "./types";

const numericGrades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const ust: UniversityConfig = {
  slug: "ust",
  shortName: "UST",
  name: "University of Santo Tomas",
  calculatorName: "UST GWA Calculator",
  resultLabel: "GWA",
  description: "Estimate your University of Santo Tomas general weighted average and Latin-honor range.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...numericGrades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "INC - Incomplete", value: "INC", behavior: "block" },
    { label: "INP - In Progress", value: "INP", behavior: "block" },
    { label: "FA - Failure due to Absences", value: "FA", numericValue: 5, behavior: "include" },
    { label: "WP - Withdrew with Permission", value: "WP", behavior: "exclude" },
    { label: "WF - Withdrew without Permission", value: "WF", numericValue: 5, behavior: "include" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://www.ust.edu.ph/student-handbook/",
  policyYear: "2026",
  lastVerified: "October 2026",
  logoSrc: "/universities/ust-optimized.webp",
  brandColors: { primary: "#111111", secondary: "#FCBF15" },
  scholarshipRules: {
    universityMax: 1.2,
    collegeMax: 1.45,
    deansListMax: 1.75,
    minimumUnits: 0,
    maximumSubjectGrade: 2.75,
    universityLabel: "Summa Cum Laude range",
    collegeLabel: "Magna Cum Laude range",
    deansListLabel: "Cum Laude range",
    eligibilityNote: "Graduation honor estimate only. UST uses the cumulative GWA and additional eligibility requirements.",
  },
};
