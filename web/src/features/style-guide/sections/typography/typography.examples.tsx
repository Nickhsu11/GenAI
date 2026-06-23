import React from 'react';
import { Breadcrumb, BreadcrumbLink, InputText } from '@ama-pt/agora-design-system';

const PAGE_BREADCRUMB: BreadcrumbLink[] = [
  { label: 'Demo', url: '/' },
  { label: 'Estabelecimentos', url: '' },
];

/**
 * Typography — live examples per item.
 *
 * Each example renders the element inside a small mock of how it appears in a real page.
 * Keys must stay in sync with `typography.code.ts` and `typography.rules.tsx`.
 */
export const typographyExamples: Record<string, React.ReactNode> = {
  pageTitle: (
    <div>
      <div className="mb-16">
        <Breadcrumb items={PAGE_BREADCRUMB} />
      </div>
      <h1 className="demo-page-title mb-24">Estabelecimentos</h1>
    </div>
  ),

  sectionTitle: (
    <div>
      <h2 className="demo-section-title mb-16">Dados Gerais</h2>
      <p className="text-m-regular text-neutral-700" style={{ margin: 0 }}>
        Conteúdo da secção segue por baixo do título.
      </p>
    </div>
  ),

  subsectionTitle: (
    <div>
      <h2 className="demo-section-title mb-16">Dados Gerais</h2>
      <h3 className="demo-subsection-title mb-8">Identificação</h3>
      <p className="text-m-regular text-neutral-700" style={{ margin: 0 }}>
        Campos de identificação do estabelecimento.
      </p>
    </div>
  ),

  modalTitle: (
    <div
      style={{
        background: 'white',
        border: '1px solid var(--color-neutral-300)',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '420px',
      }}
    >
      <h2 className="demo-modal-title" style={{ margin: '0 0 16px 0' }}>
        Adicionar Entrada
      </h2>
      <InputText label="Designação" placeholder="Texto" />
    </div>
  ),

  body: (
    <p className="text-m-regular text-neutral-900" style={{ margin: 0 }}>
      A submissão de resíduos deve ser feita até ao dia 15 de cada mês.
    </p>
  ),

  helper: (
    <p className="text-s-regular text-neutral-600" style={{ margin: 0 }}>
      A mostrar 10 de 124 resultados.
    </p>
  ),

  error: (
    <p className="text-s-regular text-danger-600" style={{ margin: 0 }}>
      Erro ao carregar dados.
    </p>
  ),
};
