import React from 'react';
// import styles from "./ControlButtons.module.css";
import { ReactComponent as FootnoteIcon } from '../../svg/footnote_icon.svg';
import scrollToElementByID from '../../../../utils/scrollToElementByID';
import ControlButton from '../../../common/ControlButton';

type PermalinkProps = {
  footnoteIDs: Array<string>;
  footnoteCount: number;
};
export default function OpenFootnote(props: PermalinkProps) {
  const { footnoteCount } = props;
  return (
    <ControlButton
      onClick={() => {
        scrollToElementByID(props.footnoteIDs[0]);
      }}
      icon={
        <div>
          <div>
            <FootnoteIcon />
          </div>
          <div>{footnoteCount}</div>
        </div>
      }
      label="Open footnotes"
    />

    // <button
    //   onClick={() => {
    //     scrollToElementByID(props.footnoteIDs[0]);
    //   }}
    //   className={styles.ControlButton}
    // >
    //   <FootnoteIcon />
    //   {/* <div>{props.footnoteIDs.length}</div> */}
    //   <div>{props.footnoteCount}</div>
    // </button>
  );
}
