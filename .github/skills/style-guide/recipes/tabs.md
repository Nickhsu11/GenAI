# Tabs

Horizontal full-width tabs are the **only** sanctioned tabs pattern in Demo.

> **🔴 STRONG REFERENCE — a tab is its own card.**
> When a page uses tabs, **all of the page's content lives inside the tabs**. The tab body acts like the inner content of a card: each tab is a self-contained surface with its own sections, inputs, and (where relevant) its own button bar. You do **not** mix top-level page sections with a tab block as if it were one section among many. Either the page has no tabs and uses the standard form-layout sections, or the page is "concentrated in tabs" and every section the user sees is a child of some `<TabBody>`.
> **Anti-pattern**: a single `<Tabs>` with one tab whose body holds one section. If there is only one tab, drop the tabs and use a normal section instead.

## Where the CSS lives

Canonical tab CSS lives in the shared `global.css` (search for the `Demo — Tabs (canonical)` section):

- [services/shared/frontend/src/styles/global.css](../../../../services/shared/frontend/src/styles/global.css)

`global.css` is imported once from each app's `src/App.tsx` and exposes the canonical class:

- `demo-tabs-fullwidth-spec` — full-width tab strip
- `demo-tab-header-with-icon` / `demo-tab-alert-icon` — optional adornment helpers
- `demo-tab-preview` (+ `is-hover` / `is-selected`) — static preview helpers used **only** in the style-guide

## Invariants

- Tabs **always** occupy the full available width (`width: 100%`).
- Items are distributed equally (`flex: 1 1 0`).
- Each item has padding `16px` and gap `8px`.
- Label is `font-weight: 500`, `font-size: 16px`, horizontally centred and vertically middled.

## States

| State | Background | Text | Underline | Notes |
|---|---|---|---|---|
| Default (inactive) | `#F0F5F5` | `#2B363C` 500/16px | none | resting tab |
| Hover | unchanged (`#F0F5F5`) | `#003330` 500/16px | `2px` underline **on the lettering** (`text-decoration`, `#003330`) | applies on `:hover`, `:focus-visible`, `:active` |
| Selected (active) | `#FFFFFF` | `var(--color-primary-600)` 500/16px | none (top active bar from AgoraDS) | leave as-is |

> The hover stroke is a `text-decoration: underline` under the **label**, not a border on the tab cell. Use `text-decoration-thickness: 2px` and `text-underline-offset: 4px`.

> **Focus state — TODO.** Until the designer rules on the focus visual, `:focus-visible` mirrors the hover treatment. Same approach as buttons.

## Canonical snippet

```tsx
import { Tab, TabBody, TabHeader, Tabs } from '@ama-pt/agora-design-system';

<Tabs fullWidth className="demo-tabs-fullwidth-spec">
  <Tab>
    <TabHeader>Resumo</TabHeader>
    <TabBody>{/* ... */}</TabBody>
  </Tab>
  <Tab>
    <TabHeader>Detalhes</TabHeader>
    <TabBody>{/* ... */}</TabBody>
  </Tab>
</Tabs>
```

The `fullWidth` prop on `Tabs` plus the canonical class is everything you need — no extra wrapper styling, no per-page tweaks.

## Adornments

For tabs that need an inline alert/badge, compose with `demo-tab-header-with-icon` and use `agora-line-alert-triangle`:

```tsx
<TabHeader>
  <span className="demo-tab-header-with-icon">
    Pendências
    <Icon icon="agora-line-alert-triangle" className="demo-tab-alert-icon" />
  </span>
</TabHeader>
```

## Don'ts

- ❌ Don't remove `fullWidth` to make tabs "compact" — that variant doesn't exist.
- ❌ Don't override the active top bar — it is part of the AgoraDS contract.
- ❌ Don't restyle tabs per page; if the design needs to evolve, change `tabs.css` and update this spec.
- ❌ Don't render a single-tab `<Tabs>` block. If there is only one tab, the tabs add no information — render the section directly.
- ❌ Don't mix top-level form sections with a tab block at the same level. A page is either *all* sections or *all* tabs (with sections living inside each `<TabBody>`).
