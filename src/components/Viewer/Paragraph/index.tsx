import React from "react";
import { ParagraphBlockData } from "../../../CriticalEditionData";
import validParagraphBlockData from "../../../CriticalEditionData/validators/validParagraphBlockData";
import styles from "./Paragraph.module.css";

export function Paragraph(props: { data: ParagraphBlockData }) {
  let paragraphData: ParagraphBlockData;
  try {
    paragraphData = validParagraphBlockData(props.data);
  } catch (e) {
    return null;
  }
  return (
    <div
      className={styles.Paragraph}
      dangerouslySetInnerHTML={{ __html: paragraphData.text }}
    ></div>
  );
}
