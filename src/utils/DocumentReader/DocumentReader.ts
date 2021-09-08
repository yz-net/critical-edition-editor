import { CriticalEditionDocument, CriticalEditionDocumentBlock, ParagraphBlockData } from "../../CriticalEditionData";
import DebugLogger from "../DebugLogger";
import htmlToText from "../htmlToText";

const logger = new DebugLogger("DocumentReader");

export default class DocumentReader {
    private _document: CriticalEditionDocument;

    constructor(options: { document: CriticalEditionDocument }) {
        logger.log("Setting internal _document to", options.document)
        this._document = options.document;

        this.getBlock = this.getBlock.bind(this);
        this.getBlockText = this.getBlockText.bind(this);
    }

    get document() { return this._document }

    // expandFootnote(footnoteID: string) {

    // }

    // collapseFootnote(footnoteID: string) {

    // }

    getBlock(blockIndex: number): CriticalEditionDocumentBlock {
        const { blocks } = this._document;
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