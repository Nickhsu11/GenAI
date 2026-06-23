# Typography — Canonical Rules (trimmed for demo)

> Headings and body text use semantic elements + the project type scale.

## §1 Page title element
- The page title MUST be a real `<h1>` (styled by `.page h1`).
- A `<div>` / `<span>` visually faked as a title via inline `style={{ fontSize, fontWeight }}`
  is a **🔴 Blocking** violation — it breaks the heading outline and screen-reader nav.

## §2 No inline font styling for headings
- Do not set `fontSize` / `fontWeight` inline on heading elements. When the semantic element is correct, this is a **🟡 Minor** violation (hygiene, per `severity/SKILL.md` §3).
- When inline font styles are used to fake a heading on a non-heading element, §1 applies and the finding is **🔴 Blocking**.
