
import { FootnoteParagraphBlockData } from "..";
import DebugLogger from "../../utils/DebugLogger";
import ValidatorFunction from "./ValidatorFunction";

const logger = new DebugLogger("validFootnoteParagraphBlockData").hush();
const validFootnoteParagraphBlockData: ValidatorFunction<FootnoteParagraphBlockData> = (data: any) => {

    logger.log("Validating footnote data ", data);
    if (data.embedCode && !(typeof data.embedCode === "string")) { throw new Error("FootnoteParagraphBlockData requires .embedCode to be undefined or String") }
    if (!data.id || !(typeof data.id === "string")) { throw new Error("FootnoteParagraphBlockData requires .id String") }
    if (!data.label || !(typeof data.label === "string")) { throw new Error("FootnoteParagraphBlockData requires .label String") }

    return data as FootnoteParagraphBlockData;

}

export default validFootnoteParagraphBlockData;
