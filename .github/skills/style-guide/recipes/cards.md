# Cards — Canonical Rules

> Machine-readable source of truth for card layout patterns in the Demo frontoffice.
> The `.tsx` files in this folder render this guidance for humans at `/style-guide/cards`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

Use this section for always-visible card layout behavior.

---

## sectionedDetailCard

- **Component**: plain card container (`div`) using card-specific classes.
- **Use for**: detail cards that remain open and group content by sections.
- **Typography contract**:
  - card title uses `demo-section-title`
  - section/subsection titles use `demo-subsection-title`
- **Section divider rule**: when there are 2+ sections, each following section is separated by a top line of `1px` with color `#64718B`.
- **Green side line rule**: do **not** show green side line in this recipe. The green side line belongs only to accordion sections.
- **Example composition**: use section title + inputs to demonstrate real card layout.
- **Snippet**:
  ```tsx
  <div className="demo-sectioned-card-spec">
    <h2 className="demo-section-title demo-sectioned-card-title">Ficha do estabelecimento</h2>

    <section className="demo-sectioned-card-section">
      <h3 className="demo-subsection-title demo-sectioned-card-section-title">Dados Gerais</h3>
      <div className="demo-form-inputs demo-sectioned-card-fields">
          <InputText label="Designação" name="designacao" required placeholder="Ex.: Unidade Centro" />
          <InputText label="NIF" name="nif" readOnly value="501234567" />
      </div>
    </section>

    <section className="demo-sectioned-card-section">
      <h3 className="demo-subsection-title demo-sectioned-card-section-title">Contactos</h3>
      <div className="demo-form-inputs demo-sectioned-card-fields">
          <InputText label="Email" name="email" placeholder="Ex.: info@empresa.pt" />
          <InputText label="Telefone" name="telefone" placeholder="Ex.: +351 210 000 000" />
      </div>
    </section>
  </div>
  ```

---

## Cross-cutting

- Do not use `DemoDetailCard.Section` in this recipe (it adds accordion visual affordances, including the side line).
- Title hierarchy is mandatory: `demo-section-title` for card title and `demo-subsection-title` for section titles.
- Keep section separators consistent with the shared 1px `#64718B` rule.

---

## Dependencies

Cards do **not** define their own typography, inputs, buttons, or iconography. They **reference and inherit** from:

- **Typography contract** ([typography.md](../typography/typography.md)): titles use `demo-section-title` / `demo-subsection-title`; body text uses the canonical text-* classes.
- **Inputs contract** ([inputs.md](../inputs/inputs.md)): fields inside cards use AgoraDS inputs (`InputText`, `InputNumber`, `InputSelect`, `InputDate`).
- **Buttons contract** ([buttons.md](../buttons/buttons.md)): card actions follow the standard Button recipes.
- **Icons contract** ([icons.md](../icons/icons.md)): ícones em headers de card (ex.: `agora-line-user` no `DemoDetailCard` do Estabelecimento) vêm do catálogo. Nunca emoji ou SVG inline.
