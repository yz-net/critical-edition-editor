"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiDownload, FiPlus } from "react-icons/fi";

import LogoBar from "~/components/LogoBar";
import ImpactHeader from "~/components/ImpactHeader";
import EssayIndexItem from "~/components/EssayIndexItem";

import configJson from "public/data/config.json" assert { type: "json" };

import styles from "./styles.module.scss";
import Import from "~/components/Import";
import useDataStore from "~/store/data";

export default function HomePage() {
  const { config, setConfig } = useDataStore();

  useEffect(() => {
    if (config === null) {
      const localDataStore = JSON.parse(
        localStorage.getItem("data") ?? "",
      ).state;
      if (localDataStore.config) {
        setConfig(localDataStore.config);
      } else {
        // TODO do not work with local files (fetch data from github?)
        setConfig(configJson);
      }
    }
  }, [config]);

  if (config === null) {
    return;
  }

  const moveEssay = (id: string, direction: "up" | "down") => {
    const newEssays = [...config.essays];
    const newEssayOrder = [...config.projectData.essayOrder];
    // essays
    const essaysAIndex = newEssays.findIndex((e) => e.id === id);
    if (essaysAIndex < 0) return;
    const essaysBIndex = essaysAIndex - (direction === "up" ? 1 : -1);
    if (essaysBIndex < 0 || essaysBIndex > newEssays.length - 1) return;
    const tempEssay = newEssays[essaysBIndex];
    newEssays[essaysBIndex] = newEssays[essaysAIndex]!;
    newEssays[essaysAIndex] = tempEssay!;
    // essayOrder
    const essayOrderAIndex = newEssayOrder.findIndex((e) => e === id);
    if (essayOrderAIndex < 0) return;
    const essayOrderBIndex = essayOrderAIndex - (direction === "up" ? 1 : -1);
    if (essayOrderBIndex < 0 || essayOrderBIndex > newEssayOrder.length - 1)
      return;
    const tempEssayOder = newEssayOrder[essayOrderBIndex];
    newEssayOrder[essayOrderBIndex] = newEssayOrder[essayOrderAIndex]!;
    newEssayOrder[essayOrderAIndex] = tempEssayOder!;
    setConfig({
      essays: newEssays,
      projectData: { ...config.projectData, essayOrder: newEssayOrder },
    });
  };

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
            {config.essays.map((essay: any) => (
              <li key={essay.id} className={styles.IndexItemContainer}>
                <EssayIndexItem
                  showSupertitles={
                    config.projectData.showSupertitlesOnIndexPage
                  }
                  showBylines={config.projectData.showBylinesOnIndexPage}
                  textOnly={config.projectData.textOnlyIndexPage}
                  essay={essay}
                  onChangeOrder={(direction: "up" | "down") =>
                    moveEssay(essay.id, direction)
                  }
                />
              </li>
            ))}
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
