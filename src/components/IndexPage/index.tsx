import React from "react";
import { EssayDataEntry } from "../../EssayData";
import DebugLogger from "../../utils/DebugLogger";
import EssayIndexItem from "../EssayIndexItem";
import LogoBar from "../Viewer/LogoBar";
import ImpactHeader from "./ImpactHeader";
import styles from "./IndexPage.module.css";

export interface IndexPageProps {
  projectTitle: string;
  projectDescription: string;
  essays: { [essayID: string]: EssayDataEntry };
}

const logger = new DebugLogger("IndexPage: ");

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
  const { essays, projectDescription, projectTitle } = props;

  return (
    <div>
      <LogoBar />
      <ImpactHeader />
      <div className={styles.CenterColumn}>
        <IndexHeader title={projectTitle} description={projectDescription} />
        <div className={styles.ItemListContainer}>
          {Object.keys(essays).map((essayID: string, i: number) => {
            const essay: EssayDataEntry = essays[essayID];
            if (!essay) {
              logger.warn("bad essay id: " + essayID);
              return null;
            }
            return (
              <div className={styles.IndexItemContainer}>
                <EssayIndexItem essayID={essayID} key={i} essay={essay} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
