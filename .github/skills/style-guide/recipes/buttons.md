# Buttons — Canonical Rules

> Machine-readable source of truth for buttons in the Demo frontoffice.
> The `.tsx` files in this folder render this guidance for humans at `/style-guide/buttons`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

## Prerequisites

This recipe assumes the **rule layer** is already known. Before using anything below, the following are required and live elsewhere:

- **Use `<Button>` from `@ama-pt/agora-design-system`, never raw `<button>`** — see [`agora-ui-standards §3`](../../agora-ui-standards/SKILL.md).
- **`className="demo-btn-*"` is mandatory on every `<Button>`, and the `appearance` prop → className mapping is fixed** — see [`agora-ui-standards §2`](../../agora-ui-standards/SKILL.md). The `variant="danger"` exception is also defined there.
- **Where the CSS lives and how brand tokens are organised** — see [`agora-ui-standards §6`](../../agora-ui-standards/SKILL.md). The canonical button styles are in `services/shared/frontend/styles/buttons.css`, imported globally via `@demo/shared-frontend/styles/global.css`.
This file owns the **recipe layer**: which variant to pick by role, exact visual values (colors, padding, radius), per-state snippets (default / hover / disabled), and compositions (split pair, icon-only).

## The 3 variants — pick by role

Every button in the app is one of exactly three variants. Pick by role; do not invent new variants. Class names are listed here for orientation only; the authoritative mapping is in [`agora-ui-standards §2`](../../agora-ui-standards/SKILL.md).

| Variant | Class | Use for |
|---|---|---|
| Primary | `demo-btn-primary` | The single main call-to-action of a form, page, or modal (Submeter, Confirmar, Adicionar, Guardar, Pesquisar). |
| Secondary | `demo-btn-secondary` | The non-destructive peer of a primary (Cancelar, Limpar, Importar/Exportar pair). |
| Link | `demo-btn-link` | An action that should *look* like a link but trigger JS (Voltar, Editar, "Adicionar Linha"). |

Icons are **orthogonal** to the variant: any of the three can carry a leading or trailing icon via the AgoraDS `leadingIcon` / `trailingIcon` / `*IconHover` props. There is no separate `search`, `clear`, or `destructive` recipe — those are just one of the three variants + an icon.

## Shared base (all variants)

| Property | Value |
|---|---|
| Padding | `16px` on all sides |
| Gap (icon ↔ text) | `8px` |
| Font size | `16px` |
| Font weight | `400` |
| Horizontal alignment | center |
| Vertical alignment | middle |
| Corner radius | `4px` |

> **Focus state — TODO**: the designer will revisit `:focus-visible`. Until then it is styled identically to `:hover` and `:active` so keyboard users still get feedback. When the focus spec lands, update `buttons.css`.

---

## 1. Primary

### 1.1 Primary — default

- **Class**: `demo-btn-primary`
- **Background**: `var(--color-primary-600)` / `#008078`
- **Text & icon**: `var(--color-white)` / `#FFFFFF`
- **AgoraDS props**: `variant="primary"` `appearance="solid"`
- **Snippet**:
  ```tsx
  <Button
    variant="primary"
    appearance="solid"
    type="submit"
    className="demo-btn-primary"
    onClick={handleSubmit}
  >
    Submeter
  </Button>
  ```

### 1.2 Primary — hover (== clicked)

- **Background**: `var(--color-primary-hover)` / `#003330`
- **Text & icon**: `#FFFFFF` (unchanged)
- **Activated by**: `:hover`, `:active`, `:focus-visible` (focus pending designer review).

### 1.3 Primary — disabled

- **Background**: `var(--color-button-disabled-bg)` / `#E1E4EA`
- **Text & icon**: `var(--color-button-disabled-text)` / `#BAC0CC`
- **MUST use the real `disabled` attribute** — color-only is not enough.
- **Snippet**:
  ```tsx
  <Button
    variant="primary"
    appearance="solid"
    type="button"
    className="demo-btn-primary"
    disabled
  >
    Guardar
  </Button>
  ```

