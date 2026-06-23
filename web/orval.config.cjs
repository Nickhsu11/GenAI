// Mirrors the real Demo orval setup (react-query client, split mode).
// Reads the spec from the running fake backend's /api-docs endpoint, exactly
// like the real config reads from http://localhost:8083/api-docs.
// NOTE: the API must be running (`node api/server.mjs`) before `npm run api:gen`.
module.exports = {
  demo: {
    output: {
      mode: 'split',
      target: './src/api/generated/api.ts',
      schemas: './src/api/generated/model',
      client: 'react-query',
      clean: true,
      override: {
        mutator: {
          path: './src/api/mutator.ts',
          name: 'customInstance',
        },
      },
    },
    input: {
      target: 'http://localhost:8099/api-docs',
    },
  },
};
