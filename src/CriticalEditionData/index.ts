
export interface CriticalEditionDocumentBlock {
    type: string;
    data: BlockData;
}

export interface BlockData {

}

export interface HeaderBlockData {
    text: string
    level: 1 | 2 | 3 | 4 | 5 | 6

}

export interface ParagraphBlockData extends BlockData {
    paragraphType: "blockquote" | "paragraph"
    id?: string;
    text: string;
}

export interface FootnoteParagraphBlockData extends ParagraphBlockData {
    id: string;
    embedCode?: string;
    label: string;
}

export interface CriticalEditionDocument {
    version?: number;
    time?: number;
    blocks: Array<CriticalEditionDocumentBlock>;
}