---

## 2. Secondary

### 2.1 Secondary — default

- **Class**: `demo-btn-secondary`
- **Background**: transparent
- **Outline**: `2px solid var(--color-primary-600)` / `#008078`
- **Text & icon**: `var(--color-primary-600)` / `#008078`
- **AgoraDS props**: `variant="primary"` `appearance="outline"`
- **Snippet**:
  ```tsx
  <Button
    variant="primary"
    appearance="outline"
    type="button"
    className="demo-btn-secondary"
    onClick={onCancel}
  >
    Cancelar
  </Button>
  ```

### 2.2 Secondary — hover (== clicked)

- **Background**: `var(--color-primary-hover)` / `#003330`
- **Text & icon**: `#FFFFFF`
- **Outline**: collapses into the filled background.
- **Activated by**: `:hover`, `:active`, `:focus-visible`.

### 2.3 Secondary — disabled

- **Background**: transparent
- **Outline**: `2px solid var(--color-button-disabled-text)` / `#BAC0CC`
- **Text & icon**: `var(--color-button-disabled-text)` / `#BAC0CC`
- **Snippet**:
  ```tsx
  <Button
    variant="primary"
    appearance="outline"
    type="button"
    className="demo-btn-secondary"
    disabled
  >
    Cancelar
  </Button>
  ```

---

## 3. Link

### 3.1 Link — default

- **Class**: `demo-btn-link`
- **Background**: none
- **Text & icon**: `var(--color-primary-600)` / `#008078`
- **Underline**: none
- **AgoraDS props**: `variant="primary"` `appearance="link"`
- **Snippet**:
  ```tsx
  <Button
    variant="primary"
    appearance="link"
    type="button"
    className="demo-btn-link"
    hasIcon
    leadingIcon="agora-line-chevron-left"
    leadingIconHover="agora-solid-chevron-left"
    onClick={() => navigate(-1)}
  >
    Voltar
  </Button>
  ```

### 3.2 Link — hover (== clicked)

- **Text & icon**: `var(--color-primary-hover)` / `#003330`
- **Underline**: appears, color `var(--color-primary-hover)` / `#003330`
- **Activated by**: `:hover`, `:active`, `:focus-visible`.

### 3.3 Link — disabled

- **Background**: none
- **Underline**: none
- **Text & icon**: `var(--color-button-disabled-text)` / `#BAC0CC`
- **Snippet**:
  ```tsx
  <Button
    variant="primary"
    appearance="link"
    type="button"
    className="demo-btn-link"
    disabled
  >
    Editar
  </Button>
  ```

---

## Compositions

These are not separate variants — they are layouts built from the three variants above.

### Split pair (Importar / Exportar)

Two `demo-btn-secondary` buttons fused at the shared border. **Each half MUST also carry `demo-btn-secondary`** — the split classes only override the radii and the shared inner border; every other style (colors, font, padding, hover, disabled) is inherited from secondary. Any future change to secondary automatically applies.

- **Wrapper**: `demo-btn-split-pair`
- **Left half**: `demo-btn-secondary demo-btn-split-left`
- **Right half**: `demo-btn-secondary demo-btn-split-right`
- **Hover** on either half: same as `demo-btn-secondary` hover — fill `#003330`, text/icon `#FFFFFF`.
- **Snippet**:
  ```tsx
  <div className="demo-btn-split-pair">
    <Button
      variant="primary"
      appearance="outline"
      type="button"
      className="demo-btn-secondary demo-btn-split-left"
      hasIcon
      trailingIcon="agora-line-upload"
    >
      Importar
    </Button>
    <Button
      variant="primary"
      appearance="outline"
      type="button"
      className="demo-btn-secondary demo-btn-split-right"
      hasIcon
      trailingIcon="agora-line-download"
    >
      Exportar
    </Button>
  </div>
  ```

