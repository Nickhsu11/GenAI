# Status Card — Canonical Rules

> Machine-readable source of truth for the StatusCard pattern in the Demo frontoffice.
> The `.tsx` files under `services/frontoffice/frontend/src/features/style-guide/sections/status-card/` render this guidance for humans at `/style-guide/status-card`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

All status cards MUST use `<StatusCard>` from `@ama-pt/agora-design-system`. Never roll a custom alert/info card with raw `<div>`.

## The 4 variants

Pick by the meaning of the message, not by the colour.

| Variant | `variant` prop | Use for |
|---|---|---|
| Informative | `"informative"` | Neutral context, hints, "this is in validation", procedural info. |
| Success | `"success"` | Confirmation that an action completed (created, saved, submitted). |
| Warning | `"warning"` | Soft alerts — missing optional data, deprecation, attention needed. |
| Danger | `"danger"` | Errors and failures — submission failed, blocking validation. |

## Shared contract (all variants)

- **`showIcon` is always `true`** — the leading (i) icon sits on the same line as the title.
- **Never pass `pillText`.** Demo omits the pill in every variant; the type is already communicated by colour + icon.
- **Title**: 700 / 16px / `#2B363C`.
- **Description**: 400 / 16px / `#2B363C`.
- **Container**: AgoraDS defaults — `padding 16px`, `border-radius 4px`, `gap 8px` between icon/content and between title/description. Do not override.
- Title and description are both in Portuguese (UI language).

## Snippet

```tsx
<StatusCard
  variant="informative"   // 'informative' | 'success' | 'warning' | 'danger'
  showIcon
  title="Estabelecimento submetido"
  description="A submissão foi recebida e está em validação automática."
/>
```

## Cross-cutting

- For transient confirmations after an action, prefer `Toast` (see [toast.md](./toast.md)). Use `StatusCard` only when the message must persist in the page until the user acts on it.
- Inside forms, render a `danger` status card **above** the button bar to surface 4xx validation errors (see [form-layout.md](./form-layout.md)).
- Never stack two status cards of the same variant — merge their messages.
