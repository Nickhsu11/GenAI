# Filter page — Canonical Rules

> Machine-readable source of truth for filter/search pages in the Demo frontoffice and backoffice.
> This recipe is **agent-only** today — there is no React preview at `/style-guide/filter-page` yet. When the preview is built, register it in `services/frontoffice/frontend/src/features/style-guide/sections.ts`.
> **Agents read this file. Do not parse the legacy `demo-filter-page` agent (now deleted) for rules.**

A filter page in Demo is composed of exactly two sections inside the main card:

1. **Section 1 — Filters** — a `<form>` with a grid of filter inputs and a button row (Limpar / Pesquisar).
2. **Divider** — 1px line at `--color-neutral-500`, horizontal margin 32px.
3. **Section 2 — Results table** — `DemoTable` + `Paginator`, server-driven.

Filter pages **do** use `<Breadcrumb>` at the top (unlike form pages, which use `← Voltar`).

---

## 0. Interview before writing

Before generating, gather these answers using `vscode/askQuestions`. Never assume.

### Phase 1 — Page identity (ask all at once)

1. **Project** — `backoffice` or `frontoffice`.
2. **Component name** — PascalCase, e.g. `ListagemPessoasFO`.
3. **File location** — folder path, e.g. `src/features/playground/filter-page/`.
4. **File name** — including extension, e.g. `DemoFilterPage.tsx`.
5. **Route path** — e.g. `/pessoas`.
6. **Breadcrumb items** — list of `{ label, url? }`; the last item has no `url`.
7. **Initial load** — does the table load on mount (`fetchAll`), or only after the user clicks Pesquisar?

### Phase 2 — Filter fields (one batch)

Ask for all filter fields in this pipe format:

```
FieldName | InputType | Placeholder | readOnly | maxCharacters | required | spaces
```

| Column | Meaning |
|---|---|
| `FieldName` | Display label, Portuguese |
| `InputType` | `InputText`, `InputNumber`, `InputSelect`, `InputDate`, `Checkbox` |
| `Placeholder` | Text when empty; `-` if none |
| `readOnly` | `true` / `false` |
| `maxCharacters` | Char limit (only for `InputText`); `-` otherwise |
| `required` | `true` / `false`. Default for filter pages is `false`. |
| `spaces` | Grid units the field occupies (1 = normal `1fr`, 2 = wide `2fr`, 3 = extra-wide `3fr`) |

**Prompt to show the user (Portuguese):**

> Descreva os campos do filtro com o formato:
> `Nome do campo | Tipo de input | Placeholder | readOnly | maxCaracteres | obrigatório | espaços ocupados`
> Os **espaços ocupados** definem quantas colunas o campo ocupa na grelha (1 = normal, 2 = largo, etc.).

After receiving the list, derive state variable names automatically (camelCase, Portuguese-safe). Confirm with the user only if any name is ambiguous.

**Input type mapping (strict):**

| Semantic meaning | Component | Notes |
|---|---|---|
| Full date (day/month/year) | `InputDate` | — |
| Year only | `InputNumber` | `min={1900}`, `max={new Date().getFullYear()}`, `placeholder="AAAA"` |
| Free text | `InputText` | — |
| Fixed known set of options | `InputSelect` | one `DropdownOption` per value |
| Boolean flag | `Checkbox` | — |
| Integer / decimal | `InputNumber` | — |
| Time range | two `InputDate` fields | labels "De" and "Até" |

- **Never** use `InputDate` when only a year is needed.
- **Never** use `InputText` when the valid values are a fixed list.

**For every `InputSelect`** ask in one follow-up batch: backend API endpoint (URL + method) or static list (values + labels)?

### Phase 3 — API connections

1. **Search endpoint** — HTTP method + URL (e.g. `GET /api/pessoas/pesquisar`).
2. **Query parameters** — which filter state vars map to which query params?
3. **Response shape** — row object field names + types.
4. **Entity type name** — PascalCase (e.g. `Pessoa`).
5. **Dropdown option endpoints** — list each `InputSelect`'s API endpoint.

If the user does not yet know the backend endpoints, delegate the design to `demo-backend`:

```
Design the search endpoint for <Entity> with these filter params: <list>.
Also design option-list endpoints for: <list of dropdown fields>.
Return: HTTP method, URL path, request params, and response DTO shapes.
```

Present the proposed endpoints to the user for confirmation before generating.

### Phase 4 — Table columns

1. **Column headers** — ordered list (e.g. `['Nome', 'NIF', 'Estado', '']`). The trailing empty string is the action column.
2. **Column widths** — per column, in CSS units (`"182.67px"`, `"15%"`, `"auto"`). Action column is typically `auto`.
3. **Field mapping** — which `row.<field>` renders in each column.
4. **Cell style** — per column: default (`text-s-regular text-neutral-900`), dimmed (`text-neutral-600`), bold (`text-s-semibold`), numeric (`tabular-nums`).
5. **Status column?** — if yes, list the status values and their `success / informative / warning / danger` mapping.
6. **Action link destination** — e.g. `` `/pessoas/${row.id}` ``.

