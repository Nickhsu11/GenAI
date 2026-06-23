# Agora Design System — Component Catalogue

> **Version:** 3.5.x  
> All components are imported from `@ama-pt/agora-design-system`.  
> For full props, examples, and accessibility details open the Storybook link for each component.  
> **When a new component is found, add a row to the table below.**  
> **When the installed package version differs from the version above, ask the user whether this document should be updated before proceeding.**

## Sources — where to update or get more info

| Purpose | URL |
|---|---|
| Storybook (component docs, props, examples) | https://react.agora.gov.pt |
| Full component index (machine-readable list of all stories) | https://react.agora.gov.pt/index.json |
| npm package changelog | https://www.npmjs.com/package/@ama-pt/agora-design-system |
| Per-component doc page pattern | `https://react.agora.gov.pt/?path=/docs/components-{slug}--documentation` |

> To refresh this catalogue: fetch `index.json`, filter entries whose `id` starts with `components-` and ends with `--documentation`, then add any missing rows using the slug pattern above.

---

## Component List

> ⚠️ Components marked **[deprecated]** still exist in 3.5.1 but should be avoided in new work.

| Component | Description | Storybook |
|---|---|---|
| Accordion | Expandable panel with toggle header button that shows or hides a content section | [↗](https://react.agora.gov.pt/?path=/docs/components-accordion--documentation) |
| Accordion Group | Container that groups multiple Accordion items with shared expand/collapse behaviour | [↗](https://react.agora.gov.pt/?path=/docs/components-accordion-group--documentation) |
| Anchor | Styled anchor link with icon and appearance variants (equivalent to a styled `<a>`) | [↗](https://react.agora.gov.pt/?path=/docs/components-anchor--documentation) |
| Avatar | User avatar with optional badge, multiple display types, and interactive support | [↗](https://react.agora.gov.pt/?path=/docs/components-avatar--documentation) |
| Avatar Group | Stacked list of Avatar icons with configurable overflow count | [↗](https://react.agora.gov.pt/?path=/docs/components-avatar-group--documentation) |
| Back To Top | Fixed floating button that scrolls the page back to the top | [↗](https://react.agora.gov.pt/?path=/docs/components-back-to-top--documentation) |
| Breadcrumb | Hierarchical navigation trail that contextualises the user's location on the site | [↗](https://react.agora.gov.pt/?path=/docs/components-breadcrumb--documentation) |
| Button | Clickable element activated by mouse, keyboard, finger, or assistive technology | [↗](https://react.agora.gov.pt/?path=/docs/components-button--documentation) |
| Button Group | Horizontal or vertical set of related Button controls | [↗](https://react.agora.gov.pt/?path=/docs/components-button-group--documentation) |
| Card Action | Card with one or more action buttons, optional image, alignment, and variants | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-action--documentation) |
| Card Error | Card for displaying error states within a content area | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-error--documentation) |
| Card Expandable | Card with an expandable body section controlled by a header toggle | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-expandable--documentation) |
| Card Frame | Structural card container with optional links and link-position control | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-frame--documentation) |
| Card Full Image | Full-bleed image card with overlay title and optional dark background | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-full-image--documentation) |
| Card General | Versatile general-purpose card with horizontal/vertical layout and icon support | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-general--documentation) |
| Card Highlight | Featured content card with positioned text overlay and image | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-highlight--documentation) |
| Card Highlight Newsletter | Newsletter subscription prompt card with optional title | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-highlight-newsletter--documentation) |
| Card Illustrative | Card with illustration or image, supporting filters, layouts, and link variants | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-illustrative--documentation) |
| Card Links | Card containing a primary link and a list of secondary links | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-links--documentation) |
| Card No Results | Empty-state card for search/filter scenarios with no results | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-no-results--documentation) |
| Card Section Helper | Section-level helper card with subtitle and variants | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-section-card-section-helper--documentation) |
| Card Section Index | Section-level index card with variants | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-section-card-section-index--documentation) |
| Card Section Sitemap | Section-level sitemap card with description and variants | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-section-card-section-sitemap--documentation) |
| Status Card | Card showing a status summary with icon and optional pill label | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-status-card--documentation) |
| Checkbox | Verification checkbox with label, feedback messaging, and helper text | [↗](https://react.agora.gov.pt/?path=/docs/components-checkbox--documentation) |
| Checkbox Group | Managed group of Checkbox inputs sharing a label and feedback | [↗](https://react.agora.gov.pt/?path=/docs/components-checkbox-group--documentation) |
| Dialog | Accessible non-blocking dialog overlay (lighter than Modal) | [↗](https://react.agora.gov.pt/?path=/docs/components-dialog--documentation) |
| DropdownOption | Child of `InputSelect` / `DropdownSection` — defines a single selectable option (`value`, `selected`) | — |
| DropdownSection | Child of `InputSelect` — groups `DropdownOption` items under a named section (`name` required) | — |
| Federated Footer | Footer variant for federated / shared services | [↗](https://react.agora.gov.pt/?path=/docs/components-footer-federated-footer--documentation) |
| Glossary Letters | Alphabetical letter navigator for glossary / A–Z index pages | [↗](https://react.agora.gov.pt/?path=/docs/components-glossary-letters--documentation) |
| Authenticated | Sub-component of `Header` — authenticated user widget (avatar, dropdown menu trigger) | — |
| AuthenticatedBody | Child of `Authenticated` — body slot for profile links | — |
| AuthenticatedBodyLink | Child of `AuthenticatedBody` — individual profile link item with optional icon | — |
| AuthenticatedFooter | Child of `Authenticated` — footer slot of the auth dropdown | — |
| AuthenticatedFooterAction | Child of `AuthenticatedFooter` — action button (e.g. logout) | — |
| AuthenticatedHeader | Child of `Authenticated` — header slot (display name) | — |
| Brand | Sub-component of `Header` — brand/logo section wrapper | — |
| GeneralBar | Sub-component of `Header` — top utility bar (languages, auth widget) | — |
| Header | Composable page header with brand, navigation, search, authentication, and language switching; **must** be wrapped in a native `<header>` element | [↗](https://react.agora.gov.pt/?path=/docs/components-header--documentation) |
| Institutional | Child of `Brand` — institutional name/text slot | — |
| Language | Child of `Languages` — individual language option (`value`, `label`, `abbr`, `icon`, `checked`) | — |
| Languages | Sub-component of `Header` — language switcher container (`onChange` callback) | — |
| NavigationBar | Sub-component of `Header` — primary navigation container with responsive menu props | — |
| NavigationLink | Child of `NavigationBar` — wraps a router `<Link>`; place `aria-current="page"` on the inner link not on this component | — |
| Icon | Renders an Agora icon by name (`agora-line-{name}` / `agora-solid-{name}`) | [↗](https://react.agora.gov.pt/?path=/docs/components-icon--documentation) |
| Input Date | Date field combining a text input and a calendar picker overlay | [↗](https://react.agora.gov.pt/?path=/docs/components-input-date--documentation) |
| Input Email Bar | Inline email subscription bar with validation and feedback | [↗](https://react.agora.gov.pt/?path=/docs/components-input-email-bar--documentation) |
| Input Number | Number field with stepper buttons and min / max / step constraints | [↗](https://react.agora.gov.pt/?path=/docs/components-input-number--documentation) |
| Input Password | Password field with show / hide toggle | [↗](https://react.agora.gov.pt/?path=/docs/components-input-password--documentation) |
| Input Phone | International phone number field with country-code selector and search | [↗](https://react.agora.gov.pt/?path=/docs/components-input-phone--documentation) |
| Input Range | Slider for selecting a single value or a range within min / max bounds | [↗](https://react.agora.gov.pt/?path=/docs/components-input-range--documentation) |
| Input Search | Standard search text field with icon slot | [↗](https://react.agora.gov.pt/?path=/docs/components-input-search--documentation) |
| Input Search Bar | Search bar with optional voice-activation button, for use in Hero-like sections | [↗](https://react.agora.gov.pt/?path=/docs/components-input-search-bar--documentation) |
| Input Select | Dropdown select for single or multiple option selection, with optional search | [↗](https://react.agora.gov.pt/?path=/docs/components-input-select--documentation) |
| Input Text | Standard text field with label, validation, feedback, and helper text | [↗](https://react.agora.gov.pt/?path=/docs/components-input-text--documentation) |
| Input Text Area | Multi-line textarea with character counter, min/max, and feedback | [↗](https://react.agora.gov.pt/?path=/docs/components-input-text-area--documentation) |
| Input Time | Time field combining text input and a time-picker overlay | [↗](https://react.agora.gov.pt/?path=/docs/components-input-time--documentation) |
| Link Wrapper | Applies Button-style appearance to a native `<a>` element | [↗](https://react.agora.gov.pt/?path=/docs/components-linkwrapper--documentation) |
| List | Ordered or unordered list with icon, secondary text, and nested list support | [↗](https://react.agora.gov.pt/?path=/docs/components-list--documentation) |
| Loader Dialog | Full-screen loading overlay dialog | [↗](https://react.agora.gov.pt/?path=/docs/components-loader-dialog--documentation) |
| Modal Dialog | Accessible full modal with scroll support and context API | [↗](https://react.agora.gov.pt/?path=/docs/components-modal-dialog--documentation) |
| Panel Switcher | Tabbed content switcher — panel buttons on desktop, modal overlay on mobile | [↗](https://react.agora.gov.pt/?path=/docs/components-panel-switcher--documentation) |
| Pill | Small label/badge element with colour variants, outline/solid, and numeric mode | [↗](https://react.agora.gov.pt/?path=/docs/components-pill--documentation) |
| Popup Dialog | Lightweight popup dialog, lighter than Modal | [↗](https://react.agora.gov.pt/?path=/docs/components-popup-dialog--documentation) |
| Progress Bar | Linear progress indicator with states: empty, in-progress, hold, error, complete | [↗](https://react.agora.gov.pt/?path=/docs/components-progress-bar--documentation) |
| Progress Bar Group | Multi-step progress bar group for staged workflows | [↗](https://react.agora.gov.pt/?path=/docs/components-progress-bar-group--documentation) |
| Public Footer | Standard public-sector footer with links, social, and legal sections | [↗](https://react.agora.gov.pt/?path=/docs/components-footer-public-footer--documentation) |
| Quiz Item Summary | Summary row showing a completed quiz item and its answer | [↗](https://react.agora.gov.pt/?path=/docs/components-quiz-quiz-item-summary--documentation) |
| Quiz Option | Single quiz answer option (radio, checkbox, or select variant) | [↗](https://react.agora.gov.pt/?path=/docs/components-quiz-quiz-option--documentation) |
| Quiz Options | Container for a group of Quiz Option items | [↗](https://react.agora.gov.pt/?path=/docs/components-quiz-quiz-options--documentation) |
| Radio Button | Radio button for option groups where only one item can be selected at a time | [↗](https://react.agora.gov.pt/?path=/docs/components-radio-button--documentation) |
| Radio Button Group | Managed group of Radio inputs sharing a label and feedback | [↗](https://react.agora.gov.pt/?path=/docs/components-radio-button-group--documentation) |
| Rating Buttons | Interactive rating widget using labelled buttons with variants | [↗](https://react.agora.gov.pt/?path=/docs/components-ratings-rating-buttons--documentation) |
| Rating Icons | Interactive or read-only star/icon rating widget with feedback | [↗](https://react.agora.gov.pt/?path=/docs/components-ratings-rating-icons--documentation) |
| Scribbles | Decorative SVG scribble shapes used as background accents | [↗](https://react.agora.gov.pt/?path=/docs/components-scribbles--documentation) |
| Search Pagination | Pagination control specialised for search result pages | [↗](https://react.agora.gov.pt/?path=/docs/components-search-pagination--documentation) |
| Sidebar Filter | Sidebar panel with hierarchical filter items and flat/nested modes | [↗](https://react.agora.gov.pt/?path=/docs/components-sidebar-sidebar-filter--documentation) |
| Sidebar Navigation | Sidebar panel with hierarchical navigation links and flat/nested modes | [↗](https://react.agora.gov.pt/?path=/docs/components-sidebar-sidebar-navigation--documentation) |
| Skip Navigation | Accessibility link to skip repeated navigation blocks (hidden until focused) | [↗](https://react.agora.gov.pt/?path=/docs/components-skip-navigation--documentation) |
| Step List | Numbered or icon-based ordered list for step-by-step instructions | [↗](https://react.agora.gov.pt/?path=/docs/components-step-list--documentation) |
| Stepper | Segmented progress indicator for multi-step / wizard workflows | [↗](https://react.agora.gov.pt/?path=/docs/components-stepper--documentation) |
| Switch | On/off toggle switch with label, feedback, reverse layout, and controlled/uncontrolled support | [↗](https://react.agora.gov.pt/?path=/docs/components-switch--documentation) |
| Table | Responsive data table with server-side pagination and breakpoint layouts | [↗](https://react.agora.gov.pt/?path=/docs/components-table--documentation) |
| Tabs | Horizontal tab bar for switching between content panels | [↗](https://react.agora.gov.pt/?path=/docs/components-tabs--documentation) |
| Timeline Horizontal | Horizontal timeline with event nodes, active state, and overflow support | [↗](https://react.agora.gov.pt/?path=/docs/components-timelines-timeline-horizontal--documentation) |
| Timeline Vertical | Vertical timeline with event nodes, icons, and overflow | [↗](https://react.agora.gov.pt/?path=/docs/components-timelines-timeline-vertical--documentation) |
| Toasts | Notification toast container and individual toast items with dismiss support | [↗](https://react.agora.gov.pt/?path=/docs/components-toasts--documentation) |
| Toggle | Toggle button with checked state, button or icon appearance, and full-width support | [↗](https://react.agora.gov.pt/?path=/docs/components-toggle--documentation) |
| Toggle Group | Group of related Toggle buttons | [↗](https://react.agora.gov.pt/?path=/docs/components-togglegroup--documentation) |
| Uploader (Drag & Drop) | File upload zone supporting drag-and-drop, multiple files, type/size constraints | [↗](https://react.agora.gov.pt/?path=/docs/components-uploader-drag-and-drop--documentation) |

**Deprecated components** (present in 3.5.1, avoid in new work):

| Component | Storybook |
|---|---|
| Card Article | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-article--documentation) |
| Card Collection | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-collection--documentation) |
| Card Emphasize | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-emphasize--documentation) |
| Card Hero Helper | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-hero-helper--documentation) |
| Card Hero Index | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-hero-index--documentation) |
| Card Hero Sitemap | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-hero-sitemap--documentation) |
| Card Highlight Single | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-highlight-single--documentation) |
| Card Single | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-single--documentation) |
| Card Topic | [↗](https://react.agora.gov.pt/?path=/docs/components-cards-card-topic--documentation) |

---

## Icons

### Naming convention

All icons follow a two-variant naming scheme:

| Variant | Pattern | Example |
|---|---|---|
| Outline | `agora-line-{name}` | `agora-line-user`, `agora-line-log-out` |
| Filled | `agora-solid-{name}` | `agora-solid-user`, `agora-solid-log-out` |

Browse all available icon names in Storybook: [↗](https://react.agora.gov.pt/?path=/docs/components-icon--documentation)

### `Icon` component

```tsx
import { Icon } from '@ama-pt/agora-design-system';

// Decorative — hidden from screen readers
<Icon name="agora-line-settings" aria-hidden />

// Meaningful — describe intent to screen readers
<Icon name="agora-line-search" aria-label="Search" />
```

Key props:

| Prop | Type | Notes |
|---|---|---|
| `name` | `string` | Required. Full icon token name |
| `aria-hidden` | `boolean` | Use for decorative icons that add no meaning |
| `aria-label` | `string` | Use when the icon is the only label for an action |

### Icons as props on other components

Many components accept icon names as props — not a JSX element, just the token string:

```tsx
// Button
<Button leadingIcon="agora-line-plus" trailingIcon="agora-line-arrow-right">
  Add item
</Button>

// AuthenticatedBodyLink / AuthenticatedFooterAction
<AuthenticatedBodyLink
  hasIcon
  leadingIcon="agora-line-user"
  leadingIconHover="agora-solid-user"
>
  ...
</AuthenticatedBodyLink>
```

Common icon props found across components:

| Prop | Description |
|---|---|
| `leadingIcon` | Icon name shown before label (default state) |
| `leadingIconHover` | Icon name shown before label on hover |
| `trailingIcon` | Icon name shown after label |
| `hasIcon` | `boolean` — must be `true` to enable icon slots on some components |

### Accessibility rules

- **Decorative icons** (accompany visible text): always add `aria-hidden` or use as a component prop — never expose them to assistive technology.
- **Standalone icons** (no visible label nearby): provide `aria-label` describing the action or meaning.
- Never rely on icon colour alone to convey state — pair with text or `aria-label`.

---

## Common Types

```ts
type BooleanProp  = boolean | 'true' | 'false';
type FeedbackState = 'info' | 'danger' | 'success' | 'warning';
type ButtonAppearance = 'solid' | 'outline' | 'link';
type ButtonVariant = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'informative';
```

- All inputs are **`required` by default** — pass `required={false}` explicitly when optional.
- `Header` must be wrapped in a native `<header>` HTML element.
