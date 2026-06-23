# Toast — Canonical Rules

> Machine-readable source of truth for the Toast pattern in the Demo frontoffice.
> The `.tsx` files under `services/frontoffice/frontend/src/features/style-guide/sections/toast/` render this guidance for humans at `/style-guide/toast`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

All toasts MUST use `<ToastProvider>` + `useToastContext()` from `@ama-pt/agora-design-system`. Never roll a custom snackbar/notification.

## Setup (once, at the app root)

Wrap the tree where toasts can be fired with `<ToastProvider position="top-right">`. `top-right` is the only approved position in Demo.

```tsx
<ToastProvider position="top-right">
  <App />
</ToastProvider>
```

## Firing a toast (anywhere below the provider)

Use the **consumer** hook `useToastContext()`. Do **not** use `useToast()` — that is the internal factory the provider uses to create its own state; calling it from a child component creates a detached toast list that nothing renders.

```tsx
const { showToast } = useToastContext();

showToast(
  {
    id: `toast-${Date.now()}`,
    type: 'success',            // 'success' | 'failure' | 'warning'
    title: 'Operação concluída',
    description: 'O registo foi guardado com sucesso.',
    closeLabel: 'Fechar',
  },
  5000,
);
```

## Required fields

| Field | Rule |
|---|---|
| `id` | Unique per toast. Use `` `toast-${Date.now()}-${Math.random()}` `` for fire-and-forget toasts. |
| `type` | `'success'` \| `'failure'` \| `'warning'`. Pick by message meaning, not colour. |
| `title` | Short (≤ 40 chars), Portuguese, no trailing punctuation. |
| `description` | One sentence, Portuguese, with punctuation. |
| `closeLabel` | `"Fechar"`. Required for the accessible name of the close button. |
| Duration (2nd arg) | **5000 ms** (default). Use `0` only for critical errors that require user action. |

## Type → meaning map

| `type` | Use for |
|---|---|
| `success` | Operation completed (saved, submitted, created). |
| `warning` | Non-blocking attention (validation hints, missing optional data). |
| `failure` | Operation failed; user should retry or fix something. |

## Positioning & spacing (Demo override)

The provider's default top-right offset is replaced with `top: 32px; right: 32px` and stacked toasts get a `gap: 8px`. This override is part of the global toast CSS — do not re-style per-toast.

## When to use Toast vs Status card

- **Toast** = transient confirmation that disappears after 5s. The user does not have to act on it.
- **Status card** ([status-card.md](./status-card.md)) = persistent message that stays in the page until the user acts on it (e.g. a validation summary above a form).

Never use a toast for blocking errors — they vanish and the user loses context.
