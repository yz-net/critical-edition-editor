export interface Config {
  essays: ConfigEssay[];
  projectData: ConfigProjectData;
}

export interface ConfigEssay {
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
}

export interface ConfigProjectData {
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
  essayOrder: string[];
}
