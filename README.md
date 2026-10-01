# Kwenta

Kwenta is a mobile-first GWA calculator for Filipino students. It supports university-specific grading presets, academic-standing estimates, saved semesters, CSV export, and a custom weighted-average calculator.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm test
npm run lint
npm run build
```

## University data

University presets live in `data/universities`. Each preset defines its grade scale, calculation behavior, branding, policy source, and verification date. Add new presets to `data/universities/registry.ts` and include a corresponding logo in `public/universities`.

Academic-standing results are estimates only. Students should confirm eligibility and official calculations with their university.

## Deployment

The production domain is `https://kwenta.ranierteraldico.me`. The app includes metadata, Open Graph tags, a sitemap, robots rules, a web app manifest, security headers, and cache policies for static brand assets.
