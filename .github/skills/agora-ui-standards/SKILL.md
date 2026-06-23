---
name: agora-ui-standards
description: Use this skill whenever writing or reviewing React/TypeScript UI code in the Demo project. Covers three rules that apply to every frontend component regardless of page type: (1) which Agora component to use for each input field type, (2) never use raw HTML elements when an Agora equivalent exists, (3) style priority order. Triggers for: building any page with input fields, writing any React component, reviewing UI code for correctness or consistency. USE FOR: any frontend work in backoffice or frontoffice. NOT FOR: backend Java, infrastructure, or database changes.
---

# Agora UI Standards

Nine rules that apply to **every** React component in this project, regardless of page type.

---

## 1. Input component selection

When choosing a component for a user-visible input field, apply this mapping strictly. Only ask or deviate when genuinely ambiguous.

| Semantic type | Component | Required props / notes |
|---|---|---|
| Full date (day/month/year) | `InputDate` | — |
| Year only | `InputNumber` | `min={1900}` `max={new Date().getFullYear()}` `placeholder="AAAA"` |
| Free text | `InputText` | — |
| Fixed known set of options | `InputSelect` | one `DropdownOption` per value; wrap in `DropdownSection` |
| Boolean flag | `Checkbox` | use native `boolean` for `checked` |
| Integer or decimal number | `InputNumber` | — |
| Time range | two `InputDate` fields | label the first "De" and the second "Até" |

**Hard rules:**
- Never use `InputDate` when only a year is needed → use `InputNumber`
- Never use `InputText` when the valid values are a known fixed list → use `InputSelect`
- Never hardcode option labels in an `InputText` placeholder to simulate a dropdown
- Never wrap the children of `<DropdownSection>` in a React Fragment (`<>…</>`) — AgoraDS reads the children directly and a Fragment cancels the option render. Always map directly: `<DropdownSection>{items.map(…)}</DropdownSection>`.
- For multi-select fields whose option labels can be longer than the trigger column (e.g. `Código Demo - Nome do estabelecimento`), wrap the `<InputSelect>` in `<div className="demo-select-wrap">`. The helper keeps the trigger width stable and lets long text wrap in both the trigger summary and each panel row. See `style-guide/recipes/inputs.md#inputSelectMultiWrap`.

---

## 2. Button className is mandatory — Demo brand skin

Every `<Button>` from `@ama-pt/agora-design-system` **MUST** include the matching `className`. Without it, AgoraDS renders its own default blue instead of the Demo teal brand.

| `appearance` value | Required `className` |
|---|---|
| `"solid"` | `className="demo-btn-primary"` |
| `"outline"` | `className="demo-btn-secondary"` |
| `"link"` or `"plain"` | `className="demo-btn-link"` |

**Correct:**
```tsx
<Button type="submit" variant="primary" appearance="solid" className="demo-btn-primary">
  Pesquisar
</Button>

<Button type="button" variant="primary" appearance="outline" className="demo-btn-secondary" onClick={handleClear}>
  Limpar
</Button>

<Button type="button" variant="primary" appearance="plain" className="demo-btn-link" onClick={goBack}>
  Voltar
</Button>
```

**Hard rules:**
- Never write a `<Button>` without `className="demo-btn-*"`.
- If reviewing existing code and `className` is missing, flag it as a bug.
- `variant="danger"` (confirm-delete modals) is the only exception — it has no `demo-btn-*` equivalent and uses AgoraDS styling directly.

The CSS that drives these classes lives in `services/shared/frontend/styles/buttons.css`, imported globally via `@demo/shared-frontend/styles/global.css`.

---

## 3. Always use Agora components — never raw HTML

| Raw HTML | Use instead |
|---|---|
| `<button>` | `<Button>` |
| `<input type="text">` | `<InputText>` |
| `<input type="number">` | `<InputNumber>` |
| `<input type="date">` | `<InputDate>` |
| `<input type="password">` | `<InputPassword>` |
| `<input type="checkbox">` | `<Checkbox>` |
| `<input type="radio">` | `<RadioButton>` |
| `<select>` | `<InputSelect>` + `<DropdownSection>` + `<DropdownOption>` |
| `<textarea>` | `<InputTextArea>` |

When unsure whether an Agora component exists for something, generate:
```tsx
// TODO: check if Agora has a component for <X>
```
and use the raw element as a **temporary fallback only**.

---

## 4. Style priority

Apply styles in this order. Never mix levels for the same property on the same element.

1. **Agora component props** — `variant`, `appearance`, `size`, `darkMode`, etc.
2. **Tailwind utility classes** — layout, spacing, and typography between components
3. **`style={{}}`** — only for CSS properties that have no Tailwind equivalent

Acceptable `style={{}}` uses:
- `gridTemplateColumns` (dynamic grid columns)
- `fontVariantNumeric: 'tabular-nums'`
- `whiteSpace: 'nowrap'`

