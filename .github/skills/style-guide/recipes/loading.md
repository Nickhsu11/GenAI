# Loading — Canonical Rules

> Machine-readable source of truth for loading indicators in the Demo frontoffice.
> The `.tsx` files under `services/frontoffice/frontend/src/features/style-guide/sections/loading/` render this guidance for humans at `/style-guide/loading`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

All loading indicators MUST be built from AgoraDS `LoaderDialog`. Never roll a custom spinner.

There are exactly two patterns:

1. **Inline** — `<LoaderDialog>` rendered directly, scoped to a card / modal body / panel.
2. **Global overlay** — `<LoaderDialogProvider>` mounted once at the root + `useLoaderDialogContext()` to drive it from anywhere.

## 1. Inline LoaderDialog

Use for indicators that live inside an already-bounded area: the body of a modal, a card while its data loads, a detail panel.

```tsx
import { LoaderDialog } from '@ama-pt/agora-design-system';

<LoaderDialog
  title="A carregar dados"
  subtitle="Por favor aguarde."
/>
```

Rules:

- `title` is **always** present, in Portuguese.
- `subtitle` only when it adds information (e.g. estimated duration).
- Do **not** wrap inline `LoaderDialog` in a provider — the provider is for the global overlay below.
- Do **not** use the inline pattern when the operation blocks the whole screen — use the global overlay instead so there is exactly one spinner.

## 2. Global overlay via LoaderDialogProvider

Mount the provider **once** at the app root (around `<BrowserRouter>`). Any descendant fires it through `useLoaderDialogContext()`.

```tsx
// App.tsx — one provider for the whole app
<LoaderDialogProvider>
  <BrowserRouter>{/* … */}</BrowserRouter>
</LoaderDialogProvider>
```

```tsx
// Inside any descendant component
const { showLoader, hideLoader } = useLoaderDialogContext();

const handleSubmit = async () => {
  showLoader({ title: 'A submeter', subtitle: 'Aguarde…' });
  try {
    await api.submit(payload);
  } finally {
    hideLoader();      // ← MUST live in finally so it closes even on error
  }
};
```

Rules:

- **One provider only**, at the app root. Never instantiate a local `LoaderDialogProvider` inside a feature — that breaks the "one spinner per page" rule.
- `hideLoader()` lives in `finally`, never in the happy path only. Otherwise an error leaves the overlay stuck.
- Standard messages:
  - Submissions: `{ title: 'A submeter', subtitle: 'Aguarde…' }`
  - Reads: `{ title: 'A carregar', subtitle: 'Por favor aguarde…' }`
- In tests: render the unit under test inside `<LoaderDialogProvider>…</LoaderDialogProvider>` or stub `useLoaderDialogContext`. The hook throws without a provider.

## Inline vs overlay — which to pick

| Situation | Use |
|---|---|
| Whole-page blocking action (submit, navigate-and-wait) | Global overlay |
| Modal that loads its content before showing fields | Inline (inside the modal body) |
| Card / panel that loads independently while the rest of the page stays interactive | Inline |
| List page initial fetch | Inline placeholder inside the list area |

## Forbidden combinations

- **Do not** combine the global overlay with a `disabled` + `"A submeter…"` button label in the same flow. Pick one: overlay (blocking) **or** button-loading (page stays interactive). Mixing them double-signals and confuses users.
- **Do not** wrap a single page in its own `LoaderDialogProvider`. There is exactly one provider, at the root.
