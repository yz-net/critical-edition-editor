import React from "react";
import { EssayDataEntry } from "../../../EssayData";
import styles from "./CallToAction.module.css";
import { ReactComponent as PlayCircle } from "../../../svg/circle_play.svg";
export interface CallToActionProps {
  essay: EssayDataEntry;
  posterURL: string;
}
export default function CallToAction(props: CallToActionProps) {
  const { essay, posterURL } = props;
  return (
    <div className={styles.CallToActionOuter}>
      <a className={styles.CallToActionLink} href={essay.aviaryLink}>
        <div className={styles.CallToActionInner}>
          <div className={styles.VideoContainer}>
            <img
              className={styles.VideoPreview}
              alt={`Frame from video from testimony of ${essay.title}`}
              src={posterURL}
            />
            <div className={`sans-copy-ff ${styles.OverLay}`}>
              <div className={styles.PlayCircle}>
                <PlayCircle />
              </div>
              <div className={styles.OverLayText}>
                View the annotated testimony
              </div>
            </div>
          </div>
          <div className={styles.TextArea}>
            <p className={`${styles.OverLine}`}>
              View the annotated video testimony of
            </p>
            <h3 className={styles.IntervieweeName}>{props.essay.title}</h3>
            <p className={`sans-copy-ff ${styles.CallNumber}`}>
              HVT-{essay.hvtID} | Fortunoff Video Archive for Holocaust
              Testimonies
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
