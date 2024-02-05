import React from 'react';

import { EssayDataEntry } from '~/types/essayData';
import { CompleteProjectDataObject } from '~/types/projectData';
import { defaultProjectData } from '~/utils/projectData';

export interface DataContextObject {
  projectData: CompleteProjectDataObject;
  essays: Array<EssayDataEntry>;
}

export const DataContext = React.createContext<DataContextObject | null>(null);

export function defaultDataContext(): DataContextObject {
  return { projectData: defaultProjectData(), essays: [] };
}
