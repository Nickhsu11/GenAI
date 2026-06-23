import React from 'react';

/**
 * Typography — rules per item.
 *
 * Each entry is a list of <li> nodes rendered inside <ul>.
 * Prefix with ✓ for "do" and ✗ for "don't".
 * Keys must stay in sync with `typography.code.ts` and `typography.examples.tsx`.
 */
export const typographyRules: Record<string, React.ReactNode> = {
  pageTitle: (
    <>
      <li>✓ Um único <code>h1</code> por página, sempre o primeiro título.</li>
      <li>✓ Aparece imediatamente abaixo do breadcrumb.</li>
      <li>✓ Classe obrigatória: <code>demo-page-title</code> (Poppins, 24px, 500, cor <code>#008078</code> via token).</li>
      <li>✗ Não usar para títulos de secções (usar <code>h2</code>).</li>
    </>
  ),

  sectionTitle: (
    <>
      <li>✓ Usar para os principais blocos de conteúdo de uma página (ex.: cada separador).</li>
      <li>✓ Classe obrigatória: <code>demo-section-title</code> (24px, 700, <code>#2B363C</code> via token).</li>
      <li>✗ Não usar em modais (ver "Modal title").</li>
    </>
  ),

  subsectionTitle: (
    <>
      <li>✓ Usar para subgrupos dentro de uma secção (ex.: blocos de campos relacionados).</li>
      <li>✓ Classe obrigatória: <code>demo-subsection-title</code> (20px, 700, <code>#000000</code> via token).</li>
      <li>✗ Não saltar níveis: depois de um <code>h2</code> usar <code>h3</code>, não <code>h4</code>.</li>
    </>
  ),

  modalTitle: (
    <>
      <li>✓ Sempre um <code>h2</code> — mantém a hierarquia semântica da página.</li>
      <li>✓ Sem margem inferior — o modal controla o espaçamento.</li>
      <li>✓ Classe obrigatória: <code>demo-modal-title</code> (24px, 700, <code>#021C51</code> via token).</li>
    </>
  ),

  body: (
    <>
      <li>✓ Texto corrente, descrições, valores em vistas de detalhe.</li>
      <li>✗ Não usar para texto secundário (usar "Helper text").</li>
    </>
  ),

  helper: (
    <>
      <li>✓ Contagens, timestamps, sugestões e indicações secundárias.</li>
      <li>✗ Não usar para conteúdo principal (usar "Body").</li>
    </>
  ),

  error: (
    <>
      <li>✓ Mensagens de erro inline junto de formulários, tabelas ou acções.</li>
      <li>✗ Não usar para texto neutro a vermelho — apenas para erros reais.</li>
    </>
  ),
};
