import { CriticalEditionDocument, CriticalEditionDocumentBlock, ParagraphBlockData } from "../../CriticalEditionData";
import { IDocumentPlayer, IDocumentPlayerProps } from "../DocumentPlayer/IDocumentPlayer";
import SpeechSynthesisDocumentPlayer from "../DocumentPlayer/SpeechSynthesisDocumentPlayer";
import htmlToText from "../htmlToText";

export default class Document {
    document: CriticalEditionDocument;
    // private _player: IDocumentPlayer;

    constructor(options: { document: CriticalEditionDocument }) {
        console.log("Setting internal _document to", options.document)
        this.document = options.document;
        // this._player = new SpeechSynthesisDocumentPlayer({ document: this });

        this.getBlock = this.getBlock.bind(this);
        this.getBlockText = this.getBlockText.bind(this);
    }

    // get player(): IDocumentPlayer {
    //     return this._player;
    // }

    // document(): CriticalEditionDocument {
    //     return this._document;
    // }

    // blocks(): Array<CriticalEditionDocumentBlock> {
    //     return this.document.blocks;
    // }

    expandFootnote(footnoteID: string) {

    }

    collapseFootnote(footnoteID: string) {

    }

    getBlock(blockIndex: number): CriticalEditionDocumentBlock {
        const blocks = this.document.blocks;
        try {
            return blocks[blockIndex];
        } catch (e) {
            throw Error(`Error fetching block ${blockIndex}: ${e}`);
        }
    }

    getBlockText(blockIndex: number): string {
        const block = this.getBlock(blockIndex);

        if (block.data && (block.data as ParagraphBlockData).text) {
            return htmlToText((block.data as ParagraphBlockData).text);
        }

        throw Error(`Error fetching block ${blockIndex} text`);
    }
}