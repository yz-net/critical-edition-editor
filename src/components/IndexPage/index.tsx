import React from "react";
import { EssayDataEntry } from "../../EssayData";
import DebugLogger from "../../utils/DebugLogger";
import EssayIndexItem from "../EssayIndexItem";
import styles from "./IndexPage.module.css";

export interface IndexPageProps {
  essays: { [essayID: string]: EssayDataEntry };
}

const logger = new DebugLogger("IndexPage: ");

export default function IndexPage(props: IndexPageProps) {
  const { essays } = props;

  return (
    <div className={styles.IndexPage}>
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
  );
}
