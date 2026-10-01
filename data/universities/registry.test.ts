import { describe, expect, it } from "vitest";
import { universities } from "@/data/universities/registry";

describe("university registry", () => {
  it("contains unique slugs", () => {
    const slugs = universities.map((university) => university.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives every calculator at least one included numeric grade", () => {
    for (const university of universities) {
      expect(university.gradeOptions.some((grade) => grade.behavior === "include" && grade.numericValue !== undefined)).toBe(true);
    }
  });

  it("keeps passing grades aligned with each grading direction", () => {
    for (const university of universities.filter((entry) => entry.passingGrade !== undefined)) {
      const numericGrades = university.gradeOptions.filter((grade) => grade.numericValue !== undefined).map((grade) => grade.numericValue!);
      expect(numericGrades.length).toBeGreaterThan(0);
      if (university.gradeDirection === "lower-is-better") expect(Math.min(...numericGrades)).toBeLessThanOrEqual(university.passingGrade!);
      else expect(Math.max(...numericGrades)).toBeGreaterThanOrEqual(university.passingGrade!);
    }
  });
});
