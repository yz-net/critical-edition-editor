"use client";

import { useEffect, useRef, useState } from "react";
import { FiFilm, FiImage } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import Editor from "~/components/EditorJS";
import LogoBar from "~/components/LogoBar";
import EssayPreamble from "~/components/Viewer/EssayPreamble";

import styles from "../essay/[essayID]/styles.module.scss";

type EditorData = {
  videoPath: string;
  posterPath: string;
};

export default function NewPage() {
  const [data, setData] = useState<EditorData>({
    videoPath: "",
    posterPath: "",
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (data.videoPath || data.posterPath) {
      videoRef.current?.load();
    }
  }, [data.videoPath, data.posterPath]);

  return (
    <div className="serif-copy-ff relative flex h-screen flex-col overflow-hidden">
      <div className="z-[100] h-[60px] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,.3)]">
        <LogoBar />
      </div>

      <div className="flex-shrink flex-grow-0 basis-full overflow-scroll">
        <header className="relative z-[40] box-border h-[50vh] overflow-hidden">
          <div className="absolute bottom-0 left-[calc(50%-400px)] right-[calc(50%-400px)] top-0 z-[100] bg-[linear-gradient(90deg,#000_10%,rgba(0,0,0,.1)49%,rgba(0,0,0,.1)51%,#000_90%)]" />
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center overflow-hidden bg-black">
            {(data.videoPath || data.posterPath) && (
              <video
                className="h-full max-h-full w-full max-w-[800px] object-cover object-center"
                playsInline
                loop
                autoPlay
                disablePictureInPicture
                ref={videoRef}
                poster={data.posterPath}
              >
                <source src={data.videoPath} />
              </video>
            )}
          </div>
          <div className="relative z-[200] flex h-full flex-col justify-end bg-[rgba(0,0,0,.3)] px-[30px] pb-[30px] text-white drop-shadow-[0_0_9px_#000]">
            <div className="absolute right-3 top-3 flex items-center gap-3">
              <button
                className={twMerge(
                  "scale-100 rounded p-3 transition-[transform,colors] hover:scale-110",
                  data.posterPath ? "bg-green-500" : "bg-neutral-500",
                )}
                onClick={() => {
                  const newPosterPath =
                    window.prompt("Enter poster path", data.posterPath) ?? "";
                  setData((prev) => ({ ...prev, posterPath: newPosterPath }));
                }}
                type="button"
              >
                <FiImage />
              </button>
              <button
                className={twMerge(
                  "scale-100 rounded p-3 transition-[transform,colors] hover:scale-110",
                  data.videoPath ? "bg-green-500" : "bg-neutral-500",
                )}
                onClick={() => {
                  const newVideoPath =
                    window.prompt("Enter video path", data.videoPath) ?? "";
                  setData((prev) => ({ ...prev, videoPath: newVideoPath }));
                }}
                type="button"
              >
                <FiFilm />
              </button>
            </div>
            <p className="sans-title-ff my-[1em] text-[13px] uppercase tracking-[.5px]">
              introduction to the testimony of
            </p>
            <input
              type="textarea"
              name="Title"
              placeholder="Title"
              className="mb-[0.75em] h-[56px] w-full rounded border border-neutral-500 bg-transparent p-0 text-[56px] focus:border-white focus:ring-0"
            />
            <div>
              <div className="text-[24px]">
                <div className="flex items-center gap-1">
                  by
                  <input
                    type="text"
                    name="Author"
                    placeholder="Author"
                    className="h-[45px] flex-1 rounded border-neutral-500 bg-transparent p-0 text-[24px] focus:border-white focus:ring-0"
                  />
                </div>
                <div className="font-helvetica text-[13px]">
                  <input
                    type="text"
                    name="Affiliation"
                    placeholder="Affiliation"
                    className="h-[13px] w-full rounded border border-neutral-500 bg-transparent p-0 text-[13px] focus:border-white focus:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-80 bg-white" />
        </header>

        <EssayPreamble hvtID={"test"} aviaryLink={"test"} />

        <div
          // style={{ top: Math.max(0, 200 - this.state.scrollPosition) }}
          className={styles.ContentBodyContainer}
        >
          <main className={styles.ContentBodyContents}>
            <Editor />
          </main>

          {/*
          {callToAction && essayAviaryLink ? (
            <div className={styles.CallToActionArea}>
              <CallToAction posterURL={essayPosterPath} essay={essay} />
            </div>
          ) : null}

          <Footer
            orgName={config.projectData.organizationName || ""}
            orgURL={config.projectData.homeLink || ""}
            parentOrgName={config.projectData.parentOrganizationName || ""}
            parentOrgURL={config.projectData.parentOrganizationURL || ""}
          />
          */}
        </div>
      </div>
    </div>
  );
}
