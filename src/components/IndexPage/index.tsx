import { DataContext } from "Data/Context";
import React from "react";
// import DebugLogger from "../../utils/DebugLogger";
import EssayIndexItem from "../EssayIndexItem";
import LogoBar from "../Viewer/LogoBar";
import ImpactHeader from "./ImpactHeader";
import styles from "./IndexPage.module.css";

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

export default function IndexPage() {
  const context = React.useContext(DataContext);

  if (!context) {
    return <div>No Context passed to IndexPage</div>;
  }

  const { essays, projectData } = context;

  const backgroundImageURL = "/img/impact-header-background.jpg";

  document.title = `${projectData.title} ${
    projectData.organizationName ? " | " + projectData.organizationName : ""
  }`;

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
