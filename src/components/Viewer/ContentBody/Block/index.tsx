import React, { useEffect, useRef } from "react";
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
  playBlock: () => void;
  stopPlaying: () => void;
  playing: boolean;
  inFocus: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("inFocus changed", props.inFocus);
    if (props.inFocus && ref.current) {
      console.log("infocus: Commence scroll");
      console.log(ref.current);
      ref.current.scrollIntoView({ behavior: "smooth" });
      ref.current.focus();
    }
  }, [props.inFocus]);

  function Controls() {
    const html = (props.blockData.data as ParagraphBlockData).text;
    return (
      <div>
        {html ? (
          <PlayText
            stopPlaying={props.stopPlaying}
            playing={props.playing}
            playBlock={props.playBlock}
            text={htmlToText(html)}
          />
        ) : null}
      </div>
    );
  }

  function WrapBlock(inner: JSX.Element) {
    return (
      <div
        ref={ref}
        tabIndex={0}
        className={`${styles.Block} ${props.inFocus ? styles.InFocus : null}`}
      >
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

  return null;
}
