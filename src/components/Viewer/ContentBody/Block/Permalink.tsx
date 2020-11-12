import React from "react";
import styles from "./ControlButtons.module.css";
import { ReactComponent as LinkIcon } from "../../svg/link_icon.svg";
// import { useLocation } from "react-router-dom";

type PermalinkProps = {
  blockID: string;
};
export default function Permalink(props: PermalinkProps) {
  const permalink: URL = new URL(window.location.toString());
  permalink.hash = props.blockID;

  return (
    <button
      onClick={() => {
        console.log(permalink.href);
        navigator.clipboard.writeText(permalink.href);
      }}
      className={styles.ControlButton}
    >
      <LinkIcon />
    </button>
  );
}
