# Breadcrumb — Canonical Rules

> Machine-readable source of truth for the Breadcrumb pattern in the Demo frontoffice.
> The `.tsx` files under `services/frontoffice/frontend/src/features/style-guide/sections/breadcrumb/` render this guidance for humans at `/style-guide/breadcrumb`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

All breadcrumbs MUST use `<Breadcrumb>` from `@ama-pt/agora-design-system`. Never roll a custom trail with `<nav>` + `<a>`.

## Where to place it

- **Listing pages, detail pages, dashboards**: render the breadcrumb at the top of the page, immediately **above** the `<h1>` page title.
- **Form pages**: do **not** use a breadcrumb. Form pages render a `← Voltar` link instead — see [form-layout.md](./form-layout.md).

## Contract

| Prop | Value |
|---|---|
| `items` | `BreadcrumbLink[]` ordered from most general → most specific. The last item is the current page. |
| `sectionTitle` | Title of the current page. AgoraDS shows it as the only visible item on mobile. |

Each `BreadcrumbLink` is `{ url, label }`:

- `url`: absolute in-app path (`/`, `/estabelecimentos`, `/estabelecimentos/:id`). Never external URLs.
- `label`: the human label, Portuguese, in title case.

The **last item** represents the current page; AgoraDS renders it as text (not a link). Pass it with its `url` set to the current route — AgoraDS suppresses the anchor.

## Snippet

```tsx
import { Breadcrumb } from '@ama-pt/agora-design-system';

<Breadcrumb
  items={[
    { url: '/', label: 'Início' },
    { url: '/estabelecimentos', label: 'Estabelecimentos' },
    { url: '/estabelecimentos/123', label: 'Detalhe do estabelecimento' },
  ]}
  sectionTitle="Detalhe do estabelecimento"
/>
```

## Styling

- **Text colour**: `#2B363C` (Demo override) on `<a>` and `<span>`. Applied globally via `services/shared/frontend/styles/breadcrumb.css` — never inline.
- **Focus / selection outline**: AgoraDS' pink focus ring is suppressed (`outline: none !important; box-shadow: none !important`) on `normal/:hover/:focus/:focus-visible/:active`. No focus border is shown.
- **Underline**: AgoraDS native behaviour — do not override.
  - **Navigable items** (non-empty `url` → `<a>`) → AgoraDS native underline; behaviour on hover is AgoraDS default. Do **NOT** add `text-decoration: underline` or `border-bottom` on `<a>` — it stacks above the native stroke and produces two parallel lines.
  - **Static non-current items** (empty `url` but not last → `<span>`) → no underline (AgoraDS does not draw one on `<span>`).
  - **Current page** (last item, any `url`) → no underline; AgoraDS renders it as text.
- **To show an underline on an item**, give it a non-empty `url` (use `'#'` as a placeholder if no destination yet). Empty `url` renders as `<span>` and gets no underline by design.
- Separator glyph and hover state are AgoraDS defaults. Do **not** override them.
- Do **not** reproduce the text-colour overrides inline — they are already applied globally by `breadcrumb.css`.

## Spacing (mandatory)

🔴 The breadcrumb MUST sit **32px from the left edge of the page** and **32px from the top**. Enforce this with the page wrapper, not on the breadcrumb itself:

```tsx
<div className="bg-neutral-50 p-32 min-h-screen">
  <div className="mb-24">
    <Breadcrumb items={BREADCRUMB_ITEMS} />
  </div>
  {/* …rest of page… */}
</div>
```

- `p-32` on the outer wrapper provides the 32px on every side (left + top + right + bottom).
- Do **NOT** add `padding` / `margin` directly on `<Breadcrumb>` or its immediate wrapper — the rule lives on the page-level wrapper so it composes consistently with the card, divider, and table that follow.
- The 32px is fixed: do not use 16px, 24px, or any other value.
