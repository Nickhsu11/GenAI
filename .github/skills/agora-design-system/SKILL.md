---
name: agora-design-system
description: React component library and design system for Portuguese State digital services. Use for anything involving @ama-pt/agora-design-system (AgoraDS): installing or setting up the library, using or finding components (Button, InputText, Header, NavigationLink, Checkbox, InputSelect, DropdownOption, etc.), applying design tokens (colours, typography, spacing, shadows, z-index), configuring TailwindCSS with AgoraTailwindConfig, accessibility patterns (WCAG 2.1 AA, WAI-ARIA), or building Portuguese State digital services UIs. Also use for any UI work targeting gov.pt or Portuguese State citizen-facing portals — even when the user does not name AgoraDS explicitly (e.g. "style the portal header", "add a text field to the citizen registration form", "gov.pt branding"). USE FOR: AgoraDS, Ágora Design System, agora-design-system, gov.pt UI components, AgoraTailwindConfig, agora-line icons, agora-solid icons, citizen portal, serviços digitais do Estado. DO NOT USE FOR: generic React, PrimeReact, MUI, or unrelated TailwindCSS questions.
---

# Ágora Design System

## Overview

Ágora Design System (ADS) is the official React + TypeScript + TailwindCSS v3 component library for
Portuguese State digital services. It provides accessible, WCAG 2.1 AA compliant components built with
Noto Sans typography and a strictly defined design token system.

**Package:** `@ama-pt/agora-design-system` (current stable: 3.5.0)  
**Peer dependencies:** `react ^19.0.0`, `react-dom ^19.0.0`, `@types/react ^19.0.12`, `@types/react-dom ^19.0.4`  
**Also required:** TailwindCSS v3, postcss, autoprefixer  
**Storybook:** https://react.agora.gov.pt  
**ZeroHeight docs:** https://zeroheight.com/1be481dc2/p/97181d-agora-design-system  

---

## Setup Workflow

Follow this order when adding AgoraDS to a project:

1. **Install dependencies** — always requires TailwindCSS **v3** (not v4)
2. **Configure CSS** — import Agora's `tailwind.css` + `style.css` in the global stylesheet
3. **Configure Tailwind** — use `AgoraTailwindConfig` from the package with `preflight: false`
4. **Use components** — import named exports directly from `@ama-pt/agora-design-system`

**Quick-start (90% path):**
```bash
npm install -D tailwindcss@^3 postcss autoprefixer
npm install @ama-pt/agora-design-system
```

> For CSS configuration, Tailwind config, NextJS caveats, or React 17/18 migration:  
> read **[references/installation.md](references/installation.md)**.

---

## Component Usage

Import components as named exports:

```tsx
import { Button, InputText, Checkbox, Header } from '@ama-pt/agora-design-system';
```

Key patterns to follow:
- All inputs are **required by default** — pass `required={false}` explicitly when optional
- Controlled vs uncontrolled: use `value` + `onChange` for controlled, `defaultValue` / `defaultChecked` for uncontrolled
- `BooleanProp` accepts `boolean | 'true' | 'false'` — use native `boolean` in TSX
- Icons follow the naming pattern `agora-line-{name}` (outline) and `agora-solid-{name}` (filled)
- Use `aria-hidden` on decorative icons; use `aria-label` when the icon carries meaning
- `Header` **must** be wrapped in a native `<header>` HTML element; compose it with `Brand`, `Institutional`, `GeneralBar`, `NavigationBar`, `NavigationLink`, `Languages`, `Language`, `Authenticated` and its sub-components
- `InputSelect` options are composed with `DropdownSection` (groups) and `DropdownOption` (individual options) as children
- **Dark mode** is supported by most components via a `darkMode` prop (`boolean | 'true' | 'false'`)

> **[references/components.md](references/components.md)** — full component catalogue (75+ active components + deprecated list).  
> Contains: component name, description, Storybook URL per component, common prop types, dark mode notes, and instructions for keeping the catalogue up to date.  
> **Read this file whenever you need to identify, pick, or look up any AgoraDS component.**

---

## Form Handling & Events

AgoraDS form inputs are standard controlled React components. Wire them up the same way you would native `<input>` elements:

```tsx
const [email, setEmail] = useState('');

<InputText
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

For form submission, wrap inputs in a native `<form>` with `onSubmit`:

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // validate and submit
};

<form onSubmit={handleSubmit}>
  <InputText label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
  <Button type="submit" label="Submeter" />
</form>
```

Key points:
- `Button` with `type="submit"` inside a `<form>` submits natively — no extra onClick needed
- Validation errors go in the `errorMessage` prop on each input; set them in your submit handler after checking values
- For multi-step forms, manage per-step state and only validate the current step on "Next"

---

## Design Tokens & Tailwind Classes

AgoraDS uses a custom Tailwind theme. Key things to know:
- **Spacing is non-linear**: only specific values exist — `0, 8, 16, 24, 32, 40, 48...` (in px)
- **Typography scale**: tokens like `text-m-regular`, `text-2xl-bold` (size + weight combined)
- **Colour**: `text-primary-500`, `bg-danger-600`, `text-neutral-900`, etc.
- **Shadows**: `shadow-bottom-medium`, `shadow-center-low`, etc.
- **Z-index**: named tokens — `z-dialog` (6000), `z-toast` (7000), `z-tooltip` (8000)
- CSS variables are available: `var(--color-primary-500)`

> Read **[references/theme.md](references/theme.md)** when you need exact token names for colours, spacing values, typography scale, border radius, shadows, or z-index — especially when a layout "doesn't look right" or a class name isn't working.

---

## Accessibility

- Library follows WAI-ARIA 1.2 and WCAG 2.1 AA
- All components handle keyboard navigation — do not override focus management
- `aria-current="page"` goes on the **inner** `<a>`/`<Link>` child, **not** on the `NavigationLink` wrapper itself
- Heading hierarchy must be manually maintained across the page — `H1` on logo (homepage) or content (other pages)

---

## Migration & Coexistence Notes

> ⚠️ **React 19 is required.** Projects on React 17 or 18 must upgrade before installing.  
> See **[references/installation.md](references/installation.md)** for the full step-by-step migration and setup guide.

- AgoraDS can coexist with other component libraries (e.g. PrimeReact, MUI); prefer AgoraDS for all new components targeting gov.pt standards

---

## Related skills

- **`agora-ui-standards`** — Demo-specific rules on top of AgoraDS: which component to pick, mandatory `demo-btn-*` classNames, CSS architecture, never raw HTML.
- **`style-guide`** — exact class string for every visual pattern in Demo.
- **`gen-form`** / **`gen-query`** — spec-driven generators that scaffold AgoraDS-based forms and TanStack Query hooks.


