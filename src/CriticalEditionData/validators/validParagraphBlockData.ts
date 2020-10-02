
import { ParagraphBlockData } from "..";
import ValidatorFunction from "./ValidatorFunction";

const validParagraphBlockData: ValidatorFunction<ParagraphBlockData> = (data: any) => {

    console.log("Validating paragraph", data)
    if (!data) { throw new Error("No block data received") }
    if (!(typeof data.text === "string")) { throw new Error("ParagraphBlock.data requires .text String") }

    return data as ParagraphBlockData;

}

export default validParagraphBlockData
