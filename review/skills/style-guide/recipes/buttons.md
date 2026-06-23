# Buttons — Canonical Rules (trimmed for demo)

> Canonical button CSS lives in `styles/tokens.css` (`.demo-btn*`).

## §1 Use the canonical button classes
- Every `<button>` must carry `className="demo-btn demo-btn-primary"` (or `demo-btn-link` for inline actions).
- A `<button>` styled with inline `style={{}}` instead of an `demo-btn-*` class is a **🔴 Blocking** violation.

## §2 No hardcoded brand color
- Brand color is `var(--color-primary-600)`. Never write the literal hex `#008078`
  (or `rgba(0,128,120,…)`) in CSS or `style={{}}`. Use the token.
- A hardcoded brand hex is a **🔴 Blocking** violation.

## §3 Link-style actions
- Inline "Detalhes / Ver" actions use `className="demo-btn demo-btn-link"`.
