import type { Config } from "./config";
import type { Essay } from "./essay";

export type CEDataStore = CEData & {
  setConfig: (config: Config) => void;
  setEssays: (essays: Essay[]) => void;
};

export type CEData = {
  config: Config | null;
  essays: Essay[];
};

/** Branch of the `critical-editions-content` repo the editor pulls from. */
export type ContentBranch = "staging" | "main";

export type CEGitDataStore = CEDataStore & {
  /** Branch the next fetch will pull from. */
  branch: ContentBranch;
  /** Branch the currently held data was pulled from, or null if never fetched. */
  fetchedBranch: ContentBranch | null;
  setBranch: (branch: ContentBranch) => void;
  setFetchedBranch: (branch: ContentBranch) => void;
};
