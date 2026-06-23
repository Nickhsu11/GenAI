---
name: style-guide
description: >
  Canonical, machine-readable style guide for the demo frontend. Defines the exact element,
  class string, and rule for every visual pattern used here — typography, buttons, inputs,
  tables, icons — plus the filter-page composition. The reviewer (demo-frontend-reviewer)
  cites these recipes; the generator (demo-frontend) follows them. Read the relevant recipe
  BEFORE writing or reviewing any UI element.
---

# Demo Style Guide Skill (review set)

The recipes below are the source of truth for code review and generation in this demo.
Each rule declares its own severity (🔴 Blocking / 🟡 Minor), interpreted through
[`../severity/SKILL.md`](../severity/SKILL.md).

## Recipes

| Topic | Recipe |
|---|---|
| Typography (page title, headings, body, helper, error) | [`recipes/typography.md`](./recipes/typography.md) |
| Buttons (primary / secondary / link, brand className, no hardcoded hex) | [`recipes/buttons.md`](./recipes/buttons.md) |
| Inputs (AgoraDS components, no raw HTML, InputSelect structure) | [`recipes/inputs.md`](./recipes/inputs.md) |
| Tables (`DemoTable`, header baseline, built-in `Paginator`) | [`recipes/tables.md`](./recipes/tables.md) |
| Icons (AgoraDS `Icon`, line/solid, feedback set) | [`recipes/icons.md`](./recipes/icons.md) |
| Filter page (form, server-side filtering, button row) | [`recipes/filter-page.md`](./recipes/filter-page.md) |

## How to apply
1. Map the element under review/generation to its topic, then read that recipe in full.
2. Copy snippets verbatim — do not paraphrase class strings or substitute elements.
3. If a rule lists a "Do not", treat it as a hard ban for this codebase.
4. Severity comes from the recipe rule itself; never upgrade/downgrade on judgment.

> Related: [`../react-patterns.md`](../react-patterns.md) (hooks, generated hooks,
> server-side filtering) and [`../severity/SKILL.md`](../severity/SKILL.md).
