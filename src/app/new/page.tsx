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
  const [metadataModalOpen, setMetadataModalOpen] = useState<boolean>(false);
  function handleMetadataModalClick() {
    setMetadataModalOpen((prev) => !prev);
  }
  function handleMetadataModalSave(metadata: Metadata) {
    setData(metadata);
    setMetadataModalOpen(false);
  }

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

      <MetadataModal
        metadata={data}
        isOpen={metadataModalOpen}
        onSave={handleMetadataModalSave}
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
              <MetadataModalButton onClick={handleMetadataModalClick} />
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

type MetadataModalProps = {
  metadata: Metadata;
  isOpen: boolean;
  onSave: (metadata: Metadata) => void;
};

function MetadataModalButton(props: { onClick: () => void }) {
  return (
    <>
      <button
        data-modal-target="metadata-modal"
        data-modal-toggle="metadata-modal"
        className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={props.onClick}
      >
        Toggle modal
      </button>
    </>
  );
}

function MetadataModal(props: MetadataModalProps) {
  const [metadata, setMetadata] = useState<Metadata>(props.metadata);
  let visibilityClass = props.isOpen ? "visible" : "invisible";
  return (
    <>
      {/* Main modal */}
      <div
        id="metadata-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={
          visibilityClass +
          " fixed left-0 right-0 top-[56.5px] z-50 flex h-[calc(100%-56.5px)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-500 bg-opacity-30"
        }
      >
        <div className="sans-copy-ff relative max-h-full w-full max-w-md p-4">
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
                data-modal-hide="metadata-modal"
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
                    htmlFor="id"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Testimony ID
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-white sm:text-sm">HVT-</span>
                    </div>
                    <input
                      type="text"
                      name="id"
                      id="hvt-id"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-11 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      placeholder="0000"
                      value={metadata.hvtID}
                      onChange={(e) => {
                        setMetadata((prev) => ({
                          ...prev,
                          hvtID: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
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
                    value={metadata.title}
                    onChange={(e) => {
                      setMetadata((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }));
                    }}
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
                    value={metadata.author}
                    onChange={(e) => {
                      setMetadata((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }));
                    }}
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
                    value={metadata.affiliation}
                    onChange={(e) => {
                      setMetadata((prev) => ({
                        ...prev,
                        affiliation: e.target.value,
                      }));
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    props.onSave(metadata);
                  }}
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
