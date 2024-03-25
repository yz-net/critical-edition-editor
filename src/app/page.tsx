"use client";

import { useEffect, useState } from "react";
import { FiDownload, FiPlus } from "react-icons/fi";
import JSZip from "jszip";
import { useRouter } from "next/navigation";
import { Octokit } from "@octokit/rest";

import LogoBar from "~/components/LogoBar";
import ImpactHeader from "~/components/ImpactHeader";
import EssayIndexItem from "~/components/EssayIndexItem";
import Import from "~/components/Import";
import useDataStore from "~/store/data";

import type { Essay } from "~/types/essay";

import styles from "./styles.module.scss";
import MetadataModal from "~/components/MetadataModal";

const octokit = new Octokit();

export default function HomePage() {
  const [showMetadataModal, setShowMetadataModal] = useState<boolean>(false);

  const { config, setConfig, essays, setEssays } = useDataStore();

  const router = useRouter();

  const fetchGitHubData = () => {
    octokit.rest.repos
      .getContent({
        owner: "probably-an-organization",
        repo: "critical-editions-content",
        path: "/data",
        ref: "staging",
      })
      .then(async (res) => {
        if (Array.isArray(res.data)) {
          const newEssays: Array<Essay> = [];
          for (const file of res.data) {
            if (!file.download_url) continue;
            const fileData = await (await fetch(file.download_url)).json();
            if (file.name === "config.json") {
              setConfig(fileData);
            } else if (file.name.includes("intro-hvt")) {
              newEssays.push(fileData);
            }
          }
          setEssays(newEssays);
        }
      })
      .catch((err) => alert("Error: " + err));
  };

  useEffect(() => {
    if (config === null) {
      const localDataStore = JSON.parse(
        localStorage.getItem("data") ?? "",
      ).state;
      if (localDataStore.config && localDataStore.essays) {
        setConfig(localDataStore.config);
        setEssays(localDataStore.essays);
      } else {
        fetchGitHubData();
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

  const downloadZip = async () => {
    const files: Array<{ path: string; blob: Blob }> = [];
    files.push({
      path: "config.json",
      blob: new Blob([JSON.stringify(config)]),
    });
    if (!essays) return;
    for (const essay of essays) {
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
              <button
                className="group block h-full w-full rounded p-2.5 transition-colors hover:bg-gray-200"
                type="button"
                onClick={() => setShowMetadataModal(true)}
              >
                <div className="flex h-full w-full items-center justify-center gap-3 border-2 border-neutral-800 bg-neutral-100 transition-colors group-hover:border-critical-600 group-hover:bg-critical-600 group-hover:text-white">
                  <FiPlus size={30} strokeWidth={1.5} />
                  <span className="scale-100 text-3xl">Create new</span>
                </div>
              </button>
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
                onPointerDown={downloadZip}
              >
                <FiDownload />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <MetadataModal
        show={showMetadataModal}
        onCancel={() => setShowMetadataModal(false)}
        onSave={(meta) => {
          setConfig({
            projectData: {
              ...config.projectData,
              essayOrder: [meta.id, ...config.projectData.essayOrder],
            },
            essays: [meta, ...config.essays],
          });
          setEssays([{ meta, blocks: [] }, ...(essays ?? [])]);
          router.push(`/essay/${meta.id}`);
        }}
        title="Create new Critical Edition"
      />
    </div>
  );
}
