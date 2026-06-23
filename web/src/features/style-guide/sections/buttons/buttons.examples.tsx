import React from 'react';
import { Button } from '@ama-pt/agora-design-system';

/**
 * Buttons — live previews per variant.
 *
 * Each variant card shows the three states (default / hover / disabled)
 * side-by-side, plus the two compositions. Hover preview uses the
 * `.is-preview-hover` helper (defined in buttons.css) so the state renders
 * statically without forcing the user to hover.
 */

const stateRow: React.CSSProperties = {
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
};

const stateCell: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  alignItems: 'flex-start',
};

const stateLabel: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  color: '#64718B',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const Cell: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={stateCell}>
    <span style={stateLabel}>{label}</span>
    {children}
  </div>
);

export const buttonsExamples: Record<string, React.ReactNode> = {
  primary: (
    <div style={stateRow}>
      <Cell label="Default">
        <Button variant="primary" appearance="solid" type="button" className="demo-btn-primary">
          Submeter
        </Button>
      </Cell>
      <Cell label="Hover / clicked">
        <Button
          variant="primary"
          appearance="solid"
          type="button"
          className="demo-btn-primary is-preview-hover"
        >
          Submeter
        </Button>
      </Cell>
      <Cell label="Disabled">
        <Button variant="primary" appearance="solid" type="button" className="demo-btn-primary" disabled>
          Guardar
        </Button>
      </Cell>
    </div>
  ),

  secondary: (
    <div style={stateRow}>
      <Cell label="Default">
        <Button variant="primary" appearance="outline" type="button" className="demo-btn-secondary">
          Cancelar
        </Button>
      </Cell>
      <Cell label="Hover / clicked">
        <Button
          variant="primary"
          appearance="outline"
          type="button"
          className="demo-btn-secondary is-preview-hover"
        >
          Cancelar
        </Button>
      </Cell>
      <Cell label="Disabled">
        <Button
          variant="primary"
          appearance="outline"
          type="button"
          className="demo-btn-secondary"
          disabled
        >
          Cancelar
        </Button>
      </Cell>
    </div>
  ),

  link: (
    <div style={stateRow}>
      <Cell label="Default">
        <Button
          variant="primary"
          appearance="link"
          type="button"
          className="demo-btn-link"
          hasIcon
          leadingIcon="agora-line-edit"
          leadingIconHover="agora-solid-edit"
        >
          Editar
        </Button>
      </Cell>
      <Cell label="Hover / clicked">
        <Button
          variant="primary"
          appearance="link"
          type="button"
          className="demo-btn-link is-preview-hover"
          hasIcon
          leadingIcon="agora-line-edit"
          leadingIconHover="agora-solid-edit"
        >
          Editar
        </Button>
      </Cell>
      <Cell label="Disabled">
        <Button
          variant="primary"
          appearance="link"
          type="button"
          className="demo-btn-link"
          hasIcon
          leadingIcon="agora-line-edit"
          leadingIconHover="agora-solid-edit"
          disabled
        >
          Editar
        </Button>
      </Cell>
    </div>
  ),

  splitPair: (
    <div style={stateRow}>
      <Cell label="Default">
        <div className="demo-btn-split-pair">
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
        </div>
      </Cell>
      <Cell label="Hover / clicked">
        <div className="demo-btn-split-pair">
          <Button
            variant="primary"
            appearance="outline"
            type="button"
            className="demo-btn-secondary demo-btn-split-left is-preview-hover"
            hasIcon
            trailingIcon="agora-line-upload"
          >
            Importar
          </Button>
          <Button
            variant="primary"
            appearance="outline"
            type="button"
            className="demo-btn-secondary demo-btn-split-right is-preview-hover"
            hasIcon
            trailingIcon="agora-line-download"
          >
            Exportar
          </Button>
        </div>
      </Cell>
      <Cell label="Disabled">
        <div className="demo-btn-split-pair">
          <Button
            variant="primary"
            appearance="outline"
            type="button"
            className="demo-btn-secondary demo-btn-split-left"
            hasIcon
            trailingIcon="agora-line-upload"
            disabled
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
            disabled
          >
            Exportar
          </Button>
        </div>
      </Cell>
    </div>
  ),

  iconOnly: (
    <Button
      variant="primary"
      appearance="link"
      type="button"
      className="demo-btn-link"
      iconOnly
      hasIcon
      leadingIcon="agora-line-x"
      leadingIconHover="agora-solid-x"
      aria-label="Fechar"
    />
  ),
};
