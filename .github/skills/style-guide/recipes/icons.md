# Icons

> Machine-readable catalog of every Agora icon currently used in Demo frontoffice.
> Agents MUST pick names from this list. If a UI action does not match any entry below,
> propose a new icon in a tech-debt note rather than inventing a name.

All icons come from `@ama-pt/agora-design-system` via `<Icon name="agora-line-…" />` or
through `Button` props (`leadingIcon`, `trailingIcon`, `leadingIconHover`, `trailingIconHover`).
There are two style families:

- `agora-line-*` — outline / stroked. **Default** for every icon in Demo.
- `agora-solid-*` — filled. **Only** for the `*IconHover` swap on Buttons. Never render `agora-solid-*` directly via `<Icon name>`.

## Conventions

- Always pair a `leadingIcon` (or `trailingIcon`) with its matching `*IconHover` when the solid pair exists in the table below. The line→solid swap is part of the brand interaction.
- Standalone `<Icon name>` (no hover) is reserved for non-interactive contexts: card headers, table cell glyphs, tab adornments.
- Size follows context — never hard-code a `width`/`height` on `<Icon>`. AgoraDS sizes the SVG to the surrounding text (`1em`) or button slot automatically.
- Accessibility: a standalone `<Icon>` next to text MUST be `aria-hidden`. An `iconOnly` Button MUST set `aria-label`.

## Catalog — with hover-swap (line + solid)

These ten icons are used as Button `*Icon` / `*IconHover` pairs in production code. The solid version exists and is rendered automatically on hover/focus.

| Name (line) | Hover (solid) | Use it for | Where it appears today |
|---|---|---|---|
| `agora-line-chevron-left` | `agora-solid-chevron-left` | **Voltar** — chevron `<` para navegação ao passo / página anterior. Sempre `leadingIcon`. | `NovoRegistoCDR1` (Voltar), recipe `link-action` em `buttons.md`. |
| `agora-line-arrow-right-circle` | `agora-solid-arrow-right-circle` | **Avançar / Continuar** — call-to-action de progressão num fluxo multi-passo. | `Home` (entrar), `ResiduosRecebidosTab` (próximo passo). |
| `agora-line-edit` | `agora-solid-edit` | **Editar** registo, linha de tabela ou cartão. Sempre `leadingIcon`. | `FormularioCDR` (Editar), `EditableTable` row action, `accordion.examples`. |
| `agora-line-log-out` | `agora-solid-log-out` | **Terminar sessão**. Sempre `leadingIcon`, dentro do menu do utilizador. | `Header` (Terminar sessão). |
| `agora-line-plus` | `agora-solid-plus` | **Adicionar** linha, origem ou item. Sempre `trailingIcon` (verbo aditivo). | `NovoRegistoCDR1` (Adicionar Origem / Linha), `EditableTable` (Adicionar). |
| `agora-line-search` | `agora-solid-search` | **Pesquisar** — submit da filter row. Sempre `leadingIcon` num Button solid primary. | Todas as páginas de filtro (Estabelecimentos, DemoFilterPagev3). |
| `agora-line-trash` | `agora-solid-trash` | **Eliminar / Limpar / Remover** — qualquer acção que descarta dados ou reset de filtros. | Botão *Limpar* das filter rows, *Eliminar* em EditableTable, recipes destructive & clear. |
| `agora-line-upload` | `agora-solid-upload` | **Importar** ficheiro (CSV/XLSX) ou carregar anexo. Tipicamente `trailingIcon`. | `ResiduosRecebidosTab` (Importar), splitPair *Importar*. |
| `agora-line-user` | `agora-solid-user` | **Utilizador / Perfil** — header pessoal, cabeçalho de Estabelecimento. | `Header` (entrar conta), `Home`, `Profile`, `DemoDetailCard` (Estabelecimento). |
| `agora-line-x` | `agora-solid-x` | **Fechar** — botão de dismiss em modais e toolbars. Sempre `iconOnly` + `aria-label="Fechar"`. | Header de qualquer modal (ver `modals.md` recipes). |

## Catalog — line-only (sem hover swap)

Estes ícones são renderizados via `<Icon name>` em contextos não-Button (header de card, célula de tabela, indicador de estado). Não precisam — nem usam — variante solid no Demo.

| Name | Use it for | Where it appears today |
|---|---|---|
| `agora-line-alert-triangle` | **Aviso** num tab para sinalizar erro/atenção na secção correspondente. Tamanho `1em`, cor primary. | Recipe `tabs.md` (danger tab indicator). |
| `agora-line-check` | **Confirmar / concluído** — marca uma edição inline como aceite. | `EditableTable` (botão confirmar edição). |
| `agora-line-document` | **Documento** — acção que abre / consulta um documento de detalhe. | `EditableTable` row action (ver documento). |
| `agora-line-download` | **Exportar** ficheiro (CSV/XLSX). Tipicamente `trailingIcon` num Button outline; o par solid não é usado. | splitPair *Exportar*. |
| `agora-line-file` | **Ficheiro** — preview ou referência a um anexo já carregado. | `NovoRegistoCDR1` (preview anexo). |
| `agora-line-more-vertical` | **Mais opções** — abre menu contextual numa linha de tabela. | `EditableTable` row menu. |
| `agora-line-settings` | **Configurações** — abre opções de coluna / preferências de tabela. | `EditableTable` (menu coluna). |

## Forbidden

- ❌ Renderizar `agora-solid-*` diretamente via `<Icon name>` — solid é só para o hover-swap de Buttons.
- ❌ Inventar nomes que não estão neste catálogo (`agora-line-x-circle`, `agora-line-pencil`, etc.). Se faltar um caso, adicionar entrada aqui e abrir tech-debt.
- ❌ Forçar `width` / `height` no `<Icon>` — o tamanho herda do contexto (texto ou botão).
- ❌ Usar emoji ou SVG inline como substituto.
- ❌ `Icon` decorativo sem `aria-hidden`.

## When you need a new icon

1. Procurar o nome no [catálogo oficial Agora](https://design.gov.pt) — só nomes que existam em `agora-line-*`.
2. Verificar se o par `agora-solid-*` também existe (necessário se for usado num Button).
3. Adicionar entrada à tabela apropriada acima (com hover-swap se for Button, line-only caso contrário) com:
   - Nome canónico
   - Significado em pt-PT
   - Onde será usado
4. Só depois usar no código.

## Dependencies

- Componente `Icon` exportado de `@ama-pt/agora-design-system`.
- Props `leadingIcon` / `trailingIcon` / `*IconHover` do `Button` (ver [buttons.md](../buttons/buttons.md)).
- Recipe de tab com ícone em [tabs.md](../tabs/tabs.md).
