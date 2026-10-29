# Calculation model

The implementation is in `lib/calculateGwa.ts` and `lib/getAcademicStanding.ts`. Both functions are pure helpers used by the calculator UI and covered by Vitest tests.

## Weighted average

For each included subject, let `g` be the preset's numeric grade value and `u` its entered units. The result is:

```text
sum(g × u) / sum(u)
```

The included-unit total is the denominator. The calculation uses JavaScript `Number` conversion for the units string and accepts only finite values greater than zero. A missing, non-numeric, zero, or negative unit value excludes that row from arithmetic. A selected grade must have `behavior: "include"` and a defined `numericValue` to contribute.

If there are no included units, the numeric value is `null`. The UI displays an em dash in that case, unless a blocking grade is present, in which case it displays “Pending.”

## Grade behavior

Each grade option has a display label, a select value, and a behavior:

| Behavior | Calculation effect |
|---|---|
| `include` | Adds `numericValue × units` to the weighted total when the units are finite and positive. |
| `exclude` | Does not affect the weighted total or included-unit count. |
| `block` | Adds the subject to the blockers list. The worksheet displays “Pending” and prevents saving or downloading the result-card PNG until all blocking marks are resolved. CSV export remains available. |

An empty grade is not itself a blocker. A row with a blocker remains a blocker even if its units are invalid or zero, because blocking is determined from the selected grade option independently of unit validity. Excluded and unselected rows do not prevent a result.

## Direction, failures, and worst grade

`gradeDirection` is either `lower-is-better` or `higher-is-better`. When `passingGrade` is set, numeric included grades are compared against it in that direction to set `hasFailingGrade`. The calculation also records the worst included numeric grade: the maximum numeric grade for lower-is-better scales and the minimum for higher-is-better scales.

These are preset-based numerical checks. The code cannot infer every institution-specific failure, repeat, exclusion, course-load, or residency rule from a grade value.

## Display precision

`roundingDecimals` controls formatting of the displayed result, saved-history values, and the downloadable result image. Arithmetic, academic-standing threshold comparisons, and the numeric value stored for a saved term use the unrounded JavaScript number. CSV summary output uses the same configured decimal formatting.

## Academic-standing estimate

`getAcademicStanding` returns no estimate when the preset has no `scholarshipRules` or when there is no numeric result. Otherwise it:

1. Checks the included units against `minimumUnits`.
2. Checks the worst numeric grade against optional `maximumSubjectGrade` and `minimumSubjectGrade`.
3. Disallows a standing label when there is a blocker, a detected failing grade, or a disqualifying worst grade.
4. Compares the unrounded average to `universityMax`, `collegeMax`, and optional `deansListMax`, in the direction configured for the university. The first qualifying threshold determines the label.
5. Displays a qualifying label even when the minimum units are not met, but marks it “Qualifying GWA” and reports the unit shortfall.

The estimate checks only these configured fields. It is not a full rule engine and does not verify curriculum load, conduct, residency, repeated courses, degree-program-specific conditions, or other policy details unless reflected in the preset fields.

## Saved-semester cumulative estimate

Each saved record stores the unrounded term result as a numeric value and the included-unit total captured at save time. The UI formats saved values for display. The cumulative estimate is:

```text
sum(saved term result × saved term included units) / sum(saved term included units)
```

Only saved records are included. The current worksheet is not automatically included, and saved records are not recalculated if a preset changes later.

## Examples

For two included courses with grades 1.00 and 2.00 and units 3 and 1:

```text
(1.00 × 3 + 2.00 × 1) / (3 + 1) = 1.25
```

For a higher-is-better preset, grades 4.00 and 2.00 with 3 units each produce 3.00. The same arithmetic applies; the direction only changes failure, worst-grade, and threshold comparisons.
