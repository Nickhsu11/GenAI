# Tables — Canonical Rules

> Machine-readable source of truth for table patterns in the Demo frontoffice.
> The `.tsx` files in this folder render this guidance for humans at `/style-guide/tables`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

Demo frontoffice does **not** consume AgoraDS' raw `Table` primitives. Instead, all tables go through one of two project-owned components:

- **`DemoTable`** — read-only data lists (filter results, related items, dashboards).
- **`EditableTable`** — rows can be added, edited inline and removed.

Never use raw `<table>/<thead>/<tbody>/<tr>/<td>` in pages. Never import `Table`, `TableRow`, `TableCell` from `@ama-pt/agora-design-system` directly.

## Typography & Component Contract

Tables inherit styling rules from other style-guide sections:

- **Cell text** uses `text-s-regular` (small regular) + `text-neutral-900`, aligned with `typography.md`.
- **Status cells** render the estado as plain text — see [pills.md](../pills/pills.md) for when (and how) to wrap it in a `DemoPill`.
- **Row actions** must be `<Button>` from AgoraDS following `buttons.md` (no raw `<button>` even inside cells).

---

## dataTable

- **Component**: `DemoTable` (compound: `DemoTable.Header / Column / Body / Row / Cell / Footer`).
- **Use for**: read-only lists driven by filters, pagination, or row navigation.
- **Required props**: `aria-label` on the root.
- **Optional pagination**: pass `pagination={{ total, page, pageSize, onPageChange, onPageSizeChange }}` — the built-in `Paginator` renders automatically when `total > 0`.
- **Column widths**: prefer explicit `width` on `DemoTable.Column` for the first columns; let the last column flex.
- **Row striping**: automatic — odd rows get `bg-demo-table-row-alt` (`#f4fafa`), even rows white. Do not override unless designed.
- **Row navigation**: pass `onClick` on `DemoTable.Row` — adds keyboard support (Enter / Space), pointer cursor, hover background, and `role="button"` automatically.
- **Action columns**: use `<DemoTable.Cell fill align="center">` and place a `<Button appearance="link">` inside; do **not** use a raw `<button>` with inline styles.
- **Status cells**: por defeito renderizar como texto simples — se for preciso destacar visualmente, ver [pills.md](../pills/pills.md).
- **Empty state**: pass `empty={rows.length === 0}` to `DemoTable.Body`; override the message with `emptyLabel`.
- **Loading state**: pass `loading={isLoading}` to `DemoTable.Body`; override the label with `loadingLabel="A carregar…"`.
- **Snippet**:
  ```tsx
  <DemoTable
    aria-label="Estabelecimentos"
    pagination={{ total, page, pageSize, onPageChange, onPageSizeChange }}
  >
    <DemoTable.Header>
      <DemoTable.Column width="200px">Estabelecimento</DemoTable.Column>
      <DemoTable.Column width="160px">Estado</DemoTable.Column>
      <DemoTable.Column>Período</DemoTable.Column>
      <DemoTable.Column width="120px" align="center">Ações</DemoTable.Column>
    </DemoTable.Header>
    <DemoTable.Body
      loading={isLoading}
      empty={rows.length === 0}
      emptyLabel="Nenhum resultado encontrado."
    >
      {rows.map((row) => (
        <DemoTable.Row key={row.id} onClick={() => navigate(`/estabelecimentos/${row.id}`)}>
          <DemoTable.Cell>{row.nome}</DemoTable.Cell>
          <DemoTable.Cell>{row.estado}</DemoTable.Cell>
          <DemoTable.Cell>{row.periodo}</DemoTable.Cell>
          <DemoTable.Cell fill align="center">
            <Button variant="primary" appearance="link" type="button">Detalhes</Button>
          </DemoTable.Cell>
        </DemoTable.Row>
      ))}
    </DemoTable.Body>
  </DemoTable>
  ```

## editableTable

- **Component**: `EditableTable<T>` (generic, takes a `columns` definition and a controlled `value` / `onChange`).
- **Use for**: lists where the user can add, edit, duplicate or remove rows inline.
- **Required props**: `columns: ColumnDef<T>[]`, `value: T[]`, `onChange: (rows: T[]) => void`, `emptyRow: T`.
- **Column definition**: each column declares `key`, `header`, `renderDisplay(val)` and `renderEdit(val, onChange, label)`. `renderEdit` MUST use AgoraDS inputs (`InputText`, `InputNumber`, `InputSelect`, `InputDate`) per `inputs.md`.
- **Row interactions**:
  - Click row or use ⋮ menu → **Editar**, **Duplicar**, **Eliminar**.
  - Checkbox column for multi-select; bulk **Eliminar** appears in the toolbar when ≥1 row is selected.
  - **Adicionar linha** button appears below the table.
