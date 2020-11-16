import React from "react";
import styles from "./ControlBar.module.css";

export interface ControlBarProps {
  // title?: string;
  // author?: string;
  // publicationDate?: string;
  // thumbnailImgSrc?: string;
  playing: boolean;
  continuousPlay: boolean;
  play: () => void;
  stop: () => void;
  toggleContinuousPlay: () => void;
}
export default function ControlBar(props: ControlBarProps): JSX.Element {
  return (
    <div className={styles.ControlBar}>
      <button
        onClick={() => {
          if (props.playing) {
            props.stop();
          } else {
            props.play();
          }
        }}
      >
        {props.playing ? "Pause" : "Play"}
      </button>
      <button onClick={props.toggleContinuousPlay}>
        Continous Play: {props.continuousPlay ? "on" : "off"}
      </button>

      {/* <h1>{props.title}</h1> */}
    </div>
  );
}
