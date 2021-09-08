import React, { useRef } from "react";
import { FootnoteParagraphBlockData } from "../../../../../CriticalEditionData";
// import DebugLogger from "../../../../../utils/DebugLogger";
import scrollToElementByID from "../../../../../utils/scrollToElementByID";
import styles from "./Footnote.module.css";
import { ReactComponent as RightArrow } from "./right-arrow.svg";
import { ReactComponent as LeftArrow } from "./left-arrow.svg";

// const logger = new DebugLogger("Footnote: ");

interface FootnoteProps {
  data: FootnoteParagraphBlockData;
  nextFootnoteBlock?: FootnoteParagraphBlockData;
  previousFootnoteBlock?: FootnoteParagraphBlockData;
}

export function Footnote(props: FootnoteProps) {
  const {label} = props.data;

  const ref = useRef<HTMLDivElement>(null);

  const prevButton = props.previousFootnoteBlock ? (
    <button
      onClick={() => {
        if (props.previousFootnoteBlock) {
          scrollToElementByID(props.previousFootnoteBlock.id, undefined, {
            behavior: "auto",
          });
        }
      }}
    >
      <LeftArrow />
    </button>
  ) : (
    <button disabled />
  );

  const nextButton = props.nextFootnoteBlock ? (
    <button
      onClick={() => {
        if (props.nextFootnoteBlock) {
          scrollToElementByID(props.nextFootnoteBlock.id, undefined, {
            behavior: "auto",
          });
        }
      }}
    >
      <RightArrow />
    </button>
  ) : (
    <button disabled />
  );
  return (
    <div className={`sans-copy-ff ${styles.Footnote}`}>
      <div ref={ref} className={styles.FootnoteTextGroup}>
        <div>
          <div className={styles.FootnoteLabel}>{label}</div>
        </div>
        <div className={styles.FootnoteText}>
          <div
            className={styles.EmbedCode}
            dangerouslySetInnerHTML={{ __html: props.data.embedCode || "" }}
           />
          <div
            className={styles.TextContent}
            id={props.data.id}
            dangerouslySetInnerHTML={{ __html: props.data.text }}
           />
        </div>
        <div className={styles.NavButtonTray}>
          {prevButton}
          {nextButton}
        </div>
      </div>
    </div>
  );
}
