import Link from "next/link";
import { FiPlus } from "react-icons/fi";

import LogoBar from "~/components/LogoBar";
import ImpactHeader from "~/components/ImpactHeader";
import EssayIndexItem from "~/components/EssayIndexItem";

import config from "public/data/config.json" assert { type: "json" };

import styles from "./styles.module.scss";

export default function HomePage() {
  return (
    <div className="serif-copy-ff">
      <LogoBar />
      <ImpactHeader
        caption="Photo: Steven H. and Marion L. Holocaust testimony (HVT-544), recorded in 1985."
        backgroundImageURL="/img/impact-header-background.jpg"
        title="Critical Editions Editor"
        subtitle="Create and change testimonies"
      />
      <main className={styles.CenterColumn}>
        <div className={styles.IndexHeader}>
          <p className="sans-copy-ff">{config.projectData.introCopy}</p>
        </div>
        <nav aria-label="List of essays">
          <ul className={styles.ItemListContainer}>
            <li className="h-[300px] max-w-[500px] flex-shrink-0 flex-grow basis-1/2 p-2.5 lg:h-auto">
              <Link
                className="flex h-full w-full items-center justify-center gap-3 rounded bg-blue-700 text-white transition-colors hover:bg-blue-500"
                href="/new"
              >
                <FiPlus size={30} strokeWidth={1.5} />
                <span className="text-3xl">Create new</span>
              </Link>
            </li>
            {config.essays.map((essay) => {
              // const essay: EssayDataEntry = essays[essayID];
              if (!essay) {
                // logger.warn("bad essay id: " + essayID);
                return null;
              }
              return (
                <li key={essay.id} className={styles.IndexItemContainer}>
                  <EssayIndexItem
                    showSupertitles={
                      config.projectData.showSupertitlesOnIndexPage
                    }
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
