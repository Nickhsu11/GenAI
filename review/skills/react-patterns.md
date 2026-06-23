# React Patterns — Canonical Rules (trimmed for demo)

## §1 Data fetching goes through generated hooks
- API calls MUST use the orval-generated hooks in `src/api/generated/` (e.g. `useListEstablishments`).
- Hand-written `fetch` / `axios` + `useEffect` + `useState` to load data that a generated
  hook already covers is a **🔴 Blocking** violation ("generated query hook reinvented by hand").

## §2 No manual loading/error plumbing
- Use the `isLoading` / `data` returned by the generated hook. Do not hand-roll loading flags
  for an endpoint that has a generated hook.
- On its own this is a **🟡 Minor** violation — it is almost always a symptom of §1 and
  disappears when §1 is fixed (per `severity/SKILL.md` §3, derivative violations).

## §3 Filtering, sorting and pagination are ALWAYS server-side — never on the client
> **🔴 STRONG RULE.** A list is narrowed by the **database / backend**, never by JavaScript.

- The frontend's only job is to collect filter values, send them as **query params** to the
  generated hook, and render exactly what the server returns.
- **Never** call `.filter()`, `.sort()`, or `.slice()` on a list/page response to narrow,
  reorder, or paginate it. Any such call on backend data is a **🔴 Blocking** violation.
- **Never** compute totals or page counts on the client from a filtered subset — the backend
  owns `total`.
- **Never** implement search-as-you-type that filters an already-fetched array. Send the
  search term to the backend and re-query.
- A filter input whose value never reaches a query param (so it doesn't actually change the
  request) is a **🔴 Blocking** violation — it lies to the user.
- When filters change, reset the paginator to the first page so it can't point past the new
  result set.
