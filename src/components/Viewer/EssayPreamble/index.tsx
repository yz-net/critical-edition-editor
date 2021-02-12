import React from "react";
import styles from "./EssayPreamble.module.css";
// import { ReactComponent as VideoIcon } from "../svg/video-icon.svg";
// import { ReactComponent as DocumentIcon } from "../svg/download_icon.svg";

export interface EssayPreambleProps {
  hvtID: string;
}
export default function EssayPreamble(props: EssayPreambleProps) {
  const { hvtID } = props;
  const pdfURL = `/pdf/critical-edition-hvt-${hvtID}.pdf`;
  const aviaryURL = `https://fortunoff.aviaryplatform.com/c/mssa.hvt.${hvtID}`;

  return (
    <div className={`sans-copy-ff ${styles.EssayPreamble}`}>
      <p>
        {`HVT-${props.hvtID}`} |{" "}
        <a className="teal-svg teal-font" href={aviaryURL}>
          View the annotated video testimony
        </a>{" "}
        or{" "}
        <a className="teal-svg teal-font" href={pdfURL}>
          download a PDF
        </a>{" "}
        of the critical edition.
      </p>
    </div>
  );
}
