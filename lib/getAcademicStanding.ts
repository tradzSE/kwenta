import type { UniversityConfig } from "@/data/universities/types";
import type { calculateGwa } from "@/lib/calculateGwa";

type CalculationResult = ReturnType<typeof calculateGwa>;

export function getAcademicStanding(result: CalculationResult, university: UniversityConfig) {
  const rules = university.scholarshipRules;
  if (!rules || result.value === null) return null;

  const meetsUnits = result.includedUnits >= rules.minimumUnits;
  const exceedsMaximumGrade = rules.maximumSubjectGrade !== undefined
    && result.worstNumericGrade !== null
    && result.worstNumericGrade > rules.maximumSubjectGrade;
  const fallsBelowMinimumGrade = rules.minimumSubjectGrade !== undefined
    && result.worstNumericGrade !== null
    && result.worstNumericGrade < rules.minimumSubjectGrade;
  const hasClearGrades = !result.blockers.length
    && !result.hasFailingGrade
    && !exceedsMaximumGrade
    && !fallsBelowMinimumGrade;
  const qualifies = (threshold: number) => university.gradeDirection === "lower-is-better"
    ? result.value! <= threshold
    : result.value! >= threshold;

  const label = !hasClearGrades
    ? null
    : qualifies(rules.universityMax)
      ? rules.universityLabel ?? "University Scholar"
      : qualifies(rules.collegeMax)
        ? rules.collegeLabel ?? "College Scholar"
        : rules.deansListMax !== undefined && qualifies(rules.deansListMax)
          ? rules.deansListLabel ?? "Dean's Lister"
          : null;

  const note = !label
    ? undefined
    : !meetsUnits && rules.minimumUnits > 0
      ? `Qualifying GWA (${result.includedUnits}/${rules.minimumUnits} units) · Official honor rolls typically require at least ${rules.minimumUnits} units`
      : rules.eligibilityNote ?? "Based on the grades and units entered";

  return { label, meetsUnits, hasClearGrades, note };
}
