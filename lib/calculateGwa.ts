import type { GradeOption, UniversityConfig } from "@/data/universities/types";

export type Subject = { id: string; name: string; grade: string; units: string };

export function calculateGwa(subjects: Subject[], university: UniversityConfig) {
  const options = new Map<string, GradeOption>(university.gradeOptions.map((option) => [option.value, option]));
  const blockers = subjects.filter((subject) => options.get(subject.grade)?.behavior === "block");
  let weightedTotal = 0;
  let includedUnits = 0;
  let hasFailingGrade = false;
  let worstNumericGrade: number | null = null;

  for (const subject of subjects) {
    const units = Number(subject.units);
    const option = options.get(subject.grade);
    if (!option || option.behavior !== "include" || !Number.isFinite(units) || units <= 0 || option.numericValue === undefined) continue;
    weightedTotal += option.numericValue * units;
    includedUnits += units;
    worstNumericGrade = worstNumericGrade === null
      ? option.numericValue
      : university.gradeDirection === "lower-is-better"
        ? Math.max(worstNumericGrade, option.numericValue)
        : Math.min(worstNumericGrade, option.numericValue);
    if (university.passingGrade !== undefined) {
      const failed = university.gradeDirection === "lower-is-better"
        ? option.numericValue > university.passingGrade
        : option.numericValue < university.passingGrade;
      if (failed) hasFailingGrade = true;
    }
  }

  const value = includedUnits ? weightedTotal / includedUnits : null;
  return { value, includedUnits, blockers, hasFailingGrade, worstNumericGrade };
}
