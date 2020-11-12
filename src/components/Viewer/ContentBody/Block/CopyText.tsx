import React from "react";
import styles from "./ControlButtons.module.css";
import { ReactComponent as CopyIcon } from "../../svg/copy_icon.svg";

type PermalinkProps = {
  text: string;
};
export default function CopyText(props: PermalinkProps) {
  return (
    <div>
      <button
        onClick={() => {
          const temp = document.createElement("div");
          temp.innerHTML = props.text;
          navigator.clipboard.writeText(temp.innerText);
          temp.remove();
        }}
        className={styles.ControlButton}
      >
        <CopyIcon />
      </button>
    </div>
  );
}
