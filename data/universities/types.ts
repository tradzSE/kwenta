export type GradeOption = {
  label: string;
  value: string;
  numericValue?: number;
  behavior: "include" | "exclude" | "block";
};

export type UniversityConfig = {
  slug: string;
  shortName: string;
  name: string;
  calculatorName: string;
  resultLabel: string;
  description: string;
  gradeDirection: "lower-is-better" | "higher-is-better";
  gradeOptions: GradeOption[];
  passingGrade?: number;
  roundingDecimals: number;
  sourceUrl?: string;
  policyYear?: string;
  lastVerified?: string;
  logoSrc?: string;
  brandColors?: {
    primary: string;
    secondary: string;
  };
  scholarshipRules?: {
    universityMax: number;
    collegeMax: number;
    deansListMax?: number;
    minimumUnits: number;
    maximumSubjectGrade?: number;
    minimumSubjectGrade?: number;
    universityLabel?: string;
    collegeLabel?: string;
    deansListLabel?: string;
    eligibilityNote?: string;
  };
};
