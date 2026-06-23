# GenAI QuickWins — Demo

A self-contained demo for the **GenAI QuickWins Challenge** (NTT DATA Portugal).
It shows one story in two moves:

> **A self-enforcing design system: GenAI that both *writes* Demo-compliant
> frontend code and *audits* it against a single source of truth.**

Nothing here touches the real Demo client project. The API, data, and components
are faithful but standalone copies of the real patterns (orval + react-query,
the `DemoTable` compound component, the style-guide recipes).

## Quick start

```bash
cd web && npm install          # first time only

# terminal A (from the project root) — fake API on :8099
node api/server.mjs

# terminal B — web app on :5173
cd web
npm run api:gen                # generate the typed client from the live spec (API must be up)
npm run dev                    # open http://localhost:5173
```

📖 **Full setup, the orval workflow, adding endpoints, the Copilot agents, and
troubleshooting are in [GUIDE.md](./GUIDE.md).**

## Layout
```
genai-quickwins-demo/
├── api/                 Fake REST API (zero deps)
│   ├── openapi.json     OpenAPI spec — single source of truth (served at /api-docs)
│   └── server.mjs       → Swagger UI at /, spec at /api-docs, data at /establishments
├── web/                 Vite + React + TS app
│   ├── orval.config.cjs
│   └── src/
│       ├── App.tsx             Demo tab shell — toggles the two pages below
│       ├── api/generated/      ← orval output (react-query hooks). DO NOT hand-edit.
│       ├── components/DemoTable/  +  components/Paginator/
│       └── features/establishments/
│           ├── EstablishmentsPage.tsx        ← the COMPLIANT page ("✅" tab)
│           └── EstablishmentsPageDirty.tsx   ← 6 staged violations ("⚠️" tab + reviewed file)
├── .github/
│   ├── agents/
│   │   ├── demo-frontend.agent.md            GENERATOR — scaffolds Demo-compliant code
│   │   └── demo-frontend-reviewer.agent.md   REVIEWER  — audits code against the recipes
│   └── skills/          Skills imported from the root Demo project (used by the generator)
│       ├── agora-ui-standards/   react-patterns/   agora-design-system/
│       └── style-guide/          (SKILL.md + 17 recipes)
└── review/              The reviewer's own curated source material
    ├── skills/                          Trimmed recipes + severity policy (reviewer only)
    └── EXPECTED-REPORT.md               What the reviewer outputs (Metric B evidence)
```

> Two agents, both in `.github/agents/` so VS Code Copilot detects them in the `@` picker:
> **`@demo-frontend`** generates code, **`@demo-frontend-reviewer`** audits it. The generator
> reads the full real skills under `.github/skills/`; the reviewer reads its own trimmed,
> severity-annotated recipes under `review/skills/`. `web/AGENTS.md` maps the real
> `services/...` paths the skills cite onto this demo's `web/src/...` layout.

> **Copilot agent location:** custom agents are only auto-detected in
> `.github/agents/<name>.agent.md` at the workspace root. After adding one,
> reload the VS Code window, then pick it from the `@` agents menu in Copilot Chat.

## Run it
```bash
# 1. terminal A — fake API (MUST be up before api:gen, like the real backend)
node api/server.mjs
#   Swagger UI : http://localhost:8099/
#   OpenAPI    : http://localhost:8099/api-docs

# 2. terminal B — web app
cd web
npm install        # first time only
npm run api:gen    # orval reads http://localhost:8099/api-docs → react-query hooks
npm run dev        # http://localhost:5173
```

Just like the real Demo frontoffice (`orval` reads `http://localhost:8083/api-docs`),
the client is generated from the live spec endpoint — not a checked-in file.

## The pitch demo — two moves

Open the app (http://localhost:5173) — three tabs:
**✅ Página conforme** (establishments filter page), **⚠️ Página com erros** (the violations
page), and **📖 Style guide** (a living catalogue of the used elements — typography, buttons,
inputs, tables, icons — each with code + rules). Flip between them live.

The compliant page is a real **filter page** with **three multi-select filters**
(Nome / Estado / Período): the **Nome** options come from their own swagger call
(`/establishments/names`), and searching is **100% server-side** — all three go to the backend
as query params and the server ANDs them to narrow the data.

> The **inspections** entity (`/inspections` + `/inspections/establishments`) has its API ready
> but **no page** — it's the live target you generate with `@demo-frontend` during the pitch.

**Move 1 — Generation (Aplicabilidade + Impacto).**
In Copilot Chat, run **`@demo-frontend`** with a prompt like
*"create a filter page listing inspections, searchable by estabelecimento and resultado"*.
The API already exposes a second entity — **`/inspections`** (with the same server-side
filter params) — so the agent can scaffold a brand-new page *from scratch*: it reads the
skills (`agora-ui-standards`, `react-patterns`, `style-guide`), wires the orval-generated
`useListInspections` hook, builds the filter form with AgoraDS inputs + `DemoTable`, and
keeps **all filtering server-side**. No hand-written fetch, no hardcoded colors.
The committed `EstablishmentsPage.tsx` (a working filter page) is the reference output.
Re-run `npm run api:gen` live to show the API client itself is generated, not written.
→ *This is Metric A: the "15–20 min by hand → ~2 min" time saving.*

> **Examples for the demonstration.** Everything in this repo is meant to be shown live:
> the **✅ filter page** (server-side search by Nome/Estado), the **⚠️ violations page**,
> and the **`/inspections` entity** as a clean from-scratch generation target for `@demo-frontend`.

**Move 2 — Audit (Impacto + Reutilização).**
Switch to the **⚠️ Página com erros** tab, then run the `demo-frontend-reviewer`
against `web/src/features/establishments/EstablishmentsPageDirty.tsx` — the exact
file on screen. It returns **7 blocking findings across 6 defects, each with a
recipe citation**, in seconds. See `review/EXPECTED-REPORT.md`.
→ *This is Metric B: violations caught automatically, with citations.*

## Mapping to the judging criteria
- **Impacto comprovado (40%)** — Metric A (time saved) + Metric B (defects caught).
- **Aplicabilidade real (30%)** — same patterns already in daily use on Demo.
- **Potencial de escala (30%)** — skill + agent are repo-agnostic; drop them into any
  frontend project that has a style guide.
