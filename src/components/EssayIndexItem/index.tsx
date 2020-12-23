import React from "react";
import { Link } from "react-router-dom";
import { EssayDataEntry } from "../../App";
import styles from "./EssayIndexItem.module.css";

export interface EssayIndexItemProps {
  essay: EssayDataEntry;
  essayID: string;
}

export default function EssayIndexItem(props: EssayIndexItemProps) {
  const { essayID, essay } = props;
  return (
    <Link to={`/essay/${essayID}`}>
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
        <h3>
          <small>{essay.supertitle ? essay.supertitle : null}</small>
          <br />
          {essay.title}
        </h3>
      </div>
    </Link>
  );
}
