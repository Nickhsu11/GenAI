/**
 * Buttons — code snippets per variant.
 *
 * One snippet per variant covers all three states (apply / remove `disabled`,
 * hover is automatic). Keys stay in sync with `buttons.examples.tsx` and
 * `buttons.rules.tsx`.
 */
export const buttonsCode: Record<string, string> = {
  primary: `<Button
  variant="primary"
  appearance="solid"
  type="submit"
  className="demo-btn-primary"
  disabled={isSubmitting} // omit for default; toggle for disabled state
>
  Submeter
</Button>`,

  secondary: `<Button
  variant="primary"
  appearance="outline"
  type="button"
  className="demo-btn-secondary"
  disabled={false} // toggle for disabled state
>
  Cancelar
</Button>`,

  link: `<Button
  variant="primary"
  appearance="link"
  type="button"
  className="demo-btn-link"
  hasIcon
  leadingIcon="agora-line-edit"
  leadingIconHover="agora-solid-edit"
  disabled={false} // toggle for disabled state
>
  Editar
</Button>`,

  splitPair: `<div className="demo-btn-split-pair">
  <Button
    variant="primary"
    appearance="outline"
    type="button"
    className="demo-btn-secondary demo-btn-split-left"
    hasIcon
    trailingIcon="agora-line-upload"
  >
    Importar
  </Button>
  <Button
    variant="primary"
    appearance="outline"
    type="button"
    className="demo-btn-secondary demo-btn-split-right"
    hasIcon
    trailingIcon="agora-line-download"
  >
    Exportar
  </Button>
</div>`,

  iconOnly: `<Button
  variant="primary"
  appearance="link"
  type="button"
  className="demo-btn-link"
  iconOnly
  hasIcon
  leadingIcon="agora-line-x"
  leadingIconHover="agora-solid-x"
  aria-label="Fechar"
  onClick={onClose}
/>`,
};
