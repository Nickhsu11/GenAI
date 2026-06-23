# GenAI QuickWins — Demo

A self-contained demo of a **self-enforcing design system**: GenAI that both *writes*
frontend code to the design rules and *audits* code against those same rules, with citations.

Nothing here touches the real client project. The API, data, and components are faithful but
standalone copies of the real patterns (orval + react-query, the `DemoTable` compound
component, the style-guide recipes).

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
│       ├── App.tsx             Tab shell — toggles the pages below
│       ├── api/generated/      ← orval output (react-query hooks). DO NOT hand-edit.
│       ├── components/DemoTable/  +  components/Paginator/
│       └── features/establishments/
│           ├── EstablishmentsPage.tsx        ← the compliant filter page ("✅" tab)
│           └── EstablishmentsPageDirty.tsx   ← staged violations ("⚠️" tab + reviewed file)
├── .github/
│   ├── agents/
│   │   ├── demo-frontend.agent.md            GENERATOR — scaffolds compliant code
│   │   └── demo-frontend-reviewer.agent.md   REVIEWER  — audits code against the recipes
│   └── skills/          Skills imported from the root project (used by the generator)
│       ├── agora-ui-standards/   react-patterns/   agora-design-system/
│       └── style-guide/          (SKILL.md + 17 recipes)
└── review/              The reviewer's own curated source material
    ├── skills/                          Trimmed recipes + severity policy (reviewer only)
    └── EXPECTED-REPORT.md               Example reviewer output
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

Just like the real frontoffice (`orval` reads `http://localhost:8083/api-docs`), the client is
generated from the live spec endpoint — not a checked-in file.

## The app

Three tabs:
- **✅ Página conforme** — a real filter page with **three multi-select filters**
  (Nome / Estado / Período). The **Nome** options come from their own swagger call
  (`/establishments/names`), and searching is **100% server-side** — all three go to the backend
  as query params and the server ANDs them to narrow the data.
- **⚠️ Página com erros** — the same page with staged guideline violations; this is the file the
  reviewer audits.
- **📖 Style guide** — a living catalogue of the used elements (typography, buttons, inputs,
  tables, icons), each with code + rules.

The **inspections** entity (`/inspections` + `/inspections/establishments`) has its API ready
but **no page** — a clean from-scratch generation target for `@demo-frontend`.

## The two agents

- **`@demo-frontend`** — generates new pages/components that follow the skills
  (`agora-ui-standards`, `react-patterns`, `style-guide`): orval-generated hook + `DemoTable` +
  design tokens, with server-side filtering. No hand-written fetch, no hardcoded colours.
- **`@demo-frontend-reviewer`** — read-only auditor. Compares a file against the recipes under
  `review/skills/` and reports rule violations **with citations** (e.g. `buttons.md §2`), each
  classified by severity. Never edits, never invents rules. See `review/EXPECTED-REPORT.md` for
  an example run against `EstablishmentsPageDirty.tsx`.
