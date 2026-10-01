import type { UniversityConfig } from "./types";

const numericGrades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const pup: UniversityConfig = {
  slug: "pup",
  shortName: "PUP",
  name: "Polytechnic University of the Philippines",
  calculatorName: "PUP GWA Calculator",
  resultLabel: "GWA",
  description: "Estimate your Polytechnic University of the Philippines general weighted average and resident scholarship standing.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...numericGrades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "INC - Incomplete", value: "INC", behavior: "block" },
    { label: "W - Withdrawn", value: "W", behavior: "exclude" },
    { label: "D - Dropped", value: "D", behavior: "exclude" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://www.pup.edu.ph/studentservices/osfa/services",
  lastVerified: "October 2026",
  logoSrc: "/universities/pup.png",
  brandColors: { primary: "#800000", secondary: "#E5A900" },
  scholarshipRules: {
    universityMax: 1.5,
    collegeMax: 1.75,
    minimumUnits: 0,
    maximumSubjectGrade: 2.5,
    universityLabel: "President's Lister / University Scholar",
    collegeLabel: "Dean's Lister / College Scholar",
    eligibilityNote: "Also requires the normal curriculum load and official PUP verification.",
  },
};
