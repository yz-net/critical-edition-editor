"use client";

import { useEffect, useRef, useState } from "react";
import { FiFilm, FiImage, FiSettings } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import Editor from "~/components/EditorJS";
import LogoBar from "~/components/LogoBar";
import EssayPreamble from "~/components/Viewer/EssayPreamble";
import MetadataModal from "~/components/MetadataModal";

import { type Metadata } from "~/types/metadata";

import styles from "../essay/[essayID]/styles.module.scss";

const MEDIA_PATH_PREFIX = "https://d12q9fe14kxf9b.cloudfront.net";

function getPosterPath(hvtID: string) {
  return `${MEDIA_PATH_PREFIX}/${hvtID}/poster.jpg`;
}

function getVideoPath(hvtID: string) {
  return `${MEDIA_PATH_PREFIX}/${hvtID}/background-loop-1280.mp4`;
}

export default function NewPage() {
  const [metadataModalOpen, setMetadataModalOpen] = useState<boolean>(false);

  const [data, setData] = useState<Metadata>({
    title: "Hans Frei",
    hvtID: "0170",
    author: "Ion Popa",
    affiliation: "University of Manchester",
    publicationDate: "February 1, 2021",
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (data.hvtID) {
      videoRef.current?.load();
    }
  }, [data.hvtID]);

  useEffect(() => {
    if (!data.hvtID) {
      setMetadataModalOpen(true);
    }
  }, []);

  return (
    <div className="serif-copy-ff relative flex h-screen flex-col overflow-hidden">
      <div className="z-[100] h-[60px] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,.3)]">
        <LogoBar />
      </div>

      <MetadataModal
        metadata={data}
        isOpen={metadataModalOpen}
        onSave={(metadata) => {
          setData(metadata);
          setMetadataModalOpen(false);
        }}
      />
      <div className="flex-shrink flex-grow-0 basis-full overflow-scroll">
        <header className="relative z-[40] box-border h-[50vh] overflow-hidden">
          <div className="absolute bottom-0 left-[calc(50%-400px)] right-[calc(50%-400px)] top-0 z-[100] bg-[linear-gradient(90deg,#000_10%,rgba(0,0,0,.1)49%,rgba(0,0,0,.1)51%,#000_90%)]" />
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center overflow-hidden bg-black">
            {data.hvtID && (
              <video
                className="h-full max-h-full w-full max-w-[800px] object-cover object-center"
                playsInline
                loop
                autoPlay
                disablePictureInPicture
                ref={videoRef}
                poster={getPosterPath(data.hvtID)}
              >
                <source src={getVideoPath(data.hvtID)} />
              </video>
            )}
          </div>
          <div className="relative z-[200] flex h-full flex-col justify-end bg-[rgba(0,0,0,.3)] px-[30px] pb-[30px] text-white">
            <div className="absolute right-3 top-3 flex items-center gap-3">
              <button
                data-modal-target="metadata-modal"
                data-modal-toggle="metadata-modal"
                className="flex scale-100 items-center gap-3 rounded bg-blue-700 p-3 transition-[transform,colors] hover:scale-110"
                onClick={() => setMetadataModalOpen(true)}
                type="button"
              >
                <FiSettings /> Setttings
              </button>
            </div>
            <p className="sans-title-ff my-[1em] text-[13px] uppercase tracking-[.5px] [text-shadow:_0_0_9px_#000]">
              introduction to the testimony of
            </p>

            {/* TODO:
             * Text area is vertically scrollable, can we remove that?
             * Has no line wrap on overflow. Add so that it behaves like the critical-edition-viewer
             */}
            <input
              type="textarea"
              name="Title"
              placeholder="Title"
              className="mb-[0.75em] h-[56px] w-full rounded bg-transparent p-0 text-[56px] [text-shadow:_0_0_9px_#000] focus:border-white focus:ring-0"
              value={data.title}
              onChange={(newTitle) => {
                setData((prev) => ({ ...prev, title: newTitle.target.value }));
              }}
            />
            <div>
              <div className="text-[24px]">
                <div className="flex items-center [text-shadow:_0_0_9px_#000]">
                  by&nbsp;
                  <input
                    type="textarea"
                    name="Author"
                    placeholder="Author"
                    className="h-[31px] flex-1 rounded bg-transparent p-0 text-[24px] [text-shadow:_0_0_9px_#000] focus:border-white focus:ring-0"
                    value={data.author}
                    onChange={(newAuthor) => {
                      setData((prev) => ({
                        ...prev,
                        author: newAuthor.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="font-helvetica text-[13px]">
                  <input
                    type="textarea"
                    name="Affiliation"
                    placeholder="Affiliation"
                    className="h-[13px] w-full rounded bg-transparent p-0 text-[13px] [text-shadow:_0_0_9px_#000] focus:border-white focus:ring-0"
                    value={data.affiliation}
                    onChange={(newAffiliation) => {
                      setData((prev) => ({
                        ...prev,
                        affiliation: newAffiliation.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-80 bg-white" />
        </header>

        <EssayPreamble hvtID={data.hvtID} />

        <div
          // style={{ top: Math.max(0, 200 - this.state.scrollPosition) }}
          className={styles.ContentBodyContainer}
        >
          <main className={styles.ContentBodyContents}>
            <Editor />
          </main>

          {/* TODO: Do we need the call-to-action stuff?
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
