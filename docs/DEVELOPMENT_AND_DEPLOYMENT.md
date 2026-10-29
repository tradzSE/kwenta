# Development and deployment

## Requirements

- Node.js compatible with the project's Next.js version.
- npm.

The project manifest is `package.json`; the lockfile in the repository should be used with `npm ci` for a reproducible install when present.

## Local development

From the project root:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To create and run a production build locally:

```bash
npm run build
npm run start
```

## Checks

```bash
npm test
npm run lint
npm run build
```

- `npm test` runs `vitest run`. `vitest.config.ts` limits discovery to `lib/**/*.test.ts` and `data/**/*.test.ts`.
- `npm run lint` runs ESLint using `eslint.config.mjs`, including the Next.js Core Web Vitals and TypeScript configurations.
- `npm run build` runs the Next.js production build and is also a TypeScript / route integration check.

Tests currently cover weighted arithmetic, excluded and blocking grades, invalid units, failure/worst-grade direction, academic-standing thresholds and minimum units, and registry slug/grade-option/passing-scale invariants.

## Configuration and assets

- University grading and policy metadata: `data/universities/<slug>.ts`.
- Registry and static route list: `data/universities/registry.ts`.
- University logos: `public/universities/`; each configured `logoSrc` is a public URL path such as `/universities/clsu.png`.
- TypeScript strictness and `@/*` path alias: `tsconfig.json`.
- Vitest root and alias: `vitest.config.ts`.
- ESLint: `eslint.config.mjs`.
- Next.js redirects, response headers, and caching: `next.config.ts`.

No environment variables are required by the source configuration shown in this project. The Next.js root is the working directory (`process.cwd()`).

## Production and hosting

The production domain is `https://kwenta.ranierteraldico.me`, used by the metadata base, sitemap, and generated links. Host the app on a platform that supports the project's Next.js build and runtime; the repository does not include a separate backend service or database.

`next.config.ts` sets the following behavior:

- Permanently redirects older university logo paths to the current image assets.
- Permanently redirects `/about`, `/methodology`, and `/privacy` to fragments on `/information`.
- Sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and Strict-Transport-Security headers on all paths.
- Adds public cache directives for `/universities/*`, selected brand icons/logos, and `/og-image.jpg`.

The app also emits a web app manifest, allows public crawling through `robots.txt`, generates a sitemap from the current registry, and sets page-specific canonical and social metadata. After changing the registry, verify that new university routes and their source metadata appear as expected in the directory, static route generation, sitemap, and social preview.

The production analytics component is `@vercel/analytics/react`. The application's privacy copy describes these as cookieless aggregate visitor metrics; see [privacy and limitations](./PRIVACY_AND_LIMITATIONS.md).
