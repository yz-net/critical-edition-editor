import React, { useState } from "react";
import styles from "./ControlButtons.module.css";
import { speechStarted, speechStopped } from "../../../../utils/playerEvents";

export default function PlayText(props: { text: string; playBar?: any }) {
  const [playing, setPlaying] = useState<boolean>(false);

  const { text } = props;

  return (
    <button
      tabIndex={0}
      aria-label="speak paragraph"
      onClick={() => {
        if (playing) {
          dispatchEvent(speechStopped);
          speechSynthesis.cancel();
          return;
        }
        speechSynthesis.cancel();
        let utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
        dispatchEvent(speechStarted);
        if (utterance && utterance.onend === null) {
          setPlaying(true);
          utterance.onend = (event) => {
            setPlaying(false);
            console.log(
              "Utterance has finished being spoken after " +
                event.elapsedTime +
                " milliseconds."
            );
          };
        }
      }}
      className={styles.ControlButton}
    >
      {playing ? "||" : ">"}
    </button>
  );
}
