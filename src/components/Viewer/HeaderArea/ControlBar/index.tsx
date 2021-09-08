import React from 'react';
import styles from './ControlBar.module.css';

export interface ControlBarProps {
  playing: boolean;
  continuousPlay: boolean;
  play: () => void;
  stop: () => void;
  toggleContinuousPlay: () => void;
}
export default function ControlBar(props: ControlBarProps): JSX.Element {
  const { playing, play, stop, toggleContinuousPlay, continuousPlay } = props;
  return (
    <div className={styles.ControlBar}>
      <button
        type="button"
        onClick={() => {
          if (playing) {
            stop();
          } else {
            play();
          }
        }}
      >
        {playing ? 'Pause' : 'Play'}
      </button>
      <button type="button" onClick={toggleContinuousPlay}>
        Continous Play: {continuousPlay ? 'on' : 'off'}
      </button>
    </div>
  );
}
