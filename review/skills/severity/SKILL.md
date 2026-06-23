# Severity Classification — Canonical Rules

> Cross-cutting policy. Governs how **every** recipe under `review/skills/`
> assigns severity, and how the reviewer interprets it. Severity is a property
> of the rule, not a per-finding judgment.

## §1 Severity bands

Only three bands exist. Do not invent new ones.

- 🔴 **Blocking** — ship is blocked until fixed.
- 🟡 **Minor** — reported, does not block ship.
- 🟢 **Clean** — no violation against the rule.

## §2 When a rule is 🔴 Blocking

A rule is Blocking when violating it causes at least one of:

- **Functional failure** — the feature does not work for some users or some
  data (e.g. unpaginated result list, hand-rolled fetch that bypasses the
  generated hook's error / cache / retry contract).
- **Accessibility regression** — wrong semantic element, lost focus or
  keyboard support, broken screen-reader navigation (e.g. a fake heading,
  a raw `<button>` without the canonical class).
- **Structural drift** — a hand-rolled duplicate of a shared component that
  will diverge in behavior over time (e.g. a custom paginator).
- **Contract break with an external system** — design tokens, theming, or
  white-label surfaces that other parts of the product depend on. Only
  counts when that contract actually exists in the project.

If none of the above apply, the rule is **not** Blocking.

## §3 When a rule is 🟡 Minor

A rule is Minor when violating it causes at most:

- **Visual inconsistency** — the page looks slightly off but works
  (e.g. cell padding off, header shorter than canonical).
- **Hygiene / consistency** — inline styles on otherwise-correct semantic
  elements; hardcoded values that do not break a contract.
- **Derivative violations** — the violation is a symptom of a Blocking rule
  and disappears when that rule is fixed (e.g. a manual loading flag next
  to a hand-rolled fetch).

## §4 Rules for recipe authors

- Every rule MUST declare a severity in its body.
- Default to 🟡 unless the rule clearly meets a §2 test.
- If severity depends on project context (e.g. "Blocking if theming is in
  use, else Minor"), state that explicitly in the rule body.
- Do not introduce new severity bands.

## §5 Rules for the reviewer

- Severity comes from the recipe, not from reviewer judgment.
- If a recipe says 🔴, the finding is 🔴 — even when the reviewer disagrees.
- To change a severity, edit the recipe and cite this skill.
- When a recipe rule is ambiguous about severity, default to 🟡 and note it.
