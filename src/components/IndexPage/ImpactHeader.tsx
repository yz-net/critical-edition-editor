import React from "react";
import styles from "./ImpactHeader.module.css";

export default function ImpactHeader() {
  return (
    <div className={styles.ImpactHeader}>
      <div className={styles.Background}></div>
      <div className={styles.Gradient}></div>
      <div className={styles.TextArea}>
        <h1 className={styles.Title}>Critical Editions</h1>
        <p className={styles.TagLine}>
          Holocaust Testimonies in Historical Context
        </p>
      </div>
    </div>
  );
}
