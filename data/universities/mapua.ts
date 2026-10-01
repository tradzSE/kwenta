import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const mapua: UniversityConfig = {
  slug: "mapua", shortName: "MU", name: "Mapúa University", calculatorName: "Mapúa Weighted Average Calculator", resultLabel: "weighted average",
  description: "Estimate your Mapúa University term weighted average and Dean's List range.", gradeDirection: "lower-is-better",
  gradeOptions: [...grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })), { label: "C - Continuing", value: "C", behavior: "block" }, { label: "I - Incomplete", value: "I", behavior: "block" }, { label: "IP - In Progress", value: "IP", behavior: "block" }, { label: "W - Official Withdrawal", value: "W", behavior: "exclude" }, { label: "P - Passed", value: "P", behavior: "exclude" }, { label: "Au - Audit", value: "AU", behavior: "exclude" }],
  passingGrade: 3, roundingDecimals: 2, sourceUrl: "https://support.mapua.edu.ph/kb/article/53/grading-system", policyYear: "AY 2026", lastVerified: "October 2026", logoSrc: "/universities/mapua-clean.png",
  brandColors: { primary: "#B21F2D", secondary: "#F5B335" },
  scholarshipRules: { universityMax: 1.75, collegeMax: 1.75, minimumUnits: 15, maximumSubjectGrade: 3, universityLabel: "Dean's List range", collegeLabel: "Dean's List range", eligibilityNote: "Estimate only. Mapúa also requires the curricular load, a running GWA of 2.00 or better, and compliance with its other academic-honors rules." },
};
