# Pills

> Machine-readable source of truth para badges em Demo. Agents leem este ficheiro.

Demo usa **um único pill**: o componente `DemoPill`, em [`src/shared/components/common/DemoPill`](../../../../shared/components/common/DemoPill/DemoPill.tsx). Não se usa o `Pill` do AgoraDS diretamente — os tokens visuais são fixos pela marca Demo e ficam encapsulados no componente.

## Component contract

| Aspect | Value |
|---|---|
| Component | `DemoPill` from `shared/components/common/DemoPill` |
| Element | `<span>` (inline-flex) |
| Variants | **Nenhum** — visual único, fixo |
| Props | `children` + qualquer atributo standard de `<span>` (`id`, `aria-*`, `data-*`, …) |

### Tokens fixos

| Token | Valor |
|---|---|
| Background | `#ffffff` |
| Border | `2px solid #008078` (primary) |
| Border-radius | `9999px` (totalmente arredondado) |
| Padding | `4px 16px` |
| Font-size | `14px` |
| Font-weight | `400` |
| Color | `#2B363C` |
| Line-height | `1.2` |
| White-space | `nowrap` |

Todos os tokens vivem em [`DemoPill.css`](../../../../services/frontoffice/frontend/src/shared/styles/components/DemoPill.css). Se a marca evoluir, muda-se aí — nunca por consumidor.

## Recipe — `demoPill`

**Quando usar.** Sempre que precise de destacar um estado, etiqueta ou categoria curta sobre um fundo claro. Exemplos: célula *Estado* de uma tabela quando o destaque visual for necessário, badges de perfil de utilizador, chips de categoria.

```tsx
import { DemoPill } from '../../shared/components/common/DemoPill';

<DemoPill>Submetido</DemoPill>
<DemoPill>Em atraso</DemoPill>
<DemoPill aria-label="Estado: Pendente">Pendente</DemoPill>
```

**Regras-chave**
- O texto **é** o significado — nunca usar `—`, abreviaturas ou ícones soltos.
- Não passar `style` inline. Não tentar customizar cores via `className`.
- Em tabelas, está sempre dentro de `DemoTable.Cell` sem wrappers extra:

```tsx
<DemoTable.Cell><DemoPill>{row.estado}</DemoPill></DemoTable.Cell>
```

## Cross-cutting

**Acessibilidade.** Contraste entre `#2B363C` e `#FFFFFF` largamente acima de WCAG AA (>13:1). Como o texto é o próprio significado, leitores de ecrã anunciam-no corretamente sem `aria-label` extra — passar `aria-label` apenas se o contexto não tornar o estado óbvio.

**Espaçamento.** O pill é `inline-flex` e respeita o padding do container (célula de tabela, card, etc.). Não envolver num `<div>` extra para criar margem.

**Forbidden patterns**
- `<Pill>` do AgoraDS diretamente.
- `<span class="badge | chip | tag | role-badge | ...">`.
- Componentes Tag/Chip de outras libs (PrimeReact, MUI).
- Pills usados como botão / link clicável — para ação, usar `Button`.
- Variantes de cor inventadas (`DemoPill` não tem variants).

## Dependencies

- [`DemoPill.tsx`](../../../../shared/components/common/DemoPill/DemoPill.tsx) — componente.
- [`DemoPill.css`](../../../../services/frontoffice/frontend/src/shared/styles/components/DemoPill.css) — tokens visuais.
- Referenciado por [tables.md](../tables/tables.md) (coluna *Estado*, opcional).

## Tech-debt

1. **`role-badge` no Profile** — [Profile.tsx](../../../../profile/Profile.tsx) L42 usa `<span className="role-badge">{role}</span>` com CSS próprio em [Profile.css](../../../../profile/Profile.css) L77-88. Substituir por `<DemoPill>{role}</DemoPill>` e remover a classe.
2. **`Pill` do AgoraDS na produção** — [EstabelecimentosPage.tsx](../../../../estabelecimentos/EstabelecimentosPage.tsx) L183 e [DemoFilterPagev3.tsx](../../../../playground/filter-page/DemoFilterPagev3.tsx) L241 ainda importam e renderizam `<Pill variant={...}>` com mapas `ESTADO_PILL_VARIANT` locais. Quando os dados reais ligarem, decidir se a coluna *Estado* fica texto simples ou `DemoPill`, eliminar os mapas e o import de `Pill`.
