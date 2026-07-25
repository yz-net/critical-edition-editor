import { FiGitBranch, FiChevronDown } from "react-icons/fi";

import useGitDataStore from "~/store/git";

import type { ContentBranch } from "~/types/store";

const BRANCHES: ContentBranch[] = ["staging", "main"];

export default function BranchSelect() {
  const branch = useGitDataStore((state) => state.branch);
  const setBranch = useGitDataStore((state) => state.setBranch);

  return (
    <div className="pointer-events-auto relative flex items-center gap-2 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-white">
      {/* Visual only — the transparent select above it is the real control. */}
      <span aria-hidden className="flex items-center gap-2 leading-6">
        <FiGitBranch />
        {branch}
        <FiChevronDown />
      </span>
      {/* Stretched over the whole control so any part of the button opens the
          dropdown. A select laid out inline only covers its own text, leaving
          the padding and icons dead to the click that opens it. */}
      <select
        aria-label="Content branch"
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        value={branch}
        onChange={(e) => setBranch(e.target.value as ContentBranch)}
      >
        {BRANCHES.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
    </div>
  );
}
