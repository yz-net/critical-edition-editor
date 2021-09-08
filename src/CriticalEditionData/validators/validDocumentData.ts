import { CriticalEditionDocument } from "..";
import DebugLogger from "../../utils/DebugLogger";
import ValidatorFunction from "./ValidatorFunction";
import validBlockData from "./validBlockData";

const logger = new DebugLogger("validCriticalEditionDocumentData").hush();

const validCriticalEditionDocumentData: ValidatorFunction<CriticalEditionDocument> = (data: any) => {
    logger.log("Validating document data", data)
    if (!data) { throw new Error("No object provided") }
    if (!data.blocks) {
        throw new Error("Missing required field: .blocks")
    }

    // 1. Should this validate all of the blocks, or should it be up 
    // to the consumer of the blocks to validate them? For now it's
    // not really an issue interms of performance, so I'll leave it
    // more comprehensive of a test.
    // 2. Should this remove invalid blocks? For now I'll just warn.
    for (let i = 0; i < data.blocks.length; i += 1) {
        try {
            validBlockData(data.blocks[i]);
        } catch (e) {
            logger.warn("Invalid block", data.blocks[i])
        }
    }
    return data as CriticalEditionDocument;

}

export default validCriticalEditionDocumentData;
