export interface Essay {
  meta: EssayMeta;
  blocks: EssayBlock[];
}

export interface EssayMeta {
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
  id: string;
}

export interface EssayBlock {
  type: string;
  data: Record<string, string | number>;
}
