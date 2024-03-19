import { useState } from "react";

import { type Metadata } from "~/types/metadata";

type MetadataModalProps = {
  metadata: Metadata;
  isOpen: boolean;
  onSave: (metadata: Metadata) => void;
};

export default function MetadataModal(props: MetadataModalProps) {
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
          " fixed left-0 right-0 top-[56.5px] z-50 flex h-[calc(100%-56.5px)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/70"
        }
      >
        <div className="sans-copy-ff relative max-h-full w-full max-w-md p-4">
          {/* Modal content */}
          <div className="relative rounded-lg bg-white shadow-lg shadow-neutral-800 dark:bg-neutral-700">
            {/* Modal header */}
            <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-neutral-600">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                Critical Edition Metadata Editing
              </h3>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <div>
                  <label
                    htmlFor="id"
                    className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
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
                    className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-500 dark:bg-neutral-600 dark:text-white dark:placeholder-neutral-400"
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
                    className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    placeholder="Name of the Interviewer"
                    className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-500 dark:bg-neutral-600 dark:text-white dark:placeholder-neutral-400"
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
                    className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
                  >
                    Affiliation
                  </label>
                  <input
                    type="text"
                    name="affiliation"
                    id="affiliation"
                    placeholder="Affiliation of the Interviewer"
                    className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-500 dark:bg-neutral-600 dark:text-white dark:placeholder-neutral-400"
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
                  className="w-full rounded-lg bg-critical-600 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-critical-700 focus:outline-none focus:ring-4"
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
