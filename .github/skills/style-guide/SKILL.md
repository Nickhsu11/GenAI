---
name: style-guide
description: >
  Use this skill BEFORE writing or reviewing any UI element in the Demo frontends. It points to the
  canonical, machine-readable style guide that defines the exact element, class string, and snippet
  for every visual pattern in the project — typography, buttons, inputs, modals, tables, pills,
  tooltips, icons, etc. Triggers for: choosing a heading, picking text color or weight, adding a
  paragraph or helper line, building a button or button pair, laying out a form, opening a modal,
  rendering a table or pill, or any moment a Tailwind class is about to be typed by hand. Also
  triggers for: "what class do I use for X", "how do we style Y", "what's our recipe for Z",
  "review the typography on this page". USE FOR: any UI decision in services/backoffice/frontend
  or services/frontoffice/frontend. DO NOT USE FOR: component selection (see agora-ui-standards),
  generated forms (see gen-form), backend Java, or infrastructure.
---

# Demo Style Guide Skill

The Demo style guide has two faces:

- **Human preview** — the React app at `/style-guide` in the frontoffice. Designers and developers open it in a browser to *see* the patterns. The `.tsx` / `.css` files under `services/frontoffice/frontend/src/features/style-guide/sections/` render that preview.
- **Agent source of truth** — a flat folder of `.md` recipe files, one per pattern, that lives **inside this skill**: `.github/skills/style-guide/recipes/`.

**Agents only read the recipes.** Never parse the `.tsx` / `.css` / `.ts` files under `features/style-guide/sections/` for rules — they contain JSX wrappers, Portuguese narrative, and visual scaffolding that is noise for an agent. If a rule lives only in a `.tsx` and not in a recipe, the recipe is **incomplete** — see §5.

---

## 1. Where the recipes live

```
.github/skills/style-guide/
  ├── SKILL.md          ← this file (index + workflow)
  └── recipes/
      ├── <topic>.md    ← ONE per pattern. Agent source of truth.
      └── …
```

The recipe filename matches the section path used by the React preview (e.g. `buttons.md` ↔ `/style-guide/buttons`).

The list of all sections (and their human label, description, group) lives in `services/frontoffice/frontend/src/features/style-guide/sections.ts`. If a section is listed there but has no recipe in `recipes/`, the recipe has not been written yet.

---

## 2. Available recipes

All paths are relative to this `SKILL.md`.

### Foundations

| Topic | Recipe |
|---|---|
| Breadcrumb | [`recipes/breadcrumb.md`](./recipes/breadcrumb.md) |
| Icons (Agora line + solid catalogue) | [`recipes/icons.md`](./recipes/icons.md) |
| Pills (DemoPill) | [`recipes/pills.md`](./recipes/pills.md) |
| Scrollbar (`.demo-scroll` recipe) | [`recipes/scrollbar.md`](./recipes/scrollbar.md) |
| Status card | [`recipes/status-card.md`](./recipes/status-card.md) |
| Toast | [`recipes/toast.md`](./recipes/toast.md) |
| Typography (headings, body, helper, error, modal title) | [`recipes/typography.md`](./recipes/typography.md) |

### Components

| Topic | Recipe |
|---|---|
| Accordion | [`recipes/accordion.md`](./recipes/accordion.md) |
| Buttons (primary / secondary / link × default / hover / disabled, split-pair, icon-only). Canonical CSS lives in `services/shared/frontend/src/styles/global.css` (section `Demo — Buttons`). | [`recipes/buttons.md`](./recipes/buttons.md) |
| Cards | [`recipes/cards.md`](./recipes/cards.md) |
| Inputs (text, number, textarea, select single/multi/multi-wrap, date, checkbox, checkbox-group, radio, uploader, switch) | [`recipes/inputs.md`](./recipes/inputs.md) |
| Modals (form modal, confirmation modal) | [`recipes/modals.md`](./recipes/modals.md) |
| Tables (DemoTable + EditableTable) | [`recipes/tables.md`](./recipes/tables.md) |
| Tabs (full-width only). Canonical CSS lives in `services/shared/frontend/src/styles/global.css` (section `Demo — Tabs`). | [`recipes/tabs.md`](./recipes/tabs.md) |