### Core rule — no assumptions

Generate **only** what the user explicitly answered. Never add: page title `<h1>`, result-count paragraphs, helper text, instructional copy, placeholder messages beyond the loading/empty states, extra sections, or any UI element not listed in the answers. If unsure whether something was asked, **ask again** — never assume.

---

## 1. Outer wrapper

```tsx
<div className="bg-neutral-50 p-32">
```

## 2. Breadcrumb (always first, `mb-24` below)

```tsx
const BREADCRUMB_ITEMS = [{ label: 'Início', href: '/' }, /* … */];

<div className="mb-24">
  <Breadcrumb items={BREADCRUMB_ITEMS} />
</div>
```

## 3. Main card

- **Frontoffice**: `<Pad>` from `../../shared/components/common/Pad`.
- **Backoffice**: inline `<div className="bg-white" style={{ border: '1px solid var(--color-neutral-100)', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.06)' }}>`.

## 4. Section 1 — Filters container

```tsx
<form
  className="p-32"
  onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {/* grid rows go here */}
    {/* button row goes here, always last */}
  </div>
</form>
```

Never use a plain `<div>` as the filter section wrapper. The `<form>` enables pressing Enter inside any field to trigger search.

### Grid distribution by field count

The **button row is always its own row** — always the last child inside the flex column, with `justifyContent: 'flex-end'` and `gap: '32px'`. Never inline with fields.

| # fields | Row grids |
|---|---|
| 1 | `repeat(1, 1fr)` |
| 2 | `repeat(2, 1fr)` |
| 3 | `repeat(3, 1fr)` |
| 4 | `repeat(4, 1fr)` |
| 5 | one `repeat(3, 1fr)` row (6 cells, last one empty) |
| 6 | `repeat(3, 1fr)` × 2 rows |
| 7 | `repeat(3, 1fr)` + `repeat(4, 1fr)` |
| 8 | `repeat(4, 1fr)` × 2 rows |
| 9 | `repeat(3, 1fr)` × 3 rows |
| 10 | `repeat(3, 1fr)` × 2 + `repeat(4, 1fr)` |

Always add `alignItems: 'start'` and `gap: '32px'` to every grid row — **32px is mandatory, never 16px**.

### Wide fields (deviating from equal columns)

When a row has Wide fields, compute `gridTemplateColumns` explicitly:

- Each Normal field → `1fr`
- Each Wide field → `2fr`

Example — 1 Wide + 2 Normal:

```tsx
<div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '32px', alignItems: 'start' }}>
```

Row unit math:

- All Normal → units = field count.
- With Wide → units = (Wide × 2) + (Normal × 1).

## 5. Button row (exact shape, always last)

```tsx
{/* Button row — always its own row, always last */}
<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '32px' }}>
  <Button
    type="button"
    variant="secondary"
    appearance="outlined"
    hasIcon
    leadingIcon="agora-line-trash"
    leadingIconHover="agora-solid-trash"
    onClick={handleClear}
    disabled={loading}
  >
    Limpar
  </Button>
  <Button
    type="submit"
    variant="primary"
    appearance="solid"
    hasIcon
    leadingIcon="agora-line-search"
    leadingIconHover="agora-solid-search"
    disabled={loading}
  >
    {loading ? 'A pesquisar…' : 'Pesquisar'}
  </Button>
</div>
```

- Pesquisar is **always** `type="submit"`, never `onClick`.
- Limpar is **always** `type="button"` with `onClick={handleClear}`.

### `handleClear` — always alongside `handleSearch`

```tsx
const handleClear = useCallback(() => {
  setNome('');          // string → ''
  setAltura('');        // number | '' → ''
  setObeso(false);      // boolean → false
  // …one line per filter state var
}, []);
```

Reset rules:

- String state → `''`
- Numeric state (`number | ''`) → `''`
- Boolean state → `false`

## 6. Filter state typing & params building

| State type | `useState` initial | Conditional spread |
|---|---|---|
| String | `useState('')` | `...(nome !== '' && { nome })` |
| Numeric | `useState<number \| ''>('')` | `...(altura !== '' && { altura: Number(altura) })` |
| Boolean | `useState(false)` | `...(obeso && { obeso })` |

```tsx
const params = {
  ...(nome     !== '' && { nome }),
  ...(corOlhos !== '' && { corOlhos }),
  ...(altura   !== '' && { altura: Number(altura) }),
  ...(obeso         && { obeso }),
};
```

