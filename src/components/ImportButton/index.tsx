"use client";

import { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import JSZip from "jszip";

import useLocalDataStore from "~/store/local-data";

import type { Config, ConfigEssay } from "~/types/config";
import type { Essay } from "~/types/essay";

export default function ImportButton() {
  const importRef = useRef<HTMLInputElement>(null);

  const localConfig = useLocalDataStore((state) => state.config);
  const localEssays = useLocalDataStore((state) => state.essays);
  const localSetConfig = useLocalDataStore((state) => state.setConfig);
  const localSetEssays = useLocalDataStore((state) => state.setEssays);

  const importJson = (json: Essay) => {
    if (!localConfig) {
      return alert("Error, no local data config");
    }

    const duplicate = localConfig?.essays.find(
      (e) => e.hvtID === json.meta?.hvtID,
    );
    if (
      duplicate &&
      window.confirm(
        `A local version of an edition with the hvtID ${duplicate.hvtID} already exists! Confirm to overwrite.`,
      )
    ) {
      localSetConfig({
        ...localConfig,
        essays: localConfig.essays.map((e) =>
          e.hvtID === json.meta.hvtID ? (json.meta as ConfigEssay) : e,
        ),
      });
      localSetEssays(
        localEssays.map((e) => (e.meta.hvtID === json.meta.hvtID ? json : e)),
      );
    }
    if (!duplicate) {
      localSetConfig({
        essays: [json.meta as ConfigEssay, ...localConfig.essays],
        projectData: {
          ...localConfig.projectData,
          essayOrder: [json.meta.id, ...localConfig.projectData.essayOrder],
        },
      });
      localSetEssays([json, ...localEssays]);
    }
  };

  const importZip = (file: File) => {
    let config: Config | null = null;
    const essays: Essay[] = [];

    JSZip.loadAsync(file)
      .then((zip) => {
        const files = Object.fromEntries(
          Object.entries(zip.files).filter((f) => !f[1].dir),
        );
        // Collect all promises for processing files
        const fileProcessingPromises = Object.keys(files).map((filename) => {
          return files[filename]!.async("string").then((data) => {
            const parsedData = JSON.parse(data);
            if (filename.includes("config")) {
              config = parsedData;
            } else if (parsedData.meta && parsedData.blocks) {
              essays.push(parsedData);
            }
          });
        });

        // Wait for all file processing promises to complete
        return Promise.all(fileProcessingPromises);
      })
      .then(() => {
        // Now config and essays are ready to use
        if (config && essays.length > 0) {
          localSetConfig(config);
          localSetEssays(essays);
        } else {
          throw Error();
        }
      })
      .catch((error) => {
        return alert("Error processing files");
      });
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length < 1) {
      return;
    }
    const file = input.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        try {
          if (!e.target) {
            return alert("Error reading file");
          }
          const json = JSON.parse(e.target.result as string) as Essay;
          if (!json.meta || !json.blocks) {
            return alert("Error, corrupt JSON file");
          }
          importJson(json);
        } catch (error) {
          console.error("File reader onload error");
        }
      };

      fileReader.onerror = () => {
        console.error("File reader onerror");
      };

      if (file.type === "application/zip") {
        if (
          window.confirm(
            "Importing a .zip file overwrites all local changes. Confirm to continue.",
          )
        ) {
          importZip(file);
        }
      } else if (file.type === "application/json") {
        fileReader.readAsText(file);
      }
    }
  };

  return (
    <>
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
        accept=".zip,.json"
        className="hidden"
        onChange={handleFileImport}
      />
    </>
  );
}