### Patterns

| Topic | Recipe |
|---|---|
| Filter page (Breadcrumb + filters + results table) | [`recipes/filter-page.md`](./recipes/filter-page.md) |
| Form layout (Voltar + Header + sections + button bar) | [`recipes/form-layout.md`](./recipes/form-layout.md) |
| Loading (inline LoaderDialog + global overlay) | [`recipes/loading.md`](./recipes/loading.md) |

If a topic the user asks about is not in this table, the recipe is **missing** — see §5.

---

## 3. How to find the right recipe

Map the user's intent to a topic, then read the `.md`.

| User intent | Recipe |
|---|---|
| Add/style a heading, page title, section title, paragraph, helper text, error message, modal title | typography |
| Add/style a button, link, primary/secondary action, split pair, icon-only | buttons |
| Add/style a text input, date, checkbox, select, radio, uploader | inputs |
| Pick or render an icon | icons |
| Add/style a status pill | pills |
| Build a status / info / success / warning / error card inside the page | status-card |
| Show a transient confirmation after an action | toast |
| Add a hierarchical navigation trail at the top of a non-form page | breadcrumb |
| Add/style horizontal/vertical tabs | tabs |
| Build a collapsible detail card group | accordion |
| Build a static / detail card with sections | cards |
| Build a data table, paginated table, editable table | tables |
| Build a modal (form, alert, confirmation) | modals |
| Build a full form **page** — Voltar + Header + input sections + button bar | form-layout |
| Build a full filter / search **page** — Breadcrumb + filter form + results table | filter-page |
| Show a loading indicator inline, or block the whole page while submitting | loading |
| Style the scrollbar on a scrollable container | scrollbar |

If the intent maps to two topics (e.g. a modal that contains form inputs), read both. Modals defer typography, inputs, buttons, and icons rules to their respective recipes — do not duplicate.

---

## 4. How to apply a recipe

1. Read the topic's `.md` file in full before writing anything.
2. For each visual element in the user's task, find the matching item in the recipe.
3. **Copy the snippet verbatim** — element, class string, attributes. Do not paraphrase the class string. Do not substitute the element (`<h1>` is not interchangeable with `<h2>`). Do not "improve" by adding margins, colors, or weights that the recipe didn't specify.
4. If the recipe lists a "Do not", treat it as a hard ban for this codebase.
5. If the recipe has no entry for the exact element you need, **stop and ask the user** — do not extrapolate from a related entry.

---

## 5. When no recipe exists

If a topic is missing from the table in §2:

1. Do **not** invent a recipe.
2. Tell the user the style guide has no recipe for `<topic>` yet.
3. Offer to fall back to the general `agora-ui-standards` skill plus AgoraDS defaults — but flag the choice as **provisional** so the user can ratify it later and we can write the recipe.

---

## 6. Mirroring (backoffice)

Recipes live in this skill, which is workspace-wide. They apply equally to `services/backoffice/frontend/` and `services/frontoffice/frontend/`. The human preview at `/style-guide` only exists in the frontoffice today; until it is mirrored, frontoffice is also the single visual reference.

---

## 7. Editing the style guide

When the user asks to change a rule (e.g. "buttons should have 6px radius"):

1. Update the recipe in `.github/skills/style-guide/recipes/<topic>.md` — that is the source of truth.
2. Update the human preview (`.tsx` / `.css` under `features/style-guide/sections/<topic>/`) so the rendered page matches the recipe.
3. If global app CSS (e.g. `services/frontoffice/frontend/src/shared/styles/global.css`, or a per-topic `<topic>.css` co-located with the preview) carries the same values, update it too. The recipe + the preview + the production CSS must agree.

---

## Related skills

- **`agora-ui-standards`** — which AgoraDS component to use, button className mandate, CSS architecture (`:root:root`, brand tokens). Pairs 1:1 with this skill: that one says *which component*, this one says *which exact classes*.
- **`agora-design-system`** — underlying component library and design tokens.
- **`react-patterns`** — for the React structure around your styled elements (hooks, queries, tests).
- **`gen-form`** — spec-driven form generator; produces components that already follow these recipes.
