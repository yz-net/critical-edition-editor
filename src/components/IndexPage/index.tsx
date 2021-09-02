import { CompleteProjectDataObject } from "Data/ProjectData";
import React, { useEffect } from "react";
import { EssayDataEntry } from "../../Data/EssayData";
// import DebugLogger from "../../utils/DebugLogger";
import EssayIndexItem from "../EssayIndexItem";
import LogoBar from "../Viewer/LogoBar";
import ImpactHeader from "./ImpactHeader";
import styles from "./IndexPage.module.css";

export interface IndexPageProps {
  projectData: CompleteProjectDataObject;
  essays: Array<EssayDataEntry>;
}

// const logger = new DebugLogger("IndexPage: ");

interface IndexHeaderProps {
  title: string;
  description: string;
}

function IndexHeader(props: IndexHeaderProps) {
  const { description } = props;
  return (
    <div className={styles.IndexHeader}>
      {/* <h1 className={`teal-font ${styles.Title}`}>{title}</h1> */}
      <p className={`sans-copy-ff`}>{description}</p>
    </div>
  );
}

export default function IndexPage(props: IndexPageProps) {
  const { projectData, essays } = props;

  // const organizationName = projectData.organizationName || "";
  // const projectTitle = projectData.title || "";
  // const projectSubtitle = projectData.subtitle || "";
  // const projectDescription = projectData.introCopy || "";
  // const backgroundImageCaption = projectData.impactImageCaption || "";
  // const showBylines =
  //   projectData.showBylinesOnIndexPage === false ? false : true;
  // const showSupertitles =
  //   projectData.showSupertitlesOnIndexPage === true ? true : false;

  // const projectHomeURL =
  //   projectData.homeLink || "https://github.com/yale-fortunoff";
  const backgroundImageURL = "/img/impact-header-background.jpg";
  // const textOnly = projectData.textOnlyIndexPage ? true : false;

  useEffect(() => {
    document.title = `${projectData.title} ${
      projectData.organizationName ? " | " + projectData.organizationName : ""
    }`;
  }, [projectData]);

  return (
    <div>
      <LogoBar
        appName={projectData.title}
        orgName={projectData.organizationName}
        homeLink={projectData.homeLink}
      />
      <ImpactHeader
        caption={projectData.impactImageCaption}
        backgroundImageURL={backgroundImageURL}
        title={projectData.title}
        subtitle={projectData.subtitle}
      />
      <main className={styles.CenterColumn}>
        <IndexHeader
          title={projectData.title}
          description={projectData.introCopy}
        />
        <nav aria-label="List of essays">
          <ul
            className={`${styles.ItemListContainer} ${
              projectData.textOnlyIndexPage ? styles.TextOnly : null
            }`}
          >
            {essays.map((essay, i: number) => {
              // const essay: EssayDataEntry = essays[essayID];
              if (!essay) {
                // logger.warn("bad essay id: " + essayID);
                return null;
              }
              return (
                <li key={i} className={styles.IndexItemContainer}>
                  <EssayIndexItem
                    showSupertitles={projectData.showBylinesOnIndexPage}
                    showBylines={projectData.showBylinesOnIndexPage}
                    textOnly={projectData.textOnlyIndexPage}
                    essay={essay}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      </main>
    </div>
  );
}
