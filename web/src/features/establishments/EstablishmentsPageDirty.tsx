import { useEffect, useState } from 'react';
import { DemoTable } from '../../components/DemoTable/DemoTable';

// ⚠️ DEMO ARTIFACT — this file intentionally contains 6 guideline violations.
// It represents the "manual copy-paste + hand-edit" path. The demo-frontend-reviewer
// should flag every one of them with a recipe citation. See review/EXPECTED-REPORT.md.
// This is the SAME file the reviewer audits AND the one rendered in the "Página com
// erros" tab — so the code you see flagged is the code on screen.

interface Establishment {
  id: number;
  nome: string;
  estado: string;
  periodo: string;
}

export function EstablishmentsPageDirty() {
  // VIOLATION 1 — hand-written fetch + useEffect instead of the generated
  // useListEstablishments hook (react-patterns §1, §2).
  const [rows, setRows] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8099/establishments?page=1&pageSize=10')
      .then((r) => r.json())
      .then((d) => setRows(d.items))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="page">
      {/* VIOLATION 2 — page title faked with a styled <div> instead of <h1> (typography.md §1). */}
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Estabelecimentos</div>

      {/* VIOLATION 3 — result list with NO pagination prop (tables.md §1). */}
      <DemoTable aria-label="Estabelecimentos">
        <DemoTable.Header>
          <DemoTable.Column width="220px">Estabelecimento</DemoTable.Column>
          <DemoTable.Column width="160px">Estado</DemoTable.Column>
          <DemoTable.Column>Período</DemoTable.Column>
          <DemoTable.Column width="120px" align="center">Ações</DemoTable.Column>
        </DemoTable.Header>

        <DemoTable.Body loading={loading} empty={!loading && rows.length === 0}>
          {rows.map((row) => (
            <DemoTable.Row key={row.id}>
              <DemoTable.Cell>{row.nome}</DemoTable.Cell>
              <DemoTable.Cell>{row.estado}</DemoTable.Cell>
              {/* VIOLATION 4 — inline padding on a DemoTable.Cell (tables.md §2). */}
              <DemoTable.Cell>
                <span style={{ padding: '8px 12px' }}>{row.periodo}</span>
              </DemoTable.Cell>
              <DemoTable.Cell fill align="center">
                {/* VIOLATION 5 — raw <button> with inline style instead of demo-btn (buttons.md §1).
                    VIOLATION 6 — hardcoded brand hex #008078 instead of the token (buttons.md §2). */}
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#008078', cursor: 'pointer' }}
                  onClick={() => console.log('detalhes', row.id)}
                >
                  Detalhes
                </button>
              </DemoTable.Cell>
            </DemoTable.Row>
          ))}
        </DemoTable.Body>
      </DemoTable>
    </main>
  );
}
