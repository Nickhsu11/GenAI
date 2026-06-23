import React from 'react';
import { CodeBlock } from './CodeBlock';

type ItemCardProps = {
  /** Where it should be used. Shown as the card heading. */
  name: string;
  /** Code snippet to copy. */
  code: string;
  /** Live example rendered in context (mini mock of a real page). */
  example: React.ReactNode;
  /** Rule list: when/why to use it. JSX children — usually <li> items. */
  rule: React.ReactNode;
};

export const ItemCard: React.FC<ItemCardProps> = ({ name, code, example, rule }) => (
  <article
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      border: '1px solid var(--color-neutral-200)',
      borderRadius: '4px',
      padding: '20px',
      background: 'white',
    }}
  >
    <h3 className="text-l-bold text-neutral-900" style={{ margin: 0 }}>
      {name}
    </h3>

    <CodeBlock>{code}</CodeBlock>

    <div
      aria-label="Pré-visualização"
      style={{
        background: 'var(--color-neutral-50)',
        border: '1px dashed var(--color-neutral-300)',
        borderRadius: '4px',
        padding: '20px',
      }}
    >
      {example}
    </div>

    <ul className="text-s-regular text-neutral-800" style={{ margin: 0, paddingLeft: '20px' }}>
      {rule}
    </ul>
  </article>
);
