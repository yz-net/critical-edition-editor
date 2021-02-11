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
  const hvt_num = props.essay.hvtID.toLowerCase().replace("hvt-", "");
  const aws_dir =
    "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions";
  const get_url = (file_name: string) => `${aws_dir}/${hvt_num}/${file_name}`;
  const poster = get_url("poster.jpg");
  const source = get_url("background-loop-640.mp4");
  // const widths = [160, 320, 640, 960, 1280];

  return (
    <Link to={`/essay/${essayID}`} className={styles.ItemLink}>
      <div className={styles.EssayIndexItem}>
        <div className={styles.ThumbnailArea}>
          <video
            poster={poster}
            playsInline
            muted
            loop
            className={styles.SplashBackgroundVideo}
            onMouseOver={(
              event: React.MouseEvent<HTMLVideoElement, MouseEvent>
            ) => (event.target as HTMLVideoElement).play()}
            onMouseOut={(event) => (event.target as HTMLVideoElement).pause()}
          >
            <source src={source} type={"video/mp4"}></source>
          </video>
        </div>
        <div className={styles.TextArea}>
          <div className={styles.TitleContainer}>
            <header>
              {/* <p className={styles.SuperTitle}>
                {essay.supertitle ? essay.supertitle : null}
              </p> */}
              <h3 className={styles.Title}> {essay.title}</h3>
              <p className={`${styles.Byline} sans-copy-ff`}>
                by {essay.author}
              </p>
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
