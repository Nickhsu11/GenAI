import React, { useState } from 'react';
import { Typography } from './sections/typography/Typography';
import { Buttons } from './sections/buttons/Buttons';
import { Inputs } from './sections/inputs/Inputs';
import { Tables } from './sections/tables/Tables';
import { Icons } from './sections/icons/Icons';

// Living style guide — only the element groups the demo actually uses.
// State-based section switch (the real app uses react-router; the demo keeps it simple).
const SECTIONS = [
  { id: 'typography', label: 'Tipografia', render: () => <Typography /> },
  { id: 'buttons', label: 'Botões', render: () => <Buttons /> },
  { id: 'inputs', label: 'Inputs', render: () => <Inputs /> },
  { id: 'tables', label: 'Tabelas', render: () => <Tables /> },
  { id: 'icons', label: 'Ícones', render: () => <Icons /> },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

export const StyleGuide: React.FC = () => {
  const [active, setActive] = useState<SectionId>('typography');
  const current = SECTIONS.find((s) => s.id === active)!;

  return (
    <div className="page" style={{ display: 'grid', gridTemplateColumns: '220px minmax(0, 1fr)', gap: '24px' }}>
      <aside
        aria-label="Secções do style guide"
        style={{
          background: 'white',
          border: '1px solid var(--color-neutral-100)',
          padding: '12px',
          alignSelf: 'start',
          position: 'sticky',
          top: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <h1 className="demo-page-title" style={{ fontSize: 18, margin: '4px 8px 12px' }}>Style guide</h1>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(s.id)}
            className={`text-s-${active === s.id ? 'semibold' : 'regular'}`}
            style={{
              textAlign: 'left',
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: active === s.id ? 'var(--color-primary-50)' : 'transparent',
              color: active === s.id ? 'var(--color-primary-600)' : 'var(--color-neutral-800)',
            }}
          >
            {s.label}
          </button>
        ))}
      </aside>

      <section>{current.render()}</section>
    </div>
  );
};
