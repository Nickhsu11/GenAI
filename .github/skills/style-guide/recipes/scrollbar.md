# Scrollbar — Canonical Rules

> Machine-readable source of truth for the Demo custom scrollbar.
> The `.tsx` files under `services/frontoffice/frontend/src/features/style-guide/sections/scrollbar/` render this guidance for humans at `/style-guide/scrollbar`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

AgoraDS does **not** ship a scrollbar component. Demo provides a single CSS recipe — the `.demo-scroll` class — applied to any container that owns its own overflow.

## When to use

Add `.demo-scroll` to any element with `overflow-y`, `overflow-x`, or `overflow: auto` that should show the Demo-styled scrollbar instead of the OS default — e.g. modal bodies, long tables, side lists, scrollable panels.

**Do not** apply to `<body>` or `<html>`. The page-level scrollbar stays native.

## Two dimensions

1. **Orientation** — derived from the container's overflow. There are no separate vertical/horizontal classes. A container with `overflow-y` shows a vertical thumb; one with `overflow-x` shows a horizontal thumb.
2. **Track variant** — `.demo-scroll` alone gives a transparent track; adding `.demo-scroll--bg` gives a `#F1F3F8` track with `border-radius: 4px`.

## Snippet (canonical CSS)

```css
/* Apply by adding .demo-scroll to the element. */
.demo-scroll {
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #BAC0CC transparent;
}

/* WebKit (Chrome, Edge, Safari) */
.demo-scroll::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* No arrows. display:none alone is not enough on some Edge/Chromium
   builds — width/height:0 forces them out. */
.demo-scroll::-webkit-scrollbar-button,
.demo-scroll::-webkit-scrollbar-button:single-button,
.demo-scroll::-webkit-scrollbar-button:start:decrement,
.demo-scroll::-webkit-scrollbar-button:end:increment {
  display: none;
  width: 0;
  height: 0;
}

.demo-scroll::-webkit-scrollbar-track {
  background: transparent;
  margin: 4px 0;          /* 4px inset — thumb never touches top/bottom */
}
.demo-scroll::-webkit-scrollbar-track:horizontal {
  margin: 0 4px;
}

.demo-scroll::-webkit-scrollbar-thumb {
  background-color: #BAC0CC;
  border-radius: 4px;
  min-height: 80px;       /* thumb never shorter than 80px */
}
.demo-scroll::-webkit-scrollbar-thumb:horizontal {
  min-width: 80px;
  min-height: 0;
}
.demo-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #64718B;
}

/* Optional modifier: visible light track. */
.demo-scroll--bg {
  scrollbar-color: #BAC0CC #F1F3F8;
}
.demo-scroll--bg::-webkit-scrollbar-track {
  background: #F1F3F8;
  border-radius: 4px;
}
```

## Tokens

| Property | Value |
|---|---|
| Thickness | 8px (`width` vertical, `height` horizontal) |
| Thumb radius | 4px |
| Thumb min size on main axis | 80px |
| Track inset at the ends | 4px |
| Thumb colour — normal | `#BAC0CC` |
| Thumb colour — hover | `#64718B` |
| Track colour — `.demo-scroll` alone | transparent |
| Track colour — with `.demo-scroll--bg` | `#F1F3F8` |
| Arrows | none |

## When to use which track variant

- **Transparent (default `.demo-scroll`)** — when the scrollbar sits over a white/clean background or when minimum chrome is wanted (modals, narrow panels).
- **With background (`.demo-scroll .demo-scroll--bg`)** — when the bar is long and gets lost on the background, or when the scrollable container is the visual focus of the page (side list, long data table).

## Browser support

Firefox via `scrollbar-width` + `scrollbar-color`. WebKit (Chrome, Edge, Safari) via `::-webkit-scrollbar`. No IE / legacy Edge — acceptable, Demo targets modern browsers.

## Cross-cutting

- **Never** apply on `<body>` or `<html>`.
- Do not edit the values per-page. Visual change happens in the canonical CSS and propagates everywhere.
