import React, { useRef } from 'react';
import { FootnoteParagraphBlockData } from '../../../../../CriticalEditionData';
// import DebugLogger from "../../../../../utils/DebugLogger";
import { jumpToNeighboringFootnote } from '../../../../../utils/scrollToElementByID';
import styles from './Footnote.module.css';
import { ReactComponent as RightArrow } from './right-arrow.svg';
import { ReactComponent as LeftArrow } from './left-arrow.svg';

// const logger = new DebugLogger("Footnote: ");

interface FootnoteProps {
  data: FootnoteParagraphBlockData;
  nextFootnoteBlock?: FootnoteParagraphBlockData;
  previousFootnoteBlock?: FootnoteParagraphBlockData;
}

Footnote.defaultProps = {
  nextFootnoteBlock: undefined,
  previousFootnoteBlock: undefined,
};

export default function Footnote(props: FootnoteProps) {
  const {
    previousFootnoteBlock,
    nextFootnoteBlock,
    data: { label, embedCode, id, text },
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const prevButton = previousFootnoteBlock ? (
    <button
      type="button"
      onClick={() => {
        if (previousFootnoteBlock) {
          jumpToNeighboringFootnote(previousFootnoteBlock.id, undefined);
        }
      }}
    >
      <LeftArrow />
    </button>
  ) : (
    <button type="button" aria-label="empty button" disabled />
  );

  const nextButton = nextFootnoteBlock ? (
    <button
      type="button"
      onClick={() => {
        if (props.nextFootnoteBlock) {
          jumpToNeighboringFootnote(props.nextFootnoteBlock.id, undefined);
        }
      }}
    >
      <RightArrow />
    </button>
  ) : (
    <button disabled aria-label="empty button" type="button" />
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
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: embedCode || '' }}
          />
          <div
            className={styles.TextContent}
            id={id}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: text }}
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
