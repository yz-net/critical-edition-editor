import React from "react";
import { EssayDataEntry } from "./EssayData";
import { CompleteProjectDataObject, defaultProjectData } from "./ProjectData";

export interface DataContextObject {
    projectData: CompleteProjectDataObject,
    essays: Array<EssayDataEntry>
}

export const DataContext = React.createContext<DataContextObject | null>(null);
export function defaultDataContext(): DataContextObject {
    return { projectData: defaultProjectData(), essays: [] }
}