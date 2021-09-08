export interface ProjectDataObject {
  title?: string;
  subtitle?: string;
  introCopy?: string;
  homeLink?: string;
  callToAction?: boolean;
  impactImageCaption?: string;
  organizationName?: string;
  parentOrganizationName?: string;
  parentOrganizationURL?: string;
  textOnlyIndexPage?: boolean;
  showBylinesOnIndexPage?: boolean;
  showSupertitlesOnIndexPage?: boolean;
}

export interface CompleteProjectDataObject {
  title: string;
  subtitle: string;
  introCopy: string;
  homeLink: string;
  callToAction: boolean;
  impactImageCaption: string;
  organizationName: string;
  parentOrganizationName: string;
  parentOrganizationURL: string;
  textOnlyIndexPage: boolean;
  showBylinesOnIndexPage: boolean;
  showSupertitlesOnIndexPage: boolean;
}

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

// export const ProjectData: ProjectDataObject = {
//   title: "Critical Editions",
//   subtitle: "Holocaust Testimonies in Historical Context",
//   introCopy:
//     "The Critical Editions Series contextualizes Fortunoff Video testimonies in their historical time and place. Each testimony in the series was chosen by one of our visiting scholars. Each scholar then produced an introductory essay about the chosen testimony, along with an annotated transcript that provides additional insight and background information.",
//   homeLink: "https://fortunoff.library.yale.edu",
//   callToAction: true,
//   impactImageCaption: "Photo: Steven H. and Marion L. Holocaust testimony (HVT-544), recorded in 1985. "
// };
