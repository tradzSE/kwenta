import type { UniversityConfig } from "./types";

export const custom: UniversityConfig = {
  slug: "custom",
  shortName: "Custom",
  name: "Custom University",
  calculatorName: "Custom Weighted Grade Calculator",
  resultLabel: "Weighted Average",
  description: "Use a flexible 1.00–5.00 weighted-average calculator when your university does not have a verified preset yet.",
  gradeDirection: "lower-is-better",
  gradeOptions: Array.from({ length: 17 }, (_, index) => {
    const grade = 1 + index * 0.25;
    return { label: grade.toFixed(2), value: String(grade), numericValue: grade, behavior: "include" as const };
  }),
  roundingDecimals: 2,
};
