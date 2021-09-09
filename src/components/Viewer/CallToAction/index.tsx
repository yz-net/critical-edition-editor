import React from 'react';
import { EssayDataEntry } from '../../../Data/EssayData';
import styles from './CallToAction.module.css';
import PlayButton from './PlayButton';

export interface CallToActionProps {
  essay: EssayDataEntry;
  posterURL?: string;
}
export default function CallToAction(props: CallToActionProps) {
  const {
    essay,
    essay: { title: essayTitle },
    posterURL,
  } = props;
  return (
    <div className={styles.CallToActionOuter}>
      <div className={styles.CallToActionInner}>
        <div className={styles.VideoContainer}>
          {posterURL ? (
            <img
              className={styles.VideoPreview}
              alt={`Frame from video from testimony of ${essay.title}`}
              src={posterURL}
            />
          ) : null}
        </div>
        <div className={styles.TextArea}>
          <div className={styles.TextGrouping}>
            <p className={`${styles.OverLine}`}>
              Watch the annotated video testimony of
            </p>

            <h3 className={styles.IntervieweeName}>{essayTitle}</h3>
          </div>

          <div className={styles.ButtonContainer}>
            <PlayButton url={essay.aviaryLink || ''} />
          </div>
        </div>
      </div>
    </div>
  );
}
