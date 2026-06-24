# Practice guide — the two agent moves

Step-by-step run-through of Move 1 (audit) and Move 2 (generation).
No presentation framing — just the actions.

---

## Before you start (pre-flight)

1. **Terminal A** — from the project root:
   ```bash
   node api/server.mjs
   ```
   Confirm `http://localhost:8099` responds.

2. **Terminal B** — from `web/`:
   ```bash
   npm run dev
   ```
   Confirm `http://localhost:5173` shows the table.

3. **VS Code** — open the project root folder (`genai-quickwins-demo/`), then:
   - Command Palette → **Developer: Reload Window**
   - Open Copilot Chat, type `@` — confirm `demo-frontend` and `demo-frontend-reviewer` appear in the list.
   - Open `web/src/features/establishments/EstablishmentsPageDirty.tsx` in an editor tab.

---

## Move 1 — Audit (`@demo-frontend-reviewer`)

**Goal:** show deterministic, citation-only review against the dirty page.

1. In Copilot Chat, type:
   ```
   @demo-frontend-reviewer review web/src/features/establishments/EstablishmentsPageDirty.tsx
   ```
2. Wait for the report. You should see **7 🔴 Blocking findings and 2 🟡 Minor** — each with a recipe citation like `buttons.md §2` or `react-patterns.md §1`.
3. Key finding to read out:
   > `EstablishmentsPageDirty.tsx:41-48` — client-side filtering instead of server-side params (per `react-patterns.md §3`).
4. Compare against `review/EXPECTED-REPORT.md` to verify the output is correct.

**Expected result:** blocked report with citations. No invented rules, no edits.

---

## Move 2 — Generation (`@demo-frontend`)

**Goal:** generate the inspections page live from the existing API.

> The `inspections` page must **not** exist yet. If you ran this before and it was created,
> delete `web/src/features/inspections/` and revert any tab added in `web/src/App.tsx`.

1. Open `http://localhost:8099` in a browser tab — confirm the `/inspections` endpoints are visible in Swagger.
2. In Copilot Chat, type this exact prompt:
   ```
   @demo-frontend create a filter page for inspections, searchable by estabelecimento and resultado, and add it as a tab
   ```
3. Let the agent run. It will:
   - Read the skills under `.github/skills/`
   - Wire `useListInspections` (the orval-generated hook)
   - Build the page with AgoraDS `InputText` / `InputSelect` + `DemoTable`
   - Add a tab in `App.tsx`
4. Once done, open `http://localhost:5173` and click the new tab. Use the filters — they should hit the API, not the browser.

**Expected result:** a new `InspectionsPage.tsx` that passes the same rules the reviewer enforced in Move 1.

---

## Optional bookend

Run the reviewer on the generated file to confirm it's clean:

```
@demo-frontend-reviewer review web/src/features/inspections/InspectionsPage.tsx
```

No 🔴 findings = the generator and reviewer agree on the same rules.

---

## If something breaks

| Problem | Fix |
|---|---|
| `@demo-frontend` / `@demo-frontend-reviewer` not in `@` menu | Command Palette → Reload Window |
| Table is empty | Check Terminal A — API must be running on :8099 |
| Reviewer invents a rule without citing a recipe | That's a bug — note the finding and skip it |
| Generator stalls or produces wrong output | Show `EstablishmentsPage.tsx` as fallback — it's the reference output |
| Need to re-run Move 2 cleanly | Delete the generated file + revert `App.tsx`, then re-prompt |
