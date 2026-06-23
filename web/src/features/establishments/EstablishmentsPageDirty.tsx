import { useEffect, useMemo, useState } from 'react';
import { DemoTable } from '../../components/DemoTable/DemoTable';

// ⚠️ DEMO ARTIFACT — this file intentionally contains guideline violations.
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

  // VIOLATION — filter state used for CLIENT-SIDE search (wrong; see below).
  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    setLoading(true);
    // Fetches everything once, then narrows in the browser — the opposite of what we want.
    fetch('http://localhost:8099/establishments?page=1&pageSize=50')
      .then((r) => r.json())
      .then((d) => setRows(d.items))
      .finally(() => setLoading(false));
  }, []);

  // VIOLATION 2 — CLIENT-SIDE filtering. The list is narrowed with .filter() in the
  // browser instead of sending nome/estado to the backend as query params.
  // This MUST be a server-side search (react-patterns.md §3, filter-page.md §1).
  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          r.nome.toLowerCase().includes(nome.toLowerCase()) &&
          (estado === '' || r.estado === estado),
      ),
    [rows, nome, estado],
  );

  return (
    <main className="page">
      {/* VIOLATION 3 — page title faked with a styled <div> instead of <h1> (typography.md §1). */}
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Estabelecimentos</div>

      {/* VIOLATION 4 — raw <input>/<select> instead of AgoraDS InputText/InputSelect (inputs.md §1). */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Procurar por nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
        />
        <select value={estado} onChange={(e) => setEstado(e.target.value)} style={{ padding: '8px 12px' }}>
          <option value="">Todos</option>
          <option value="Ativo">Ativo</option>
          <option value="Suspenso">Suspenso</option>
          <option value="Encerrado">Encerrado</option>
        </select>
      </div>

      {/* VIOLATION 5 — result list with NO pagination prop (tables.md §1). */}
      <DemoTable aria-label="Estabelecimentos">
        <DemoTable.Header>
          <DemoTable.Column width="220px">Estabelecimento</DemoTable.Column>
          <DemoTable.Column width="160px">Estado</DemoTable.Column>
          <DemoTable.Column>Período</DemoTable.Column>
          <DemoTable.Column width="120px" align="center">Ações</DemoTable.Column>
        </DemoTable.Header>

        <DemoTable.Body loading={loading} empty={!loading && filtered.length === 0}>
          {filtered.map((row) => (
            <DemoTable.Row key={row.id}>
              <DemoTable.Cell>{row.nome}</DemoTable.Cell>
              <DemoTable.Cell>{row.estado}</DemoTable.Cell>
              {/* VIOLATION 6 — inline padding on a DemoTable.Cell (tables.md §2). */}
              <DemoTable.Cell>
                <span style={{ padding: '8px 12px' }}>{row.periodo}</span>
              </DemoTable.Cell>
              <DemoTable.Cell fill align="center">
                {/* VIOLATION 7 — raw <button> with inline style instead of demo-btn (buttons.md §1).
                    VIOLATION 8 — hardcoded brand hex #008078 instead of the token (buttons.md §2). */}
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
