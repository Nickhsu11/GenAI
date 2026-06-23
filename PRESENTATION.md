# How to present the demo (pitch playbook)

Format reminder (GenAI QuickWins): **5–7 min pitch + 2–3 min Q&A**. Recommended
structure: Problem → Solution → Demo → Benefit → Reuse. Judging: **Impact 40% /
Applicability 30% / Scale & reuse 30%**. This playbook maps the demo onto exactly that.

> One-liner to open and close with:
> **"A self-enforcing design system — GenAI that both *writes* our frontend code to the
> design rules, and *audits* any code against those same rules, with citations."**

---

## Run-of-show (target ~6 min)

| Time | Beat | What you do |
|---|---|---|
| 0:00–1:00 | **Problem + the loop** | Plain-language problem; "rules as recipes drive *both* review and generation". |
| 1:00–2:45 | **Move 1 — Audit** (safe anchor) | Dirty page → `@demo-frontend-reviewer` → read 2–3 cited findings → flip to ✅. |
| 2:45–4:45 | **Move 2 — Generation** (live wow) | `@demo-frontend` builds the inspections page live against the ready API. |
| 4:45–5:00 | **Style guide** (15s) | The single source of truth both agents read. |
| 5:00–6:00 | **Benefit + Reuse + close** | Map to 40/30/30; end on the one-liner. |

