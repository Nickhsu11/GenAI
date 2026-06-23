# Icons — Canonical Rules (trimmed for demo)

> Machine-readable source of truth for icons. Agents read THIS file.

## §1 Use the AgoraDS `Icon` component from the approved catalogue
- Icons are rendered with `<Icon icon="agora-line-…" />` (or `agora-solid-…`) from AgoraDS.
- A raw emoji, inline `<svg>`, or icon-font from outside AgoraDS used as a UI icon is a **🟡 Minor** violation
  (the catalogue + sizing are owned by AgoraDS).

## §2 Line vs solid
- Default state uses the `agora-line-*` variant; the `agora-solid-*` pair is for the hover swap on buttons
  (`leadingIcon` + `leadingIconHover`). Using a solid icon as the default resting state is a **🟡 Minor** violation.

## §3 Feedback icons are fixed
- Input helper feedback uses the fixed set: `agora-solid-check-circle` (success), `agora-solid-alert-triangle`
  (error), `agora-solid-alert-circle` (warning), `agora-solid-info-mark` (info). Substituting another icon for a
  feedback state is a **🟡 Minor** violation.
