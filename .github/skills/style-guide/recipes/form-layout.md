# Form layout — Canonical Rules

> Machine-readable source of truth for form pages in the Demo frontoffice.
> The `.tsx` files under `services/frontoffice/frontend/src/features/style-guide/sections/form-layout/` render this guidance for humans at `/style-guide/form-layout`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

A form page in Demo is composed of exactly three blocks, in this order:

1. **Voltar link** (outside the card)
2. **Card** that contains:
   - Section 1 — Header (page title + `<dl>` of context metadata)
   - Section 2..N — Input sections separated by dividers
   - Section N+1 — Button bar (always the last child)

Form pages do **not** use `<Breadcrumb>` — the `← Voltar` link replaces it.

---

## 0. Interview before writing

Before generating any form page, gather these answers using `vscode/askQuestions`. Never assume — ask explicitly.

### Phase 1 — Page identity (ask all at once)

1. **Project** — `backoffice` or `frontoffice`.
2. **Component name** — PascalCase, e.g. `FormularioCDR1`, `FormularioResiduos`.
3. **Layout** — single page, or tabbed? If tabbed:
   - **(a)** Exact number of tabs. Never infer from context — always ask.
   - **(b)** Tab labels, one per line; must match the count from (a).
4. **Header context fields** *(single-page only — skip for tabbed)* — the key/value pairs that go inside the `<dl>` under the page title. If the user has none yet, still emit the `<dl>` with `{/* PLACEMENT: replace with API data */}` so the structure is in place.

**Do not ask for the route.** Auto-infer from the component name: strip the `Formulario` prefix, lowercase the first letter, kebab-case. State the inferred route as a note in the reply, not as a question.

- `FormularioCDR1` → `/estabelecimentos/:id/cdr1`
- `FormularioResiduos` → `/estabelecimentos/:id/residuos`

### Phase 2 — Form sections (one batch per tab)

Offer two input modes first:

- **Manual** — user types fields in the pipe format below.
- **Spec file** — user provides a file path; read it, extract sections + fields, confirm interpretation before generating.

**Manual prompt (Portuguese, as shown to the user):**

```
## Nome da Secção
Campo | Tipo | Placeholder | maxCaracteres | obrigatório | col
```

| Column | Meaning |
|---|---|
| `Campo` | Label in Portuguese |
| `Tipo` | `InputText`, `InputNumber`, `InputSelect`, `InputDate`, `Checkbox`, or `Table` |
| `Placeholder` | Text shown when empty; `-` if none |
| `maxCaracteres` | Max chars for `InputText`; `-` otherwise |
| `obrigatório` | `true` or `false` |
| `col` | Fractional units the field occupies (1 = narrow, 2 = medium, 3 = wide). Sum per row drives the grid (see §3). |

For tables inside a section, the row syntax is:

```
Nome | Table | - | - | false | 3
> Coluna1 | Tipo | Coluna2 | Tipo | ...
```

**After the section list, for every `InputSelect`** ask in one follow-up batch: API endpoint, or static option list (values + labels)?

### Phase 3 — Naming (do not ask, derive)

State variable names follow a fixed pattern — never ask the user to invent them.

- `formPrefix` = component name without the `Formulario` prefix, first letter lowercased. `FormularioCDR1` → `cdr1`.
- `SectionWord` = first meaningful word of the section title, camel-cased. `Identificação do Estabelecimento` → `Identificacao`.
- `FieldLabel` = camelCase of the field label. `Tipo de Instalação` → `TipoInstalacao`.
- Final var = `${formPrefix}${SectionWord}${FieldLabel}` → `cdr1IdentificacaoTipoInstalacao`.

After the interview is complete, generate immediately. No further confirmation phase.

---

## 1. Voltar + card shell

```tsx
{/* ── Voltar ── */}
<div className="mb-24">
  <button
    type="button"
    onClick={handleCancel}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
      color: 'var(--color-primary-600)', fontSize: '14px', fontWeight: 500,
    }}
  >
    ← Voltar
  </button>
</div>

{/* ── Card ── */}
<div className="bg-white" style={{ border: '1px solid var(--color-neutral-100)' }}>
  {/* sections go here */}
</div>
```

