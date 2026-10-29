# Privacy and limitations

## Data handled in the browser

The calculator does not require an account. Subject names, grades, units, and saved-semester history are held in the browser and persisted with `localStorage` under keys scoped to the current calculator slug:

- `gwa-calculator:<slug>:subjects`
- `gwa-calculator:<slug>:history`

The code does not submit these calculator records to a Kwenta application API or database. Browser storage is tied to the current browser and site origin; it is not synchronized between devices. Anyone with access to the same browser profile and site storage may be able to access the saved calculator data. Clearing the browser's site data removes it. **Clear all** only resets current subjects; it deliberately leaves saved semesters intact.

CSV and PNG result files are generated on the user's device and downloaded by the browser. A user chooses whether to share a downloaded file.

The root layout includes Vercel Web Analytics. The site's public privacy disclosure says it uses cookieless, privacy-preserving aggregate metrics (such as total visits, country, and device type), without tracking individual users or collecting personal data. This visitor analytics component is separate from the calculator's local storage.

## Not an official academic record

Every result and standing is an estimate based on the configured grade map and policy fields. The application cannot access or verify a student's official record. It does not implement every rule that an institution may apply, such as program- or campus-specific policy, curriculum load, residency, repeated-course treatment, term eligibility, conduct, appeals, or current registrar procedures. Some policy URLs or policy years in the preset files refer to older documents or general institutional pages; check the cited source and confirm any consequential result with the university.

The application checks only the numeric and categorical rules explicitly represented by a preset. In particular:

- An unselected grade is ignored; excluded marks do not affect the average; blocking marks prevent a final displayed result.
- Only included grade options with a defined numeric value and finite positive units contribute.
- The `passingGrade` setting is a numeric pass/fail check, not a complete determination of academic standing.
- Academic-standing estimates only evaluate configured average thresholds, minimum units, and optional minimum/maximum subject grade. Eligibility conditions present only in explanatory text are not mechanically checked.
- A configured minimum of zero is not an enforced course-load check.
- The custom calculator uses a fixed numerical 1.00–5.00 scale in 0.25 steps. It does not let the user define another grading scale or policy and has no configured scholarship rules.

## Availability and browser behavior

Saved data depends on browser local storage being available and retained. Private browsing settings, storage policies, browser cleanup, or a different device/profile may make saved data unavailable. CSV export and PNG generation also depend on browser download and canvas support.

For calculation semantics and which presets define standing rules, see the [calculation model](./CALCULATION_MODEL.md) and [preset catalog](./UNIVERSITY_PRESETS.md).
