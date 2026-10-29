# Product and user guide

Kwenta provides estimates; it does not produce an official transcript or replace a university registrar's calculation.

## Finding a calculator

- The home page links to the university directory and the custom calculator.
- `/universities` lists the registered institution presets and the custom option. Search by institution name or abbreviation; results are paginated in groups of 12.
- A calculator is available at `/<slug>`. The university selector and directory navigate to the matching calculator.
- If a route is not recognized, the 404 page provides search, popular calculators, and links to the directory and custom calculator.
- `/information` contains the public methodology, project, and privacy explanations.

The header links to Home, Universities, and Information. The Information page's three sections can be opened from their matching URL fragments, such as `/information#methodology`.

## Entering subjects

1. Choose the calculator matching your institution, or choose Custom if no preset applies.
2. For each subject, select a grade from that calculator's own list and enter its units. A subject name is optional and is for identification only.
3. Use **Add subject** to add rows. New rows start with blank name and grade and 3 units. The calculator starts with four such rows.
4. Remove individual rows with the row's remove button. At least one row remains.
5. The estimated result updates from the entered grade and unit values. Its label, numeric scale, and displayed decimal places depend on the selected preset.

An unselected grade does not contribute to the average. A preset's excluded marks are omitted; a blocking mark keeps the displayed result pending until it is resolved. See the [calculation model](./CALCULATION_MODEL.md) for precise behavior.

## Result actions

- **Export CSV** downloads the current rows that have a selected grade, plus an estimated-result summary. The export can include excluded or blocking grade rows; it is a record of the entered rows, not just the terms used in the average.
- **Download result** downloads a PNG result card when there is a numeric result and no blocking grade. The card includes the calculator identity, result, and any configured academic-standing estimate.
- **Save result** adds the current valid result to the saved-semester list. Enter a semester name first if desired; a blank name is saved as “Untitled term.”

The saved-semester section reports a cumulative estimate weighted by each saved semester's included-unit total. It is calculated only from saved results; it does not automatically include the current worksheet. Saved entries can be removed individually.

## Clearing entries

**Clear all** opens a confirmation dialog. Confirming replaces the current subject rows with four blank rows. It does not remove saved semesters. To remove saved data, delete individual saved semesters or clear the site's browser storage.

## Academic standing

Some presets provide a configured scholarship, honors, or Dean's List estimate. It is shown only when the preset has standing rules and a numeric result. A result can meet the configured grade threshold while falling below the configured unit minimum; in that case, the UI labels it as a qualifying GWA and explains the unit shortfall. No standing estimate is shown for presets without rules.

These are narrow estimates based on fields encoded in the preset, not full determinations of eligibility. Refer to the official policy linked on the calculator page and confirm with the institution.
