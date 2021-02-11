import { ParagraphBlockData } from "../../../../CriticalEditionData";
import styles from "./FootnoteCount.module.css";
import React from "react";
import getFootnotes from "../../../../utils/getFootnotes";
import { ReactComponent as FootnoteIcon } from "../../../../svg/footnote_icon.svg";

interface FootnoteCountProps {
  blockData: ParagraphBlockData;
}

const empty = (
  <div className={styles.FootnoteCount}>
    <div className={styles.IconContainer}></div>
  </div>
);

export default function FootnoteCount(props: FootnoteCountProps) {
  let count = 0;
  try {
    count = getFootnotes(props.blockData).length;
  } catch {
    return empty;
  }

  if (count < 1) {
    return empty;
  }

  return (
    <div className={`sans-copy-ff ${styles.FootnoteCount}`}>
      <div className={styles.IconContainer}>
        <FootnoteIcon />
      </div>
      <div className={styles.Label}>{count}</div>
    </div>
  );
}
