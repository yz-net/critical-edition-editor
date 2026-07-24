# Date-stamp the Download button's zip filename

Status: resolved
Type: task

## Problem

The "Download" button saves the exported zip as `critical-edition-data.zip`
(hardcoded in `src/components/DownloadButton/index.tsx:34`). Successive
exports are indistinguishable on disk without opening them.

## Expected behavior

The downloaded file is named `critical-edition-data-YYYY-MM-DD.zip`, where
`YYYY-MM-DD` is the user's local date at the time of download
(e.g. `critical-edition-data-2026-07-24.zip`).

## Scope

- Only the `link.download` filename changes; the zip contents and the
  `data/` folder structure inside it stay the same.

## Answer

Implemented in `src/components/DownloadButton/index.tsx`: the filename is now
built from the user's local date via `new Date().toLocaleDateString("en-CA")`,
which formats as `YYYY-MM-DD`, giving `critical-edition-data-YYYY-MM-DD.zip`.
Typecheck passes for `src/` (pre-existing errors in the compiled `out/`
directory are unrelated).
