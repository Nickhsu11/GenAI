# Tables — Canonical Rules (trimmed for demo)

> Machine-readable source of truth for table patterns. Agents read THIS file —
> never parse the `.tsx` for rules.

All data lists go through the project-owned **`DemoTable`** compound component.
Never use raw `<table>/<thead>/<tbody>/<tr>/<td>` in pages.

## §1 Pagination is mandatory on result lists
- A list driven by filters/pagination MUST pass `pagination={{ total, page, pageSize, onPageChange, onPageSizeChange }}`.
- The built-in `Paginator` renders automatically when `total > 0`.
- Omitting pagination on a paginated result list is a **🔴 Blocking** violation.

## §2 No inline padding on table parts
- Canonical cell padding (`4px 16px` header, `12px 16px` body) is set by `DemoTable.css`.
- Inline `style={{ padding }}` or padding utilities on `DemoTable.Column / Cell` is a **� Minor** violation — visual inconsistency only, no functional or a11y impact (per `severity/SKILL.md` §3).

## §3 Cell text contract
- Cell text uses `text-s-regular` + `text-neutral-900` (handled by `DemoTable.Cell`). Do not re-style.

## §4 Action columns
- Row actions use the canonical button recipe (see `buttons.md`) inside `<DemoTable.Cell fill align="center">`.
- A raw `<button>` with inline styles inside a cell is a **🔴 Blocking** violation (per `buttons.md`).

## §5 Header visual baseline
- The header row uses background `bg-demo-table-header` (`#BFDFDD`), text `text-neutral-800`, weight `600`, and **height `80px`**.
- `DemoTable.Header` SHOULD render the header row at the canonical `80px` height (its `height` prop defaults to `80`). A header rendered at a non-canonical height is a **🟡 Minor** violation — visual baseline only (per `severity/SKILL.md` §3).

## §6 Paginator — use the built-in component
- Pagination MUST be rendered by the built-in `Paginator` (via the `pagination` prop on `DemoTable`, which imports `Paginator` from `../Paginator`).
- **Never reimplement** the rows-per-page / info / prev-next controls by hand. A hand-rolled paginator is a **🔴 Blocking** violation.