Never acceptable in `style={{}}`:
- Color values (use Agora tokens: `var(--color-neutral-100)` or Tailwind: `text-neutral-900`)
- Hardcoded hex values (e.g. `#64718B`)
- Typography (`fontSize`, `fontWeight`, `fontFamily`) — use Tailwind text utilities
- Border styles — use Agora tokens or Tailwind border utilities
- Duplicate of a property already set via Tailwind class on the same element

### Color token lookup order

When you need a color value in `style={{}}`, follow this order before writing anything:

1. **Agora CSS variable** — `var(--color-[name]-[weight])`, e.g. `var(--color-neutral-600)`
2. **Tailwind/project token** — e.g. `text-danger-600`, `bg-demo-table-header`
3. **Existing component** — search the codebase for a similar element (divider, border, text) and copy its token
4. **Fallback** — if no token exists, add a comment and use the closest available token:
	```tsx
	// TODO: no token found for <purpose> — using <token> as closest available token
	background: 'var(--color-neutral-500)'
	```

Never skip straight to a hex value. Always exhaust options 1–3 first.

### Typography in inline styles

Never use `fontSize`, `fontWeight`, or `fontFamily` in `style={{}}`.
Use Agora Tailwind typography classes instead: `text-s-regular`, `text-s-semibold`, `text-xs-regular`, etc.

If a font size needs to cascade to child elements (e.g. on a `<table>`), omit it entirely —
the individual cells should carry their own Agora typography classes.

---

## 5. Page shell — every page sits inside a card

**Every top-level page route in Demo renders its content inside a single content card.** This is the strongest layout rule in the project. The card is what gives the app its centered, framed look — without it, content runs edge-to-edge against the page background and breaks the visual rhythm of every other page.

Applies to: form pages, filter/listing pages, detail pages, dashboard-style pages, and any new generated page added to the playground or production routes.

**Required shell:**

```tsx
<div className="bg-white" style={{ border: '1px solid var(--color-neutral-100)' }}>
  {/* page sections go here */}
</div>
```

**Hard rules:**

- The card is `bg-white` + `border: 1px solid var(--color-neutral-100)`. **No `rounded-*`** — the card is square-cornered by design.
- The only elements that may sit **outside** the card are:
  - the `← Voltar` link (form pages),
  - the `<Breadcrumb>` (filter / detail pages),
  - the **page title** (`<h1>`) when the design calls for it to anchor above the card rather than inside the header section.
  Sub-cards, tabs, sections, button bars, dl summaries — all go inside.
- When the page title sits outside the card, it stacks **above** the card with the `← Voltar` / `<Breadcrumb>` between (Voltar/Breadcrumb first, then `<h1>`, then the card). The header section inside the card then drops its `<h1>` and starts directly with the `<dl>` of context metadata.
- A page may contain nested cards (`DemoDetailCard`, `demo-sectioned-card-spec`) **inside** the outer shell, but never replace the outer shell with a nested card.
- Modals are the only exception: a modal's dialog is its own card-like surface rendered through `createPortal`, not a child of the page card.
- Do not wrap the card in extra max-width containers — the parent route layout (e.g. `Playground` aside + main, or the app shell) already handles centering.

**When NOT to wrap in a card:**

- Modal dialogs (handled by `demo-modal-dialog-spec`).
- Toast notifications.
- The style-guide preview pages themselves, which intentionally render raw recipes for inspection.

**Tabs are their own card.** If the page uses `<Tabs>`, all page content lives inside the tabs — the tab body acts as the card-like inner surface and the page does not also carry top-level sections at the same level. See `style-guide/recipes/tabs.md` for the full rule and the "no single-tab `<Tabs>`" anti-pattern.

For the exact card rule per page type, see the recipes:
- forms — `style-guide/recipes/form-layout.md` §1
- filter pages — `style-guide/recipes/filter-page.md`
- detail/sectioned cards inside the shell — `style-guide/recipes/cards.md`
- tabs as the page surface — `style-guide/recipes/tabs.md`

---

## 6. CSS architecture & token overrides

The Demo brand skin lives in `services/shared/frontend/styles/` (NOT `src/styles/` — that path is obsolete). The single entry point is `global.css`, consumed by both frontends as `@demo/shared-frontend/styles/global.css`.

**Hard rules:**

- **Never hardcode brand hex values.** `#008078`, `rgba(0,128,120,…)`, or any teal literal is a bug. Use:
  - solid:  `var(--color-primary-600)`
  - tinted: `color-mix(in srgb, var(--color-primary-600) X%, white)` (lighten) or `… X%, black` (darken)
  - alpha:  `color-mix(in srgb, var(--color-primary-600) X%, transparent)`
- **The brand anchor is `--color-primary-600`.** Steps 300–900 are derived from it via `color-mix()` in `tokens.css`. To rebrand, change one value.
- **Overriding any AgoraDS CSS variable requires the `:root:root` selector** (specificity `0,0,2,0`). AgoraDS emits `:root { --color-primary-600: #034AD8 … }` via `@tailwind base` AFTER our `@import './tokens.css'`. Plain `:root` loses the cascade race; `:root:root` wins regardless of order. Do not "clean up" the double pseudo-class — it is intentional.
- **Component CSS imports** from inside `services/shared/frontend/src/components/<Name>/<Name>.tsx` use `../../../styles/components/<Name>.css` (three levels up, not two). The 2-level form points to a deleted location.

