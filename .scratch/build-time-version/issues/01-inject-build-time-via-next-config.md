# Inject build version at build time instead of tracking timestamp.json

Status: resolved
Type: task

## Problem

The version shown by `VersionButton` comes from `src/configs/timestamp.json`,
which `prebuild` (`scripts/generate-timestamp.js`) rewrites on every
`npm run build`. Because the file is tracked, every build dirties the working
tree and produces recurring "timestamp" cleanup commits. A commit-based
timestamp (e.g. via pre-commit hook) was considered and rejected: the browser
runs a *build* artifact, so a commit stamp diverges from what is actually
deployed in both directions.

## Expected behavior

- The build time is injected at build time through `next.config.js`
  (`env.NEXT_PUBLIC_BUILD_TIME = new Date().toISOString()`), inlined into the
  static export.
- The short git commit hash is injected alongside it
  (`NEXT_PUBLIC_COMMIT_HASH`) and shown in the version alert, so a bug report
  can name the exact commit that is running.
- `VersionButton` reads both from `process.env` and keeps the current
  human-readable date formatting.
- `src/configs/timestamp.json`, `scripts/generate-timestamp.js`, and the
  timestamp step in the `prebuild` script are removed (the `rimraf out` step
  stays).

## Scope

- No change to what the user sees except the added commit hash line.
- `next dev` gets a fresh value at server start; that is acceptable.

## Answer

Implemented:

- `next.config.js` sets `env.NEXT_PUBLIC_BUILD_TIME` (ISO timestamp at build)
  and `env.NEXT_PUBLIC_COMMIT_HASH` (`git rev-parse --short HEAD`, falling
  back to "unknown" outside a git checkout).
- `VersionButton` formats `NEXT_PUBLIC_BUILD_TIME` as before and appends a
  "Commit: <hash>" line, guarding against the env vars being absent.
- Deleted `src/configs/timestamp.json` and `scripts/generate-timestamp.js`;
  `prebuild` is now just `rimraf -rf out`.
- Verified with `npm run build`: the exported page chunk contains the literal
  build timestamp and commit hash inlined next to the "Build version" alert.
