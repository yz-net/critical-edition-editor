import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DataStoreConfig = {
  essays: Array<{
    slug: string;
    smallVideoPath: string;
    videoPath: string;
    posterPath: string;
    aviaryLink: string;
    hvtID: string;
    supertitle: string;
    title: string;
    author: string;
    affiliation: string;
    essayPath: string;
    publicationDate: string;
    id: string;
  }>;
  projectData: {
    title: string;
    subtitle: string;
    introCopy: string;
    homeLink: string;
    callToAction: boolean;
    impactImageCaption: string;
    organizationName: string;
    parentOrganizationName: string;
    parentOrganizationURL: string;
    showBylinesOnIndexPage: boolean;
    showSupertitlesOnIndexPage: boolean;
    textOnlyIndexPage: boolean;
    essayOrder: Array<string>;
  };
};

export type DataStoreEssays = Array<{
  meta: {
    slug: string;
    smallVideoPath: string;
    videoPath: string;
    posterPath: string;
    aviaryLink: string;
    supertitle: string;
    title: string;
    hvtID: string;
    author: string;
    affiliation: string;
    essayPath: string;
    publicationDate: string;
  };
  blocks: Array<{
    type: string;
    data: object;
  }>;
}>;

export type DataStore = {
  config: null | DataStoreConfig;
  essays: null | DataStoreEssays;
  setConfig: (config: null | DataStoreConfig) => void;
  setEssays: (essays: null | DataStoreEssays) => void;
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
