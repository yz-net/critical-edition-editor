import Link from "next/link";
import { FiDownload, FiPlus, FiSave, FiUpload } from "react-icons/fi";

import LogoBar from "~/components/LogoBar";
import ImpactHeader from "~/components/ImpactHeader";
import EssayIndexItem from "~/components/EssayIndexItem";

import config from "public/data/config.json" assert { type: "json" };

import styles from "./styles.module.scss";

export default function HomePage() {
  return (
    <div className="serif-copy-ff">
      <LogoBar />
      <ImpactHeader
        caption="Photo: Steven H. and Marion L. Holocaust testimony (HVT-544), recorded in 1985."
        backgroundImageURL="/img/impact-header-background.jpg"
        title="Critical Editions Editor"
        subtitle="Create and change testimonies"
      />
      <main className={styles.CenterColumn}>
        <div className={styles.IndexHeader}>
          <p className="sans-copy-ff">{config.projectData.introCopy}</p>
        </div>
        <nav aria-label="List of essays">
          <ul className={styles.ItemListContainer}>
            <li className="h-[300px] max-w-[500px] flex-shrink-0 flex-grow basis-1/2 lg:h-auto">
              <Link
                className="group block h-full w-full rounded p-2.5 transition-colors hover:bg-gray-200"
                href="/new"
              >
                <div className="flex h-full w-full items-center justify-center gap-3 border-2 border-neutral-800 bg-neutral-100 transition-colors group-hover:border-critical-600 group-hover:bg-critical-600 group-hover:text-white">
                  <FiPlus size={30} strokeWidth={1.5} />
                  <span className="scale-100 text-3xl">Create new</span>
                </div>
              </Link>
            </li>
            {config.essays.map((essay) => {
              // const essay: EssayDataEntry = essays[essayID];
              if (!essay) {
                // logger.warn("bad essay id: " + essayID);
                return null;
              }
              return (
                <li key={essay.id} className={styles.IndexItemContainer}>
                  <EssayIndexItem
                    showSupertitles={
                      config.projectData.showSupertitlesOnIndexPage
                    }
                    showBylines={config.projectData.showBylinesOnIndexPage}
                    textOnly={config.projectData.textOnlyIndexPage}
                    essay={essay}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      </main>

      <div className="pointer-events-none fixed bottom-5 left-5 right-5 z-10">
        <div className="flex justify-center">
          <div className="flex w-full max-w-7xl justify-between">
            <div className="flex items-center divide-x divide-white overflow-hidden rounded">
              {/* <button
                    className="pointer-events-auto flex items-center gap-3 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700"
                    type="button"
                    onPointerDown={(e) => {
                      if (window.confirm("Are you sure you want to go back?")) {
                        router.push("/");
                      }
                    }}
                  >
                    <FiArrowLeft />
                    Back
                  </button> */}
            </div>

            <div className="flex items-center divide-x divide-white overflow-hidden rounded">
              <button
                data-modal-target="metadata-modal"
                data-modal-toggle="metadata-modal"
                className=" pointer-events-auto flex items-center gap-3 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700"
                // onClick={() => setMetadataModalOpen(true)}
                type="button"
              >
                <FiUpload /> Load
              </button>

              <button
                className="flex items-center gap-3 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700"
                type="button"
                // onPointerDown={async (e) =>
                //   // exportToJson(e, editorData, editorData.meta.slug)
                //   await fetch("api/save?path=test", { method: "GET" })
                // }
              >
                <FiDownload />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
