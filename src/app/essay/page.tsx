"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { FiArrowLeft, FiSettings } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

import Editor from "~/components/EditorJS";
import LogoBar from "~/components/LogoBar";
import EssayPreamble from "~/components/Viewer/EssayPreamble";
import MetadataModal from "~/components/MetadataModal";
import useLocalDataStore from "~/store/local-data";
import LoadingSpinner from "~/components/LoadingSpinner";
import Toast from "~/components/Toast";

import type { Essay, EssayMeta } from "~/types/essay";
import type { ConfigEssay } from "~/types/config";

import styles from "./styles.module.scss";
import { useStateStore } from "~/store/state";

const MEDIA_PATH_PREFIX = "https://d12q9fe14kxf9b.cloudfront.net";

function getPosterPath(hvtID: string) {
  return `${MEDIA_PATH_PREFIX}/${hvtID}/poster.jpg`;
}

function getVideoPath(hvtID: string) {
  return `${MEDIA_PATH_PREFIX}/${hvtID}/background-loop-1280.mp4`;
}

let initialized = false;

function Essay() {
  const [data, setData] = useState<Essay>();
  const [showMetaModal, setShowMetaModal] = useState<boolean>(false);

  const essays = useLocalDataStore((state) => state.essays);
  const setEssays = useLocalDataStore((state) => state.setEssays);
  const config = useLocalDataStore((state) => state.config);
  const setConfig = useLocalDataStore((state) => state.setConfig);

  const setToast = useStateStore((state) => state.setToast);

  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    if (!config || data) {
      return;
    }

    const essay = essays.find((e) => e.meta.slug === id);
    if (essay) {
      setData(essay);
      initialized = true;
    } else {
      alert(`Essay ${id ?? ""} not found, redirecting...`);
      return router.push("/");
    }
  }, [id, config]);

  useEffect(() => {
    if (data?.meta.hvtID) {
      videoRef.current?.load();
    }

    // update data
    if (initialized && essays && !!data && !!config) {
      setEssays(essays?.map((e: Essay) => (e.meta.slug === id ? data : e)));
      setConfig({
        ...config,
        essays: config.essays.map((e: ConfigEssay) =>
          e.slug === id ? (data.meta as ConfigEssay) : e,
        ),
      });
    }
  }, [data]);

  if (!data) return null;

  const editEssay = (meta: EssayMeta) => {
    if (!config) {
      throw Error("Config not found");
    }
    if (!essays) {
      throw Error("Essays not found");
    }
    // config
    const newConfigEssays = config.essays.map((e: ConfigEssay) =>
      e.id === id ? (meta as ConfigEssay) : e,
    );
    const newConfigEssayOrder = config?.projectData.essayOrder.map(
      (eo: string) => (eo === id ? meta.slug : eo),
    );
    setConfig({
      essays: newConfigEssays,
      projectData: {
        ...config?.projectData,
        essayOrder: newConfigEssayOrder,
      },
    });
    // essays
    const newEssays = essays.map((e: Essay) =>
      e.meta.slug === id
        ? { meta: { ...data.meta, ...meta }, blocks: data.blocks }
        : e,
    );
    setEssays(newEssays);
    // update
    if (meta.slug !== id) {
      window.history.pushState(null, "", `/essay?id=${meta.slug}`);
    }
    setData((prev) => ({ ...prev!, meta }));
    setToast({
      className: "bg-yellow-300 text-black",
      text: "Edition successfully modified",
    });
    setShowMetaModal(false);
  };

  return (
    <>
      <div className="flex-shrink flex-grow-0 basis-full overflow-scroll">
        <header className="relative z-[40] box-border h-[50vh] overflow-hidden">
          <div className="absolute bottom-0 left-[calc(50%-400px)] right-[calc(50%-400px)] top-0 z-[100] bg-[linear-gradient(90deg,#000_10%,rgba(0,0,0,.1)49%,rgba(0,0,0,.1)51%,#000_90%)]" />
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center overflow-hidden bg-black">
            {data.meta.hvtID && (
              <video
                className="h-full max-h-full w-full max-w-[800px] object-cover object-center"
                playsInline
                loop
                autoPlay
                disablePictureInPicture
                muted
                ref={videoRef}
                poster={getPosterPath(data.meta.hvtID)}
              >
                <source src={getVideoPath(data.meta.hvtID)} />
              </video>
            )}
          </div>
          <div className="relative z-[200] flex h-full flex-col justify-end bg-[rgba(0,0,0,.3)] px-[30px] pb-[30px] text-white">
            <p className="sans-title-ff my-[0.725em] text-[13px] uppercase tracking-[.5px] [text-shadow:_0_0_9px_#000]">
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
              className="mb-[0.625em] h-[56px] w-full max-w-[600px] rounded bg-transparent p-0 text-[46px] font-[400] [text-shadow:_0_0_9px_#000] focus:border-white focus:ring-0"
              value={data.meta.title ?? ""}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev!,
                  meta: { ...prev!.meta, title: e.target.value },
                }));
              }}
            />
            <div className="flex items-center text-[24px] [text-shadow:_0_0_9px_#000]">
              by&nbsp;
              <input
                type="textarea"
                name="Author"
                placeholder="Author"
                className="h-[31px] flex-1 rounded bg-transparent p-0 text-[24px] [text-shadow:_0_0_9px_#000] focus:border-white focus:ring-0"
                value={data.meta.author ?? ""}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev!,
                    meta: { ...prev!.meta, author: e.target.value },
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
                value={data.meta.affiliation ?? ""}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev!,
                    meta: { ...prev!.meta, affiliation: e.target.value },
                  }));
                }}
              />
            </div>
          </div>
          <div className="h-80 bg-white" />
        </header>

        <EssayPreamble hvtID={data.meta.hvtID} />

        <div
          // style={{ top: Math.max(0, 200 - this.state.scrollPosition) }}
          className={styles.ContentBodyContainer}
        >
          <main className={styles.ContentBodyContents}>
            <Editor
              data={data.blocks}
              onDataChange={(data) =>
                setData((prev) => ({ ...prev!, blocks: data }))
              }
            />
          </main>

          <div className="pointer-events-none fixed bottom-5 left-5 right-5 z-10">
            <div className="flex justify-center">
              <div className="flex w-full max-w-7xl justify-between">
                <div className="flex items-center divide-x divide-white overflow-hidden rounded">
                  <button
                    className="pointer-events-auto flex items-center gap-2 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700"
                    type="button"
                    onPointerDown={() => router.push("/")}
                  >
                    <FiArrowLeft />
                    Back
                  </button>
                </div>

                <div className="flex items-center divide-x divide-white overflow-hidden rounded">
                  <button
                    data-modal-target="metadata-modal"
                    data-modal-toggle="metadata-modal"
                    className=" pointer-events-auto flex items-center gap-2 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700"
                    onClick={() => setShowMetaModal(true)}
                    type="button"
                  >
                    <FiSettings /> Setttings
                  </button>

                  {/* <button
                      className="flex items-center gap-2 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700"
                      type="button"
                      onPointerDown={
                        (e) => exportToJson(e, data.blocks, data.meta.slug)
                        // fetch("api/save?path=test", { method: "GET" })
                      }
                    >
                      <FiDownload />
                      JSON
                    </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MetadataModal
        meta={data.meta as ConfigEssay}
        show={showMetaModal}
        onCancel={() => setShowMetaModal(false)}
        onSave={(meta) => editEssay(meta)}
      />
    </>
  );
}

export default function EssayPage() {
  return (
    <>
      <div className="serif-copy-ff relative flex h-screen flex-col overflow-hidden">
        <div className="z-[100] h-[60px] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,.3)]">
          <LogoBar />
        </div>

        <Suspense>
          <Essay />
        </Suspense>
      </div>

      <LoadingSpinner />
      <Toast />
    </>
  );
}
