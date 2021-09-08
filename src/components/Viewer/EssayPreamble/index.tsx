import React from 'react';
import styles from './EssayPreamble.module.css';
// import { ReactComponent as VideoIcon } from "../svg/video-icon.svg";
// import { ReactComponent as DocumentIcon } from "../svg/download_icon.svg";

export interface EssayPreambleProps {
  hvtID?: string;
  aviaryLink?: string;
}
export default function EssayPreamble(props: EssayPreambleProps) {
  const { hvtID, aviaryLink } = props;

  if (!hvtID) {
    return null;
  }

  const pdfURL = `https://d12q9fe14kxf9b.cloudfront.net/pdf/critical-edition-hvt-${hvtID}.pdf`;
  const aviaryURL =
    aviaryLink || `https://fortunoff.aviaryplatform.com/c/mssa.hvt.${hvtID}`;

  return (
    <div className={`sans-copy-ff ${styles.EssayPreamble}`}>
      <p>
        {`HVT-${hvtID}`} |{' '}
        <a className="teal-svg teal-font" href={aviaryURL}>
          Watch the annotated video testimony
        </a>{' '}
        or{' '}
        <a className="teal-svg teal-font" href={pdfURL}>
          download a PDF
        </a>{' '}
        of the critical edition.
      </p>
    </div>
  );
}
