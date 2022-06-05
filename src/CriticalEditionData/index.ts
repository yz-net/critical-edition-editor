export interface CriticalEditionDocumentBlock {
  type: string;
  data: BlockData;
}

export interface BlockData {}

export interface HeaderBlockData {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ParagraphBlockData extends BlockData {
  paragraphType: 'blockquote' | 'paragraph' | 'embed';
  id?: string;
  text: string;
}

export interface FootnoteParagraphBlockData extends ParagraphBlockData {
  id: string;
  embedCode?: string;
  label: string;
}

export interface ImageBlockData extends InlineEmbedBlockData {
  src: string;
  srcset?: string;
  sizes?: string;
}

export interface AviaryVideoBlockData extends InlineEmbedBlockData {
  ead_id: string;
  tape: string;
  start_time: number;
  end_time: number;
}

export interface InlineEmbedBlockData extends BlockData {
  caption?: string;
}

export interface CriticalEditionDocument {
  version?: number;
  time?: number;
  blocks: Array<CriticalEditionDocumentBlock>;
}
