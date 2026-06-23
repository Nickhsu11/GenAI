# Inputs — Canonical Rules (trimmed for demo)

> Machine-readable source of truth for form inputs. Agents read THIS file.

All form inputs MUST use the AgoraDS component for their type. Action triggers use `<Button>`.

## §1 Never use raw HTML form controls
- `<input>` → `InputText` / `InputNumber` / `InputDate`; `<select>` → `InputSelect`;
  `<textarea>` → `InputTextArea`; `<button>` → `<Button>`.
- A raw `<input>`, `<select>`, or `<textarea>` where an AgoraDS component exists is a **🔴 Blocking** violation.

## §2 InputSelect structure
- A single-select uses `<InputSelect>` wrapping a `<DropdownSection>` with one `<DropdownOption value="...">` per option.
- For an optional select, the first option is `<DropdownOption value="">…</DropdownOption>` (e.g. "Todos").
- **Never** wrap the children of `<DropdownSection>` in a React Fragment (`<>…</>`) — AgoraDS reads the
  children directly and a Fragment cancels the option render (the dropdown opens empty). Emit a single
  array expression instead. A Fragment-wrapped `DropdownSection` is a **🔴 Blocking** violation.

## §3 Dropdown options that come from data
- Option lists sourced from the backend MUST be fed by a generated hook (e.g. `useListEstablishmentNames`),
  not a hardcoded array duplicating backend data. Hardcoding a list the backend owns is a **🟡 Minor** violation.

## §4 Optional-field helper text is a FORM-PAGE rule only
- On form pages, an optional field declares itself with `helperText="Este campo é opcional"`.
- On **filter pages** this helper text must NOT appear — all filter fields are implicitly optional
  (per `filter-page.md`). Adding it on a filter field is a **🟡 Minor** violation.
