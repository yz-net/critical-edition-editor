"use client";

import { useEffect, useRef, useState } from "react";
import { FiFilm, FiImage } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import Editor from "~/components/EditorJS";
import LogoBar from "~/components/LogoBar";
import EssayPreamble from "~/components/Viewer/EssayPreamble";

import styles from "../essay/[essayID]/styles.module.scss";

const MEDIA_PATH_PREFIX = "https://d12q9fe14kxf9b.cloudfront.net";

function getPosterPath(hvtID: string) {
  return `${MEDIA_PATH_PREFIX}/${hvtID}/poster.jpg`;
}

function getVideoPath(hvtID: string) {
  return `${MEDIA_PATH_PREFIX}/${hvtID}/background-loop-1280.mp4`;
}

interface Metadata {
  title: string;
  hvtID: string;
  author: string;
  affiliation: string;
  publicationDate: string;
}

export default function NewPage() {
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

  return (
    <div className="serif-copy-ff relative flex h-screen flex-col overflow-hidden">
      <div className="z-[100] h-[60px] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,.3)]">
        <LogoBar />
      </div>

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
          <div className="relative z-[200] flex h-full flex-col justify-end bg-[rgba(0,0,0,.3)] px-[30px] pb-[30px] text-white drop-shadow-[0_0_9px_#000]">
            <div className="absolute right-3 top-3 flex items-center gap-3">
              <button
                className={twMerge(
                  "scale-100 rounded p-3 transition-[transform,colors] hover:scale-110",
                  data.hvtID ? "bg-green-500" : "bg-neutral-500",
                )}
                onClick={() => {
                  const newHvtID =
                    window.prompt(
                      "This should show metadata modal. hvtID:",
                      data.hvtID,
                    ) ?? "";
                  setData((prev) => ({ ...prev, hvtID: newHvtID }));
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
              className="mb-[0.75em] h-[56px] w-full rounded bg-transparent p-0 text-[56px] focus:border-white focus:ring-0"
              onChange={(newTitle) => {
                setData((prev) => ({ ...prev, title: newTitle.target.value }));
              }}
            />
            <div>
              <div className="text-[24px]">
                <div className="flex items-center gap-1">
                  by
                  <input
                    type="textarea"
                    name="Author"
                    placeholder="Author"
                    className="h-[45px] flex-1 rounded bg-transparent p-0 text-[24px] focus:border-white focus:ring-0"
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
                    className="h-[13px] w-full rounded bg-transparent p-0 text-[13px] focus:border-white focus:ring-0"
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

function ModalDialog() {
  return (
    <>
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button>
      {/* Main modal */}
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
      >
        <div className="relative max-h-full w-full max-w-md p-4">
          {/* Modal content */}
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Critical Edition Metadata Editing
              </h3>
              <button
                type="button"
                className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Name of the Survivor"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="author"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    placeholder="Name of the Interviewer"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="affiliation"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Affiliation
                  </label>
                  <input
                    type="text"
                    name="affiliation"
                    id="affiliation"
                    placeholder="Affiliation of the Interviewer"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="poster"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Affiliation
                  </label>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                      {MEDIA_PATH_PREFIX}/{data.hvtID}/
                    </span>
                  </div>
                  <input
                    type="text"
                    name="poster"
                    id="poster"
                    placeholder="Path to the Poster Image"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
