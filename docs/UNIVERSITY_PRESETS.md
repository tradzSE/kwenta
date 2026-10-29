# University preset catalog

Each calculator configuration in `data/universities/<slug>.ts` supplies the exact dropdown options, numeric mappings, inclusion behavior, labels, display precision, and optional academic-standing rules. The registry in `data/universities/registry.ts` determines which slugs are routable and shown in the directory.

This catalog summarizes the current registry and the policy metadata encoded in those files. It does not independently validate the linked policies. A value marked “checked” is the preset's own `lastVerified` value. Always compare the cited source with the policy that applies to your campus, program, and academic year.

## Registered calculators

| Slug | Calculator identity | Result | Direction | Decimals | Source / policy metadata |
|---|---|---|---|---:|---|
| `ascot` | Aurora State College of Technology (ASCOT) | GWA | Lower is better | 2 | [ASCOT student policies](https://www.ascot.edu.ph/transparency-seal-2020/); checked October 2026 |
| `ateneo` | Ateneo de Manila University (ADMU) | QPI | Higher is better | 2 | [2025 College Student Handbook](https://www.ateneo.edu/sites/default/files/2025-09/Vol%201%202025%20Ed.%20College%20Student%20Handbook.pdf); checked October 2026 |
| `batstateu` | Batangas State University (BatStateU) | GWA | Lower is better | 2 | [AY 2017–2018 Student Handbook](https://www.batstate-u.edu.ph/sites/files/osas/New-Student-Handbook-AY-2017-2018.pdf); checked October 2026 |
| `bulsu` | Bulacan State University (BulSU) | GWA | Lower is better | 2 | [University site](https://bulsu.edu.ph/), policy year “Current university policy”; checked October 2026 |
| `clsu` | Central Luzon State University (CLSU) | GPA / GWA | Lower is better | 2 | [2024–2025 Student Handbook](https://oad.clsu.edu.ph/student-handbook); checked October 2026 |
| `custom` | Custom University | Weighted Average | Lower is better | 2 | No external source or standing rules; numeric grades 1.00–5.00 in 0.25 steps |
| `dhvsu` | Pampanga State University (formerly DHVSU) | GWA | Lower is better | 2 | [Latin honors advisory](https://oldsite.dhvsu.edu.ph/announcements-menu/949-advisory-on-the-grant-of-latin-honors); policy metadata says 2019 Student Manual; checked October 2026 |
| `dlsu` | De La Salle University (DLSU) | GPA | Higher is better | 3 | [Registrar grade information](https://old.dlsu.edu.ph/offices/registrar/faculty-attendance/grades/); policy metadata says 2021–2025 Student Handbook; checked October 2026 |
| `feu` | Far Eastern University (FEU) | QPA | Higher is better | 2 | [GPA computation](https://www.feu.edu.ph/registrar-services/computation-of-grade-point-average-gpa/); checked October 2026 |
| `mapua` | Mapúa University (MU) | Weighted average | Lower is better | 2 | [Grading system](https://support.mapua.edu.ph/kb/article/53/grading-system), AY 2026; checked October 2026 |
| `msu` | Mindanao State University (MSU) | GPA | Lower is better | 2 | [2019–2020 Student Handbook](https://www.msumain.edu.ph/wp-content/uploads/2023/10/Student_Handbook_2019-2020.pdf); checked October 2026 |
| `neust` | Nueva Ecija University of Science and Technology (NEUST) | GWA | Lower is better | 2 | [College of Education site](https://neust.edu.ph/coed/), policy year “Current university policy”; checked October 2026 |
| `nu` | National University Philippines (NU) | GPA | Higher is better | 2 | [Syllabus source](https://www.national-u.edu.ph/wp-content/uploads/2024/04/COE-CPTHS32D-Syllabus.pdf); checked October 2026 |
| `plm` | Pamantasan ng Lungsod ng Maynila (PLM) | GWA | Lower is better | 2 | [University site](https://plm.edu.ph/); checked October 2026 |
| `psau` | Pampanga State Agricultural University (PSAU) | GWA | Lower is better | 2 | [University site](https://psau.edu.ph/), policy year “Current university policy”; checked October 2026 |
| `pup` | Polytechnic University of the Philippines (PUP) | GWA | Lower is better | 2 | [Student Services / OSFA](https://www.pup.edu.ph/studentservices/osfa/services); checked October 2026 |
| `tip` | Technological Institute of the Philippines (TIP) | GWA | Lower is better | 2 | [Student Development and Activities](https://dru.tip.edu.ph/); checked October 2026 |
| `tsu` | Tarlac State University (TSU) | GWA | Lower is better | 2 | [2024 Student Manual](https://tsu.edu.ph/media/nbjlvnvm/student-manual-2024-edition.pdf); checked October 2026 |
| `ue` | University of the East (UE) | GPA | Lower is better | 4 | [2023 Student Manual](https://apps.ue.edu.ph/portals/sp/pdfs/UE_Student_Manual_2023_Edition.pdf); checked October 2026 |
| `up` | University of the Philippines (UP) | GWA | Lower is better | 2 | [UP Diliman NIP academic FAQ](https://nip.upd.edu.ph/academic-resources/frequently-asked-questions/); checked October 2026 |
| `usep` | University of Southeastern Philippines (USeP) | GWA | Lower is better | 2 | [2016 Student Handbook](https://www.usep.edu.ph/wp-content/uploads/2020/03/Student-Handbook-2016-EDITION.pdf); checked October 2026 |
| `ust` | University of Santo Tomas (UST) | GWA | Lower is better | 2 | [Student Handbook](https://www.ust.edu.ph/student-handbook/), policy metadata says 2026; checked October 2026 |

The ordinary institution presets shown above have preset-specific grade options. The catalog does not reproduce every dropdown value; the corresponding TypeScript config is the canonical list. In general, the lower-is-better numeric set is 1.00 through 3.00 in 0.25 increments plus 5.00, with explicit differences in some presets. Ateneo, DLSU, FEU, and NU use higher-is-better scales. UP also configures 4.00; UST maps selected withdrawal/failure marks to 5.00; NEUST and TSU map unofficially dropped marks to 5.00. Custom uses 17 numeric grades from 1.00 to 5.00 in 0.25 increments and has no nonnumeric options.

## Preset-specific standing rules

Only the following presets define `scholarshipRules`. Threshold interpretation follows the preset's `gradeDirection`.

| Slug | Configured average thresholds | Minimum units | Subject-grade constraint | Notes |
|---|---|---:|---|---|
| `ascot` | University ≤ 1.50; college ≤ 1.75 | 0 | None | Default labels are University Scholar and College Scholar. |
| `ateneo` | University ≥ 3.70; college ≥ 3.35 | 15 | None | Dean's List first/second honors labels; note says no Dean's List during Intersession. |
| `clsu` | University ≤ 1.50; college ≤ 1.75; Dean's List ≤ 2.00 | 15 | None | |
| `dlsu` | University ≥ 3.40; college ≥ 3.00 | 12 | Minimum subject grade 2.00 | Configured labels are Dean's First Honors and Dean's Second Honors. |
| `feu` | University ≥ 3.51; college ≥ 3.35 | 0 | None | Labels are Dean's List - First Honors and Dean's List - Second Honors. |
| `mapua` | University ≤ 1.75; college ≤ 1.75 | 15 | Maximum subject grade 3.00 | Both levels use the Dean's List range label. |
| `pup` | University ≤ 1.50; college ≤ 1.75 | 0 | Maximum subject grade 2.50 | Labels are President's Lister / University Scholar and Dean's Lister / College Scholar. |
| `ue` | University ≤ 1.25; college ≤ 1.50 | 0 | Maximum subject grade 3.00 | Labels are University Scholarship range and College Scholarship range. |
| `up` | University ≤ 1.45; college ≤ 1.75 | 15 | None | Default labels are University Scholar and College Scholar. |
| `ust` | University ≤ 1.20; college ≤ 1.45; Dean's List ≤ 1.75 | 0 | Maximum subject grade 2.75 | Labels describe a graduation Latin-honor range; additional official eligibility requirements apply. |

A configured `minimumUnits` of `0` does not enforce a minimum in the current helper. Some presets contain extra eligibility conditions in an explanatory `eligibilityNote`, but the application does not evaluate that prose. For calculation details and the precise limits of these estimates, see the [calculation model](./CALCULATION_MODEL.md) and [privacy and limitations](./PRIVACY_AND_LIMITATIONS.md).

## Adding or changing a preset

1. Add or update a strongly typed `UniversityConfig` in `data/universities/<slug>.ts`.
2. Set a unique URL-safe `slug`, human-readable names, result label, grade direction, and at least one included numeric grade option.
3. Give every grade a unique `value` and set `behavior` deliberately to `include`, `exclude`, or `block`. An included option needs a numeric value.
4. Set `passingGrade` only when the configured numeric scale supports the pass/fail comparison. Set `roundingDecimals` for presentation.
5. Add a trustworthy official `sourceUrl`, applicable `policyYear`, and `lastVerified` date when the preset is based on a published policy. Recheck sources periodically; a verification date is not a promise of future accuracy.
6. Add optional brand colors. Keep any supplied logo asset and `logoSrc` out of visible UI until permission to use it is confirmed; logos are currently hidden throughout the app and generated images.
7. Import the config in `data/universities/registry.ts` and add it to `universities`. This registry drives calculator route generation, lookup, and directory entries.
8. Add or update tests, then update this catalog with the route, source/version metadata, grading details, and any standing rules.

The custom preset is a preset, not an interactive grade-scale editor. Its numeric range and increments are fixed in `data/universities/custom.ts`.
