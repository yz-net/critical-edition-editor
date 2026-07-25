import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CEGitDataStore } from "~/types/store";

const useGitDataStore = create<CEGitDataStore>()(
  persist(
    (set) => ({
      config: null,
      essays: [],
      branch: "staging",
      fetchedBranch: null,
      setConfig: (newConfig) =>
        set((state) => ({
          ...state,
          config: newConfig,
        })),
      setEssays: (newEssays) =>
        set((state) => ({
          ...state,
          essays: newEssays,
        })),
      setBranch: (newBranch) =>
        set((state) => ({
          ...state,
          branch: newBranch,
        })),
      setFetchedBranch: (newBranch) =>
        set((state) => ({
          ...state,
          fetchedBranch: newBranch,
        })),
    }),
    { name: "git-data" },
  ),
);

export default useGitDataStore;
