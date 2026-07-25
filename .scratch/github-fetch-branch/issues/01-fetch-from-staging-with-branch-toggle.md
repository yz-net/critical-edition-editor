# GitHub fetch should default to 'staging' with a branch toggle in the UI

Status: ready-for-agent
Type: task

## Problem

`fetchGitHubData` (`src/utils/data.ts`) fetches `/data` from the
`yale-fortunoff/critical-editions-content` repo with `ref: "main"` hardcoded.
Editors work against the content repo's `staging` branch, so the fetch pulls
the wrong content by default and there is no way to switch.

## Expected behavior

- The fetch pulls from the `staging` branch of `critical-editions-content`
  by default.
- The UI offers a control to switch the branch between `staging` and `main`
  (exactly these two options, `staging` preselected).
- The selected branch applies to the GitHub fetch triggered from the
  `FetchGitHub` button (`src/components/FetchGitHub/index.tsx`).

## Implementation notes

- `fetchGitHubData` has two callers: the `FetchGitHub` button and an
  automatic fetch in `src/app/page.tsx:52`. Parameterize it as
  `fetchGitHubData(branch: "staging" | "main" = "staging")` so both callers
  get the new default; decide during implementation whether the page-level
  fetch should follow the UI selection too (it should if it feeds the same
  local-vs-remote comparison).
- Branch selection state likely belongs next to the existing local-data
  Zustand store (`~/store/local-data`) or as component state lifted to
  wherever `FetchGitHub` is rendered — pick whichever keeps the two call
  sites consistent.

## Scope

- Only the `ref` used for the content fetch and the new UI control change;
  parsing of `config.json` / `intro-hvt-*.json` files stays the same.
