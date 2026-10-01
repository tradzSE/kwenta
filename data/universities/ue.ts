import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const ue: UniversityConfig = {
  slug: "ue", shortName: "UE", name: "University of the East", calculatorName: "UE GPA Calculator", resultLabel: "GPA",
  description: "Estimate your University of the East semester GPA and scholarship range.", gradeDirection: "lower-is-better",
  gradeOptions: [...grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })), { label: "LFR - Lacks Final Requirement", value: "LFR", behavior: "block" }, { label: "IP - In Progress", value: "IP", behavior: "block" }, { label: "W - Officially Withdrawn", value: "W", behavior: "block" }, { label: "D - Unofficially Dropped", value: "D", behavior: "block" }],
  passingGrade: 3, roundingDecimals: 4, sourceUrl: "https://apps.ue.edu.ph/portals/sp/pdfs/UE_Student_Manual_2023_Edition.pdf", policyYear: "2023 Student Manual", lastVerified: "October 2026", logoSrc: "/universities/ue.png",
  brandColors: { primary: "#C8102E", secondary: "#FFFFFF" },
  scholarshipRules: { universityMax: 1.25, collegeMax: 1.5, minimumUnits: 0, maximumSubjectGrade: 3, universityLabel: "University Scholarship range", collegeLabel: "College Scholarship range", eligibilityNote: "Estimate only. UE also requires the full curricular load, a cumulative GWA of 1.6000 or better, and its other scholarship conditions." },
};
