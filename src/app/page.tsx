"use client";

import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { format } from "date-fns/format";

import LogoBar from "~/components/LogoBar";
import ImpactHeader from "~/components/ImpactHeader";
import EssayIndexItem from "~/components/EssayIndexItem";
import FetchGitHub from "~/components/FetchGitHub";
import useLocalDataStore from "~/store/local-data";
import useGitDataStore from "~/store/git";
import { fetchGitHubData } from "~/utils/data";
import MetadataModal from "~/components/MetadataModal";
import { useStateStore } from "~/store/state";
import LoadingSpinner from "~/components/LoadingSpinner";
import Toast from "~/components/Toast";
import VersionButton from "~/components/VersionButton";
import DownloadButton from "~/components/DownloadButton";
import ImportButton from "~/components/ImportButton";

import type { CEData } from "~/types/store";
import type { ConfigEssay } from "~/types/config";
import type { EssayMeta } from "~/types/essay";

import styles from "./styles.module.scss";

export default function HomePage() {
  const [showNewEssayModal, setShowNewEssayModal] = useState<boolean>(false);

  const localConfig = useLocalDataStore((state) => state.config);
  const localEssays = useLocalDataStore((state) => state.essays);
  const localSetConfig = useLocalDataStore((state) => state.setConfig);
  const localSetEssays = useLocalDataStore((state) => state.setEssays);

  const gitConfig = useGitDataStore((state) => state.config);
  const gitEssays = useGitDataStore((state) => state.essays);
  const gitSetConfig = useGitDataStore((state) => state.setConfig);
  const gitSetEssays = useGitDataStore((state) => state.setEssays);

  const setLoading = useStateStore((state) => state.setLoading);
  const setToast = useStateStore((state) => state.setToast);

  useEffect(() => {
    if (gitConfig) {
      return;
    }

    const fetch = async () => {
      setLoading(true);
      try {
        const newGitData = await fetchGitHubData();
        gitSetConfig(newGitData.config);
        gitSetEssays(
          newGitData.essays.map((e) => ({
            ...e,
            meta: { ...e.meta, id: e.meta.slug },
          })),
        );
      } catch (err) {
        setToast({
          className: "bg-red-300 text-white",
          text: "GitHub data could not be fetched",
        });
        throw Error("Error fetching GitHub data");
      } finally {
        setLoading(false);
      }
    };

    const gitDataString = localStorage.getItem("git-data");
    if (!gitDataString) {
      fetch();
      return;
    }
    const gitData = (JSON.parse(gitDataString) as { state: CEData }).state;
    if (gitData.config && gitData.essays) {
      gitSetConfig(gitData.config);
      gitSetEssays(gitData.essays);
    } else {
      fetch();
    }
  }, [gitConfig]);

  useEffect(() => {
    if (localConfig) {
      return;
    }
    if (!gitConfig) {
      return;
    }

    let localData: CEData | undefined;
    const localDataString = localStorage.getItem("local-data");
    if (localDataString) {
      localData = (JSON.parse(localDataString) as { state: CEData }).state;
    }
    localSetConfig(localData?.config ?? gitConfig);
    localSetEssays(localData?.config ? localData.essays : gitEssays);
  }, [localConfig, gitConfig]);

  const createEssay = (meta: EssayMeta) => {
    if (!localConfig) {
      throw Error("Local config is null");
    }

    /**
     * Note: meta is missing the following values:
     * aviaryLink
     * publicationDate
     * supertitle
     *
     * (they are not really being used in the app)
     */
    meta = {
      ...meta,
      supertitle: "Introduction to the testimony of",
      aviaryLink: `https://fortunoff.aviaryplatform.com/c/mssa.hvt.${meta.hvtID}`,
      publicationDate: format(Date.now(), "PPP"),
    };

    // config
    const newConfigEssays: ConfigEssay[] = [
      meta as ConfigEssay,
      ...localConfig.essays,
    ];
    const newConfigEssayOrder = [
      meta.slug,
      ...localConfig.projectData.essayOrder,
    ];
    // essays
    const newEssays = [{ meta, blocks: [] }, ...localEssays];
    // update
    localSetConfig({
      essays: newConfigEssays,
      projectData: {
        ...localConfig.projectData,
        essayOrder: newConfigEssayOrder,
      },
    });
    localSetEssays(newEssays);
    setToast({
      className: "bg-yellow-300 text-black",
      text: "New local edition successfully created",
    });
    setShowNewEssayModal(false);
  };

  const moveEssay = (id: string, direction: "up" | "down") => {
    if (!localConfig) {
      throw Error("Local config missing");
    }
    const newEssays = [...localConfig.essays];
    const newEssayOrder = [...localConfig.projectData.essayOrder];
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
    if (essayOrderAIndex < 0) {
      return;
    }
    const essayOrderBIndex = essayOrderAIndex - (direction === "up" ? 1 : -1);
    if (essayOrderBIndex < 0 || essayOrderBIndex > newEssayOrder.length - 1) {
      return;
    }
    const tempEssayOder = newEssayOrder[essayOrderBIndex];
    newEssayOrder[essayOrderBIndex] = newEssayOrder[essayOrderAIndex]!;
    newEssayOrder[essayOrderAIndex] = tempEssayOder!;
    // update
    localSetConfig({
      essays: newEssays,
      projectData: {
        ...localConfig.projectData,
        essayOrder: newEssayOrder,
      },
    });
  };

  const deleteEssay = (id: string) => {
    if (!localConfig) {
      throw Error("Local config missing");
    }
    // config essays
    const newEssays = localConfig.essays.reduce(
      (acc: ConfigEssay[], curr: ConfigEssay) => {
        if (curr.id !== id) {
          acc.push(curr);
        }
        return acc;
      },
      [],
    );
    // config essay order
    const newEssayOrder = localConfig.projectData.essayOrder.reduce(
      (acc: string[], curr: string) => {
        if (curr !== id) {
          acc.push(curr);
        }
        return acc;
      },
      [],
    );
    // update
    localSetConfig({
      essays: newEssays,
      projectData: {
        ...localConfig.projectData,
        essayOrder: newEssayOrder,
      },
    });
  };
  if (!localConfig || !localEssays) {
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
            <p className="sans-copy-ff">{localConfig.projectData.introCopy}</p>
          </div>
          <nav aria-label="List of essays">
            <ul className={styles.ItemListContainer}>
              <li className="h-[300px] max-w-[500px] flex-shrink-0 flex-grow basis-1/2 lg:h-auto">
                <button
                  className="group block h-full w-full rounded p-2.5 transition-colors hover:bg-gray-200"
                  type="button"
                  onClick={() => setShowNewEssayModal(true)}
                >
                  <div className="flex h-full min-h-60 w-full items-center justify-center gap-2 border-2 border-neutral-800 bg-neutral-100 text-3xl transition-colors group-hover:border-critical-600 group-hover:bg-critical-600 group-hover:text-white">
                    <FiPlus size={30} strokeWidth={1.5} />
                    Create new
                  </div>
                </button>
              </li>
              {localConfig.essays.map((essay: ConfigEssay) => (
                <li key={essay.hvtID} className={styles.IndexItemContainer}>
                  <EssayIndexItem
                    essay={essay}
                    onChangeOrder={(direction: "up" | "down") => {
                      console.log("CHANGE ORDER", direction, essay);
                      moveEssay(essay.id, direction);
                    }}
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
                <ImportButton />
                <DownloadButton />
                <VersionButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <MetadataModal
        meta={{} as ConfigEssay}
        title="Create new Critical Edition"
        show={showNewEssayModal}
        onCancel={() => setShowNewEssayModal(false)}
        onSave={(meta) => createEssay(meta)}
      />

      <LoadingSpinner />
      <Toast />
    </>
  );
}
