
export interface CriticalEditionDocumentBlock {
    type: string;
    data: BlockData;
}

export interface BlockData {

}

export interface ParagraphBlockData extends BlockData {
    id?: string;
    text: string;
}

export interface FootnoteParagraphBlockData extends ParagraphBlockData {
    id: string;
    embedCode?: string;
}

export interface CriticalEditionDocument {
    version?: number;
    time?: number;
    blocks: Array<CriticalEditionDocumentBlock>;
}