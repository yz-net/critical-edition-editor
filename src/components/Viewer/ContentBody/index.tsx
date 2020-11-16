import React from "react";
import {
  CriticalEditionDocument,
  CriticalEditionDocumentBlock,
  FootnoteParagraphBlockData,
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
            (
              blockData: CriticalEditionDocumentBlock,
              i,
              blocks: Array<CriticalEditionDocumentBlock>
            ) => {
              // const hasNextBlock = i + 1 < blocks.length;
              // let nextBlock: CriticalEditionDocumentBlock | undefined;
              // let nextBlockIsFootnote: boolean = false;
              // let nextFootnoteBlock: FootnoteParagraphBlockData | undefined;
              // if (hasNextBlock) {
              //   nextBlock = blocks[i + 1];
              //   nextBlockIsFootnote = nextBlock.type === "footnoteParagraph";
              //   if (nextBlockIsFootnote)
              //     nextFootnoteBlock = nextBlock.data as FootnoteParagraphBlockData;
              // }

              // let prevFootnoteBlock: FootnoteParagraphBlockData | undefined;
              const getFootnoteBlock = (
                index: number
              ): FootnoteParagraphBlockData | undefined => {
                if (index < 0 && blocks.length <= index) {
                  return;
                }
                const block: CriticalEditionDocumentBlock = blocks[index];
                if (!block || block.type !== "footnoteParagraph") return;
                return block.data as FootnoteParagraphBlockData;
              };

              return (
                <Block
                  nextFootnoteBlock={getFootnoteBlock(i + 1)}
                  previousFootnoteBlock={getFootnoteBlock(i - 1)}
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
