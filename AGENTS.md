# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 16 App Router project using TypeScript and React 19. Route pages, layouts, and API handlers live in `app/`; grouped segments such as `app/(auth)` and `app/(routes)` separate auth and product pages. Course-specific UI is colocated under route-level `_components` folders.

Shared UI primitives are in `components/ui` and follow the shadcn/Radix pattern in `components.json`. Reusable hooks are in `hooks`, utilities and auth helpers are in `lib`, app context is in `context`, and database schema/configuration are in `config` plus `drizzle.config.ts`. Static assets belong in `public`.

## Build, Test, and Development Commands
- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local Next.js dev server with webpack, usually at `http://localhost:3000`.
- `npm run build`: create a production build and run compile checks.
- `npm run start`: serve the built production app.
- `npx drizzle-kit push`: push Drizzle schema changes to the configured Neon database.

No `lint` or `test` script is currently defined. Use `npm run build` as the minimum verification.

## Coding Style & Naming Conventions
Use TypeScript and `.tsx` for React components. Keep components in PascalCase (`CourseProgressCard.tsx`) and hooks in camelCase with a `use` prefix (`use-mobile.ts`). Prefer the `@/` alias from `tsconfig.json` over long relative imports.

Follow the existing style: two-space indentation, functional React components, Tailwind CSS utilities, shadcn UI primitives, and `lucide-react` icons. Keep route-local components inside the nearest `_components` directory and shared primitives in `components/ui`.

## Testing Guidelines
There is no committed test framework or test directory. For now, verify changes with `npm run build` and manually check affected routes in the browser. If adding tests, colocate focused tests near the feature or create a top-level `tests` directory, and add an explicit `npm test` script.

## Commit & Pull Request Guidelines
Git history is unavailable in this checkout, so no repository-specific convention can be inferred. Use clear, imperative commit messages such as `Add course progress empty state` or `Fix Clerk redirect middleware`.

Pull requests should include a short summary, affected routes or APIs, setup or migration notes, and screenshots for visible UI changes. Link related issues when available and mention the verification performed, especially `npm run build`.

## Security & Configuration Tips
Keep secrets in `.env.local` or `.env`, never in source files. Required values include Clerk keys, Clerk redirect URLs, and `DATABASE_URL`; use `.env.example` only as a template and rotate any exposed credentials.
