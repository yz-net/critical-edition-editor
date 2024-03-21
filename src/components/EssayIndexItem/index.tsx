"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { EssayDataEntry } from "~/types/essayData";

import styles from "./styles.module.scss";

export interface EssayIndexItemProps {
  essay: EssayDataEntry;
  textOnly: boolean;
  showBylines: boolean;
  showSupertitles: boolean;
  onChangeOrder(direction: "up" | "down"): void;
}

export default function EssayIndexItem({
  essay,
  textOnly,
  showBylines,
  showSupertitles,
  onChangeOrder,
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
    <article
      title={essay.title}
      className="group relative flex flex-col rounded p-2.5 hover:bg-[#efefef]"
    >
      <Link
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onFocus={handleMouseOver}
        onBlur={handleMouseOut}
        tabIndex={0}
        href={`/essay/${essay.id}`}
        className="hover:text-critical-600"
      >
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
      </Link>
      <div className="pointer-events-none absolute right-4 top-4 flex flex-col divide-y overflow-hidden rounded opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
        <button
          className="bg-critical-600 p-3 text-white transition-colors hover:bg-critical-700"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChangeOrder("up");
          }}
        >
          <FiChevronUp />
        </button>
        <button
          className="bg-critical-600 p-3 text-white transition-colors hover:bg-critical-700"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChangeOrder("down");
          }}
        >
          <FiChevronDown />
        </button>
      </div>
    </article>
  );
}
