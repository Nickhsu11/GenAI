import React from 'react';

/**
 * Buttons — rules per variant.
 *
 * One rule list per variant covers all three states. Keys stay in sync with
 * `buttons.code.ts` and `buttons.examples.tsx`.
 */
export const buttonsRules: Record<string, React.ReactNode> = {
  primary: (
    <>
      <li>✓ Acção principal — no máximo um por ecrã.</li>
      <li>✓ <b>Default</b>: fundo <code>#008078</code>, texto/ícone branco. <b>Hover/clique</b>: fundo <code>#003330</code>. <b>Disabled</b>: fundo <code>#E1E4EA</code>, texto/ícone <code>#BAC0CC</code>.</li>
      <li>✗ Não emparelhar dois <code>primary</code> lado a lado — use <code>secondary</code>.</li>
    </>
  ),

  secondary: (
    <>
      <li>✓ Par não destrutivo de um <code>primary</code> (Cancelar, Limpar).</li>
      <li>✓ <b>Default</b>: outline 2px <code>#008078</code>, texto/ícone <code>#008078</code>. <b>Hover/clique</b>: enche com <code>#003330</code>, texto/ícone <code>#FFFFFF</code>. <b>Disabled</b>: outline e texto <code>#BAC0CC</code>.</li>
    </>
  ),

  link: (
    <>
      <li>✓ Acção com aparência de link mas que dispara JS (Editar, Voltar, Adicionar Linha).</li>
      <li>✓ <b>Default</b>: texto/ícone <code>#008078</code>, sem fundo. <b>Hover/clique</b>: texto/ícone <code>#003330</code> + sublinhado <code>#003330</code>. <b>Disabled</b>: texto/ícone <code>#BAC0CC</code>, sem sublinhado.</li>
      <li>✗ Se o clique muda de URL, use <code>&lt;Anchor&gt;</code> / <code>&lt;NavigationLink&gt;</code>.</li>
    </>
  ),

  splitPair: (
    <>
      <li>✓ Par com fronteira partilhada (ex: <em>Importar / Exportar</em>).</li>
      <li>✓ Cada metade tem de levar <code>demo-btn-secondary</code> + <code>demo-btn-split-left</code>/<code>-right</code>. As classes split só mudam cantos e borda partilhada — tudo o resto vem de <code>secondary</code>.</li>
    </>
  ),

  iconOnly: (
    <>
      <li>✓ Sem texto visível (fechar modal, dismiss em toolbar).</li>
      <li>✓ <code>aria-label</code> é <b>obrigatório</b> — WCAG 2.1 AA.</li>
    </>
  ),
};
