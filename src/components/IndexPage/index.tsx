import React, { useEffect } from "react";
import { EssayDataEntry } from "../../Data/EssayData";
// import DebugLogger from "../../utils/DebugLogger";
import EssayIndexItem from "../EssayIndexItem";
import LogoBar from "../Viewer/LogoBar";
import ImpactHeader from "./ImpactHeader";
import styles from "./IndexPage.module.css";

export interface IndexPageProps {
  projectTitle: string;
  projectDescription: string;
  projectSubtitle: string;
  projectHomeURL: string;
  organizationName: string;
  backgroundImageURL: string;
  backgroundImageCaption: string;
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
  const {
    essays,
    backgroundImageURL,
    backgroundImageCaption,
    organizationName,
    projectDescription,
    projectTitle,
    projectSubtitle,
    projectHomeURL,
  } = props;

  useEffect(() => {
    document.title = `${projectTitle} ${
      organizationName ? " | " + organizationName : ""
    }`;
  }, [organizationName, projectTitle]);

  return (
    <div>
      <LogoBar
        appName={projectTitle}
        orgName={organizationName}
        homeLink={projectHomeURL}
      />
      <ImpactHeader
        caption={backgroundImageCaption}
        backgroundImageURL={backgroundImageURL}
        title={projectTitle}
        subtitle={projectSubtitle}
      />
      <main className={styles.CenterColumn}>
        <IndexHeader title={projectTitle} description={projectDescription} />
        <nav aria-label="List of essays">
          <ul className={styles.ItemListContainer}>
            {essays.map((essay, i: number) => {
              // const essay: EssayDataEntry = essays[essayID];
              if (!essay) {
                // logger.warn("bad essay id: " + essayID);
                return null;
              }
              return (
                <li key={i} className={styles.IndexItemContainer}>
                  <EssayIndexItem essay={essay} />
                </li>
              );
            })}
          </ul>
        </nav>
      </main>
    </div>
  );
}
