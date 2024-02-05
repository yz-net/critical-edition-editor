import LogoBar from "~/components/LogoBar";
import ImpactHeader from "~/components/ImpactHeader";

import config from "public/data/config.json" assert { type: "json" }

import styles from "./styles.module.scss"
import EssayIndexItem from "~/components/EasyIndexItem";


export default function HomePage() {
  return (
    <div>
      <LogoBar />
       <ImpactHeader
        caption="Photo: Steven H. and Marion L. Holocaust testimony (HVT-544), recorded in 1985."
        backgroundImageURL="/img/impact-header-background.jpg"
        title="Critical Editions"
        subtitle="Holocaust Testimonies in Historical Context"
      />
      <main className={styles.CenterColumn}>
        <div className={styles.IndexHeader}>
          <p className="sans-copy-ff">The Critical Editions Series contextualizes Fortunoff Video testimonies in their historical time and place. Each testimony in the series was chosen by one of our visiting scholars. Each scholar then produced an introductory essay about the chosen testimony, along with an annotated transcript that provides additional insight and background information.</p>
        </div>
        <nav aria-label="List of essays">
          <ul
            className={styles.ItemListContainer}
          >
            {config.essays.map((essay) => {
              // const essay: EssayDataEntry = essays[essayID];
              if (!essay) {
                // logger.warn("bad essay id: " + essayID);
                return null;
              }
              return (
                <li key={essay.id} className={styles.IndexItemContainer}>
                  <EssayIndexItem
                    showSupertitles={config.projectData.showSupertitlesOnIndexPage}
                    showBylines={config.projectData.showBylinesOnIndexPage}
                    textOnly={config.projectData.textOnlyIndexPage}
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
