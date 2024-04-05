import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import useLocalDataStore from "~/store/local-data";

import type { ConfigEssay } from "~/types/config";

type MetadataModalProps = {
  meta?: ConfigEssay;
  show: boolean;
  title?: string;
  onCancel: () => void;
  onSave: (meta: ConfigEssay) => void;
};

export default function MetadataModal(props: MetadataModalProps) {
  const [meta, setMeta] = useState<ConfigEssay>();
  const [error, setError] = useState<string>();

  const { config } = useLocalDataStore();

  useEffect(() => {
    if (props.meta) {
      setMeta(props.meta);
    }
  }, [props.meta]);

  const onSave = () => {
    if (!config) {
      throw Error("Local config missing");
    }

    if (
      !meta ||
      !(meta.hvtID && meta.title && meta.author && meta.affiliation)
    ) {
      return setError("Invalid form data");
    }
    if (
      props.meta &&
      meta.hvtID !== props.meta.hvtID &&
      config.essays.some((e: ConfigEssay) => e.hvtID === meta.hvtID)
    ) {
      return setError("HVT already exists");
    }
    setError("");
    props.onSave(meta);
  };

  return (
    <>
      {/* Main modal */}
      <div
        id="metadata-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={twMerge(
          props.show ? "visible" : "invisible",
          "fixed left-0 right-0 top-[56.5px] z-50 flex h-[calc(100%-56.5px)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/70",
        )}
      >
        <div className="sans-copy-ff relative max-h-full w-full max-w-md p-4">
          {/* Modal content */}
          <div className="relative rounded-lg bg-neutral-900 shadow shadow-neutral-800 dark:shadow-black">
            {/* Modal header */}
            <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-neutral-600">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                {props.title ?? "Critical Edition Metadata"}
              </h3>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form action="#">
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="id"
                      className="mb-1 block text-sm font-medium text-neutral-900 dark:text-white"
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
                        className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 pl-11 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-500 dark:bg-neutral-600 dark:text-white dark:placeholder-neutral-400"
                        placeholder="0000"
                        value={meta?.hvtID ?? ""}
                        onChange={(e) => {
                          setMeta((prev) => ({
                            ...prev!,
                            hvtID: e.target.value,
                            id: `hvt-${e.target.value}`,
                            slug: `hvt-${e.target.value}`,
                            essayPath: `/data/intro-hvt-${e.target.value}.json`,
                            posterPath: `https://d12q9fe14kxf9b.cloudfront.net/${e.target.value}/.poster.jpg`,
                            smallVideoPath: `https://d12q9fe14kxf9b.cloudfront.net/${e.target.value}/background-loop-640.mp4`,
                            videoPath: `https://d12q9fe14kxf9b.cloudfront.net/${e.target.value}/background-loop-1280.mp4`,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block pb-1 text-sm font-medium text-neutral-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-500 dark:bg-neutral-600 dark:text-white dark:placeholder-neutral-400"
                      placeholder="Name of the Survivor"
                      value={meta?.title ?? ""}
                      onChange={(e) => {
                        setMeta((prev) => ({
                          ...prev!,
                          title: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="author"
                      className="mb-1 block text-sm font-medium text-neutral-900 dark:text-white"
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      placeholder="Name of the Interviewer"
                      className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-500 dark:bg-neutral-600 dark:text-white dark:placeholder-neutral-400"
                      value={meta?.author ?? ""}
                      onChange={(e) => {
                        setMeta((prev) => ({
                          ...prev!,
                          author: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="affiliation"
                      className="mb-1 block text-sm font-medium text-neutral-900 dark:text-white"
                    >
                      Affiliation
                    </label>
                    <input
                      type="text"
                      name="affiliation"
                      id="affiliation"
                      placeholder="Affiliation of the Interviewer"
                      className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-500 dark:bg-neutral-600 dark:text-white dark:placeholder-neutral-400"
                      value={meta?.affiliation ?? ""}
                      onChange={(e) => {
                        setMeta((prev) => ({
                          ...prev!,
                          affiliation: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  {error && (
                    <div className="pb-2 text-sm text-red-500">{error}</div>
                  )}
                  <div className="flex gap-3">
                    {props.onCancel && (
                      <button
                        type="button"
                        className="w-full rounded-lg bg-neutral-700 px-5 py-2.5 text-center text-sm text-white transition-colors hover:bg-neutral-600"
                        onClick={() => props.onCancel()}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="button"
                      className="w-full rounded-lg bg-critical-600 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors transition-colors focus:outline-none focus:ring-4 hover:enabled:bg-critical-700 disabled:opacity-50"
                      onClick={onSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
