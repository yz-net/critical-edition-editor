import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Config } from "~/types/config";
import type { Essay } from "~/types/essay";

export type DataStore = {
  config: null | Config;
  essays: null | Array<Essay>;
  setConfig: (config: null | Config) => void;
  setEssays: (essays: null | Array<Essay>) => void;
};

const useDataStore = create<DataStore>()(
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
    { name: "data" },
  ),
);

export default useDataStore;
