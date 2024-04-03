import React from "react";

import styles from "./styles.module.scss";

export interface ImpactHeaderProps {
  title: string;
  subtitle: string;
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
    <header className={styles.ImpactHeader}>
      <div style={style} className={styles.Background} />
      <div className={styles.Gradient} />
      <div className={styles.TextArea}>
        <h1 className={styles.Title}>{title}</h1>
        <p className={styles.TagLine}>{subtitle}</p>
      </div>
      <div className={`sans-copy-ff ${styles.Caption}`}>{caption}</div>
    </header>
  );
}
