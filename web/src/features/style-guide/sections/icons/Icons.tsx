import React from 'react';
import { Icon } from '@ama-pt/agora-design-system';
import { SectionHeader } from '../../components/SectionHeader';

type IconEntry = {
  /** `agora-line-*` name. */
  name: string;
  /** Short pt-PT description of what the icon means. */
  meaning: string;
  /** Where it is used today, in human terms. */
  usage: string;
  /** Has a `agora-solid-*` pair used for Button hover swap. */
  hasHover: boolean;
};

const WITH_HOVER: IconEntry[] = [
  { name: 'agora-line-chevron-left', meaning: 'Voltar', usage: 'Chevron < para voltar ao passo / página anterior. Sempre leadingIcon.', hasHover: true },
  { name: 'agora-line-arrow-right-circle', meaning: 'Avançar', usage: 'Continuar para o próximo passo de um fluxo.', hasHover: true },
  { name: 'agora-line-edit', meaning: 'Editar', usage: 'Editar registo, linha de tabela ou cartão.', hasHover: true },
  { name: 'agora-line-log-out', meaning: 'Terminar sessão', usage: 'Logout dentro do menu do utilizador.', hasHover: true },
  { name: 'agora-line-plus', meaning: 'Adicionar', usage: 'Adicionar linha, origem ou item (trailingIcon).', hasHover: true },
  { name: 'agora-line-search', meaning: 'Pesquisar', usage: 'Submit da filter row (leadingIcon, solid primary).', hasHover: true },
  { name: 'agora-line-trash', meaning: 'Eliminar / Limpar', usage: 'Apagar dados, remover linha ou reset de filtros.', hasHover: true },
  { name: 'agora-line-upload', meaning: 'Importar', usage: 'Carregar ficheiro (CSV/XLSX) ou anexo.', hasHover: true },
  { name: 'agora-line-user', meaning: 'Utilizador', usage: 'Perfil, cabeçalho de Estabelecimento, conta.', hasHover: true },
  { name: 'agora-line-x', meaning: 'Fechar', usage: 'Dismiss em modais e toolbars (icon-only).', hasHover: true },
];

const LINE_ONLY: IconEntry[] = [
  { name: 'agora-line-alert-triangle', meaning: 'Aviso', usage: 'Indicador de erro/atenção num tab.', hasHover: false },
  { name: 'agora-line-check', meaning: 'Confirmar', usage: 'Aceitar edição inline.', hasHover: false },
  { name: 'agora-line-document', meaning: 'Documento', usage: 'Abrir documento de detalhe.', hasHover: false },
  { name: 'agora-line-download', meaning: 'Exportar', usage: 'Exportar ficheiro (trailingIcon, outline).', hasHover: false },
  { name: 'agora-line-file', meaning: 'Ficheiro', usage: 'Preview de anexo já carregado.', hasHover: false },
  { name: 'agora-line-more-vertical', meaning: 'Mais opções', usage: 'Abre menu contextual numa linha.', hasHover: false },
  { name: 'agora-line-settings', meaning: 'Configurações', usage: 'Opções de coluna / preferências de tabela.', hasHover: false },
];

const FEEDBACK_SOLID: IconEntry[] = [
  { name: 'agora-solid-check-circle', meaning: 'Sucesso', usage: 'Helper text de sucesso nos inputs (#00724C).', hasHover: false },
  { name: 'agora-solid-alert-triangle', meaning: 'Erro', usage: 'Helper text de erro nos inputs (#D12332).', hasHover: false },
  { name: 'agora-solid-alert-circle', meaning: 'Aviso', usage: 'Helper text de warning nos inputs (#F2A222).', hasHover: false },
  { name: 'agora-solid-info-mark', meaning: 'Informativo', usage: 'Helper text informativo nos inputs (#0079BF).', hasHover: false },
];

const IconTile: React.FC<{ entry: IconEntry }> = ({ entry }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '8px',
      border: '1px solid var(--color-neutral-200)',
      borderRadius: '4px',
      padding: '16px 12px',
      background: 'white',
      minHeight: '160px',
    }}
  >
    <div
      style={{
        fontSize: '32px',
        lineHeight: 1,
        color: 'var(--color-primary-600)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px',
      }}
    >
      <Icon name={entry.name} aria-hidden />
    </div>
    <code
      className="text-xs-regular"
      style={{
        background: 'var(--color-neutral-100)',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '12px',
        wordBreak: 'break-all',
      }}
    >
      {entry.name}
    </code>
    <strong className="text-s-bold text-neutral-900" style={{ fontSize: '13px' }}>
      {entry.meaning}
    </strong>
    <span className="text-s-regular text-neutral-700" style={{ fontSize: '12px', lineHeight: 1.35 }}>
      {entry.usage}
    </span>
  </div>
);

const IconGrid: React.FC<{ entries: IconEntry[] }> = ({ entries }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '12px',
    }}
  >
    {entries.map((entry) => (
      <IconTile key={entry.name} entry={entry} />
    ))}
  </div>
);

export const Icons: React.FC = () => {
  return (
    <div>
      <SectionHeader
        title="Icons"
        description="Catálogo dos ícones Agora atualmente em uso no Demo frontoffice. Cada entrada inclui nome canónico, significado pt-PT e contexto de uso. Agentes devem escolher sempre desta lista — se faltar um caso, propor entrada nova antes de inventar."
      />

      <h2 className="text-l-bold text-neutral-900" style={{ marginTop: '24px', marginBottom: '12px' }}>
        Com hover swap (line + solid)
      </h2>
      <p className="text-s-regular text-neutral-700" style={{ marginTop: 0, marginBottom: '12px' }}>
        Usados como par <code>leadingIcon</code> / <code>trailingIcon</code> + <code>*IconHover</code> nos Buttons. A versão solid é
        renderizada automaticamente no hover/focus.
      </p>
      <IconGrid entries={WITH_HOVER} />

      <h2 className="text-l-bold text-neutral-900" style={{ marginTop: '32px', marginBottom: '12px' }}>
        Line-only (sem hover swap)
      </h2>
      <p className="text-s-regular text-neutral-700" style={{ marginTop: 0, marginBottom: '12px' }}>
        Renderizados via <code>&lt;Icon name&gt;</code> em contextos não-Button (header de card, célula de tabela, indicador de
        estado). Não usam variante solid em Demo.
      </p>
      <IconGrid entries={LINE_ONLY} />

      <h2 className="text-l-bold text-neutral-900" style={{ marginTop: '32px', marginBottom: '12px' }}>
        Feedback (solid)
      </h2>
      <p className="text-s-regular text-neutral-700" style={{ marginTop: 0, marginBottom: '12px' }}>
        Ícones <code>agora-solid-*</code> usados nas helper lines dos inputs (success / error / warning / informative).
        Cor aplicada via <code>.demo-input-helper.is-*</code> (ver <code>inputs.css</code>).
      </p>
      <IconGrid entries={FEEDBACK_SOLID} />
    </div>
  );
};
