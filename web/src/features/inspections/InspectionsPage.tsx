import { useCallback, useState } from 'react';
import {
  Button,
  InputSelect,
  DropdownSection,
  DropdownOption,
} from '@ama-pt/agora-design-system';
import {
  useListInspections,
  useListInspectionEstablishments,
} from '../../api/generated/api';
import {
  InspectionResultado,
  type ListInspectionsResultadoItem,
} from '../../api/generated/model';
import { DemoTable } from '../../components/DemoTable/DemoTable';

const RESULTADOS: ListInspectionsResultadoItem[] = [
  InspectionResultado.Conforme,
  InspectionResultado.Não_Conforme,
  InspectionResultado.Pendente,
];

export function InspectionsPage() {
  const [estabelecimentos, setEstabelecimentos] = useState<string[]>([]);
  const [resultados, setResultados] = useState<ListInspectionsResultadoItem[]>([]);

  const [applied, setApplied] = useState<{
    estabelecimento?: string[];
    resultado?: ListInspectionsResultadoItem[];
  }>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useListInspections({
    estabelecimento: applied.estabelecimento?.length
      ? applied.estabelecimento
      : undefined,
    resultado: applied.resultado?.length ? applied.resultado : undefined,
    page,
    pageSize,
  });
  const rows = data?.items ?? [];
  const total = data?.total ?? 0;

  const { data: establishmentOptions = [] } = useListInspectionEstablishments();

  const handleSearch = useCallback(() => {
    setApplied({
      estabelecimento: estabelecimentos,
      resultado: resultados,
    });
    setPage(1);
  }, [estabelecimentos, resultados]);

  const handleClear = useCallback(() => {
    setEstabelecimentos([]);
    setResultados([]);
    setApplied({});
    setPage(1);
  }, []);

  return (
    <main className="page">
      <h1 className="demo-page-title">Inspeções</h1>

      <div
        className="bg-white"
        style={{ border: '1px solid var(--color-neutral-100)' }}
      >
        <form
          className="p-32"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '32px',
                alignItems: 'start',
              }}
            >
              <InputSelect
                label="Estabelecimento"
                placeholder="Todos"
                type="checkbox"
                hideSectionNames
                allSelectedLabel="Todos os estabelecimentos"
                pluralSelectedPlaceholder="{n} estabelecimentos selecionados"
                searchable
                searchInputPlaceholder="Procurar estabelecimento..."
                searchInputAriaLabel="Procurar estabelecimento"
                onChange={(opts) =>
                  setEstabelecimentos(opts.map((o) => o.value))
                }
              >
                <DropdownSection name="estabelecimento">
                  {establishmentOptions.map((name) => (
                    <DropdownOption
                      key={name}
                      value={name}
                      selected={estabelecimentos.includes(name)}
                    >
                      {name}
                    </DropdownOption>
                  ))}
                </DropdownSection>
              </InputSelect>

              <InputSelect
                label="Resultado"
                placeholder="Todos"
                type="checkbox"
                hideSectionNames
                allSelectedLabel="Todos os resultados"
                pluralSelectedPlaceholder="{n} resultados selecionados"
                onChange={(opts) =>
                  setResultados(
                    opts.map((o) => o.value as ListInspectionsResultadoItem),
                  )
                }
              >
                <DropdownSection name="resultado">
                  {RESULTADOS.map((resultado) => (
                    <DropdownOption
                      key={resultado}
                      value={resultado}
                      selected={resultados.includes(resultado)}
                    >
                      {resultado}
                    </DropdownOption>
                  ))}
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
                {isLoading ? 'A pesquisar...' : 'Pesquisar'}
              </Button>
            </div>
          </div>
        </form>

        <div
          style={{
            height: '1px',
            background: 'var(--color-neutral-500)',
            margin: '0 32px',
          }}
        />

        <div className="p-32">
          <DemoTable
            aria-label="Inspeções"
            pagination={{
              total,
              page,
              pageSize,
              onPageChange: setPage,
              onPageSizeChange: (size) => {
                setPageSize(size);
                setPage(1);
              },
            }}
          >
            <DemoTable.Header>
              <DemoTable.Column width="260px">Estabelecimento</DemoTable.Column>
              <DemoTable.Column width="180px">Inspetor</DemoTable.Column>
              <DemoTable.Column width="160px">Resultado</DemoTable.Column>
              <DemoTable.Column width="160px">Data</DemoTable.Column>
              <DemoTable.Column width="120px" align="center">
                Ações
              </DemoTable.Column>
            </DemoTable.Header>

            <DemoTable.Body
              loading={isLoading}
              empty={!isLoading && rows.length === 0}
              emptyLabel="Nenhum resultado encontrado."
            >
              {rows.map((row) => (
                <DemoTable.Row key={row.id}>
                  <DemoTable.Cell>{row.estabelecimento}</DemoTable.Cell>
                  <DemoTable.Cell>{row.inspetor}</DemoTable.Cell>
                  <DemoTable.Cell>{row.resultado}</DemoTable.Cell>
                  <DemoTable.Cell>{row.data}</DemoTable.Cell>
                  <DemoTable.Cell fill align="center">
                    <Button
                      type="button"
                      variant="primary"
                      appearance="link"
                      className="demo-btn-link"
                      onClick={() => console.log('detalhes inspeção', row.id)}
                    >
                      Detalhes
                    </Button>
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