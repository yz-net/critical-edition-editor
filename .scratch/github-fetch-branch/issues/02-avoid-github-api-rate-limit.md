# Content fetch exhausts the unauthenticated GitHub API rate limit

Status: resolved
Type: task

## Problem

Editors hit GitHub API rate limiting when loading the editor.

`fetchGitHubData` listed the content repo's `/data` directory via
`octokit.rest.repos.getContent`. Unauthenticated GitHub allows **60 requests
per hour per IP**, shared by everyone behind the same address, and that
listing spent one on every page load — including every dev-server reload.

The per-file fetches were never the problem: `download_url` points at
`raw.githubusercontent.com`, which is a CDN and does not draw on the API
budget. The directory listing was the entire API cost, so batching the file
requests would have saved nothing.

## Answer

Implemented. `fetchGitHubData` no longer calls the GitHub REST API at all.
It reads `config.json` from `raw.githubusercontent.com` and derives each
essay's filename from the `hvtID`s that `config.json` already lists, so no
directory listing is needed. **Zero API requests**, so no rate limit applies.

Verified against the live repo before implementing:

- `raw.githubusercontent.com/.../staging/data/config.json` → `200`, with
  `access-control-allow-origin: *` (browser-fetchable) and
  `cache-control: max-age=300`.
- `config.json` lists 16 essays; the derived `intro-hvt-<hvtID>.json` names
  resolve `200`.

### Tradeoffs accepted

- **`config.json` is now the sole source of truth for which essays exist.**
  The old code globbed any `/data` file matching `intro-hvt`; a file present
  in the repo but missing from `config.json` is no longer loaded. The two
  agree for all 16 current essays, and the index renders from
  `config.essays`/`essayOrder` anyway.
- **Raw responses are CDN-cached for 5 minutes**, so a fresh push to the
  content repo can take that long to appear in the editor.

### Alternatives rejected

- **Zipball in a single request** (JSZip is already a dependency):
  `codeload.github.com` sends `access-control-allow-origin:
  https://render.githubusercontent.com` only, so browser fetch is blocked.
- **GraphQL with aliased blobs** — genuinely one request for all files, but
  GitHub's GraphQL API requires authentication.
- **A personal access token** — raises the budget to 5,000/hour, but this is
  a static client-side app served from S3, so the token would ship to every
  browser. Not worth it when raw is free.

### Also fixed

`fetchGitHubData` used to swallow every failure — it `alert()`ed and returned
an empty default config, which `page.tsx` then persisted as though the fetch
had succeeded. A rate-limit hit therefore looked like "the content vanished"
rather than an error. It now throws, callers show an error toast, and the git
store is left untouched on failure. The auto-fetch in `page.tsx` no longer
rethrows from its catch (nothing awaits it, so that only ever produced an
unhandled rejection).

`@octokit/rest` was the only consumer of the API and is removed as a
dependency — the home route's bundle drops from 70.6 kB to 53.7 kB.

### Follow-ups from review of this change

- **No full-screen spinner on a branch switch.** The refetch is now fast
  enough that the `bg-black/75` overlay read as a whole-screen flash. It is
  gated on `isInitialLoad` — a background refresh with content already on
  screen no longer blacks the page out. The `Fetch` button keeps its
  overlay: that pull is user-initiated and destroys local changes.

Files: `src/utils/data.ts`, `src/app/page.tsx`, `package.json`.

Verified with `npx tsc --noEmit`, `npm run lint` (no new warnings), and
`npm run build` — all pass. Driven in a headless browser: switching to `main`
loads content with zero appearances of the loading overlay, and the page
still renders while this IP's GitHub API quota is exhausted, which confirms
the API dependency is gone.
