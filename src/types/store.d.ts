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
