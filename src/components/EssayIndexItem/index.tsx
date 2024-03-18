"use client";

import React, { useRef } from "react";
import Link from "next/link";

import { EssayDataEntry } from "~/types/essayData";

import styles from "./styles.module.scss";

export interface EssayIndexItemProps {
  essay: EssayDataEntry;
  textOnly: boolean;
  showBylines: boolean;
  showSupertitles: boolean;
}

export default function EssayIndexItem({
  essay,
  textOnly,
  showBylines,
  showSupertitles,
}: EssayIndexItemProps) {
  // const { essay, textOnly, showBylines, showSupertitles } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseOver = () => {
    if (videoRef && videoRef.current) {
      videoRef.current.play().catch((e) => {
        console.log("error", e);
      });
    }
  };

  const handleMouseOut = () => {
    if (videoRef && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Link
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
      tabIndex={0}
      href={`/essay/${essay.id}`}
      className={styles.ItemLink}
    >
      <article title={essay.title} className={styles.EssayIndexItem}>
        {textOnly ? null : (
          <div className={styles.ThumbnailArea}>
            <video
              ref={videoRef}
              aria-label={`Thumbnail video for '${essay.title}'`}
              poster={essay.posterPath}
              playsInline
              muted
              loop
              className={styles.SplashBackgroundVideo}
            >
              <source src={essay.smallVideoPath} type="video/mp4" />
            </video>
          </div>
        )}
        <div className={styles.TextArea}>
          <div className={styles.TitleContainer}>
            {/* <header> */}
            {showSupertitles ? (
              <p
                aria-label={`Supertitle for '${essay.title}'`}
                className={styles.SuperTitle}
              >
                {essay.supertitle}
              </p>
            ) : null}
            <h3 className={styles.Title}> {essay.title}</h3>
            {showBylines ? (
              <p
                aria-label={`Author byline for '${essay.title}'`}
                className={`${styles.Byline} sans-copy-ff`}
              >
                by {essay.author}
                {essay.affiliation ? `, ${essay.affiliation}` : null}
              </p>
            ) : null}
            {/* </header> */}
          </div>
        </div>
      </article>
    </Link>
  );
}
