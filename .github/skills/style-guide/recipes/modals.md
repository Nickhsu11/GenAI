# Modals — Canonical Rules

> Machine-readable source of truth for modal patterns in the Demo frontoffice.
> The `.tsx` files in this folder render this guidance for humans at `/style-guide/modals`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

In Demo frontoffice, modals use `createPortal` + overlay container + dialog container.

## Typography & Component Contract

Modals inherit styling rules from other style-guide sections:

- **Modal titles** use typography from `typography.md`: `demo-modal-title` is semantically `<h2>` and visually styled as a section title.
- **Modal inputs** use the `InputText` + label contract from `inputs.md`: labels are `16px` `500` `#021C51`, inputs follow `inputs.md` rules.
- **Modal buttons** use button variants from `buttons.md`: primary, secondary, danger buttons in modals must comply with button recipe (variant + appearance + icon rules).

---

## formModal

- **Use for**: data input/edit flows (e.g. Adicionar Entrada, Adicionar Origem).
- **Structure**:
  - overlay `div` with `position: fixed` and `background: var(--color-modal-overlay)`
  - dialog `div` with `role="dialog"` and `aria-modal="true"`
  - header row (`demo-modal-header-spec`) with title + close button
  - title as `<h2 className="demo-modal-title">...` inside modal header
  - close button all the way to the right with occupied area `60x60`
  - close icon rendered in a `24x24` visual box
  - action footer aligned right (`justifyContent: 'flex-end'`)
- **Sizing**:
  - base modal width: `592px`
  - if modal has a single form element, that element area must be `528x60`
- **Spacing / visual**:
  - modal container: `padding 32px`, `border-radius 16px`, inner `gap 16px`
  - title vertically aligned with the close button
  - vertical gap between form elements: `16px`
  - form labels inside modal: `16px`, `500`, `#021C51`
  - button container gap: `16px`
- **Snippet**:
  ```tsx
  {isModalOpen && createPortal(
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-modal-overlay)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="demo-modal-dialog-spec"
        style={{ width: '592px' }}
      >
        <div className="demo-modal-header-spec">
          <h2 className="demo-modal-title">Adicionar Entrada</h2>
          <Button
            variant="primary"
            appearance="link"
            type="button"
            iconOnly
            hasIcon
            leadingIcon="agora-line-x"
            leadingIconHover="agora-solid-x"
            aria-label="Fechar"
            className="demo-modal-close-btn"
            onClick={closeModal}
          />
        </div>
        <div className="demo-form-inputs demo-modal-fields-spec">
          <div className="demo-modal-single-field">
            <InputText label="Designação" name="designacao" placeholder="Introduza a designação" />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <Button variant="primary" appearance="solid" type="button" onClick={closeModal}>
            Guardar
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )}
  ```

## confirmModal

- **Use for**: confirming destructive/irreversible actions (e.g. eliminar registo, descartar alterações).
- **Structure**:
  - same overlay + dialog + header contract as `formModal`
  - **no form fields** — only title and action buttons
  - action footer with buttons spread horizontally (`justifyContent: 'space-between'`):
    - **Eliminar** (left) — `variant="danger"`, `appearance="solid"`
    - **Confirmar** (right) — `variant="primary"`, `appearance="solid"`
- **Sizing**: `width: 592px`.
- **Snippet**:
  ```tsx
  {isConfirmOpen && createPortal(
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-modal-overlay)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="demo-modal-dialog-spec"
        style={{ width: '592px' }}
      >
        <div className="demo-modal-header-spec">
          <h2 className="demo-modal-title">Confirmar eliminação</h2>
          <Button
            variant="primary"
            appearance="link"
            type="button"
            iconOnly
            hasIcon
            leadingIcon="agora-line-x"
            leadingIconHover="agora-solid-x"
            aria-label="Fechar"
            className="demo-modal-close-btn"
            onClick={closeModal}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <Button variant="danger" appearance="solid" type="button" onClick={onDelete}>
            Eliminar
          </Button>
          <Button variant="primary" appearance="solid" type="button" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )}
  ```

---

## Cross-cutting

- **Portal target**: render modal with `createPortal(..., document.body)`.
- **A11y**: dialog container must include `role="dialog"` + `aria-modal="true"`.
- **Overlay close**: close only when clicking the overlay background (`e.target === e.currentTarget`).
- **Title class**: always use `demo-modal-title`.
- **Spacing baseline**: dialog uses `padding: 32px` and internal `gap: 16px`.
- **Close control baseline**: right aligned close button with `60x60` occupied area and `24x24` icon box.
- **Form baseline**: use `demo-form-inputs` + `demo-modal-fields-spec`; keep vertical field gap at `16px`.

---

## Dependencies

Modals do **not** define their own title/input/button styling. Instead, they **reference and inherit** from:

- **Typography contract**: modal titles follow `typography.md` rules; use `demo-modal-title` as the element hook but apply typography classes for styling.
- **Inputs contract**: modal form fields follow `inputs.md` rules; use `InputText` + label structure exactly as specified in the inputs recipe.
- **Buttons contract**: modal action buttons follow `buttons.md` rules; use button variants (`primary`, `secondary`, `danger`) + appearances (`solid`, `outline`, `link`) exactly as specified in the buttons recipe.
- **Icons contract** ([icons.md](../icons/icons.md)): botão de fechar usa `agora-line-x` (iconOnly + `aria-label="Fechar"`). Qualquer outro ícone dentro do modal vem do catálogo.

If modal styling differs from these recipes, do not override in the modal CSS. Instead, fix the recipe.
