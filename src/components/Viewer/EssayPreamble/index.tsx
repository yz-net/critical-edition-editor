import React from "react";
import styles from "./EssayPreamble.module.css";
import { ReactComponent as VideoIcon } from "../svg/video-icon.svg";
import { ReactComponent as DocumentIcon } from "../svg/download_icon.svg";

export interface EssayPreambleProps {
  hvtID: string;
}
export default function EssayPreamble(props: EssayPreambleProps) {
  return (
    <div className={styles.EssayPreamble}>
      <p>
        <a className="teal-svg" href="https://google.com">
          <VideoIcon />
        </a>
        View the testimony with annotated transcript.
      </p>
      <p>
        <a href="https://google.com">
          <DocumentIcon className="teal-svg" />
        </a>
        Download critical edition as a PDF.
      </p>
    </div>
  );
}