### Icon-only

Any of the three variants with `iconOnly` + `hasIcon` + a **required** `aria-label`. Typical use: modal close X.

```tsx
<Button
  variant="primary"
  appearance="link"
  type="button"
  className="demo-btn-link"
  iconOnly
  hasIcon
  leadingIcon="agora-line-x"
  leadingIconHover="agora-solid-x"
  aria-label="Fechar"
  onClick={onClose}
/>
```

---

## Cross-cutting rules

### Reminder checklist (top card on style-guide page)

- Pick the variant by role: `primary`, `secondary`, or `link`. No other variants exist.
- Add icons via `leadingIcon` / `trailingIcon` — they don't change which class you use.
- Disabled state MUST use the real `disabled` attribute, not color-only styling.
- Icon-only buttons MUST include `aria-label`.
- In a `<form>`, the main action uses `type="submit"`; every other button uses `type="button"`.

### Loading state

AgoraDS Button has **no `loading` prop**. Implement loading as:

1. Add `disabled={isLoading}`.
2. Swap the visible label to its in-progress form.

| Trigger | In-progress label |
|---|---|
| Search | `A pesquisar…` |
| Data fetch / Load | `A carregar…` |
| Save / Submit / generic | `A processar…` |

```tsx
<Button variant="primary" appearance="solid" type="submit" className="demo-btn-primary" disabled={isSubmitting}>
  {isSubmitting ? 'A processar…' : 'Submeter'}
</Button>
```

### `type` attribute

- Inside a `<form>`: the primary action MUST set `type="submit"`; every other button MUST set `type="button"`.
- Outside a `<form>`: always `type="button"`.

### Pairing in a footer / filter row

> **🔴 Alignment matters as much as which button is which.** A form footer is `justifyContent: 'space-between'` (Cancelar pinned to the LEFT edge, Submeter pinned to the RIGHT edge). A filter row is `justifyContent: 'flex-end'` (both right). Do **not** swap these — generating a form footer with `flex-end` puts both buttons on the right and is a known anti-pattern.

| Context | Alignment | Left button | Right button |
|---|---|---|---|
| Form page footer | `space-between` | Cancelar (secondary) | Submeter / Confirmar (primary) |
| Filter row | `flex-end` | Limpar (secondary) | Pesquisar (primary) |
| Form-style modal footer | `flex-end` | Cancelar (secondary) | Guardar (primary) |
| Confirmation modal footer | `space-between` | Eliminar (danger) | Confirmar (primary) |

For the full snippets, see [form-layout.md §4](./form-layout.md), [filter-page.md §3](./filter-page.md), and [modals.md](./modals.md).

### Never use raw `<button>`

Every in-page action goes through `<Button>`. If you find raw `<button>` in the codebase, it is **drift** — flag it, do not propagate.

### Navigation vs action

- **Action** (changes state, opens modal, submits): `<Button>`.
- **Navigation** (URL change): `<Anchor>` (external) or `<NavigationLink>` (internal). Even when styled like a link, an action is still a Button.

---

## Dependencies

Buttons do **not** define their own iconography. Every `leadingIcon` / `trailingIcon` / `*IconHover` name MUST come from the canonical catalog [icons.md](../icons/icons.md). Don't invent names; if a case is missing, add it to `icons.md` first.

---

## Related skills

- [`agora-ui-standards`](../../agora-ui-standards/SKILL.md) — **owns the rule layer**: mandatory `className`, `appearance` → className mapping, `variant="danger"` exception, CSS architecture. Read first; this recipe assumes those rules.
- [`agora-design-system`](../../agora-design-system/SKILL.md) — the underlying `<Button>` component, its props, and the design tokens these recipes consume.
- [`style-guide` SKILL.md](../SKILL.md) — parent skill that points to this recipe and other visual recipes (typography, forms, modals, …).
