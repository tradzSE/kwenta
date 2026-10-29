# Architecture

## Runtime and dependencies

Kwenta is a Next.js App Router application written in TypeScript and React. The project currently uses Next.js 16, React 19, Tailwind CSS 4, Tabler icons, Vercel Web Analytics, and Vitest. `@/*` is a TypeScript import alias to the repository root.

The app renders routes using the App Router. The per-university route produces static params from the preset registry, while calculator interaction, search controls, accordion behavior, local storage, and browser downloads run in client components.

## Request and calculation flow

```text
University preset module
        ↓
data/universities/registry.ts
        ↓
app/[university]/page.tsx ──→ components/Calculator.tsx
                                      ↓
                          lib/calculateGwa.ts
                                      ↓
                       lib/getAcademicStanding.ts
```

The registry is a static in-code list. There is no database query or server API in the calculation path. `Calculator` owns subject and saved-term UI state, passes the selected preset to the calculation helpers, stores the state locally, and creates CSV/PNG downloads in the browser.

## Source layout

| Location | Responsibility |
|---|---|
| `app/` | App Router pages, metadata, generated route resources (manifest, robots, sitemap), and global CSS. |
| `app/[university]/` | Dynamic university calculator route and its generated social image endpoint. |
| `components/` | Client/server UI building blocks including calculator, university selection/directory, site navigation, marks, and information accordion. |
| `data/universities/` | `UniversityConfig` / `GradeOption` types, individual presets, registry, and registry tests. |
| `lib/` | Pure weighted-average and academic-standing calculation helpers and their unit tests. |
| `public/` | Static brand and university assets served at their public paths. |
| `docs/` | Maintainer and user documentation. |

## Routes

| Route | Purpose |
|---|---|
| `/` | Kwenta landing page and links to the directory or custom calculator. |
| `/universities` | Searchable, paginated preset directory. |
| `/<slug>` | Calculator for each slug registered in `data/universities/registry.ts`, including `/custom`. |
| `/information` | Accordion with methodology, about, and privacy content. |
| `/about`, `/methodology`, `/privacy` | Legacy paths permanently redirected to fragments on `/information`. |
| `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml` | Generated application metadata and crawler resources. |
| `/[university]/opengraph-image` | Generated social preview image for a known university route. |

Unknown university slugs use the app's not-found page.

## Browser persistence and exports

For each slug, the calculator uses local storage keys:

- `gwa-calculator:<slug>:subjects`
- `gwa-calculator:<slug>:history`

Data is separated by slug and browser origin. It is not synchronized or sent to an application service. The browser builds CSV and PNG downloads from the current client-side state. See [privacy and limitations](./PRIVACY_AND_LIMITATIONS.md) for implications and [the user guide](./USER_GUIDE.md) for control behavior.

## Global shell and metadata

`app/layout.tsx` provides the Geist font, shared header and footer, global stylesheet, site metadata, and the Vercel Analytics React component. `app/[university]/page.tsx` adds preset-specific title, description, canonical URL, structured data, and optional theme colors. The home page and information page also provide page-specific metadata and structured data.
