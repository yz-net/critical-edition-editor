import React from "react";
import styles from "./ControlBar.module.css";

export default function ControlBar(props: { title?: string }): JSX.Element {
  return (
    <div className={styles.ControlBar}>
      <button>{">"}</button>
      <h1>{props.title}</h1>
    </div>
  );
}
