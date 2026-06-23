# Typography — Canonical Rules

> Machine-readable source of truth for typography in the Demo frontoffice.
> The `.tsx` files in this folder render this guidance for humans at `/style-guide/typography`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

Typography tokens/classes for Demo are defined in `src/shared/styles/global.css` and consumed via reusable classes.

---

## pageTitle

- **Element**: `<h1>`
- **Class**: `demo-page-title mb-24`
- **Spec in card**: `font-family: Poppins`, `font-weight: 500`, `font-size: 24px`, `color: var(--color-heading-page)` (`#008078`).
- **Use for**: the single top-of-page title, sits immediately below the breadcrumb.
- **Do**: keep exactly one `<h1>` per page; always the first heading.
- **Don't**: use for section titles inside the page (use `sectionTitle`).
- **Snippet**:
  ```tsx
  <h1 className="demo-page-title mb-24">Estabelecimentos</h1>
  ```

## sectionTitle

- **Element**: `<h2>`
- **Class**: `demo-section-title mb-16`
- **Spec**: `font-weight: 700`, `font-size: 24px`, `color: var(--color-heading-section)` (`#2B363C`).
- **Use for**: the main blocks of content inside a page (e.g. each tab, each detail card group).
- **Do**: follow `<h1>` directly; never skip from `<h1>` to `<h3>`.
- **Don't**: use inside modals (use `modalTitle`).
- **Snippet**:
  ```tsx
  <h2 className="demo-section-title mb-16">Dados Gerais</h2>
  ```

## subsectionTitle

- **Element**: `<h3>`
- **Class**: `demo-subsection-title mb-8`
- **Spec**: `font-weight: 700`, `font-size: 20px`, `color: var(--color-heading-subsection)` (`#000000`).
- **Use for**: subgroups inside a section (e.g. blocks of related fields inside a card).
- **Do**: place under a `<h2>`; never skip from `<h2>` to `<h4>`.
- **Don't**: substitute with bold body text.
- **Snippet**:
  ```tsx
  <h3 className="demo-subsection-title mb-8">Identificação</h3>
  ```

## modalTitle

- **Element**: `<h2>`
- **Class**: `demo-modal-title`
- **Spec**: `font-weight: 700`, `font-size: 24px`, `color: var(--color-heading-modal)` (`#021C51`).
- **Use for**: the title at the top of any modal/dialog body.
- **Do**: keep `<h2>` semantics — preserves the document outline.
- **Do**: omit bottom margin — the modal container controls spacing.
- **Snippet**:
  ```tsx
  <h2 className="demo-modal-title">Adicionar Entrada</h2>
  ```

## body

- **Element**: `<p>` (or `<span>` when inline)
- **Class**: `text-m-regular text-neutral-900`
- **Use for**: paragraph text, descriptions, value cells in detail views.
- **Do**: this is the default; reach for it before anything else for prose.
- **Don't**: use for secondary text (use `helper`).
- **Snippet**:
  ```tsx
  <p className="text-m-regular text-neutral-900">Texto corrente do parágrafo.</p>
  ```

## helper

- **Element**: `<p>` or `<span>`
- **Class**: `text-s-regular text-neutral-600`
- **Use for**: counts, timestamps, hints, captions, secondary indications.
- **Don't**: use for main content (use `body`).
- **Don't**: use `text-neutral-700` or below (helper must stay visually demoted).
- **Snippet**:
  ```tsx
  <p className="text-s-regular text-neutral-600">12 resultados encontrados.</p>
  ```

## error

- **Element**: `<p>` or `<span>`
- **Class**: `text-s-regular text-danger-600`
- **Use for**: inline error messages next to forms, tables, or destructive actions.
- **Don't**: use red text for any non-error reason (status, warnings → use Pill or Alert).
- **Snippet**:
  ```tsx
  <p className="text-s-regular text-danger-600">Erro ao carregar dados.</p>
  ```

---

## Cross-cutting

- **Hierarchy**: `<h1>` → `<h2>` → `<h3>`. Never skip levels.
- **Page-top order**: when present, render `Breadcrumb` first, then the `pageTitle` (`h1`) immediately below.
- **Margins**: only the page/section/subsection titles carry bottom margin (`mb-24`, `mb-16`, `mb-8`). Body text and modal titles do not — surrounding layout controls spacing.
- **Color**: keep at `text-neutral-900` for primary text; only `helper` (600) and `error` (`text-danger-600`) deviate.
- **Heading classes**: always use `demo-page-title`, `demo-section-title`, `demo-subsection-title`, `demo-modal-title` (defined in `global.css`) so color/weight updates stay centralized.
