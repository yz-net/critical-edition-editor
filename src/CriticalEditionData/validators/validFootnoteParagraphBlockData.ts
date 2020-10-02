
import { FootnoteParagraphBlockData } from "..";
import ValidatorFunction from "./ValidatorFunction";

const validFootnoteParagraphBlockData: ValidatorFunction<FootnoteParagraphBlockData> = (data: any) => {

    console.log("Validating footnote data ", data);
    if (data.embedCode && !(typeof data.embedCode === "string")) { throw new Error("FootnoteParagraphBlockData requires .embedCode to be undefined or String") }
    if (!data.id || !(typeof data.id === "string")) { throw new Error("FootnoteParagraphBlockData requires .id String") }

    return data as FootnoteParagraphBlockData;

}

export default validFootnoteParagraphBlockData;
