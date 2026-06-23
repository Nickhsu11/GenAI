# Agora Design System — Tailwind Theme Reference

> Full TailwindCSS v3 configuration used by the library.  
> Import `AgoraTailwindConfig` from `@ama-pt/agora-design-system` to apply it.

---

## Breakpoints (screens)

| Token | Value |
|---|---|
| `xs` | 360px |
| `md` | 768px |
| `xl` | 1280px |

---

## Typography

Font family: **Noto Sans** (sans-serif).

### Font Size Scale

| Token | Size | Line Height | Weight |
|---|---|---|---|
| `s-regular` | 0.875rem | 1.5rem | 400 |
| `s-medium` | 0.875rem | 1.5rem | 500 |
| `s-semibold` | 0.875rem | 1.5rem | 600 |
| `s-bold` | 0.875rem | 1.5rem | 700 |
| `m-light` | 1rem | 1.75rem | 300 |
| `m-regular` | 1rem | 1.75rem | 400 |
| `m-medium` | 1rem | 1.75rem | 500 |
| `m-semibold` | 1rem | 1.75rem | 600 |
| `m-bold` | 1rem | 1.75rem | 700 |
| `l-light` | 1.25rem | 2rem | 300 |
| `l-regular` | 1.25rem | 2rem | 400 |
| `l-medium` | 1.25rem | 2rem | 500 |
| `l-semibold` | 1.25rem | 2rem | 600 |
| `l-bold` | 1.25rem | 2rem | 700 |
| `xl-light` | 1.5rem | 2.25rem | 300 |
| `xl-regular` | 1.5rem | 2.25rem | 400 |
| `xl-medium` | 1.5rem | 2.25rem | 500 |
| `xl-semibold` | 1.5rem | 2.25rem | 600 |
| `xl-bold` | 1.5rem | 2.25rem | 700 |
| `2xl-light` | 2rem | 3rem | 300 |
| `2xl-regular` | 2rem | 3rem | 400 |
| `2xl-medium` | 2rem | 3rem | 500 |
| `2xl-semibold` | 2rem | 3rem | 600 |
| `2xl-bold` | 2rem | 3rem | 700 |
| `3xl-light` | 2.5rem | 3.75rem | 300 |
| `3xl-regular` | 2.5rem | 3.75rem | 400 |
| `3xl-medium` | 2.5rem | 3.75rem | 500 |
| `3xl-semibold` | 2.5rem | 3.75rem | 600 |
| `3xl-bold` | 2.5rem | 3.75rem | 700 |

Usage: `className="text-m-regular"`, `className="text-2xl-bold"`

---

## Colour Palette

### Base

| Token | Value |
|---|---|
| `white` | `#FFFFFF` |
| `black` | `#000000` |
| `transparent` | transparent |
| `focus` | `#F408FC` |
| `backdrop` | `rgba(43, 54, 60, 0.96)` |
| `mask.image` | `rgba(43, 54, 60, 0.8)` |

### Neutral

| Shade | Hex |
|---|---|
| 50 | `#F7F8FA` |
| 100 | `#F1F3F8` |
| 200 | `#E1E4EA` |
| 300 | `#CDD2DC` |
| 400 | `#BAC0CC` |
| 500 | `#9CA6B8` |
| 600 | `#8893AA` |
| 700 | `#64718B` |
| 800 | `#475164` |
| 900 | `#2B363C` |

### Primary

| Shade | Hex |
|---|---|
| 50 | `#FAFCFF` |
| 100 | `#F2F6FF` |
| 200 | `#E5EEFF` |
| 300 | `#BBD1FD` |
| 400 | `#5F93FC` |
| 500 | `#1A65FA` |
| 600 | `#034AD8` |
| 700 | `#0338A2` |
| 800 | `#002B82` |
| 900 | `#021C51` |

### Secondary

| Shade | Hex |
|---|---|
| 50 | `#F5FBFF` |
| 100 | `#EBF6FF` |
| 200 | `#E3F4FF` |
| 300 | `#CCEAFF` |
| 400 | `#A0D8FE` |
| 500 | `#1CA3FC` |
| 600 | `#1993E3` |
| 700 | `#1682CA` |
| 800 | `#12669E` |
| 900 | `#0D4C75` |

### Semantic Colours

| Palette | 500 value | Purpose |
|---|---|---|
| `informative` | `#0079BF` | Informational messages |
| `success` | `#008558` | Success states |
| `warning` | `#FBCB3C` | Warnings |
| `danger` | `#DE2D3B` | Errors / destructive actions |

Usage: `className="bg-primary-500 text-white"`, `className="text-danger-600"`

CSS variables are also available: `var(--color-primary-500)`, `var(--color-danger-600)`

---

## Spacing Scale

The spacing scale is **non-linear** — only these values exist:

`0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 256`  
Plus: `1/4` (25%), `1/2` (50%), `full` (100%), `initial`

Usage: `className="p-16 mb-32 gap-8"`

---

## Border Radius

| Token | Value |
|---|---|
| `none` | 0px |
| `4` | 4px |
| `8` | 8px |
| `16` | 16px |
| `24` | 24px |
| `32` | 32px |
| `full` | 100% |

Usage: `className="rounded-8"`, `className="rounded-full"`

---

## Box Shadow

| Token | Description |
|---|---|
| `none` | No shadow |
| `top-lower/low/medium/high/higher` | Shadow cast upward |
| `center-lower/low/medium/high/higher` | Symmetric shadow |
| `bottom-lower/low/medium/high/higher` | Shadow cast downward |
| `inner` | Inset shadow |

Usage: `className="shadow-bottom-medium"`

---

## Z-Index

| Token | Value | Usage |
|---|---|---|
| `dropdown` | 1000 | Dropdowns |
| `backdrop` | 2000 | Backdrop overlays |
| `sticky` | 3000 | Sticky elements |
| `fixed` | 4000 | Fixed elements |
| `drawer` | 5000 | Side drawers |
| `dialog` | 6000 | Modals / dialogs |
| `toast` | 7000 | Toast notifications |
| `tooltip` | 8000 | Tooltips |

Usage: `className="z-dialog"`

---

## Transition Duration

Default: `200ms`  
Usage: `className="transition duration-DEFAULT"`

---

## Container Padding

| Breakpoint | Padding |
|---|---|
| `xs` | 32px |
| `md` | 64px |
| `xl` | 0px |

---

## Grid Extensions

Additional grid template rows: `7` through `10`  
Additional grid template columns (auto): `1-auto` through `12-auto`

---

## Opacity Extensions

| Token | Value |
|---|---|
| `16` | 0.16 |
| `32` | 0.32 |

---

## Border Width Extensions

`DEFAULT` (1px), `0`, `1`, `2`, `3`, `4`

---

## Min/Max Width & Height

Additional token: `initial` → `initial`
