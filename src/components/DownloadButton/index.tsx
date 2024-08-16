import JSZip from "jszip";
import { FiDownload } from "react-icons/fi";

import useLocalDataStore from "~/store/local-data";

export default function DownloadButton() {
  const localConfig = useLocalDataStore((state) => state.config);
  const localEssays = useLocalDataStore((state) => state.essays);

  const downloadZip = async () => {
    const files: { path: string; blob: Blob }[] = [];
    files.push({
      path: "config.json",
      blob: new Blob([JSON.stringify(localConfig)]),
    });
    if (!localEssays) return;
    for (const essay of localEssays) {
      files.push({
        path: `intro-hvt-${essay.meta.hvtID}.json`,
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
    <button
      className="pointer-events-auto flex items-center gap-2 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700"
      type="button"
      onPointerDown={downloadZip}
    >
      <FiDownload />
      Download
    </button>
  );
}
