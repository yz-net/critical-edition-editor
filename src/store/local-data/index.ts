import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Essay } from "~/types/essay";
import type { Config } from "~/types/config";
import type { CEDataStore } from "~/types/store";

const useLocalDataStore = create<CEDataStore>()(
  persist(
    (set) => ({
      config: null,
      essays: [],
      setConfig: (newConfig: Config) =>
        set((state) => ({
          ...state,
          config: newConfig,
        })),
      setEssays: (newEssays: Essay[]) =>
        set((state) => ({
          ...state,
          essays: newEssays,
        })),
    }),
    { name: "local-data" },
  ),
);

export default useLocalDataStore;
