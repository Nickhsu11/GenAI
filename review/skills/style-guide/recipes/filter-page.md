# Filter page — Canonical Rules (trimmed for demo)

> Machine-readable source of truth for filter/search pages. Agents read THIS file.

A filter page is two sections inside the page card:
1. **Filters** — a `<form>` with a grid of filter inputs + a button row.
2. **Divider** — 1px line at `var(--color-neutral-500)`, horizontal margin `32px`.
3. **Results** — `DemoTable` + built-in `Paginator`, **server-driven**.

## §1 Filtering is ALWAYS server-side — never on the client
> **🔴 STRONG RULE** (see also `react-patterns.md §3`).

- Filter values are sent as **query params** to the generated list hook; the backend narrows the data.
- **Never** `.filter()`, `.sort()`, or `.slice()` the response to narrow/reorder/paginate it — **🔴 Blocking**.
- A filter input whose value never reaches a query param (so the request never changes) is a **🔴 Blocking** violation.
- When filters change, reset the paginator to page 1.

## §2 Filters live in a `<form>`
- The filter section is a `<form onSubmit={…}>`, never a plain `<div>` — so pressing Enter triggers the search.
- A filter section that is not a `<form>` is a **🟡 Minor** violation.

## §3 Button row
- Always the last child of the filter column, `justifyContent: 'flex-end'`, `gap: '32px'`.
- **Pesquisar** is `type="submit"` (primary); **Limpar** is `type="button"` with `onClick` (secondary).
- A Pesquisar button wired with `onClick` instead of `type="submit"` is a **🟡 Minor** violation.

## §4 Grid gap
- Every filter input grid uses `gap: '32px'` and `alignItems: 'start'`. A different gap is a **🟡 Minor** violation.
