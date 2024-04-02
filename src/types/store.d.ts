export type DataStore = {
  config: null | Config;
  essays: null | Array<Essay>;
  setConfig: (config: null | Config) => void;
  setEssays: (essays: null | Array<Essay>) => void;
};