---

## 7. Toast — mandatory 32 px offset

**Every page that shows a toast MUST have `<ToastProvider position="top-right">` mounted exactly once in the React tree (in `App.tsx`, wrapping `<Routes>`).** The global CSS in `services/shared/frontend/styles/misc.css` already defines the 32 px offset:

```css
.agora-toast-list.toast-list-top-right {
    top: 32px;
    right: 32px;
    …
}
```

**Hard rules:**

- Never add a local `<style>` block or inline style to reposition the toast — the offset is applied globally via `misc.css` and must not be duplicated per page.
- `useToastContext()` (consumer) is the only correct hook inside components. **`useToast()` (factory) must not be called inside a component** — it creates a new provider, it does not read from the existing one.
- Always include `id: \`toast-\${Date.now()}\`` in the toast payload to avoid key collisions when multiple toasts stack.
- If adding `ToastProvider` to a new app entry point, **verify that `@demo/shared-frontend/styles/global.css` is imported** in that entry point — otherwise the 32 px offset CSS will not apply.

**Correct pattern (App.tsx):**
```tsx
import { ToastProvider } from '@ama-pt/agora-design-system';

<ToastProvider position="top-right">
  <Routes>…</Routes>
</ToastProvider>
```

**Correct pattern (component):**
```tsx
import { useToastContext } from '@ama-pt/agora-design-system';

const { showToast } = useToastContext();

showToast(
  { id: `toast-${Date.now()}`, type: 'success', title: '…', description: '…', closeLabel: 'Fechar' },
  5000,
);
```

**When reviewing code:**
- If you see a toast offset applied via inline `<style>` inside a page component, flag it and remove it — the global CSS already handles it.
- If `ToastProvider` is mounted in a page component instead of `App.tsx`, flag it as a bug.

---

## 8. Server-side data narrowing — never filter, sort, or paginate client-side

All list narrowing **must** happen on the backend. The frontend's job is to collect the filter values, send them as query params, render whatever the server returns, and reset to page 0 when filters change. This is a **hard project rule**, not a guideline.

**Hard rules:**
- Never call `.filter()`, `.sort()`, `.slice()`, or any other narrowing transform on a paged response (`Page<T>`, an array returned by a list endpoint, etc.). If you find yourself writing `formularios.filter(…)`, stop and route the predicate to a backend query param.
- Never compute `totalElements`, page counts, or paginator metadata client-side from a filtered subset — the backend owns the totals.
- Never implement a search-as-you-type that filters an already-fetched array client-side. Debounce and re-query the backend instead.
- A filter input whose backend support does not yet exist still gets wired to state and to the request payload — leave a single `TODO` comment pointing at the missing API and ship the field disabled or no-op. **NEVER** “temporarily” filter in JS as a fallback.
- When the filter payload changes, reset the paginator to page 0 (`useEffect(() => setPage(0), [filtersPayload])`) and include the payload in the TanStack Query `queryKey` so the cache differentiates per-filter snapshot.

**Canonical structure (until the backend accepts the params):**
```tsx
const filtersPayload = useMemo(
  () => ({ /* one field per filter input, undefined when empty */ }),
  [/* all filter state */],
);
useEffect(() => { setPage(0); }, [filtersPayload]);

const params = { page, size: pageSize };
const { data } = useFindAll(params, {
  query: {
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    queryKey: [...getFindAllQueryKey(params), filtersPayload],
  },
});
```

Once the backend grows the typed params, the only change is to pass `filtersPayload` into the generated hook (and drop the manual `queryKey` override). No JSX touch.

**When reviewing code:**
- Any `.filter()` / `.sort()` on a paged backend response → 🔴 blocker.
- A filter input whose value never reaches a query param or query key → 🔴 blocker (it lies to the user).
- Filters changing without `setPage(0)` → 🔴 blocker (paginator drifts out of range).

---

## 9. Project Style Guide

This skill defines **which** Agora component to use and the general styling rules. For the **exact** element + class string for every visual pattern in Demo (typography, buttons, inputs, modals, …), see the **`style-guide`** skill. The recipes there are the canonical source of truth and override anything in this skill where they conflict.

---

## Related skills

- **`style-guide`** — exact element + class string for every visual pattern. Overrides this skill on conflicts.
- **`agora-design-system`** — reference for confirming an AgoraDS component, prop, or token exists.
- **`react-patterns`** — hooks, queries, and tests for the components you build with these rules.
- **`gen-form`** / **`gen-query`** / **`gen-routes`** — the spec-driven generators that already apply these rules to scaffolded code; do not hand-write code these can generate.
- **`/memories/repo/common-mistakes.md`** (when present) — recurring violations and their root causes.
