import React from "react";
import { FootnoteParagraphBlockData } from "../../../CriticalEditionData";
import styles from "./Footnote.module.css";

export function Footnote(props: { data: FootnoteParagraphBlockData }) {
  if (!props.data || !props.data.text) {
    console.warn(
      "Invalid paragraph block <missing data.text property>",
      props.data
    );
    return null;
  }
  return (
    <div id={props.data.id} className={styles.Footnote}>
      {props.data.text}
    </div>
  );
}
