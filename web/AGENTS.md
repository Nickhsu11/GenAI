# Demo — Frontend Conventions

This is a **single standalone Vite + React + TS app** that mirrors the real Demo
frontoffice patterns for the GenAI QuickWins demo. There is no backoffice/frontoffice
split here — everything lives under `web/`.

## Path mapping (real project → this demo)
| Real Demo | This demo |
|---|---|
| `services/<project>/frontend/src/features/<name>/` | `web/src/features/<name>/` |
| `services/<project>/frontend/src/components/` | `web/src/components/` |
| `services/shared/frontend/styles/` | `web/src/styles/shared/` |
| `src/api/generated/` (orval output) | `web/src/api/generated/` |

When a skill cites a `services/...` path, apply the rule but write to the demo path above.

## Stack
- React 19, TypeScript, Vite.
- `@ama-pt/agora-design-system` v3.6.1 (AgoraDS) for components + tokens + Tailwind config.
- TanStack Query v5 for data.
- **orval** generates the typed react-query client from the live OpenAPI spec
  (`http://localhost:8099/api-docs`) into `web/src/api/generated/`. **Never hand-write fetch
  code for an endpoint the generated client already covers.** Regenerate with `npm run api:gen`
  (the API must be running first).

## Project components
- Data lists use the project-owned `DemoTable` compound component
  (`web/src/components/DemoTable/`) with its built-in `Paginator` — never raw `<table>`.

## Styling
- The Demo style chain is imported in `web/src/main.tsx` (AgoraDS tailwind.css → AgoraDS
  style.css → shared `global.css`). Use the shared classes/tokens; never hardcode brand hex.

## Validation (must pass before declaring done)
```bash
cd web
npx tsc -b        # type-check, 0 errors
npm run build     # production build must succeed
```
