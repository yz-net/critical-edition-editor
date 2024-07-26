import { FiGithub } from "react-icons/fi";

import useLocalDataStore from "~/store/local-data";
import useGitDataStore from "~/store/git";

import { fetchGitHubData } from "~/utils/data";
import { useStateStore } from "~/store/state";

const confirmText =
  "Are you sure you want to pull content from GitHub? All local changes will be deleted.";

export default function Import() {
  const localSetConfig = useLocalDataStore((state) => state.setConfig);
  const localSetEssays = useLocalDataStore((state) => state.setEssays);

  const gitSetConfig = useGitDataStore((state) => state.setConfig);
  const gitSetEssays = useGitDataStore((state) => state.setEssays);

  const setLoading = useStateStore((state) => state.setLoading);
  const setToast = useStateStore((state) => state.setToast);

  const fetch = async () => {
    if (window.confirm(confirmText)) {
      setLoading(true);
      try {
        const data = await fetchGitHubData();
        data.essays = data.essays.map((e) => ({
          ...e,
          meta: { ...e.meta, id: e.meta.slug },
        }));
        gitSetConfig(data.config);
        gitSetEssays(data.essays);
        localSetConfig(data.config);
        localSetEssays(data.essays);

        setToast({
          className: "bg-yellow-300 text-black",
          text: "GitHub data fetched successfully",
        });
      } catch (err) {
        setToast({
          className: "bg-red-300 text-white",
          text: "GitHub data could not be fetched",
        });
        console.error(err);
      } finally {
        setLoading(false);
      }
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
      <FiGithub /> Fetch
    </button>
  );
}
