import { DataContext } from 'Data/Context';
import React from 'react';
// import DebugLogger from "../../utils/DebugLogger";
import { Helmet } from 'react-helmet';
import EssayIndexItem from '../EssayIndexItem';
import LogoBar from '../Viewer/LogoBar';
import ImpactHeader from './ImpactHeader';
import styles from './IndexPage.module.css';

// const logger = new DebugLogger("IndexPage: ");

interface IndexHeaderProps {
  description: string;
}

function IndexHeader(props: IndexHeaderProps) {
  const { description } = props;
  return (
    <div className={styles.IndexHeader}>
      <p className="sans-copy-ff">{description}</p>
    </div>
  );
}

export default function IndexPage() {
  const context = React.useContext(DataContext);

  if (!context) {
    return <div>No Context passed to IndexPage</div>;
  }

  const { essays, projectData } = context;
  const { title: projectTitle } = projectData;

  const backgroundImageURL = '/img/impact-header-background.jpg';

  const pageTitle = `${projectTitle} ${
    projectData.organizationName ? ` | ${projectData.organizationName}` : ''
  }`;

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <LogoBar />
      <ImpactHeader
        caption={projectData.impactImageCaption}
        backgroundImageURL={backgroundImageURL}
        title={projectData.title}
        subtitle={projectData.subtitle}
      />
      <main className={styles.CenterColumn}>
        <IndexHeader description={projectData.introCopy} />
        <nav aria-label="List of essays">
          <ul
            className={`${styles.ItemListContainer} ${
              projectData.textOnlyIndexPage ? styles.TextOnly : null
            }`}
          >
            {essays.map((essay) => {
              // const essay: EssayDataEntry = essays[essayID];
              if (!essay) {
                // logger.warn("bad essay id: " + essayID);
                return null;
              }
              return (
                <li key={essay.id} className={styles.IndexItemContainer}>
                  <EssayIndexItem
                    showSupertitles={projectData.showSupertitlesOnIndexPage}
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
