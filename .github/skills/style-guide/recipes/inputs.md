# Inputs — Canonical Rules

> Machine-readable source of truth for form inputs in the Demo frontoffice.
> The `.tsx` files in this folder render this guidance for humans at `/style-guide/inputs`.
> **Agents read this file. Do not parse the `.tsx` files for rules.**

All form inputs MUST use the AgoraDS component for their type. Never use raw `<input>`, `<select>`, or `<textarea>`. For action triggers (Pesquisar, Submeter) use `<Button>` — see `buttons.md`.

AgoraDS feedback API recap (applies to every input below): `label` (string, always set); `required` (boolean — renders the asterisk natively); `helperText` + `hasHelperText` for hints; `hasError` + `errorFeedbackText` + `feedbackState="danger"` for validation errors; `disabled` for non-interactive; `readOnly` for view-only-but-copyable. The enum `feedbackState` is `'info' | 'danger' | 'success' | 'warning'` — there is no `'error'` value.

---

## Required vs Optional

> **🔴 STRONG REFERENCE — every optional field must declare itself as optional in helper text.**

Every input has exactly one of two optionality markers, and they are not interchangeable:

| Field is… | Marker | How to render |
|---|---|---|
| **Required** (`required: true` in the spec) | The native AgoraDS asterisk on the `label` | Pass the `required` prop — that is enough. Do not add helper text describing required-ness. |
| **Optional** (`required: false` / unspecified) | Helper line `"Este campo é opcional"` directly below the input | `hasHelperText` + `helperText="Este campo é opcional"` (Portuguese, exact string) |

> **🔴 Filter-page exception** — On **filter pages** (`filter-page.md`), do NOT add `"Este campo é opcional"` to any field. All filter fields are implicitly optional by convention; the helper text is reserved for **form pages only**. Adding it to filter fields is a rule violation (see `filter-page.md §7`).

Rules:

- The optional helper text uses the **neutral / informative** helper visual (no `is-success` / `is-error` modifier).
- A real validation hint (e.g. `"Formato: 9 dígitos"`) takes precedence over `"Este campo é opcional"`. When you want both, the validation hint is the one that is shown — optionality is implicit when no asterisk appears on the label.
- A real error message (`hasError` + `errorFeedbackText`) replaces the helper line entirely while the error is active.
- `readOnly` fields skip this rule — read-only is conceptually neither required nor optional from the user's point of view.
- This rule is what makes the [form-layout.md §3](./form-layout.md) row alignment work: every optional field carries one extra line of helper text under it. The grid uses `alignItems: 'start'` so input boxes stay on the same horizontal baseline regardless of which fields have helper text.

```tsx
{/* Required field — asterisk only, no helper line */}
<InputText label="NIF" name="nif" required value={nif} onChange={…} />

{/* Optional field — explicit helper line */}
<InputText
  label="Nome comercial"
  name="nomeComercial"
  hasHelperText
  helperText="Este campo é opcional"
  value={nomeComercial}
  onChange={…}
/>
```

---

## States (applies to every text-input recipe below)

The six text-input components — **InputText, InputNumber, InputTextArea, InputSelect (single), InputSelect (multi / dropdown), InputDate** — all share the same **9 visual states**. Only the `inputText` card in the style-guide renders all 9 side-by-side; the others render a single representation.

Canonical skin classes live in the shared [global.css](../../../../services/shared/frontend/src/styles/global.css) (search for the `Demo — Input state skins (canonical)` section). Wrap the AgoraDS component with the matching modifier:

