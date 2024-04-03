import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CEDataStore } from "~/types/store";

const useGitDataStore = create<CEDataStore>()(
  persist(
    (set) => ({
      config: null,
      essays: [],
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
    }),
    { name: "git-data" },
  ),
);

export default useGitDataStore;
