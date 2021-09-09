import React from 'react';
import styles from './PlayButton.module.css';
import { ReactComponent as PlayCircle } from '../../../svg/circle_play.svg';

export interface PlayButtonProps {
  url: string;
}

export default function PlayButton(props: PlayButtonProps) {
  const { url } = props;

  return (
    <div className={`sans-copy-ff ${styles.PlayButtonOuter}`}>
      <a href={url}>
        <div className={styles.PlayButtonInner}>
          <div className={styles.Icon}>
            <PlayCircle />
          </div>
          <div className={styles.Label}>Watch now</div>
        </div>
      </a>
    </div>
  );
}
