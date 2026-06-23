import React, { useState } from 'react';
import { SectionHeader } from '../../components/SectionHeader';
import { ItemCard } from '../../components/ItemCard';
import { DemoTable } from '../../../../components/DemoTable/DemoTable';

// Trimmed for the demo: only the read-only DemoTable (with built-in Paginator) —
// the element the demo actually uses. EditableTable is out of scope here.

const ROWS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  nome: `Estabelecimento ${String(i + 1).padStart(2, '0')}`,
  estado: ['Ativo', 'Suspenso', 'Encerrado'][i % 3],
}));

const DemoTableExample: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const start = (page - 1) * pageSize;
  const rows = ROWS.slice(start, start + pageSize);
  return (
    <DemoTable
      aria-label="Exemplo"
      pagination={{ total: ROWS.length, page, pageSize, onPageChange: setPage, onPageSizeChange: (s) => { setPageSize(s); setPage(1); } }}
    >
      <DemoTable.Header>
        <DemoTable.Column width="220px">Estabelecimento</DemoTable.Column>
        <DemoTable.Column>Estado</DemoTable.Column>
      </DemoTable.Header>
      <DemoTable.Body empty={rows.length === 0}>
        {rows.map((row) => (
          <DemoTable.Row key={row.id}>
            <DemoTable.Cell>{row.nome}</DemoTable.Cell>
            <DemoTable.Cell>{row.estado}</DemoTable.Cell>
          </DemoTable.Row>
        ))}
      </DemoTable.Body>
    </DemoTable>
  );
};

export const Tables: React.FC = () => (
  <>
    <SectionHeader
      title="Tabelas"
      description="Listas de dados usam o componente DemoTable (com Paginator integrado). Nunca usar <table> em bruto."
    />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ItemCard
        name="DemoTable (read-only + paginação)"
        code={`<DemoTable aria-label="…" pagination={{ total, page, pageSize, onPageChange, onPageSizeChange }}>
  <DemoTable.Header>
    <DemoTable.Column width="220px">Estabelecimento</DemoTable.Column>
    <DemoTable.Column>Estado</DemoTable.Column>
  </DemoTable.Header>
  <DemoTable.Body>
    {rows.map((row) => (
      <DemoTable.Row key={row.id}>
        <DemoTable.Cell>{row.nome}</DemoTable.Cell>
        <DemoTable.Cell>{row.estado}</DemoTable.Cell>
      </DemoTable.Row>
    ))}
  </DemoTable.Body>
</DemoTable>`}
        example={<DemoTableExample />}
        rule={
          <>
            <li>✓ Cabeçalho a 80px, fundo <code>bg-demo-table-header</code>.</li>
            <li>✓ Paginação via prop <code>pagination</code> (Paginator integrado).</li>
            <li>✗ Nunca <code>&lt;table&gt;</code> em bruto nem paginador feito à mão.</li>
            <li>✗ Nunca padding inline nas células.</li>
          </>
        }
      />
    </div>
  </>
);
