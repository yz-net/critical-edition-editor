"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiDownload, FiUpload } from "react-icons/fi";
import JSZip from "jszip";

import LogoBar from "~/components/LogoBar";
import ImpactHeader from "~/components/ImpactHeader";
import EssayIndexItem from "~/components/EssayIndexItem";
import FetchGitHub from "~/components/FetchGitHub";
import useLocalDataStore from "~/store/local-data";
import useGitDataStore from "~/store/git";
import { fetchGitHubData } from "~/utils/data";
import MetadataModal from "~/components/MetadataModal";

import type { CEData, CEDataStore } from "~/types/store";
import type { ConfigEssay } from "~/types/config";
import type { EssayMeta } from "~/types/essay";

import styles from "./styles.module.scss";

export default function HomePage() {
  const [showNewEssayModal, setShowNewEssayModal] = useState<boolean>(false);
  const [importFile, setImportFile] = useState<File>();

  const localDataStore: CEDataStore = useLocalDataStore();
  const gitDataStore: CEDataStore = useGitDataStore();

  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gitDataStore.config) {
      return;
    }

    const fetch = async () => {
      try {
        const newGitData = await fetchGitHubData();
        gitDataStore.setConfig(newGitData.config);
        gitDataStore.setEssays(newGitData.essays);
      } catch (err) {
        throw Error("Error fetching GitHub data");
      }
    };

    const gitDataString = localStorage.getItem("git-data");
    if (!gitDataString) {
      fetch();
      return;
    }
    const gitData = (JSON.parse(gitDataString) as { state: CEData }).state;
    if (gitData.config && gitData.essays) {
      gitDataStore.setConfig(gitData.config);
      gitDataStore.setEssays(gitData.essays);
    } else {
      fetch();
    }
  }, [gitDataStore.config]);

  useEffect(() => {
    if (localDataStore.config) {
      return;
    }
    if (!gitDataStore.config) {
      return;
    }

    let localData: CEData | undefined;
    const localDataString = localStorage.getItem("local-data");
    if (localDataString) {
      localData = (JSON.parse(localDataString) as { state: CEData }).state;
    }
    localDataStore.setConfig(localData?.config ?? gitDataStore.config);
    localDataStore.setEssays(
      localData?.config ? localData.essays : gitDataStore.essays,
    );
  }, [localDataStore.config, gitDataStore.config]);

  const createEssay = (meta: EssayMeta) => {
    if (!localDataStore.config) {
      throw Error("Local config is null");
    }
    // config
    const newConfigEssays: ConfigEssay[] = [
      meta as ConfigEssay,
      ...localDataStore.config.essays,
    ];
    const newConfigEssayOrder = [
      meta.slug,
      ...localDataStore.config.projectData.essayOrder,
    ];
    // essays
    const newEssays = [
      // TODO, meta is missing aviaryLink, publicationDate, supertitle
      { meta, blocks: [] },
      ...localDataStore.essays,
    ];
    // update
    localDataStore.setConfig({
      essays: newConfigEssays,
      projectData: {
        ...localDataStore.config.projectData,
        essayOrder: newConfigEssayOrder,
      },
    });
    localDataStore.setEssays(newEssays);
    setShowNewEssayModal(false);
  };

  const moveEssay = (id: string, direction: "up" | "down") => {
    if (!localDataStore.config) {
      throw Error("Local config missing");
    }
    const newEssays = [...localDataStore.config.essays];
    const newEssayOrder = [...localDataStore.config.projectData.essayOrder];
    // config essays
    const essaysAIndex = newEssays.findIndex((e) => e.id === id);
    if (essaysAIndex < 0) return;
    const essaysBIndex = essaysAIndex - (direction === "up" ? 1 : -1);
    if (essaysBIndex < 0 || essaysBIndex > newEssays.length - 1) return;
    const tempEssay = newEssays[essaysBIndex];
    newEssays[essaysBIndex] = newEssays[essaysAIndex]!;
    newEssays[essaysAIndex] = tempEssay!;
    // config essay order
    const essayOrderAIndex = newEssayOrder.findIndex((e) => e === id);
    if (essayOrderAIndex < 0) return;
    const essayOrderBIndex = essayOrderAIndex - (direction === "up" ? 1 : -1);
    if (essayOrderBIndex < 0 || essayOrderBIndex > newEssayOrder.length - 1)
      return;
    const tempEssayOder = newEssayOrder[essayOrderBIndex];
    newEssayOrder[essayOrderBIndex] = newEssayOrder[essayOrderAIndex]!;
    newEssayOrder[essayOrderAIndex] = tempEssayOder!;
    // update
    localDataStore.setConfig({
      essays: newEssays,
      projectData: {
        ...localDataStore.config.projectData,
        essayOrder: newEssayOrder,
      },
    });
  };

  const deleteEssay = (id: string) => {
    if (!localDataStore.config) {
      throw Error("Local config missing");
    }
    // config essays
    const newEssays = localDataStore.config.essays.reduce(
      (acc: ConfigEssay[], curr: ConfigEssay) => {
        if (curr.id !== id) {
          acc.push(curr);
        }
        return acc;
      },
      [],
    );
    // config essay order
    const newEssayOrder = localDataStore.config.projectData.essayOrder.reduce(
      (acc: string[], curr: string) => {
        if (curr !== id) {
          acc.push(curr);
        }
        return acc;
      },
      [],
    );
    // update
    localDataStore.setConfig({
      essays: newEssays,
      projectData: {
        ...localDataStore.config.projectData,
        essayOrder: newEssayOrder,
      },
    });
  };

  const downloadZip = async () => {
    const files: { path: string; blob: Blob }[] = [];
    files.push({
      path: "config.json",
      blob: new Blob([JSON.stringify(localDataStore.config)]),
    });
    if (!localDataStore.essays) return;
    for (const essay of localDataStore.essays) {
      files.push({
        path: `intro-${essay.meta.slug}.json`,
        blob: new Blob([JSON.stringify(essay)]),
      });
    }
    const zip = new JSZip();
    for (const file of files) {
      zip.folder("data")!.file(file.path, file.blob);
    }

    const zipData = await zip.generateAsync({
      type: "blob",
      streamFiles: true,
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(zipData);
    link.download = "critical-edition-data.zip";
    link.click();
    link.remove();
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length < 1) {
      return;
    }
    const file = input.files[0];
    if (file && file.type === "application/zip") {
      // TODO parse import
      alert("TODO");
    } else {
      alert("Please select a ZIP file.");
    }
  };

  if (!localDataStore.config || !localDataStore.essays) {
    return;
  }

  return (
    <>
      <div className="serif-copy-ff">
        <LogoBar />
        <ImpactHeader
          caption="Photo: Steven H. and Marion L. Holocaust testimony (HVT-544), recorded in 1985."
          backgroundImageURL="/img/impact-header-background.jpg"
          title="Critical Editions Editor"
          subtitle="Create and edit testimonies"
        />
        <main className={styles.CenterColumn}>
          <div className={styles.IndexHeader}>
            <p className="sans-copy-ff">
              {localDataStore.config.projectData.introCopy}
            </p>
          </div>
          <nav aria-label="List of essays">
            <ul className={styles.ItemListContainer}>
              <li className="h-[300px] max-w-[500px] flex-shrink-0 flex-grow basis-1/2 lg:h-auto">
                <button
                  className="group block h-full w-full rounded p-2.5 transition-colors hover:bg-gray-200"
                  type="button"
                  onClick={() => setShowNewEssayModal(true)}
                >
                  <div className="flex h-full w-full items-center justify-center gap-2 border-2 border-neutral-800 bg-neutral-100 text-3xl transition-colors group-hover:border-critical-600 group-hover:bg-critical-600 group-hover:text-white">
                    <FiPlus size={30} strokeWidth={1.5} />
                    Create new
                  </div>
                </button>
              </li>
              {localDataStore.config.essays.map((essay: ConfigEssay) => (
                <li key={essay.id} className={styles.IndexItemContainer}>
                  <EssayIndexItem
                    essay={essay}
                    onChangeOrder={(direction: "up" | "down") =>
                      moveEssay(essay.id, direction)
                    }
                    onDelete={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete Essay \"${essay.title}\"?`,
                        )
                      ) {
                        deleteEssay(essay.id);
                      }
                    }}
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
              <div className="flex items-center divide-x divide-white overflow-hidden rounded">
                <FetchGitHub />
              </div>
              {/* right side */}
              <div className="flex items-center divide-x divide-white overflow-hidden rounded">
                <button
                  className="pointer-events-auto flex items-center gap-2 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700"
                  type="button"
                  onPointerDown={() => {
                    importRef.current?.click();
                  }}
                >
                  <FiUpload />
                  Import
                </button>
                <input
                  ref={importRef}
                  type="file"
                  accept=".zip"
                  className="hidden"
                  onChange={handleFileImport}
                />

                <button
                  className="pointer-events-auto flex items-center gap-2 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700"
                  type="button"
                  onPointerDown={downloadZip}
                >
                  <FiDownload />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MetadataModal
        title="Create new Critical Edition"
        show={showNewEssayModal}
        onCancel={() => setShowNewEssayModal(false)}
        onSave={(meta) => createEssay(meta)}
      />
    </>
  );
}
