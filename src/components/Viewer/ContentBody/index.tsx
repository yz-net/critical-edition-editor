import React from "react";
import {
  CriticalEditionDocument,
  CriticalEditionDocumentBlock,
} from "../../../CriticalEditionData";
import validCriticalEditionDocumentData from "../../../CriticalEditionData/validators/validDocumentData";
import DebugLogger from "../../../utils/DebugLogger";
import Block from "./Block";
import styles from "./ContentBody.module.css";

const logger = new DebugLogger("ContentBody.index");

interface ContentBodyProps {
  documentData: CriticalEditionDocument;
  playBlock: (block: number) => void;
  stopPlaying: () => void;
  playing: boolean;
  playingBlock?: number;
  // offset: number;
}

export function ContentBody(props: ContentBodyProps): JSX.Element {
  try {
    validCriticalEditionDocumentData(props.documentData);
  } catch (e) {
    logger.error(e);
    return <div>Error loading data.</div>;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.ContentBody}>
        <article>
          {props.documentData.blocks.map(
            (blockData: CriticalEditionDocumentBlock, i) => {
              return (
                <Block
                  index={i + 1}
                  key={i}
                  playBlock={() => props.playBlock(i)}
                  stopPlaying={props.stopPlaying}
                  playing={props.playing}
                  blockData={blockData}
                  inFocus={i === props.playingBlock}
                />
              );
            }
          )}
        </article>
      </div>
    </div>
  );
}
