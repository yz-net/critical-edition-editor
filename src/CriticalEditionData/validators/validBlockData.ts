import { CriticalEditionDocumentBlock } from "..";
import DebugLogger from "../../utils/DebugLogger";
import ValidatorFunction from "./ValidatorFunction";
import validFootnoteParagraphBlockData from "./validFootnoteParagraphBlockData";
import validImageBlockData from "./validImageBlockData";
import validParagraphBlockData from "./validParagraphBlockData";

const logger = new DebugLogger("validBlockData").hush();

const validBlockData: ValidatorFunction<CriticalEditionDocumentBlock> = (data: any) => {
    logger.log("Validating block", data)

    if (!data) { throw new Error("No object provided") }
    // if (!data.type) { throw new Error("Missing required field: .type") }
    if (!(typeof data.type === "string")) { throw new Error("Block requires field .type of type String ") }
    if (!(typeof data.data === "object")) { throw new Error("Block requires field .data of type Object") }

    // validate the data
    if (data.type.toLowerCase().trim() === "paragraph") {
        validParagraphBlockData(data.data);
    }
    else if (data.type.toLowerCase().trim() === "footnoteparagraph") {
        validFootnoteParagraphBlockData(data.data);
    } else if (data.type.toLowerCase().trim() === "image") {
        validImageBlockData(data.data);
    }
    else {
        throw new Error("Unsupported block type: " + data.type);
    }

    return data as CriticalEditionDocumentBlock;

}

export default validBlockData;