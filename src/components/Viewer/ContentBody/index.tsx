import React from "react";
import {
  CriticalEditionDocument,
  CriticalEditionDocumentBlock,
} from "../../../CriticalEditionData";
import validCriticalEditionDocumentData from "../../../CriticalEditionData/validators/validDocumentData";
import Block from "./Block";
import styles from "./ContentBody.module.css";

interface ContentBodyProps {
  documentData: CriticalEditionDocument;
  playBlock: (block: number) => void;
  stopPlaying: () => void;
  playing: boolean;
  playingBlock?: number;
}
export function ContentBody(props: ContentBodyProps): JSX.Element {
  try {
    validCriticalEditionDocumentData(props.documentData);
  } catch (e) {
    console.error(e);
    return <div>Error loading data.</div>;
  }
  // console.log("document blocks", props.edition.blocks);
  console.log("playBlock", props.playBlock);
  return (
    <div className={styles.Container}>
      <div className={styles.ContentBody}>
        <article>
          {props.documentData.blocks.map(
            (blockData: CriticalEditionDocumentBlock, i) => {
              return (
                <Block
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
