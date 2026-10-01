import type { UniversityConfig } from "./types";

const grades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5];

export const msu: UniversityConfig = {
  slug: "msu",
  shortName: "MSU",
  name: "Mindanao State University",
  calculatorName: "MSU GPA Calculator",
  resultLabel: "GPA",
  description: "Estimate your Mindanao State University weighted GPA using the official degree-program grading scale.",
  gradeDirection: "lower-is-better",
  gradeOptions: [
    ...grades.map((grade) => ({ label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const })),
    { label: "INC - Incomplete", value: "INC", behavior: "block" },
  ],
  passingGrade: 3,
  roundingDecimals: 2,
  sourceUrl: "https://www.msumain.edu.ph/wp-content/uploads/2023/10/Student_Handbook_2019-2020.pdf",
  policyYear: "2019-2020 Student Handbook",
  lastVerified: "October 2026",
  logoSrc: "/universities/msu.webp",
  brandColors: { primary: "#74172C", secondary: "#F3C623" },
};
