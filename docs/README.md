# Kwenta documentation

This folder documents the behavior and implementation present in the application code. It is intended for students using the site and developers maintaining it.

## Documents

- [Product and user guide](./USER_GUIDE.md) — pages, calculator workflow, saved terms, and downloads.
- [Calculation model](./CALCULATION_MODEL.md) — weighted-average arithmetic, grade handling, academic-standing estimates, and precision.
- [University preset catalog](./UNIVERSITY_PRESETS.md) — registered calculator slugs, grading direction, source metadata, and configured standing rules.
- [Architecture](./ARCHITECTURE.md) — routes, components, data flow, and persistence boundaries.
- [Development and deployment](./DEVELOPMENT_AND_DEPLOYMENT.md) — local commands, tests, configuration, and deployment behavior.
- [Privacy and limitations](./PRIVACY_AND_LIMITATIONS.md) — data handling, estimate caveats, and known product limits.

## Project at a glance

Kwenta is a mobile-first Next.js App Router application that estimates weighted grade averages using university-specific grade presets. The registry currently contains 21 institution presets and one custom weighted-average preset. Calculations run in the browser; the project has no application API, authentication, or application database.

The application source is at the repository root. University definitions are in `data/universities`, calculation helpers and their tests are in `lib`, and UI components are in `components`. This documentation is descriptive: the TypeScript configuration and implementation are the source of truth if a documented value and the running code differ.

## Keeping documentation current

When changing calculator behavior, update the corresponding calculation or user guide. When adding, removing, or revising a university preset, update the catalog and its source/version information alongside the preset. When changing persistence, analytics, routes, or deployment behavior, update the architecture, privacy, or operations document as appropriate.
