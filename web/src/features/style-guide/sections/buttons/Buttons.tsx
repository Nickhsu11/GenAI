import React from 'react';
import { SectionHeader } from '../../components/SectionHeader';
import { ItemCard } from '../../components/ItemCard';
import { buttonsCode } from './buttons.code';
import { buttonsExamples } from './buttons.examples';
import { buttonsRules } from './buttons.rules';

const ITEMS: ReadonlyArray<{ id: keyof typeof buttonsCode; name: string }> = [
  { id: 'primary', name: 'Primary' },
  { id: 'secondary', name: 'Secondary' },
  { id: 'link', name: 'Link' },
  { id: 'splitPair', name: 'Composição · Split pair' },
  { id: 'iconOnly', name: 'Composição · Icon-only' },
];

export const Buttons: React.FC = () => {
  return (
    <div>
      <SectionHeader
        title="Botões"
        description="3 variantes (primary / secondary / link) × 3 estados (default / hover / disabled) + 2 composições. Cada cartão mostra os três estados lado a lado."
      />
      <aside className="demo-reminder-card" aria-label="Regras transversais dos botões">
        <p className="demo-reminder-title">Regras rápidas</p>
        <ul className="demo-reminder-list">
          <li>Escolher pela função: <code>primary</code>, <code>secondary</code> ou <code>link</code> — não inventar outras.</li>
          <li>Ícones são ortogonais — adicionam-se via <code>leadingIcon</code> / <code>trailingIcon</code>.</li>
          <li><code>disabled</code> tem de ser atributo real; icon-only exige <code>aria-label</code>.</li>
          <li>Base partilhada: padding 16px, gap 8px, 16px/400, raio 4px.</li>
          <li><b>TODO</b>: o designer ainda vai rever <em>:focus-visible</em> — por agora partilha o estilo de <em>:hover</em>.</li>
        </ul>
      </aside>
      {ITEMS.map((item) => (
        <ItemCard
          key={item.id}
          name={item.name}
          code={buttonsCode[item.id]}
          example={buttonsExamples[item.id]}
          rule={buttonsRules[item.id]}
        />
      ))}
    </div>
  );
};
