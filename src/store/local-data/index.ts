import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DataStore } from "~/types/store";

const useLocalDataStore = create<DataStore>()(
  persist(
    (set) => ({
      config: null,
      essays: null,
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
    { name: "local-data" },
  ),
);

export default useLocalDataStore;
