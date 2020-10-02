import React from "react";
import {
  CriticalEditionDocument,
  CriticalEditionDocumentBlock,
} from "../../../CriticalEditionData";
import validCriticalEditionDocumentData from "../../../CriticalEditionData/validators/validDocumentData";
import Block from "../Block";
import styles from "./ContentBody.module.css";

export function ContentBody(props: {
  documentData: CriticalEditionDocument;
}): JSX.Element {
  try {
    validCriticalEditionDocumentData(props.documentData);
  } catch (e) {
    console.error(e);
    return <div>Error loading data.</div>;
  }
  // console.log("document blocks", props.edition.blocks);
  return (
    <div className={styles.ContentBody}>
      {props.documentData.blocks.map(
        (blockData: CriticalEditionDocumentBlock, i) => {
          return <Block key={i} blockData={blockData} />;
        }
      )}
    </div>
  );
}
