import React from 'react';
import { SectionHeader } from '../../components/SectionHeader';
import { ItemCard } from '../../components/ItemCard';
import { typographyCode } from './typography.code';
import { typographyExamples } from './typography.examples';
import { typographyRules } from './typography.rules';

type TypographyItem = {
  id: keyof typeof typographyCode;
  name: string;
};

const ITEMS: TypographyItem[] = [
  { id: 'pageTitle', name: 'Page title' },
  { id: 'sectionTitle', name: 'Section title' },
  { id: 'subsectionTitle', name: 'Subsection title' },
  { id: 'modalTitle', name: 'Modal title' },
  { id: 'body', name: 'Body text' },
  { id: 'helper', name: 'Helper text' },
  { id: 'error', name: 'Error text' },
];

export const Typography: React.FC = () => (
  <>
    <SectionHeader
      title="Tipografia"
      description="Usar sempre o elemento semântico correcto + classe Tailwind do AgoraDS. Nunca aplicar fontSize/fontWeight por inline style."
    />

    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {ITEMS.map((item) => (
        <ItemCard
          key={item.id}
          name={item.name}
          code={typographyCode[item.id]}
          example={typographyExamples[item.id]}
          rule={typographyRules[item.id]}
        />
      ))}
    </div>
  </>
);
