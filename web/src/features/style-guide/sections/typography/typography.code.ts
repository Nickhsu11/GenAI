/**
 * Typography — code snippets per item.
 *
 * Each entry is the JSX a developer should copy into their page.
 * Keys must stay in sync with `typography.examples.tsx` and `typography.rules.tsx`.
 */
export const typographyCode: Record<string, string> = {
  pageTitle: `<h1 className="demo-page-title mb-24">Estabelecimentos</h1>`,

  sectionTitle: `<h2 className="demo-section-title mb-16">Dados Gerais</h2>`,

  subsectionTitle: `<h3 className="demo-subsection-title mb-8">Identificação</h3>`,

  modalTitle: `<h2 className="demo-modal-title">Adicionar Entrada</h2>`,

  body: `<p className="text-m-regular text-neutral-900">
  Texto corrente do parágrafo.
</p>`,

  helper: `<p className="text-s-regular text-neutral-600">
  Notas, contagens, indicações secundárias.
</p>`,

  error: `<p className="text-s-regular text-danger-600">
  Erro ao carregar dados.
</p>`,
};
