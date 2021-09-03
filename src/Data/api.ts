import DocumentReader from "utils/DocumentReader/DocumentReader";
import { DataContextObject } from "./Context";
import { EssayDataEntry } from "./EssayData";
import { processProjectData } from "./ProjectData";

export function fetchProjectConfiguration(): Promise<DataContextObject> {
    return fetch("/data/config.json")
        .then((resp) => resp.json())
        .then((json) => {
            console.log("using API to fretch project configuration")
            const projectData = processProjectData(json["projectData"])
            const essays = json["essays"]
            return {
                projectData,
                essays
            }
        });
}

export function fetchEssay(essayMeta: EssayDataEntry): Promise<DocumentReader> {
    return fetch(essayMeta.essayPath)
        .then((content) => content.json())
        .then((essayContent) => {
            return new DocumentReader({ document: essayContent });
        })
}