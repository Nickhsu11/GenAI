import React, { useState } from 'react';
import { InputText, InputSelect, DropdownSection, DropdownOption } from '@ama-pt/agora-design-system';
import { SectionHeader } from '../../components/SectionHeader';
import { ItemCard } from '../../components/ItemCard';

// Trimmed for the demo: only the input elements actually used here —
// InputText (free text) and InputSelect (single-select). Never raw <input>/<select>.

const InputTextExample: React.FC = () => {
  const [nome, setNome] = useState('');
  return (
    <InputText label="Nome" name="nome" placeholder="Pesquisar por nome" value={nome} onChange={(e) => setNome(e.target.value)} />
  );
};

const InputSelectExample: React.FC = () => {
  const [estado, setEstado] = useState('');
  return (
    <InputSelect label="Estado" placeholder="Todos" hideSectionNames onChange={(opts) => setEstado(opts[0]?.value ?? '')}>
      <DropdownSection name="estado">
        <DropdownOption value="" selected={estado === ''}>Todos</DropdownOption>
        <DropdownOption value="Ativo" selected={estado === 'Ativo'}>Ativo</DropdownOption>
        <DropdownOption value="Suspenso" selected={estado === 'Suspenso'}>Suspenso</DropdownOption>
        <DropdownOption value="Encerrado" selected={estado === 'Encerrado'}>Encerrado</DropdownOption>
      </DropdownSection>
    </InputSelect>
  );
};

export const Inputs: React.FC = () => (
  <>
    <SectionHeader
      title="Inputs"
      description="Usar sempre o componente AgoraDS para cada tipo de campo. Nunca usar <input>/<select> nativos."
    />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ItemCard
        name="InputText"
        code={`<InputText label="Nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />`}
        example={<InputTextExample />}
        rule={
          <>
            <li>✓ Texto livre (nome, morada, email).</li>
            <li>✗ Nunca usar <code>&lt;input&gt;</code> nativo.</li>
          </>
        }
      />
      <ItemCard
        name="InputSelect (single)"
        code={`<InputSelect label="Estado" placeholder="Todos" hideSectionNames onChange={(opts) => setEstado(opts[0]?.value ?? '')}>
  <DropdownSection name="estado">
    <DropdownOption value="">Todos</DropdownOption>
    <DropdownOption value="Ativo">Ativo</DropdownOption>
  </DropdownSection>
</InputSelect>`}
        example={<InputSelectExample />}
        rule={
          <>
            <li>✓ Um valor de uma lista conhecida.</li>
            <li>✓ Primeira opção <code>value=""</code> quando opcional.</li>
            <li>✗ Nunca embrulhar os filhos de <code>DropdownSection</code> num Fragment.</li>
          </>
        }
      />
    </div>
  </>
);
