// Zero-dependency fake API for the GenAI QuickWins demo.
// Mirrors a real Demo backend: serves an OpenAPI doc at /api-docs (what orval
// consumes), a browsable Swagger UI at /, and the paginated data at /establishments.
// Run with:  node api/server.mjs
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const PORT = 8099;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Single source of truth — the same file orval reads.
const OPENAPI = JSON.parse(readFileSync(join(__dirname, 'openapi.json'), 'utf8'));

const ESTADOS = ['Ativo', 'Suspenso', 'Encerrado'];
const RESULTADOS = ['Conforme', 'Não Conforme', 'Pendente'];
const INSPETORES = ['Ana Martins', 'João Pereira', 'Sofia Costa', 'Miguel Santos'];

// 42 deterministic establishments so the demo looks the same every time.
const ESTABELECIMENTOS = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  nome: `Estabelecimento ${String(i + 1).padStart(2, '0')}`,
  estado: ESTADOS[i % ESTADOS.length],
  periodo: `2026-Q${(i % 4) + 1}`,
}));

// 30 deterministic inspections (the second entity — generation-demo target).
const INSPECOES = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  estabelecimento: `Estabelecimento ${String((i % 42) + 1).padStart(2, '0')}`,
  inspetor: INSPETORES[i % INSPETORES.length],
  resultado: RESULTADOS[i % RESULTADOS.length],
  data: `2026-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
}));

// Server-side pagination helper — ALL filtering happens here, never on the client.
const paginate = (rows, params) => {
  const page = Math.max(1, Number(params.get('page')) || 1);
  const pageSize = Math.max(1, Number(params.get('pageSize')) || 10);
  const start = (page - 1) * pageSize;
  return { items: rows.slice(start, start + pageSize), total: rows.length, page, pageSize };
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json', ...CORS });
  res.end(JSON.stringify(body));
};

const html = (res, body) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', ...CORS });
  res.end(body);
};

// Swagger UI loaded from CDN, pointed at our own /api-docs.
const SWAGGER_UI = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Demo API — Swagger</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.ui = SwaggerUIBundle({ url: '/api-docs', dom_id: '#swagger-ui' });
    </script>
  </body>
</html>`;

const server = createServer((req, res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Swagger UI
  if ((url.pathname === '/' || url.pathname === '/swagger') && req.method === 'GET') {
    return html(res, SWAGGER_UI);
  }

  // OpenAPI spec — what orval consumes (real Demo uses /api-docs too).
  if ((url.pathname === '/api-docs' || url.pathname === '/v3/api-docs') && req.method === 'GET') {
    return json(res, 200, OPENAPI);
  }

  // Establishment names — options source for the Nome filter dropdown.
  if (url.pathname === '/establishments/names' && req.method === 'GET') {
    return json(res, 200, ESTABELECIMENTOS.map((r) => r.nome));
  }

  // Establishments — server-side multi-select filter on up to 3 params:
  // keep rows whose nome ∈ selected AND estado ∈ selected AND periodo ∈ selected.
  if (url.pathname === '/establishments' && req.method === 'GET') {
    const nomes = url.searchParams.getAll('nome');       // 0..n selected names
    const estados = url.searchParams.getAll('estado');   // 0..n selected estados
    const periodos = url.searchParams.getAll('periodo'); // 0..n selected periodos
    let rows = ESTABELECIMENTOS;
    if (nomes.length) rows = rows.filter((r) => nomes.includes(r.nome));
    if (estados.length) rows = rows.filter((r) => estados.includes(r.estado));
    if (periodos.length) rows = rows.filter((r) => periodos.includes(r.periodo));
    return json(res, 200, paginate(rows, url.searchParams));
  }

  // Inspection establishment options — distinct estabelecimentos present in inspections.
  if (url.pathname === '/inspections/establishments' && req.method === 'GET') {
    return json(res, 200, [...new Set(INSPECOES.map((r) => r.estabelecimento))].sort());
  }

  // Inspections — server-side multi-select filter (estabelecimento ∈ list AND resultado ∈ list).
  if (url.pathname === '/inspections' && req.method === 'GET') {
    const estabs = url.searchParams.getAll('estabelecimento');
    const resultados = url.searchParams.getAll('resultado');
    let rows = INSPECOES;
    if (estabs.length) rows = rows.filter((r) => estabs.includes(r.estabelecimento));
    if (resultados.length) rows = rows.filter((r) => resultados.includes(r.resultado));
    return json(res, 200, paginate(rows, url.searchParams));
  }

  return json(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Fake Demo API on http://localhost:${PORT}`);
  console.log(`  Swagger UI : http://localhost:${PORT}/`);
  console.log(`  OpenAPI    : http://localhost:${PORT}/api-docs`);
  console.log(`  Data       : http://localhost:${PORT}/establishments?page=1&pageSize=10`);
});
