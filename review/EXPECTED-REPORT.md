# Frontend review — web/src/features/establishments/EstablishmentsPageDirty.tsx — 2026-06-23

> This is the report the `demo-frontend-reviewer` produces when run against the dirty page.
> It doubles as evidence of the audit: every guideline violation caught automatically, each
> with a recipe citation. The same file is rendered in the app's "⚠️ Página com erros" tab,
> so the code the reviewer flags is the code on screen.

## Scope
- Files reviewed: 1
- Recipes consulted: tables, buttons, typography, inputs, filter-page, react-patterns

## 🔴 Blocking
- `EstablishmentsPageDirty.tsx:41-48` — **client-side filtering**: the list is narrowed with `.filter()` in the browser instead of sending `nome`/`estado` to the backend as query params. This MUST be a server-side search (per `react-patterns.md §3` and `filter-page.md §1`).
- `EstablishmentsPageDirty.tsx:27-32` — data loaded with a hand-written `fetch` + `useEffect` instead of the generated `useListEstablishments` hook (per `react-patterns.md §1`).
- `EstablishmentsPageDirty.tsx:56-65` — raw `<input>` and `<select>` used instead of AgoraDS `InputText` / `InputSelect` (per `inputs.md §1`).
- `EstablishmentsPageDirty.tsx:52` — page title faked with a styled `<div>` instead of a semantic `<h1>` (per `typography.md §1`).
- `EstablishmentsPageDirty.tsx:72` — paginated result list rendered with no `pagination` prop on `DemoTable` (per `tables.md §1`).
- `EstablishmentsPageDirty.tsx:92-95` — raw `<button>` styled with inline `style={{}}` instead of `className="demo-btn demo-btn-link"` (per `buttons.md §1`).
- `EstablishmentsPageDirty.tsx:94` — hardcoded brand hex `#008078` instead of `var(--color-primary-600)` (per `buttons.md §2`).

## 🟡 Minor
- `EstablishmentsPageDirty.tsx:28` — manual `loading` flag hand-rolled for an endpoint that already has a generated hook exposing `isLoading` (per `react-patterns.md §2`; derivative of the §1 finding).
- `EstablishmentsPageDirty.tsx:87` — inline `padding` applied inside a `DemoTable.Cell`, overriding canonical cell padding (per `tables.md §2`).

## 🟢 Clean
- None

## Verdict
- **BLOCK** — route back for fixes.
- The headline finding: **the filter searches on the client; it should be a backend search.**
