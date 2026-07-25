import { FiInfo } from "react-icons/fi";
import { parseISO } from "date-fns/parseISO";
import { format } from "date-fns/format";

const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME;
const commitHash = process.env.NEXT_PUBLIC_COMMIT_HASH;

export default function VersionButton() {
  return (
    <button
      className="pointer-events-auto flex items-center justify-center gap-2 self-stretch bg-critical-600 px-3 transition-colors hover:bg-critical-700"
      type="button"
      onClick={() =>
        alert(
          "Build version: " +
            (buildTime ? format(parseISO(buildTime), "PPPP pppp") : "unknown") +
            "\nCommit: " +
            (commitHash ?? "unknown"),
        )
      }
    >
      <FiInfo className="stroke-white" size={20} strokeWidth={1.5} />
    </button>
  );
}
