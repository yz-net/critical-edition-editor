import React from "react";
import { Link } from "react-router-dom";
import { EssayDataEntry } from "../../EssayData";
import styles from "./EssayIndexItem.module.css";

export interface EssayIndexItemProps {
  essay: EssayDataEntry;
  essayID: string;
}

export default function EssayIndexItem(props: EssayIndexItemProps) {
  const { essayID, essay } = props;
  return (
    <Link to={`/essay/${essayID}`} className={styles.EssayIndexItem}>
      <div className={styles.EssayIndexItem}>
        <div className={styles.ThumbnailArea}>
          <video
            poster={essay.posterPath}
            playsInline
            muted
            loop
            className={styles.SplashBackgroundVideo}
            onMouseOver={(
              event: React.MouseEvent<HTMLVideoElement, MouseEvent>
            ) => (event.target as HTMLVideoElement).play()}
            onMouseOut={(event) => (event.target as HTMLVideoElement).pause()}
          >
            <source src={props.essay.videoPath}></source>
          </video>
        </div>
        <div className={styles.TextArea}>
          <div className={styles.TitleContainer}>
            <header>
              {/* <p className={styles.SuperTitle}>
                {essay.supertitle ? essay.supertitle : null}
              </p> */}
              <h3 className={styles.Title}> {essay.title}</h3>
              <p>by {essay.author}</p>
            </header>
          </div>
          {/* <div className={styles.MetaContainer}>
            <div className={styles.MetaItem}>by {essay.author}</div>
          </div> */}
        </div>
      </div>
    </Link>
  );
}