- **Never** pass a raw string to an API field typed as `number`.
- **Never** pass an empty string where the API expects `undefined` / `null`.

## 7. Input rules (per field type)

- **InputText** — always `required={false}` (filter page default); add `maxLength={N}` when there is a char limit.
- **InputSelect** — always `required={false}` and `hideSectionNames`; first `DropdownOption` has `value=""` as placeholder; options from API → mark with `{/* PLACEMENT */}` until wired.
- **InputDate** — always `required={false}`.
- **InputNumber** — always `required={false}`.
- **Checkbox** — use the native boolean for the `checked` prop.

> **🔴 NO helper text on filter fields** — Do NOT add `hasHelperText` / `helperText="Este campo é opcional"` to any filter field. On a filter page every field is implicitly optional by design; the helper text is reserved for form pages only (see `inputs.md §Required vs Optional`). Adding it to filter fields is a rule violation.

## 8. Divider (between Section 1 and Section 2 — **MANDATORY** — exact shape)

> **🔴 Every filter page MUST have this divider between the filter form and the results table. Missing divider = rule violation.**

```tsx
<div style={{ height: '1px', background: 'var(--color-neutral-500)', margin: '0 32px' }} />
```

## 9. Data-fetching — two separate functions, never merged

Every filter page has **exactly two** async functions. Never combine them.

### State variables

```tsx
const [rows,    setRows]    = useState<YourRow[]>([]);
const [loading, setLoading] = useState(false);
const [error,   setError]   = useState<string | null>(null);
const controllerRef = useRef<AbortController | null>(null);
```

### `fetchAll` — no filter params, called on mount

```tsx
const fetchAll = useCallback(async () => {
  if (controllerRef.current) controllerRef.current.abort();
  const controller = new AbortController();
  controllerRef.current = controller;
  setLoading(true);
  setError(null);
  try {
    // PLACEMENT: const data = await searchYourEntity({}, { signal: controller.signal });
    // setRows(data);
    throw new Error('API not connected yet — replace this block');
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') return;
    setError(err instanceof Error ? err.message : 'Erro ao carregar dados.');
    setRows([]);
  } finally {
    // finally runs even after an AbortError early-return — this guard stops the
    // aborted call from clearing loading while the next call is still running.
    if (!controller.signal.aborted) setLoading(false);
  }
}, []);

useEffect(() => { fetchAll(); }, [fetchAll]);
```

### `handleSearch` — reads filter state, called ONLY on form submit

```tsx
const handleSearch = useCallback(async () => {
  if (controllerRef.current) controllerRef.current.abort();
  const controller = new AbortController();
  controllerRef.current = controller;
  setLoading(true);
  setError(null);
  try {
    const params = {
      // PLACEMENT: conditional spread per filter state var
      // ...(nome !== '' && { nome }),
    };
    // PLACEMENT: const data = await searchYourEntity(params, { signal: controller.signal });
    // setRows(data);
    throw new Error('API not connected yet — replace this block');
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') return;
    setError(err instanceof Error ? err.message : 'Erro ao carregar dados.');
    setRows([]);
  } finally {
    if (!controller.signal.aborted) setLoading(false);
  }
}, [/* ⚠ list EVERY filter state var here — missing deps cause stale closures */]);
```

### Cleanup on unmount

```tsx
useEffect(() => {
  return () => controllerRef.current?.abort();
}, []);
```

Rules:

- **Never** put `handleSearch` inside a `useEffect`.
- **Never** use `[]` as the dep array for `handleSearch` — it reads filter state.
- No mock data, no client-side filtering — all filtering is server-side.

## 10. Section 2 — Table

Always use the shared `DemoTable` + `Paginator` from `src/shared/components/common/`. Never hand-write `<table>` / `<thead>` / `<tbody>` in filter pages.

