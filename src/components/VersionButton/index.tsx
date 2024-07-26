import { FiInfo } from "react-icons/fi";
import { parseISO } from "date-fns/parseISO";
import { format } from "date-fns/format";

import timestampJSON from "~/configs/timestamp.json" assert { type: "json" };

export default function VersionButton() {
  return (
    <button
      className="pointer-events-auto flex items-center justify-center gap-2 self-stretch bg-critical-600 px-3 transition-colors hover:bg-critical-700"
      type="button"
      onClick={() =>
        alert(
          "Build version: " +
            format(parseISO(timestampJSON.timestamp), "PPPP pppp"),
        )
      }
    >
      <FiInfo className="stroke-white" size={20} strokeWidth={1.5} />
    </button>
  );
}
