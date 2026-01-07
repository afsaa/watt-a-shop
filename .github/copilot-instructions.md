<!-- Purpose: project-specific guidance for AI coding agents working on this repo -->

# Copilot instructions — watt-a-shop

Brief context

- This repo is a React + TypeScript single-page app built with Vite. Primary UI state is in a persisted Zustand store (`src/store/index.ts`). Routing lives under `src/routes` and pages under `src/pages`.

Why this structure

- Zustand is used for small, persisted UI state (cart, filters, UI flags) because it keeps components thin and avoids prop-drilling; persisted state is useful for restoring cart/session across reloads (`shop-storage`). Pages live under `src/pages/` and are composed by `src/routes/index.tsx` so routing concerns stay separate from isolated UI components in `src/components/`. The `fetcher` in `src/utils/api.ts` centralizes remote calls (used with SWR) so agents should update that helper when API surface changes.

Quick start (commands discovered in `package.json`)

- Dev server: `yarn dev` or `npm run dev` (runs `vite`).
- Build: `yarn build` or `npm run build` (runs `tsc && vite build`).
- Tests: `yarn test` or `npm test` (Jest + `ts-jest`). Use `yarn test:watch` for TDD and `yarn test:coverage` for coverage.
- Lint: `yarn lint` or `npm run lint` (ESLint).
- Playwright E2E: use `npx playwright test` or `npm exec playwright test` (Playwright is present as a devDependency).

Architecture & key patterns

- App entry: `src/main.tsx` mounts `src/pages/App`.
- Routing: `src/routes/index.tsx` composes pages from `src/pages/*` and uses `react-router-dom`.
- UI components: placed in `src/components/<ComponentName>/`. Many components expose a single component file (e.g., `src/components/Button/button.tsx`) and a test (`Button.test.tsx`). Add a new component by following that directory pattern and export it from `src/components/index.ts` when shared.
- Global state: `src/store/index.ts` uses `zustand` with `persist` and `devtools`. The store is persisted under the key `shop-storage` — changes should respect the shape defined in `src/store/store.types.ts`.
- Data fetching: the small `fetcher` helper is in `src/utils/api.ts` (used with SWR). Prefer that fetcher for consistent behavior in components.
- Asset & path alias: Vite alias `@` → `src` is configured in `vite.config.ts`; prefer imports like `@/components/Button/button` for clarity.

Testing notes

- Unit & component tests: Jest + `@testing-library/react` are used (see `src/components/*/*.test.tsx`). Tests rely on a static file mock located at `test/__mocks__/fileMock.js` — Jest's `moduleNameMapper` points to the mock (verify the path if tests fail).
- E2E: Playwright is installed; run `npx playwright test` from repo root. If adding Playwright tests, place them under `tests/` or create a Playwright suite and reference `playwright.config.ts`.

Conventions and gotchas (project-specific)

- Component file naming: component folders are PascalCase (e.g., `Button`) but implementation files may be lowercase (`button.tsx`). Match existing naming when adding files.
- Store mutators: `useAppStore` exposes many small setters (e.g., `setProducts`, `addProductToCart`). Update store types in `src/store/store.types.ts` when adding or changing store fields.
- Mocking assets in tests: the repo expects a file mock in `test/__mocks__/fileMock.js`. If tests fail for static imports, confirm the `moduleNameMapper` path in `jest.config.ts` and correct any spacing/typos.
- TypeScript-first: `build` runs `tsc` before `vite build` — keep types consistent and update `tsconfig.json` when adding new module aliases or lib settings.

Where to look for examples

- Zustand usage: `src/store/index.ts`
- Fetching pattern: `src/utils/api.ts` and components that call SWR tests in `src/components/*/*test.tsx`
- Routing & pages: `src/routes/index.tsx` and `src/pages/*`
- Component examples and tests: `src/components/Button/button.tsx` and `src/components/Button/Button.test.tsx`

When editing the repo

- Preserve the existing import alias `@` and the Zustand persist key unless intentionally migrating storage.
- When adding new pages, update `src/routes/index.tsx` and add a corresponding entry under `src/pages/`.
- Run `yarn lint` and `yarn test` before opening a PR.

If something is unclear or you want me to expand any section (tests, Playwright, Jest mappings, or store types), tell me which area to deepen.
