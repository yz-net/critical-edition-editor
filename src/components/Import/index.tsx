import { FiGithub } from "react-icons/fi";

import useLocalDataStore from "~/store/local-data";
import useGitDataStore from "~/store/git";

import { fetchGitHubData } from "~/utils/data";

const confirmText =
  "Are you sure you want to pull content from GitHub? All local changes will be deleted.";

export default function Import() {
  const localDataStore = useLocalDataStore();
  const gitDataStore = useGitDataStore();

  const fetch = async () => {
    if (window.confirm(confirmText)) {
      const data = await fetchGitHubData();
      gitDataStore.setConfig(data.config);
      gitDataStore.setEssays(data.essays);
      localDataStore.setConfig(data.config);
      localDataStore.setEssays(data.essays);
    }
  };

  return (
    <button
      data-modal-target="metadata-modal"
      data-modal-toggle="metadata-modal"
      className="pointer-events-auto flex items-center gap-2 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700"
      onPointerDown={fetch}
      type="button"
    >
      <FiGithub /> Import
    </button>
  );
}
