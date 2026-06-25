import { useCallback, useState } from 'react';
import {
  Button,
  InputText,
  InputSelect,
  DropdownSection,
  DropdownOption,
} from '@ama-pt/agora-design-system';
import { useListEstablishments } from '../../api/generated/api';
import { DemoTable } from '../../components/DemoTable/DemoTable';

type Estado = 'Ativo' | 'Suspenso' | 'Encerrado';

export function EstablishmentsPageDirty() {
  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState<Estado | ''>('');

  const [applied, setApplied] = useState<{ nome?: string; estado?: Estado }>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useListEstablishments({
    nome: applied.nome ? [applied.nome] : undefined,
    estado: applied.estado ? [applied.estado] : undefined,
    page,
    pageSize,
  });
  const rows = data?.items ?? [];
  const total = data?.total ?? 0;

  const handleSearch = useCallback(() => {
    setApplied({
      nome: nome || undefined,
      estado: estado || undefined,
    });
    setPage(1);
  }, [nome, estado]);

  const handleClear = useCallback(() => {
    setNome('');
    setEstado('');
    setApplied({});
    setPage(1);
  }, []);

  return (
    <main className="page">
      <h1 className="demo-page-title">Estabelecimentos</h1>

      <div className="bg-white" style={{ border: '1px solid var(--color-neutral-100)' }}>
        <form className="p-32" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', alignItems: 'start' }}>
              <InputText
                label="Nome"
                name="nome"
                placeholder="Procurar por nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputSelect
                label="Estado"
                placeholder="Todos"
                onChange={(opts) => setEstado((opts[0]?.value as Estado | undefined) ?? '')}
              >
                <DropdownSection name="estado">
                  <DropdownOption value="">Todos</DropdownOption>
                  <DropdownOption value="Ativo" selected={estado === 'Ativo'}>Ativo</DropdownOption>
                  <DropdownOption value="Suspenso" selected={estado === 'Suspenso'}>Suspenso</DropdownOption>
                  <DropdownOption value="Encerrado" selected={estado === 'Encerrado'}>Encerrado</DropdownOption>
                </DropdownSection>
              </InputSelect>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '32px' }}>
              <Button
                type="button"
                variant="primary"
                appearance="outline"
                className="demo-btn-secondary"
                onClick={handleClear}
                disabled={isLoading}
              >
                Limpar
              </Button>
              <Button
                type="submit"
                variant="primary"
                appearance="solid"
                className="demo-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'A pesquisar…' : 'Pesquisar'}
              </Button>
            </div>
          </div>
        </form>

        <div style={{ height: '1px', background: 'var(--color-neutral-500)', margin: '0 32px' }} />

        <div className="p-32">
          <DemoTable
            aria-label="Estabelecimentos"
            pagination={{
              total,
              page,
              pageSize,
              onPageChange: setPage,
              onPageSizeChange: (size) => { setPageSize(size); setPage(1); },
            }}
          >
            <DemoTable.Header>
              <DemoTable.Column width="220px">Estabelecimento</DemoTable.Column>
              <DemoTable.Column width="160px">Estado</DemoTable.Column>
              <DemoTable.Column>Período</DemoTable.Column>
              <DemoTable.Column width="120px" align="center">Ações</DemoTable.Column>
            </DemoTable.Header>

            <DemoTable.Body loading={isLoading} empty={!isLoading && rows.length === 0}>
              {rows.map((row) => (
                <DemoTable.Row key={row.id}>
                  <DemoTable.Cell>{row.nome}</DemoTable.Cell>
                  <DemoTable.Cell>{row.estado}</DemoTable.Cell>
                  <DemoTable.Cell>{row.periodo}</DemoTable.Cell>
                  <DemoTable.Cell fill align="center">
                    <button
                      type="button"
                      className="demo-btn demo-btn-link"
                      onClick={() => console.log('detalhes', row.id)}
                    >
                      Detalhes
                    </button>
                  </DemoTable.Cell>
                </DemoTable.Row>
              ))}
            </DemoTable.Body>
          </DemoTable>
        </div>
      </div>
    </main>
  );
}
