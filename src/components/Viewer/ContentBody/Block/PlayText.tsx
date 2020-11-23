import React from "react";
// import styles from "./ControlButtons.module.css";
import { ReactComponent as PlayIcon } from "../../svg/audio_icon.svg";
// import svgPlayIcon from "../../svg/audio_icon.svg";
import ControlButton from "../../../common/ControlButton";

interface PlayTextProps {
  text: string;
  playBlock: () => void;
  stopPlaying: () => void;
  playing: boolean;
}

export default function PlayText(props: PlayTextProps) {
  const onClick = () => {
    if (props.playing) {
      props.stopPlaying();
    } else {
      props.playBlock();
    }
  };
  return (
    <ControlButton
      icon={<PlayIcon />}
      label="speak paragraph"
      onClick={onClick}
    />
  );
  // return (
  //   <button
  //     tabIndex={0}
  //     aria-label="speak paragraph"
  //     onClick={() => {
  //       if (props.playing) {
  //         props.stopPlaying();
  //       } else {
  //         props.playBlock();
  //       }
  //     }}
  //     className={styles.ControlButton}
  //   >
  //     {/* {props.playing ? "||" : ">"} */}
  //     <PlayIcon />
  //   </button>
  // );
}