| # | State | Wrapper class | Border | Background | Icon / placeholder | Text |
|---|---|---|---|---|---|---|
| 1 | Default | — | AgoraDS default | AgoraDS default | AgoraDS default | AgoraDS default |
| 2 | Hover | `.demo-input-hover` | `#008078` (primary) | unchanged | `#008078` | unchanged |
| 3 | Disabled | `.demo-input-disabled` + `disabled` prop | `2px solid #E1E4EA` | `#F1F3F8` | `#BAC0CC` | `#BAC0CC` |
| 4 | Read-only | `.demo-input-readonly` + `readOnly` prop | `#64718B` | `#F7F8FA` | `#64718B` | `#64718B` |
| 5 | Filled | `.demo-input-filled` (value present) | `#64718B` | unchanged | `#2B363C` | `#2B363C` |
| 6 | Success | (input keeps state; helper line uses `.demo-input-helper.is-success`) | — | — | — | helper `#00724C` + `agora-solid-check-circle` |
| 7 | Error | `.demo-input-error` + helper `.is-error` | `2px solid #D12332` | `#FEF1F2` | — | helper `#D12332` + `agora-solid-alert-triangle` |
| 8 | Warning | (helper only) `.demo-input-helper.is-warning` | — | — | — | helper `#F2A222` + `agora-solid-alert-circle` |
| 9 | Informative | (helper only) `.demo-input-helper.is-info` | — | — | — | helper `#0079BF` + `agora-solid-info-mark` |

### Helper text is always available

**Every** input — across all 9 states — supports an inline helper text directly beneath the field. Use plain `<div className="demo-input-helper">` for neutral hints (formato, exemplo, limite) and the `.is-success` / `.is-error` / `.is-warning` / `.is-info` modifiers when conveying validation outcome. Helper text icon is always **16×16** and sits to the left of the message.

Helper line markup:

```tsx
<div className="demo-input-helper is-success">
  <span className="demo-input-helper-icon"><Icon icon="agora-solid-check-circle" /></span>
  <span>Validação concluída com sucesso.</span>
</div>
```

> **Note** — the `.demo-input-error` wrapper on the input itself is paired with the `.is-error` helper below, since the error visual covers both the field and the message.

---

## inputText