Rules:

- Voltar sits above the card with `mb-24`.
- Card is `bg-white` + `border: 1px solid var(--color-neutral-100)` (no `rounded-*`).
- The Voltar `<button>` is inline-styled (no Tailwind utilities) so the same recipe works in backoffice and frontoffice without depending on a shared `demo-back-link` class.

## 2. Section 1 — Header

```tsx
<div className="px-32 pt-32">
  <div style={{ height: '60px', display: 'flex', alignItems: 'center' }}>
    <h1 className="text-neutral-900" style={{ fontSize: '24px', fontWeight: 700 }}>
      Novo Registo CDR1
    </h1>
  </div>
  {/* PLACEMENT: replace with API data when available */}
  <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px 24px' }}>
    <div>
      <dt className="text-xs-regular text-neutral-500">Referência</dt>
      <dd className="text-s-semibold text-neutral-900">Demo-2026-001</dd>
    </div>
    <div>
      <dt className="text-xs-regular text-neutral-500">Estado</dt>
      <dd className="text-s-semibold text-neutral-900">Rascunho</dd>
    </div>
    <div>
      <dt className="text-xs-regular text-neutral-500">Período</dt>
      <dd className="text-s-semibold text-neutral-900">2026 Q1</dd>
    </div>
  </dl>
</div>
```

Rules:

- Header lives **outside** the `<form>` element. The form starts at section 2.
- Wrapper: `px-32 pt-32`.
- Title: `<h1>` inside a fixed-height `60px` div for vertical alignment. Classes `text-neutral-900` + inline `fontSize: 24px; fontWeight: 700`.
- `<dl>`: 3-column grid (`repeat(3, 1fr)`), gap `8px 24px`. `<dt>` is `text-xs-regular text-neutral-500`; `<dd>` is `text-s-semibold text-neutral-900`.
- Always emit the `<dl>`, even when the values are placeholders. Mark unmapped values with `{/* PLACEMENT: replace with API data */}` so they are findable later.
- **Do not** put a divider between Header and the first input section — the `pt-32` of the next section is the visual separation.

## 3. Sections 2..N — Input sections

Each logical group of fields is one `<div className="p-32">` with a 20px/700 title and an `demo-form-inputs` grid. Sections are separated by a 1px divider.

