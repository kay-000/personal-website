<!-- Copilot instructions for agents working on the personal_site repo -->

# Quick Context

This is a small Vite + React (TypeScript) personal website. Key entry points and conventions:

- `package.json`: project scripts and deps.
- `vite.config.ts`: development server and build settings.
- `src/main.tsx` -> `src/App.tsx`: app bootstrap and root component.
- `src/components/`: UI components (e.g., `Login.tsx`, `LinkedInProfile.tsx`).
- `src/utils/Draggable.tsx`: internal utility for drag behavior used by `Desktop`/`Window` components.

**Primary goal for agents:** make targeted, minimal edits that preserve the site's single-page structure and Vite build behavior. Avoid broad refactors unless requested.

## Architecture & Data Flow

- The app is client-rendered with Vite; there is no server-side rendering. State is local to components or passed via props — there is no global store file.
- `App.tsx` composes `Desktop` and other components; `Desktop` manages a collection of `Window` components and uses `Draggable` for movement.
- Components favor small, focused files (look at `src/components/*` for examples).

## Build / Dev / Debug Commands

- Start dev server: `npm run dev` (from `package.json`).
- Build production: `npm run build`.
- Preview production build locally: `npm run preview`.

If any CI or test commands are present in `package.json`, prefer using those exact scripts.

## Project-specific Conventions

- TypeScript strictness follows the repo `tsconfig.json`; keep new files typed and avoid `any` unless justified.
- Styles are colocated in `src/styles/` with CSS files named after components (e.g., `LinkedinProfile.css`). Follow the existing class naming patterns; CSS modules are not used.
- UI components are function components (React + hooks). Use the same style and hooks where appropriate.
- Small utilities live in `src/utils/`; prefer reusing them instead of adding new ad-hoc helpers.

## Integration Points & External Dependencies

- Peer dependencies and dev tooling are managed by `package.json` (Vite, React, TypeScript, plugin-react for Fast Refresh). See top-level `README.md` for hints about Babel/Fast Refresh.
- No external APIs or servers are defined in the repo; assume changes are local-only unless an API client or URL is explicitly present.

## Patterns & Examples to Follow

- Drag behavior: follow `src/utils/Draggable.tsx` when implementing movable UI.
- Component composition: `src/App.tsx` -> `Desktop.tsx` -> `Window.tsx` demonstrates passing callbacks for open/close and state lifting.
- Keep component files small and CSS separate (see `src/components/Icon.tsx` + `src/styles/Icon.css`).

## PR / Edit Guidelines for Agents

- Make targeted changes with minimal surface area. Explain intent in the PR description or commit message.
- Update or add one test or a manual verification note if behavior changes (this repo currently has no test harness; document manual steps to verify).
- Run `npm run dev` locally to sanity-check UI changes; list a short manual verification checklist in the PR.

## When You Need Clarification

- Ask which browsers and screen sizes are prioritized before making layout-heavy changes.
- Ask the maintainer whether new dependencies are allowed; avoid adding packages without approval.

---

If anything here is unclear or you need more examples from specific files, tell me which area to expand (architecture, scripts, or component examples) and I will update this file.
