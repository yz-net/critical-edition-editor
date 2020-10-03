import React from "react";
import {
  CriticalEditionDocumentBlock,
  FootnoteParagraphBlockData,
  ParagraphBlockData,
} from "../../../../CriticalEditionData";
import validBlockData from "../../../../CriticalEditionData/validators/validBlockData";
import htmlToText from "../../../../utils/htmlToText";
import { Footnote } from "../../Footnote";
import { Paragraph } from "../../Paragraph";
import styles from "./Block.module.css";
import PlayText from "./PlayText";

export default function Block(props: {
  blockData: CriticalEditionDocumentBlock;
}) {
  function Controls() {
    const html = (props.blockData.data as ParagraphBlockData).text;
    return <div>{html ? <PlayText text={htmlToText(html)} /> : null}</div>;
  }

  function WrapBlock(inner: JSX.Element) {
    return (
      <div tabIndex={0} className={styles.Block}>
        <div className={styles.ControlsWrapper}>
          <Controls />
        </div>
        <div className={styles.BlockWrapper}>{inner}</div>
      </div>
    );
  }

  try {
    validBlockData(props.blockData);
  } catch (e) {
    console.warn("Error validating block " + String(e), Block);
    return null;
  }
  if (props.blockData.type.toLocaleLowerCase().trim() === "paragraph") {
    return WrapBlock(
      <Paragraph data={props.blockData.data as ParagraphBlockData} />
    );
  }
  if (props.blockData.type.toLocaleLowerCase().trim() === "footnoteparagraph") {
    return WrapBlock(
      <Footnote data={props.blockData.data as FootnoteParagraphBlockData} />
    );
  }

  return <div>Block</div>;
}