> **🔴 STRONG REFERENCE — rows align by their TOP, not their bottom.**
> Inputs on the same grid row line up by the **top edge of the input box**. Helper text (mandatory under every optional field — see [inputs.md "Required vs Optional"](./inputs.md#required-vs-optional)) hangs below each field independently. This guarantees rows are clean horizontal lines instead of a "wave" caused by some fields having helper text and others not.
> The grid style is `alignItems: 'start'` — **never `'end'` and never `'center'`** for `demo-form-inputs`.

```tsx
<div className="p-32">
  <p className="text-neutral-900 mb-16" style={{ fontSize: '20px', fontWeight: 700 }}>
    Identificação
  </p>
  <div
    className="demo-form-inputs"
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '16px',
      alignItems: 'start',
    }}
  >
    <div style={{ gridColumn: 'span 3' }}>
      <InputText label="Nome do Estabelecimento" /* … */ />
    </div>
    <InputText label="NIF" /* … */ />
    <InputNumber label="Ano" /* … */ />
    <InputSelect label="Tipo de Instalação" /* … */ />
  </div>
</div>

{/* ── Divider (between sections only) ── */}
<div style={{ height: '1px', background: 'var(--color-neutral-500)', margin: '0 32px' }} />
```

Rules:

- Section wrapper: `<div className="p-32">`.
- Section title: `<p>` with `text-neutral-900 mb-16` + inline `fontSize: 20px; fontWeight: 700`. **Never** `<h2>` here — it collides with the `<h1>` hierarchy of the Header.
- Inputs grid **must** carry `className="demo-form-inputs"`. That is what activates the global `label { font-size: 16px; font-weight: 500 }` rule in `global.css`. Without it, labels render with the wrong typography.
- Fixed grid style: `display: 'grid'`, `gap: '16px'`, `alignItems: 'start'`. **Never `'end'` or `'center'`.** Top-alignment keeps input boxes on the same horizontal baseline regardless of which fields have helper text underneath. (Older recipes used `'end'` — that is now a bug.)
- Every field that is not `required` MUST render the helper line `"Este campo é opcional"` (`helperText="Este campo é opcional"` + `hasHelperText`). See [inputs.md "Required vs Optional"](./inputs.md#required-vs-optional). This makes the optionality discoverable without forcing the user to look for the asterisk.
- `gridTemplateColumns` is **computed from the per-field `col` values declared in the spec** — never hard-coded.
- A field with `col > 1` is wrapped in a `<div style={{ gridColumn: 'span N' }}>`.
- **Grid math examples**:

  | Row | `gridTemplateColumns` | Spans |
  |---|---|---|
  | NIF(1) + Ano(1) + Tipo(1) | `'1fr 1fr 1fr'` | — |
  | Morada(3) | `'1fr 1fr 1fr'` | first field `span 3` |
  | Localidade(2) + CP(1) | `'1fr 1fr 1fr'` | first field `span 2` |
  | NIF(1) + Nome(2) | `'1fr 2fr'` | second field `span 2` |

- Divider between sections: `1px`, `--color-neutral-500`, `margin: 0 32px`. **Never** inside a section. **Never** after the last section (the button bar comes immediately after).
- `InputSelect` with options loaded asynchronously: declare `useState<DropdownOpt[]>([])`, fill in `useEffect`, and add `key={opts.length}` on the `<InputSelect>`. Without the `key`, AgoraDS will not pick up the options that arrive after the first render.

## 4. Section N+1 — Button bar

> **🔴 STRONG REFERENCE — alignment is `space-between`, not `flex-end`.**
> The form footer pushes **Cancelar to the LEFT edge** of the card and **Submeter/Confirmar to the RIGHT edge**. They are NOT both right-aligned. This is the single most-often-missed rule in form generation. If you write `justifyContent: 'flex-end'` here, the form is wrong — that alignment belongs to filter rows and form-style modals (see [filter-page.md](./filter-page.md), [modals.md](./modals.md)), never to the page-level form footer.

```tsx
<div className="px-32 pb-32" style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Button type="button" variant="neutral" appearance="outline" onClick={handleCancel}>
    Cancelar
  </Button>
  <Button
    type="submit"
    variant="primary"
    appearance="solid"
    onClick={handleSubmit}
    disabled={submitting}
  >
    {submitting ? 'A submeter…' : 'Confirmar'}
  </Button>
</div>
```

Rules:

- Always the **last child** of the card. Never nested inside an input section or the form grid.
- Container: `px-32 pb-32` + `display: flex; justifyContent: space-between`. **Never `flex-end`.**
- **Cancelar** (left): `variant="neutral"`, `appearance="outline"`, `type="button"`.
- **Confirmar** (right): `variant="primary"`, `appearance="solid"`, `type="submit"`.
- While submitting: Confirmar is `disabled` and its label changes to `'A submeter…'`.
- **Do not** also use the global LoaderDialog overlay in the same flow — pick one (see [loading.md](./loading.md)).
- Submission errors render **above** the button bar:
  - 4xx validation summary → a `danger` `<StatusCard>` inside `px-32 pb-16` (see [status-card.md](./status-card.md)).
  - Catch-all error string → `<p className="text-s-regular text-danger-600">` inside `px-32 pb-16`.

### Where each alignment belongs (decision table)

| Context | Alignment | Recipe |
|---|---|---|
| Form page footer (Cancelar / Submeter) | `space-between` | `form-layout.md §4` (this section) |
| Filter row (Limpar / Pesquisar) | `flex-end` | `filter-page.md §3` |
| Form-style modal footer (Cancelar / Guardar) | `flex-end` | `modals.md` (form modal) |
| Confirmation modal footer (Eliminar / Confirmar) | `space-between` | `modals.md` (confirmation modal) |
