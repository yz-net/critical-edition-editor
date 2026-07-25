import type { Config } from "~/types/config";
import type { Essay } from "~/types/essay";
import type { ContentBranch } from "~/types/store";

const CONTENT_RAW_BASE =
  "https://raw.githubusercontent.com/yale-fortunoff/critical-editions-content";

const rawUrl = (branch: ContentBranch, file: string) =>
  `${CONTENT_RAW_BASE}/${branch}/data/${file}`;

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url} — ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
};

/**
 * Reads the content repo's `/data` directory from raw.githubusercontent.com
 * rather than the GitHub REST API.
 *
 * The API's unauthenticated budget is 60 requests/hour/IP — shared across
 * everyone behind the same address — and listing `/data` spent one of those on
 * every page load. raw.githubusercontent.com costs nothing against that budget,
 * so the only thing needed is a way to name the files without a directory
 * listing: `config.json` already lists every essay, so the per-essay filenames
 * are derived from its `hvtID`s.
 *
 * The consequence is that `config.json` is the sole source of truth for which
 * essays exist — an `intro-hvt-*.json` in the repo but absent from `config.json`
 * is not loaded. Raw responses are CDN-cached for 5 minutes, so a fresh push to
 * the content repo can take that long to appear.
 */
export const fetchGitHubData = async (
  branch: ContentBranch = "staging",
): Promise<{ config: Config; essays: Essay[] }> => {
  const config = await fetchJson<Config>(rawUrl(branch, "config.json"));

  const essays = await Promise.all(
    config.essays.map((essay) =>
      fetchJson<Essay>(rawUrl(branch, `intro-hvt-${essay.hvtID}.json`)),
    ),
  );

  return { config, essays };
};
