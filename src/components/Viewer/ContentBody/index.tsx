import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CriticalEditionDocument,
  CriticalEditionDocumentBlock,
  FootnoteParagraphBlockData,
} from '../../../CriticalEditionData';
import validCriticalEditionDocumentData from '../../../CriticalEditionData/validators/validDocumentData';
import DebugLogger from '../../../utils/DebugLogger';
import scrollToElementByID from '../../../utils/scrollToElementByID';
import Block from './Block';
import styles from './ContentBody.module.css';

const logger = new DebugLogger('ContentBody.index');

interface ContentBodyProps {
  documentData: CriticalEditionDocument;
  playBlock: (block: number) => void;
  stopPlaying: () => void;
  playing: boolean;
  playingBlock?: number;
  // offset: number;
}

ContentBody.defaultProps = {
  playingBlock: 0,
};

export default function ContentBody(props: ContentBodyProps): JSX.Element {
  const location = useLocation();
  const hash = location.hash.replace('#', '');
  const { documentData } = props;
  useEffect(() => {
    // logger.log("ContentBody useEffect() calling scrollToElementByID");
    scrollToElementByID(hash);
  }, [hash, documentData]);

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
          {documentData.blocks.map(
            (
              blockData: CriticalEditionDocumentBlock,
              i,
              blocks: Array<CriticalEditionDocumentBlock>
            ) => {
              function getFootnoteBlock(
                index: number
              ): FootnoteParagraphBlockData | undefined {
                if (index < 0 && blocks.length <= index) {
                  return undefined;
                }
                const block: CriticalEditionDocumentBlock = blocks[index];
                if (!block || block.type !== 'footnoteParagraph')
                  return undefined;
                return block.data as FootnoteParagraphBlockData;
              }

              return (
                <Block
                  nextFootnoteBlock={getFootnoteBlock(i + 1)}
                  previousFootnoteBlock={getFootnoteBlock(i - 1)}
                  index={i + 1}
                  // eslint-disable-next-line react/no-array-index-key
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