Order is deliberate: **lead with the audit** (deterministic, always works, proves "rules as
code"), then generation as the "and it also *writes* passing code" flourish. If generation
wobbles, the strongest beat is already banked.

---

## 0. Pre-flight checklist (do this BEFORE you present)

- [ ] API running: `node api/server.mjs` → `http://localhost:8099` responds.
- [ ] Web running: `npm run dev` → `http://localhost:5173` shows the table.
- [ ] VS Code open at the **project root**, window reloaded, so `@demo-frontend` and
      `@demo-frontend-reviewer` appear in the Copilot `@` menu.
- [ ] Copilot Chat open and signed in; pick the model you'll use beforehand.
- [ ] Browser tab on `http://localhost:5173/`, second tab on `http://localhost:8099/` (Swagger).
- [ ] Editor font size up (Ctrl/Cmd +). Close noisy panels.
- [ ] Have `EstablishmentsPageDirty.tsx` and a clean page already open in tabs.
- [ ] **Rehearse once end-to-end and time it.** Live AI is unpredictable — know your fallback (§5).

---

## 1. The story (≈1 min) — Problem

Say it in business terms, not tech:

- Every screen in our product must follow the same design system — colours, spacing,
  components, table behaviour, accessibility. Doing that **by hand** is slow and drifts:
  people copy-paste old code, hardcode a colour, forget the paginator, filter on the client.
- Reviewing for those rules by hand is **tedious and inconsistent** — it depends on who reviews.
- **The idea:** put the design rules in machine-readable "recipes", then let GenAI (1) *generate*
  code that already follows them and (2) *review* any code against them, citing the exact rule.

Land the point: **the rules are written once; both generation and review obey the same source of truth.**

---

## 2. The live demo (≈3.5 min) — Demo

Two moves, in this order. Don't tour every file.

### Move 1 — Audit (your safe anchor) ← do this first
1. Start on the **✅ Página conforme** tab (real, styled, paginated, 3 server-side filters) so
   they see "good" first.
2. Switch to the **⚠️ Página com erros** tab — *"this is what hand-written code drifts into."*
   Point at the obvious miss: no paginator, hardcoded colour.
3. In Copilot run **`@demo-frontend-reviewer`** on
   `web/src/features/establishments/EstablishmentsPageDirty.tsx`.
4. Read out 2–3 findings — each cites a rule (e.g. *"hardcoded brand hex — buttons.md §2"*).
   Emphasise: **every finding has a citation; the reviewer never invents rules and never edits.**
5. Flip back to the **✅** tab: *"and this is the version that passes."*

> Why first: it's deterministic and always works — it banks the core idea ("rules as code,
> enforced, with citations") before the riskier live generation.
> Punchline: *"A consistent, rule-cited review in seconds."*

### Move 2 — Generation, fully live (the wow)
1. Show **http://localhost:8099/** (Swagger) for one beat: *"this is our API contract — the
   `/inspections` endpoints already exist, but there's no page for them yet."*
2. In Copilot run **`@demo-frontend`**:
   *"create a filter page for inspections, searchable by estabelecimento and resultado, and add it
   as a tab."*
3. Narrate while it works: it reads the skills, wires the orval `useListInspections` hook, builds
   the page with AgoraDS inputs + `DemoTable`, keeps filtering server-side.
4. When it finishes, **open the new tab in the running app** and use the filter — a brand-new,
   on-brand, API-connected page, generated in front of them.
5. (Optional bookend) *"the API client is generated too"* — run **`npm run api:gen`**.

> The inspections page is intentionally **not** pre-built — generating it live is the whole point.
> **Rehearse this exact prompt** so the model behaves predictably on the day. Break-glass only if
> it truly stalls: see §5.
> Punchline: *"From idea to a working, on-brand, API-connected page in ~2 minutes instead of 15–20 —
> and it passes the same review you just saw."*

### Optional — the living style guide (15s, only if time)
Open **📖 Style guide** → typography / buttons / inputs / tables / icons with code + rules.
*"This is the single source of truth both agents read."*

---

## 3. Benefit + Reuse (≈1 min) — close

Tie each point to the scoring criteria, explicitly:

- **Impact (40%)** — *time saved* (≈15–20 min → ~2 min per page) **and** *defects caught*
  (the reviewer flagged N rule violations with citations, automatically).
- **Applicability (30%)** — *this is not a prototype.* These skills/agents come from real,
  daily use on our project; the demo just isolates them.
- **Scale & reuse (30%)** — the skills + agents are **repo-agnostic**: any frontend team with a
  style guide can drop them in. Add a rule once → both generation and review pick it up.

Close on the one-liner from the top.

---

## 4. Q&A prep (anticipate these)

- **"Does it hallucinate rules?"** No — the reviewer is citation-only; if it can't cite a recipe
  it drops the finding. Show the constraint in the agent file if asked.
- **"What if the design system changes?"** Change the recipe once; both agents follow. Demo: the
  rules live in `.github/skills/` (generator) and `review/skills/` (reviewer).
- **"Is the data real?"** The demo uses a fake API so it's safe to show publicly — but the
  patterns (orval, AgoraDS, DemoTable, server-side filtering) are exactly the real ones.
- **"Why server-side filtering?"** It's a hard rule (`react-patterns.md §3`) — never filter on the
  client. The reviewer catches violations of it.
- **"How much setup per project?"** Drop in the skills + two agent files; point orval at the API.
- **"Which model / tool?"** It runs in GitHub Copilot in VS Code via custom agents — no bespoke infra.

---

## 5. If the live demo misbehaves (fallback)

- Live AI generation is the riskiest beat — **the committed pages are your safety net.** If
  `@demo-frontend` stalls, say *"here's the output it produces"* and show `EstablishmentsPage.tsx`.
- If Copilot is slow for the review, open **`review/EXPECTED-REPORT.md`** — that's the exact report
  the reviewer produces, ready to read.
- If a server died: `node api/server.mjs` (API) / `npm run dev` (web). Keep the commands on screen.
- Worst case, the whole story works on **slides + the committed code** — the running app is a bonus,
  not a dependency.

---

## 6. Do / Don't

**Do**
- Lead with the problem in plain language; keep jargon for Q&A.
- Show, don't describe — the audit with citations is the memorable moment.
- State the numbers out loud (time saved, violations caught).

**Don't**
- Don't open ten files or explain the folder structure — nobody scores architecture tours.
- Don't depend on a single live AI call working — rehearse the fallback.
- Don't overrun. Practice to ~5 min so Q&A has room.

---

## 7. 30-second elevator version (if time gets cut)

*"We wrote our design-system rules as machine-readable recipes. One GenAI agent generates
new pages that already follow them; another reviews any code against them and flags every
violation with a citation — same rules, both directions. It's in daily use, it saves ~15 min
a page, and any frontend team with a style guide can reuse it."*
