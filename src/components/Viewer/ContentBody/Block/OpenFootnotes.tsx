import React from "react";
import styles from "./ControlButtons.module.css";
import { ReactComponent as FootnoteIcon } from "../../svg/footnote_icon.svg";
import scrollToElementByID from "../../../../utils/scrollToElementByID";

type PermalinkProps = {
  footnoteIDs: Array<string>;
  footnoteCount: number;
};
export default function OpenFootnote(props: PermalinkProps) {
  return (
    <button
      onClick={() => {
        scrollToElementByID(props.footnoteIDs[0]);
      }}
      className={styles.ControlButton}
    >
      <FootnoteIcon />
      {/* <div>{props.footnoteIDs.length}</div> */}
      <div>{props.footnoteCount}</div>
    </button>
  );
}
