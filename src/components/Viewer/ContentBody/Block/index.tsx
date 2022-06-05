import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AviaryVideoBlockData,
  CriticalEditionDocumentBlock,
  FootnoteParagraphBlockData,
  HeaderBlockData,
  ImageBlockData,
  ParagraphBlockData,
} from '../../../../CriticalEditionData';
import validBlockData from '../../../../CriticalEditionData/validators/validBlockData';
import DebugLogger from '../../../../utils/DebugLogger';
// import getFootnotes from "../../../../utils/getFootnotes";
// import htmlToText from "../../../../utils/htmlToText";
import Footnote from './Footnote';
import Paragraph from './Paragraph';
import { Image } from './Image';
import styles from './Block.module.css';
// import CopyText from "./CopyText";
// import OpenFootnote from "./OpenFootnotes";
// import Permalink from "./Permalink";
// import PlayText from "./PlayText";
import FootnoteCount from './FootnoteCount';
import { AviaryVideoBlock } from './AviaryVideoBlock';
// import scrollToElementByID from '../../../../utils/scrollToElementByID';

const logger = new DebugLogger('Block: ');

Block.defaultProps = {
  nextFootnoteBlock: undefined,
  previousFootnoteBlock: undefined,
  inFocus: false,
};

export default function Block(props: {
  index: number;
  blockData: CriticalEditionDocumentBlock;
  inFocus?: boolean;
  nextFootnoteBlock?: FootnoteParagraphBlockData;
  previousFootnoteBlock?: FootnoteParagraphBlockData;
}) {
  const {
    index,
    blockData: { data, type: blockType },
    inFocus,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const blockID = `${(data as FootnoteParagraphBlockData).id || `p-${index}`}`;

  // const footnotes = getFootnotes(props.blockData.data as ParagraphBlockData);

  // TODO -- is this effect redundant?
  // useEffect(() => {
  //   if (inFocus && ref.current) {
  //     // ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  //     // ref.current.focus();
  //     // scrollToElementByID(blockID);
  //   }
  // }, [blockID, inFocus]);

  function WrapBlock(inner: JSX.Element) {
    const location = useLocation();
    const hash = location.hash.replace('#', '');
    const hide =
      props.blockData.type === 'footnoteParagraph' && hash !== blockID;

    return (
      <div
        id={blockID}
        ref={ref}
        // tabIndex={0}
        data-blocktype={props.blockData.type}
        className={`Block ${hide ? 'hidden' : ''} blocktype-${
          props.blockData.type
        } ${styles.Block} ${inFocus ? styles.InFocus : ''}`}
      >
        <div className={styles.LeftMargin}>
          <FootnoteCount
            blockData={props.blockData.data as ParagraphBlockData}
          />
        </div>
        {/* <div className={styles.ControlsWrapper}>
          <div className={styles.ControlsFrame}>
            <Controls />
          </div>
        </div> */}
        {hide ? null : <div className={styles.BlockWrapper}>{inner}</div>}
        <div className={styles.RightMargin} />
      </div>
    );
  }

  const cleanBlockType = blockType.toLowerCase().trim()
  if (cleanBlockType == 'delimiter') {
    return (
      <div className={styles.Delimiter}>
        <div className={styles.DelimiterInner}>***</div>
      </div>
    );
  }

  if (cleanBlockType === 'header') {
    const headerData = props.blockData.data as HeaderBlockData;
    const inner = React.createElement(
      `h${headerData.level}`,
      {},
      `${headerData.text}`
    );
    return WrapBlock(<div className={styles.Header}>{inner}</div>);
  }

  try {
    validBlockData(props.blockData);
  } catch (e) {
    logger.warn(`Error validating block ${String(e)}`, Block);
    return null;
  }

  if (cleanBlockType == 'paragraph') {
    return WrapBlock(
      <Paragraph data={props.blockData.data as ParagraphBlockData} />
    );
  }
  if (cleanBlockType === 'footnoteparagraph') {
    return WrapBlock(
      <Footnote
        nextFootnoteBlock={props.nextFootnoteBlock}
        previousFootnoteBlock={props.previousFootnoteBlock}
        data={props.blockData.data as FootnoteParagraphBlockData}
      />
    );
  }
  if (cleanBlockType == 'image') {
    return WrapBlock(<Image data={props.blockData.data as ImageBlockData} />);
  }
  if (cleanBlockType == 'aviary') {
    logger.log("Wrapping aviary video block")
    return WrapBlock(<AviaryVideoBlock data={props.blockData.data as AviaryVideoBlockData} />);
  }

  return null;
}