```tsx
import { DemoTable } from '../../shared/components/common/DemoTable';
import { Paginator } from '../../shared/components/common/Paginator';

<div className="p-32">
  {error && (
    <p className="text-s-regular text-danger-600 mb-16">{error}</p>
  )}

  <DemoTable aria-label="Resultados de <entidade>">
    <DemoTable.Header>
      <DemoTable.Column width="182.67px">Estabelecimento</DemoTable.Column>
      <DemoTable.Column width="142px">Data submissão</DemoTable.Column>
      <DemoTable.Column width="120px">Estado</DemoTable.Column>
      <DemoTable.Column>{''}</DemoTable.Column>   {/* actions column */}
    </DemoTable.Header>

    <DemoTable.Body
      loading={loading}
      empty={rows.length === 0}
      loadingLabel="A carregar…"
      emptyLabel="Nenhum resultado encontrado."
      // If the page waits for user input before searching:
      // emptyLabel="Use os filtros acima para pesquisar."
    >
      {rows.map((row) => (
        <DemoTable.Row key={row.id}>
          <DemoTable.Cell>{row.nome}</DemoTable.Cell>
          <DemoTable.Cell>{row.dataSubmissao}</DemoTable.Cell>
          <DemoTable.Cell>
            <Pill variant={PILL_VARIANT[row.estado]}>{row.estado}</Pill>
          </DemoTable.Cell>
          <DemoTable.Cell fill align="center">
            <a
              href={`/entity/${row.id}`}
              className="table-link"
              style={{ display: 'block', width: '100%', height: '100%', padding: '12px 16px' }}
            >
              Ver detalhe
            </a>
          </DemoTable.Cell>
        </DemoTable.Row>
      ))}
    </DemoTable.Body>

    {!loading && totalElements > 0 && (
      <DemoTable.Footer>
        <Paginator
          total={totalElements}
          page={page + 1}                              // Paginator is 1-based; API is 0-based
          pageSize={pageSize}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          onPageChange={(p) => setPage(p - 1)}
          onPageSizeChange={(s) => { setPageSize(s); setPage(0); }}
        />
      </DemoTable.Footer>
    )}
  </DemoTable>
</div>
```

Rules:

- `DemoTable.Header` is 80px tall by default — override only when the design spec demands otherwise (`<DemoTable.Header height={...}>`).
- `DemoTable.Column width` accepts any CSS width string; omit it for flex/auto columns.
- The action column always uses `<DemoTable.Cell fill align="center">` so the link/button can fill the cell.
- Loading / empty / error rendering is handled by `DemoTable.Body` — never wrap the table in conditional `loading ?` / `empty ?` blocks.
- Striping is automatic. Do not pass `striped`.
- Always pass `aria-label` on `<DemoTable>` describing the dataset.
- **🔴 `<Paginator>` inside `<DemoTable.Footer>` is MANDATORY on every filter page** — a filter page table without a paginator is a rule violation. Never omit it, even when the first version has no backend pagination yet (use client-side pagination as a placeholder).
- `Paginator` lives inside `<DemoTable.Footer>` — never outside the table.

### Pagination state (alongside the other state vars)

```tsx
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

const [page, setPage]         = useState(0);   // 0-based for the API
const [pageSize, setPageSize] = useState(10);
const [totalElements, setTotalElements] = useState(0);
```

Update `fetchAll` / `handleSearch` to pass `{ page, size: pageSize }` (plus filter params) to the search call, and to set both `setRows(data.content)` and `setTotalElements(data.totalElements)` from the paginated response.

### Status pill

```tsx
type MyStatus = 'Aprovado' | 'Pendente' | 'Atenção' | 'Rejeitado';
const PILL_VARIANT: Record<MyStatus, 'success' | 'informative' | 'warning' | 'danger'> = { /* … */ };
<Pill variant={PILL_VARIANT[row.estado]}>{row.estado}</Pill>
```

## 11. API service wiring

```tsx
// PLACEMENT: replace with the real API service import
// import { searchYourEntity } from '../../shared/services/yourEntityService';
```

Use `apiClient` from `../../shared/services` (baseURL `/api`) when wiring real calls.

## 12. Output location

```
services/<PROJECT>/frontend/src/features/<featureName>/
  <ComponentName>.tsx      ← the page component
  Prompt.md                ← per-page spec (see below)
```

Also add the route to `services/<PROJECT>/frontend/src/App.tsx`, following the existing route pattern.

### Per-page spec file (`Prompt.md`)

After generating the component, also write a `Prompt.md` in the same feature folder documenting:

- Component name and route
- Breadcrumb items
- Filter fields (label, type, state var, placeholder, constraints)
- Filter logic (server-side)
- Table columns (header, field, style, special rendering)
- Entity interface
- Any deviation from this recipe (and why)

## 13. Page Lab registration (frontoffice only — mandatory)

After generating the component, **always** register it in the Page Lab (`/lab`). The lab lives at `services/frontoffice/frontend/src/features/playground/Playground.tsx`.

Add exactly three things:

```tsx
// 1. Lazy import (near the other lazy imports)
const <ComponentName>Comp = React.lazy(() =>
  import('../<featureName>/<ComponentName>').then((m) => ({
    default: m.<ComponentName> as React.FC,
  })),
);

// 2. Raw MD import (near the other MD imports)
import <ComponentName>PromptMd from '../<featureName>/Prompt.md?raw';

// 3. Folder entry in TREE
{
  kind: 'folder', name: '<featureName>', children: [
    { kind: 'tsx', name: '<ComponentName>.tsx', component: <ComponentName>Comp },
    { kind: 'md',  name: 'Prompt.md',           content: <ComponentName>PromptMd },
  ],
},
```
