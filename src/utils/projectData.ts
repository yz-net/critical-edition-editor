import { CompleteProjectDataObject, ProjectDataObject } from "~/types/projectData";

export function processProjectData(
    projectData: ProjectDataObject
  ): CompleteProjectDataObject {
    return {
      organizationName: projectData.organizationName || '',
      homeLink: projectData.homeLink || '',
      title: projectData.title || '',
      subtitle: projectData.subtitle || '',
      introCopy: projectData.introCopy || '',
      impactImageCaption: projectData.impactImageCaption || '',
      showBylinesOnIndexPage: projectData.showBylinesOnIndexPage !== false,
      showSupertitlesOnIndexPage: projectData.showSupertitlesOnIndexPage === true,
      textOnlyIndexPage: !!projectData.textOnlyIndexPage,
      callToAction: projectData.callToAction === true,
      parentOrganizationName: projectData.parentOrganizationName || '',
      parentOrganizationURL: projectData.parentOrganizationURL || '',
    };
  }
  
  export function defaultProjectData(): CompleteProjectDataObject {
    return processProjectData({});
  }