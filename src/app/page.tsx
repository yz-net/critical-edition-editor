"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiDownload, FiPlus, FiUpload } from "react-icons/fi";

import LogoBar from "~/components/LogoBar";
import ImpactHeader from "~/components/ImpactHeader";
import EssayIndexItem from "~/components/EssayIndexItem";

import config from "public/data/config.json" assert { type: "json" };

import styles from "./styles.module.scss";
import Import from "~/components/Import";

export default function HomePage() {
  // TODO: global context handling config & all essays
  const [data, setData] = useState<any>({
    config: null,
    essays: null,
  });

  useEffect(() => {
    setData({
      config,
    });
  }, []);

  if (!data.config) {
    return;
  }

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
          <p className="sans-copy-ff">{data.config.projectData.introCopy}</p>
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
            {data.config.essays.map((essay: any) => {
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
            {/* left side */}
            <div className="flex items-center divide-x divide-white overflow-hidden rounded"></div>
            {/* right side */}
            <div className="flex items-center divide-x divide-white overflow-hidden rounded">
              <Import />

              <button
                className="pointer-events-auto flex items-center gap-3 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700"
                type="button"
                onPointerDown={(e) => {
                  alert("TODO: download compressed data (e.g. zipped folder)");
                }}
              >
                <FiDownload />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
