# GitHub fetch should default to 'staging' with a branch toggle in the UI

Status: resolved
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

## Answer

Implemented. `fetchGitHubData(branch: ContentBranch = "staging")` now passes
`branch` as the `ref`; both callers pass the selection.

Decisions made during implementation:

- **State lives on the git store** (`~/store/git`), not `local-data` — the
  branch describes where the *remote* mirror came from, and the store is
  already persisted, so the selection survives reloads and both call sites
  read the same value.
- **The page-level auto-fetch follows the selection**, as the ticket
  anticipated, since it feeds the same local-vs-remote comparison.
- **Cache invalidation** (not in the original ticket): `page.tsx` skipped
  fetching whenever `git-data` was already populated, so after a branch
  switch it would have kept serving the old branch's content on reload. The
  store now carries `fetchedBranch` (provenance) alongside `branch`
  (selection); the effect refetches when they diverge, and the
  `localStorage` cache path only reuses cached data when its `fetchedBranch`
  matches.
- **Switching the branch does not itself trigger a destructive pull.** The
  select only changes the selection; the `Fetch` button still gates the
  local-data-clobbering pull behind its confirm dialog (whose text now names
  the branch). The auto-fetch that follows a switch touches only the git
  mirror store, never local edits.

Files: `src/utils/data.ts`, `src/store/git/index.ts`, `src/types/store.d.ts`,
`src/components/BranchSelect/index.tsx` (new),
`src/components/FetchGitHub/index.tsx`, `src/app/page.tsx`.

- **The select needs its native appearance reset** to sit in the bottom
  button group. Left as a plain `<select>` it keeps its own border, font
  size, and height, so it renders taller than the buttons and breaks the
  `divide-x` group. It uses `appearance-none border-0 p-0 font-[inherit]
  text-base h-6 leading-6` plus an explicit `FiChevronDown`, which matches
  the buttons' `p-3` + 24px line box exactly.
- **The chevron must overlay the select, not sit beside it.** As a sibling
  inside the `<label>`, clicking it only *focuses* the select — browsers
  don't open a dropdown from a label click. It is `absolute` +
  `pointer-events-none` over the select's own `pr-5` padding, so clicks pass
  through to the select itself.
- **`bg-none` is required on the select.** This repo loads
  `@tailwindcss/forms`, which paints its own grey chevron on `select` as a
  `background-image`. `appearance-none` does not remove it and
  `bg-transparent` only sets background-*color*, so it rendered as a second
  arrow beside the `FiChevronDown`. Confirmed via computed style:
  `background-image` was the plugin's `stroke='%236b7280'` data URI.
- **The select is stretched over the whole control, not laid out inline.**
  Inline, it only covered its own 72×24 text box while the button reads as
  48px tall, so the padding and the branch icon were dead to the click that
  opens the dropdown. It is now `absolute inset-0 h-full w-full opacity-0`
  above an `aria-hidden` visual row (icon + branch name + chevron), which
  also retires the `appearance-none` / `bg-none` juggling. Focus is shown
  with `focus-within` on the wrapper, and the select carries
  `aria-label="Content branch"`.
- **The bottom bar overlapped the hero tagline below 500px viewport height.**
  `ImpactHeader` switches to `calc(100vh - 60px)` there, running the header
  to the foot of the viewport and putting the tagline 20px *into* the button
  row. `.TextArea` now gets `padding-bottom: 80px` at that breakpoint.
  Note the override **must** sit after the base `.TextArea` rule in the
  file — a media query adds no specificity, so the first attempt (placed in
  the existing max-height block near the top) was silently overridden by the
  later `padding-bottom: 38px`. Measured across viewports: the gap goes from
  `-20px` (overlapping) to `+22px` at 480, 450, 420, and 380px heights.

Verified with `npx tsc --noEmit`, `npm run lint` (no new warnings), and
`npm run build` — all pass. Also rendered in a headless browser against the
dev server: the group is flush with the Import/Download group, `staging` is
preselected, and the auto-fetch pulls staging content on load.