- **Component**: `InputText`
- **States**: shares the 9 canonical visual states — see [States](#states-applies-to-every-text-input-recipe-below). The style-guide card for `inputText` is the only one that renders all 9 side-by-side.
- **Helper text**: always available in any state.
- **Use for**: free-text strings — name, address, email, password, any single-line text.
- **Required props**: `label`, `name`. Use the native `type` HTML attr (`text` | `email` | `password`) for the right keyboard / masking.
- **Pair with**: `autoComplete="..."` for known fields (`email`, `current-password`, `new-password`, `given-name`, etc.).
- **Don't**: use for numbers (use `InputNumber`) or for multi-line (use `InputTextArea`).
- **Snippet**:
  ```tsx
  <InputText
    label="Email"
    name="email"
    type="email"
    autoComplete="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    hasError={!!emailError}
    feedbackState="danger"
    errorFeedbackText={emailError}
  />
  ```

## inputNumber

- **Component**: `InputNumber`
- **States**: same 9 visual states — see [States](#states-applies-to-every-text-input-recipe-below).
- **Helper text**: always available in any state.
- **Use for**: numeric values with up/down stepper — quantities, NIF, nº registo, year, percentage.
- **Required props**: `label`, `name`, **`increaseButtonAltText`** and **`decreaseButtonAltText`** (WCAG — the stepper buttons must be announced).
- **Use HTML attrs**: `min`, `max`, `step` (e.g. `step="1"` for integers).
- **Don't**: use for strings of digits that aren't actually numeric (phone, postal code) — those are text patterns; use `InputText` with `inputMode="numeric"`.
- **Snippet**:
  ```tsx
  <InputNumber
    label="Quantidade (t)"
    name="quantidade"
    required
    min={0}
    step={0.01}
    increaseButtonAltText="Aumentar quantidade"
    decreaseButtonAltText="Diminuir quantidade"
    value={quantidade}
    onChange={(e) => setQuantidade(e.target.value)}
  />
  ```

## inputTextarea

- **Component**: `InputTextArea` *(note the capital A)*
- **States**: same 9 visual states — see [States](#states-applies-to-every-text-input-recipe-below).
- **Helper text**: always available in any state.
- **Use for**: multi-line free text — observações, descrição, motivo.
- **Required props**: `label`, `name`, `rows` (start at `4`).
- **Do**: enable `showCharCounter` whenever there is a `maxLength`.
- **Don't**: use for code/JSON input.
- **Snippet**:
  ```tsx
  <InputTextArea
    label="Observações"
    name="observacoes"
    rows={4}
    maxLength={500}
    showCharCounter
    helperText="Máximo 500 caracteres."
    hasHelperText
    value={observacoes}
    onChange={(e) => setObservacoes(e.target.value)}
  />
  ```

## inputSelect

- **Component**: `InputSelect` (single-select mode)
- **States**: same 9 visual states — see [States](#states-applies-to-every-text-input-recipe-below).
- **Helper text**: always available in any state.
- **Use for**: pick exactly one value from a known list (Origem, Tipo de Recolha, Estado).
- **Required children**: a `<DropdownSection name="...">` wrapping one or more `<DropdownOption value="...">` per option.
- **Required props**: `label`, `placeholder`, `onChange={(opts) => setX(opts[0]?.value ?? '')}`. Set `hideSectionNames` when there is only one section (the section name is a grouping label, not the field label).
- **Do**: keep the first option as a `<DropdownOption value="">Selecione</DropdownOption>` when the field is optional, or skip it when required.
- **Don't**: use a native `<select>` — it ignores AgoraDS tokens and breaks the dropdown UX.
- **Snippet**:
  ```tsx
  <InputSelect
    label="Origem"
    placeholder="Selecione"
    required
    hideSectionNames
    onChange={(opts) => setOrigem(opts[0]?.value ?? '')}
  >
    <DropdownSection name="origem">
      <DropdownOption value="industria" selected={origem === 'industria'}>Indústria</DropdownOption>
      <DropdownOption value="comercio" selected={origem === 'comercio'}>Comércio</DropdownOption>
    </DropdownSection>
  </InputSelect>
  ```

## inputSelectMulti

- **Component**: `InputSelect` with `type="checkbox"`
- **States**: same 9 visual states — see [States](#states-applies-to-every-text-input-recipe-below).
- **Helper text**: always available in any state.
- **Use for**: pick zero or more values from a list (Categorias de resíduo, Operações associadas).
- **Required props**: `label`, `placeholder`, `type="checkbox"`, `allSelectedLabel`, `pluralSelectedPlaceholder` (the multi-select uses these to render the summary text).
- **onChange**: receives the full array — handle as `opts.map(o => o.value)`.
- **Do**: enable `searchable` whenever the list has more than ~10 options.
- **Don't**: use multi for "exactly N" choices — use a CheckboxGroup if N is small and visible.
- **Snippet**:
  ```tsx
  <InputSelect
    label="Operações"
    placeholder="Selecione operações"
    type="checkbox"
    allSelectedLabel="Todas as operações"
    pluralSelectedPlaceholder="{n} operações selecionadas"
    searchable
    searchInputPlaceholder="Procurar…"
    searchInputAriaLabel="Procurar operação"
    onChange={(opts) => setOperacoes(opts.map(o => o.value))}
  >
    <DropdownSection name="operacoes">
      <DropdownOption value="R1" selected={operacoes.includes('R1')}>R1 — Recuperação de energia</DropdownOption>
      <DropdownOption value="R3" selected={operacoes.includes('R3')}>R3 — Reciclagem de orgânicos</DropdownOption>
    </DropdownSection>
  </InputSelect>
  ```

## inputSelectMultiWrap

- **Component**: `InputSelect` with `type="checkbox"`, wrapped in `<div className="demo-select-wrap">`.
- **Use for**: any multi-select where the option labels can exceed the trigger column width (e.g. `Código Demo - Nome do estabelecimento`, long category names). Without the wrapper, AgoraDS truncates the trigger summary and each option row with an ellipsis, so users cannot read the full label.
- **Required props**: same as `inputSelectMulti` (`label`, `placeholder`, `type="checkbox"`, `allSelectedLabel`, `pluralSelectedPlaceholder`). Keep `searchable` when there are >~10 options.
- **Required wrapper**: a sibling `<div className="demo-select-wrap">` immediately around the `<InputSelect>`. The class is defined in `services/shared/frontend/styles/inputs.css` and is loaded globally via `@demo/shared-frontend/styles/global.css`. The rule targets ARIA roles (`[role='combobox']`, `[role='listbox']`, `[role='option']`) so it survives AgoraDS internal class renames.
- **Behaviour**:
  - The trigger column keeps the width imposed by its parent (no horizontal growth from option text).
  - The trigger summary wraps to a second line instead of being truncated with an ellipsis.
  - The dropdown panel matches the trigger width (`min-width: 100%; max-width: 100%`) and every option row wraps (`white-space: normal; overflow-wrap: anywhere`).
- **Label format**: when composing two values, use ` - ` (space, hyphen, space) — e.g. `Demo-001 - Estação de Tratamento`. NEVER `/`: it is reserved for paths and reads as nesting.
- **onChange**: receives the full array — handle as `opts.map(o => o.value)`. Empty array means “no filter” (i.e. “all selected”); do NOT add a synthetic `<DropdownOption value="">Todos</DropdownOption>` sentinel.
- **Do not**: wrap the children of `<DropdownSection>` in a React Fragment (`<>…</>`). AgoraDS reads the children directly and a Fragment cancels the option render — the dropdown opens empty.
- **Mixing a static option with a `.map()` of dynamic options**: do NOT write them as sibling JSX (TS will reject the union of `ReactElement` + `Element[]` against `DropdownSection`'s child typing, which is what historically tempted authors to wrap them in a Fragment). Emit a single array expression instead:
  ```tsx
  <DropdownSection name="tipo">
    {[
      <DropdownOption key="__all__" value="" selected={tipo === ''}>Todos</DropdownOption>,
      ...tipos.map((t) => (
        <DropdownOption key={t.id} value={t.id} selected={tipo === t.id}>{t.descricao}</DropdownOption>
      )),
    ]}
  </DropdownSection>
  ```
  This satisfies the TS typing (single array) and AgoraDS runtime (flat children, no opaque Fragment).
- **Do not**: override the panel width with inline `style={{ width: … }}` or `!important` rules. Always go through the `.demo-select-wrap` helper so behaviour stays consistent across pages.
- **Snippet**:
  ```tsx
  <div className="demo-select-wrap">
    <InputSelect
      label="Código Demo - Nome do estabelecimento"
      placeholder="Organização"
      type="checkbox"
      allSelectedLabel="Todos os estabelecimentos"
      pluralSelectedPlaceholder="{n} estabelecimentos selecionados"
      searchable
      searchInputPlaceholder="Procurar…"
      searchInputAriaLabel="Procurar estabelecimento"
      hideSectionNames
      onChange={(opts) => setEstabelecimentos(opts.map(o => o.value))}
    >
      <DropdownSection name="estabelecimentos">
        {options.map((o) => (
          <DropdownOption
            key={o.id}
            value={String(o.id)}
            selected={estabelecimentos.includes(String(o.id))}
          >
            {`${o.codApa} - ${o.nome}`}
          </DropdownOption>
        ))}
      </DropdownSection>
    </InputSelect>
  </div>
  ```

## inputDate

- **Component**: `InputDate`
- **States**: same 9 visual states — see [States](#states-applies-to-every-text-input-recipe-below).
- **Helper text**: always available in any state.
- **Use for**: any single date (data de produção, data de recolha).
- **Required props**: `label`, `name`, plus the full set of accessibility labels: `calendarIconAriaLabel`, `previousYearAriaLabel`, `previousMonthAriaLabel`, `nextMonthAriaLabel`, `nextYearAriaLabel`, `selectedDayAriaLabel`, `todayDayAriaLabel`, `todayLabel`, `cancelLabel`, `okLabel`.
- **Do**: extract the aria-label set to a constant module (e.g. `inputDateLabels.ts`) and spread it (`{...inputDateLabels}`) — never inline these 10 props on every usage.
- **Don't**: use for date ranges — there is no `InputDateRange` in AgoraDS; for now, use two `InputDate` instances.
- **Snippet**:
  ```tsx
  <InputDate
    label="Data de recolha"
    name="dataRecolha"
    required
    {...inputDateLabels}
    value={dataRecolha}
    onChange={(e) => setDataRecolha(e.target.value)}
  />
  ```

## checkbox

- **Component**: `Checkbox` (standalone)
- **Use for**: a single boolean — consentimento, "Li e aceito os termos", optional flag.
- **Required props**: `label` (or `children` for a custom label with embedded link), `name`, `checked`, `onChange`.
- **Do**: when the label embeds a link (T&Cs), pass the link inside `children` and omit `label`.
- **Don't**: use for "yes / no" two-option pickers — use a `RadioButtonGroup`.
- **Snippet**:
  ```tsx
  <Checkbox
    label="Aceito os termos e condições"
    name="aceitaTermos"
    required
    checked={aceitaTermos}
    onChange={(e) => setAceitaTermos(e.target.checked)}
  />
  ```

## checkboxGroup

- **Component**: `CheckboxGroup` wrapping multiple `<Checkbox>`
- **Use for**: choose any number from a small, fully visible set (3–7 options).
- **Required props**: `legend` (the group label — replaces individual `label`s for accessibility).
- **Do**: each child `<Checkbox>` gets its own `label`, `value`, `checked`, `onChange`.
- **Don't**: use for long lists (>~7 options) — switch to `inputSelectMulti`.
- **Snippet**:
  ```tsx
  <CheckboxGroup legend="Tipos de instalação">
    <Checkbox label="Aterro" value="aterro" checked={tipos.includes('aterro')} onChange={onTipoChange} />
    <Checkbox label="Incineração" value="incineracao" checked={tipos.includes('incineracao')} onChange={onTipoChange} />
    <Checkbox label="Compostagem" value="compostagem" checked={tipos.includes('compostagem')} onChange={onTipoChange} />
  </CheckboxGroup>
  ```

## radioGroupVertical

- **Component**: `RadioButtonGroup` wrapping multiple `<RadioButton>` (default vertical stack)
- **Use for**: pick exactly one from 2–5 options where each label may be long, or where the column read order is more scannable.
- **Required props**: `legend`, `name` (shared across all radios in the group).
- **Do**: each child `<RadioButton>` gets its own `label`, `value`, `checked`. No `className` needed — the default stack is vertical.
- **Don't**: use for >~5 options — switch to `inputSelect`.
- **Snippet**:
  ```tsx
  <RadioButtonGroup legend="Estado" name="estado" onChange={(e) => setEstado(e.target.value)}>
    <RadioButton label="Ativo" value="ativo" checked={estado === 'ativo'} />
    <RadioButton label="Inativo" value="inativo" checked={estado === 'inativo'} />
    <RadioButton label="Suspenso" value="suspenso" checked={estado === 'suspenso'} />
  </RadioButtonGroup>
  ```

## radioGroupHorizontal

- **Component**: `RadioButtonGroup` with `className="sg-radio-row"` (CSS class defined once in `src/shared/styles/global.css` or imported locally).
- **Use for**: 2–4 short labels (Sim / Não, Ativo / Inativo) where the inline row is more compact and reads as a single decision.
- **Required props**: same as vertical (`legend`, `name`). The only difference is the `className` on the group.
- **The CSS** (paste once into a project-wide stylesheet):
  ```css
  .sg-radio-row > fieldset {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: center;
  }
  .sg-radio-row > fieldset > legend {
    flex-basis: 100%;
  }
  ```
- **Why descend into the fieldset**: `RadioButtonGroup` renders `<div className={yours}><fieldset><legend/>{children}</fieldset></div>`. The user-supplied `className` lands on the **outer `<div>`**, which has exactly one child (the fieldset) — flexing it does nothing. The fieldset itself uses default block layout, so we have to target it via `.sg-radio-row > fieldset` to switch the radios to a row. The legend rule prevents it from becoming a flex sibling of the first radio.
- **Do**: keep labels short (1–2 words). If any label needs to wrap, fall back to `radioGroupVertical`.
- **Don't**: use a different gap value — 24px matches the spacing between paired inputs elsewhere.
- **Snippet**:
  ```tsx
  <RadioButtonGroup
    legend="Confirma os dados?"
    name="confirma"
    className="sg-radio-row"
    onChange={(e) => setConfirma(e.target.value)}
  >
    <RadioButton label="Sim" value="sim" checked={confirma === 'sim'} />
    <RadioButton label="Não" value="nao" checked={confirma === 'nao'} />
  </RadioButtonGroup>
  ```

## uploader

- **Component**: `DragAndDropUploader` (preferred for visible upload zones) or `ButtonUploader` (compact, button-only).
- **Use for**: anexar documentos, comprovativos, ficheiros de suporte.
- **Required props**: `dragAndDropLabel`, `inputLabel`, `removeFileButtonLabel`, `replaceFileButtonLabel`, the four error labels (`maxCountExceededErrorLabel`, `maxSizeExceededErrorLabel`, `forbiddenExtensionErrorLabel`, `duplicatedFileErrorLabel`), and the HTML `accept` attr (e.g. `accept=".pdf,.jpg,.png"`).
- **Do**: always set `maxSize` (bytes) and `maxCount`. Server-side enforcement is mandatory — the client limit is a UX guard.
- **Don't**: use a raw `<input type="file">` — it bypasses validation, drag-and-drop, and the file list UI.
- **Snippet**:
  ```tsx
  <DragAndDropUploader
    label="Documentos de suporte"
    dragAndDropLabel="Arraste ficheiros ou clique para selecionar"
    inputLabel="Selecionar ficheiros"
    separatorLabel="ou"
    extensionsInstructions="PDF, JPG, PNG até 5 MB"
    accept=".pdf,.jpg,.png"
    maxCount={5}
    maxSize={5 * 1024 * 1024}
    removeFileButtonLabel="Remover ficheiro"
    replaceFileButtonLabel="Substituir ficheiro"
    maxCountExceededErrorLabel="Máximo de 5 ficheiros."
    maxSizeExceededErrorLabel="Cada ficheiro pode ter no máximo 5 MB."
    forbiddenExtensionErrorLabel="Extensão não permitida."
    duplicatedFileErrorLabel="Ficheiro duplicado."
  />
  ```

## switchToggle

- **Component**: `Switch`
- **Use for**: instant on/off settings that apply without a Save button (notificações, modo dark, filtros booleanos numa toolbar).
- **Required props**: `label`, `name`, `checked`, `onChange`.
- **Don't**: use inside a form that needs Submeter — use a `Checkbox`. Switches imply immediate effect.
- **Snippet**:
  ```tsx
  <Switch
    label="Receber notificações por email"
    name="notificacoes"
    checked={notificacoes}
    onChange={(e) => setNotificacoes(e.target.checked)}
  />
  ```

---

## Cross-cutting

### Reminder checklist (top card on style-guide page)

- Mark each field as mandatory (`required`) or optional.
- When there is a business character limit, set `maxLength` and helper text with the limit.
- Use helper text for hints and error feedback for validation; do not show both simultaneously.
- Use `readOnly` for visualization-only values; use `disabled` only for non-interactive/inapplicable fields.
- Placeholders are gray guidance text and never replace labels.

### Field metadata (mandatory, max chars, read-only, placeholder)

Every form input must explicitly define these behaviors in the page contract:

- **Mandatory vs optional**: use `required` when mandatory. Do not append `*` manually to labels.
- **Max characters**: whenever business rules define a character limit, set `maxLength` and explain it with helper text.
- **Visualization-only field**: use `readOnly` (not `disabled`) when value must be visible/copyable/submitted but not editable.
- **Placeholder guidance**: set `placeholder` with a concise hint/example; placeholder is support text only and never replaces `label`.

Recommended pattern:

```tsx
<div className="demo-form-inputs">
  <InputText
    label="Designação"
    name="designacao"
    required
    maxLength={120}
    placeholder="Ex.: Unidade de valorização de resíduos"
    helperText="Máximo 120 caracteres."
    hasHelperText
  />

  <InputText
    label="Referência interna"
    name="referenciaInterna"
    readOnly
    value="Demo-2026-000123"
    placeholder="Gerada automaticamente"
  />
</div>
```

### Identifier label + input text visual

- Use wrapper `className="demo-form-inputs"` around input blocks that follow the standard Demo identifier style.
- This wrapper is defined in `src/shared/styles/global.css` and centralizes:
  - label: `16px`, `500`, `var(--color-label-identifier)` (`#021C51`)
  - input text: `16px`, `400`, `var(--color-input-text)` (`#2B363C`)
  - placeholder: `var(--color-neutral-500)` for support/hint text inside fields
- Do not hardcode these colors directly in component inline styles.

### Accessibility

Every input MUST have:
- A visible `label` (or `legend` for CheckboxGroup / RadioButtonGroup). Never set `hideLabel` to satisfy a design — accessibility wins.
- The `required` HTML attribute when the field is mandatory. AgoraDS renders the asterisk automatically; do not append `*` to the label string manually.
- A `name` attribute matching the form field key (used by form serialization and by screen readers when grouping).
- For `InputDate`: the full set of `*AriaLabel` props (calendar, prev/next year/month, today, ok, cancel). There is no fallback.
- For `InputNumber`: `increaseButtonAltText` and `decreaseButtonAltText` — the stepper buttons are icon-only and otherwise unannounced.
- For an icon-only error: pair `hasError` with `errorFeedbackText` so screen readers announce *what* is wrong.

### Helper vs error (mutually exclusive)

Below every input, AgoraDS renders **either** helper text **or** error text — never both at once.

| State | Props |
|---|---|
| **Helper** (hint / format) | `hasHelperText`, `helperText="Formato: XXXXXX-X"` |
| **Error** (validation failed) | `hasError`, `feedbackState="danger"`, `errorFeedbackText="Campo obrigatório"` |
| **Success / Warning / Info** (rare) | `hasFeedback`, `feedbackState="success"|"warning"|"info"`, `feedbackText="..."` |

Rule: while an input is in error state, hide the helper. The component handles this automatically when you stop passing `hasHelperText` / start passing `hasError` — do not try to show both.

### Disabled vs read-only

| Visual | Prop | When |
|---|---|---|
| **Disabled** (grey, non-interactive, NOT focusable, NOT submitted) | `disabled` | Field is conditionally inapplicable (e.g. "NIF de empresa" when "Tipo = particular"). |
| **Read-only** (still styled normal, focusable, copyable, submitted) | `readOnly` | Field is pre-filled and shown for context, but the user should be able to read / copy / inspect it (e.g. nº de registo gerado, criado em, criado por). |

- Never use `disabled` just to "lock until something happens" if the value still matters for submission — use `readOnly`.
- A disabled input does not generate validation errors; clear `hasError` when disabling.
- Both `disabled` and `readOnly` keep the label visible. Do not also hide the label.