- **Do NOT** hand-roll editable behaviour with `useState` arrays + raw inputs. Use `EditableTable`.
- **Snippet**:
  ```tsx
  type Origem = { tipo: string; quantidade: number };

  const columns: ColumnDef<Origem>[] = [
    {
      key: 'tipo',
      header: 'Tipo de origem',
      renderDisplay: (v) => v,
      renderEdit: (v, onChange, label) => (
        <InputText label={label} name="tipo" value={v as string} onChange={(e) => onChange(e.target.value)} />
      ),
    },
    {
      key: 'quantidade',
      header: 'Quantidade (t)',
      renderDisplay: (v) => String(v),
      renderEdit: (v, onChange, label) => (
        <InputNumber
          label={label}
          name="quantidade"
          value={v as number}
          increaseButtonAltText="Aumentar"
          decreaseButtonAltText="Diminuir"
          onChange={(e) => onChange(Number(e.target.value))}
        />
      ),
    },
  ];

  <EditableTable<Origem>
    columns={columns}
    value={origens}
    onChange={setOrigens}
    emptyRow={{ tipo: '', quantidade: 0 }}
  />
  ```

---

## Cross-cutting

### Visual baseline

> **🔴 Cell padding is canonical — 16px left/right on every cell, header and body.**
> Never override horizontal padding on `DemoTable.Column`, `DemoTable.Header`, or `DemoTable.Cell` with inline styles or Tailwind utilities.

- **Header background**: `bg-demo-table-header` (`#BFDFDD`), text `text-neutral-800`, weight `600`, height `80px`.
- **Header cells**: `padding: 4px 16px` — **16px horizontal is fixed, do not override**.
- **Row striping**: odd rows `bg-demo-table-row-alt` (`#f4fafa`); even rows `bg-demo-table-row` (`#ffffff`).
- **Clickable rows**: hover background `var(--color-primary-50)`, `cursor: pointer`, `role="button"`, `tabIndex=0`.
- **Cells**: `padding: 12px 16px` — **16px horizontal is fixed, do not override**.
- **Action cells**: use `fill align="center"` to let the embedded button take the entire cell area.
- **State cells (empty/loading)**: centered, `padding: 48px 16px`, `text-s-regular text-neutral-400`.
- **Responsive**: horizontal scroll via `.demo-table-wrap { overflow-x: auto; }`. No column hiding.

### Pagination

- Use the built-in `Paginator` via the `pagination` prop on `DemoTable`. Never reimplement the rows-per-page / nav controls.
- Page index is **1-based**.
- Default page-size options: `[5, 10, 25, 50]`. Override only when business rules demand it.

### Accessibility

- Root `aria-label` is required and must describe the table content (e.g. `"Estabelecimentos"`, `"Origens da entrada"`).
- Clickable rows are keyboard-activated with **Enter** or **Space** automatically; do not add manual key handlers.
- Status text in cells deve ser legível em pt-PT — nunca apenas ícone, nunca apenas `—`.

### Forbidden patterns

- ✗ Raw `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>` in feature pages.
- ✗ Direct imports of `Table`, `TableRow`, `TableCell`, `TableHeaderCell`, `TablePagination` from `@ama-pt/agora-design-system`.
- ✗ Raw `<button>` inside a cell — use `<Button>` (`buttons.md`).
- ✗ Inline `style={{ background, padding, borderCollapse }}` on table elements — all styling lives in `DemoTable.css` / `EditableTable.css` / `global.css`.
- ✗ Overriding horizontal cell padding — 16px left/right on header cells (`padding: 4px 16px`) and body cells (`padding: 12px 16px`) is canonical and must not be changed via `style={{}}`, Tailwind, or CSS overrides.
- ✗ Reimplementing pagination, striping, hover, empty/loading state — the components already handle these.

---

## Dependencies

Tables do **not** define their own typography, inputs, buttons, or pills. They **reference and inherit** from:

- **Typography contract** (`typography.md`): cell text uses `text-s-regular text-neutral-900`; column headers use `text-neutral-800` weight `600`.
- **Buttons contract** (`buttons.md`): row-action buttons (Detalhes, Editar, Eliminar) follow the standard Button recipes — no raw `<button>`.
- **Inputs contract** (`inputs.md`): editable cells use AgoraDS inputs (`InputText`, `InputNumber`, `InputSelect`, `InputDate`) per the input recipes.
- **Pills contract** ([pills.md](../pills/pills.md)): se uma célula de estado precisar de destaque visual, usar `DemoPill` — nunca AgoraDS `Pill` direto, nunca `<span>` estilizado.
- **Icons contract** ([icons.md](../icons/icons.md)): ícones em row actions e cabeçalhos (`agora-line-edit`, `agora-line-trash`, `agora-line-document`, `agora-line-more-vertical`, `agora-line-settings`, `agora-line-check`) vêm sempre do catálogo.

If a table-specific visual differs from these recipes, fix the underlying component CSS in `DemoTable.css` / `EditableTable.css` — do not override per consumer.

---

## Tech-debt

- `CDR1Mockup.tsx` still contains 3 raw `<table>` blocks with heavy inline styling and a local `TablePagination` mock. These predate `DemoTable` and must migrate.
- `EstabelecimentosPage.tsx` uses a raw `<button className="table-link">` inside an action cell instead of the AgoraDS `Button` link recipe. The `table-link` class is undefined in `global.css`. Replace with `<Button appearance="link">` per `buttons.md`.
- `DemoTable` does not yet expose sortable headers. AgoraDS provides `TableHeaderCell` with `sortType` / `sortOrder` / `onSortChange`. When sorting is required, extend `DemoTable.Column` rather than building per-page sort UI.
