import React from "react";
import styles from "./ImpactHeader.module.css";

export interface ImpactHeaderProps {
  title: String;
  subtitle: String;
  backgroundImageURL?: string;
  caption: string;
}

export default function ImpactHeader(props: ImpactHeaderProps) {
  const { title, subtitle, backgroundImageURL, caption } = props;

  const backgroundImageCSSProperty = backgroundImageURL
    ? `url(${backgroundImageURL})`
    : "";

  const style = backgroundImageURL
    ? { backgroundImage: backgroundImageCSSProperty }
    : {};
  return (
    <div className={styles.ImpactHeader}>
      <div style={style} className={styles.Background}></div>
      <div className={styles.Gradient}></div>
      <div className={styles.TextArea}>
        <h1 className={styles.Title}>{title}</h1>
        <p className={styles.TagLine}>{subtitle}</p>
      </div>
      <div className={`sans-copy-ff ${styles.Caption}`}>{caption}</div>
    </div>
  );
}
