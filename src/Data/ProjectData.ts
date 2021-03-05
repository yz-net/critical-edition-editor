
export interface ProjectDataObject {
  title: string,
  subtitle?: string,
  introCopy?: string,
  homeLink: string,
  callToAction: boolean,
}

export const ProjectData: ProjectDataObject = {
  title: "Critical Editions",
  subtitle: "Holocaust Testimonies in Historical Context",
  introCopy:
    "The Critical Editions Series contextualizes Fortunoff Video testimonies in their historical time and place. Each testimony in the series was chosen by one of our visiting scholars. Each scholar then produced an introductory essay about the chosen testimony, along with an annotated transcript that provides additional insight and background information.",
  homeLink: "https://fortunoff.library.yale.edu",
  callToAction: true
};

