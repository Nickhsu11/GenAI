# Accordion — Canonical Rules

> Machine-readable source of truth for accordion patterns in the Demo frontoffice.
> The `.tsx` files in this folder render this guidance for humans at `/style-guide/accordion`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

Use this section only for collapsible behavior. Card-specific static/detail layout rules are defined in `cards.md`.

---

## Tech-debt note

`DemoDetailCard` is a custom component built before adopting AgoraDS' `CardExpandable` (which wraps `CardAccordion` internally). Future refactor: delegate the collapse primitive (header click + chevron + animation + a11y) to AgoraDS `CardExpandable`, and keep only `Body / Section / Rows / Row / SubTitle` as Demo-owned layout helpers. Reduces custom code and aligns with the design system.

Until then, this section remains authoritative for accordion patterns in Demo.

---

## collapsibleDetailCard

- **Component**: `DemoDetailCard` (default `collapsible=true`).
- **Use for**: expandable blocks with dense contextual data.
- **Header behavior**: full header is clickable and toggles expand/collapse.
- **Structure**:
  - root `DemoDetailCard`
  - `DemoDetailCard.Body`
  - `DemoDetailCard.Section`
  - `DemoDetailCard.Rows` + `DemoDetailCard.Row`
- **Snippet**:
  ```tsx
  <DemoDetailCard icon="agora-line-user" title="Estabelecimento">
    <DemoDetailCard.Body>
      <DemoDetailCard.Section title="Dados Gerais">
        <DemoDetailCard.Rows>
          <DemoDetailCard.Row label="NIF" value="501234567" />
          <DemoDetailCard.Row label="Email" value="info@empresa.pt" />
        </DemoDetailCard.Rows>
      </DemoDetailCard.Section>
    </DemoDetailCard.Body>
  </DemoDetailCard>
  ```

---

## Cross-cutting

- Use this section when expand/retract interaction is required.
- If the content must stay always visible, use the `cards` section recipes.
- Do not implement ad-hoc accordion wrappers when `DemoDetailCard` already covers the use case.

---

## Dependencies

- **Icons contract** ([icons.md](../icons/icons.md)): ícones em headers (`agora-line-user`) e acções inline (`agora-line-edit`) vêm sempre do catálogo. Nunca emoji ou SVG inline.
- **Buttons contract** ([buttons.md](../buttons/buttons.md)): qualquer acção dentro de uma secção usa as recipes de `Button` — nunca `<button>` cru nem texto clicável.
