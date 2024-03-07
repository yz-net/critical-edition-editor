"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import dummyData from "../../../public/data/intro-hvt-0170.json" assert { type: "json" };
import { exportToJson } from "~/utils/files";
import { FiDownload } from "react-icons/fi";

const Editorjs = dynamic(() => import("~/components/EditorJS/_editor"), {
  ssr: false,
});

export default function Editor() {
  const [editorData, setEditorData] = useState(dummyData);

  return (
    <>
      <Editorjs
        data={editorData}
        onChange={setEditorData}
        holder="editorjs-container"
      />
      <button
        className="fixed bottom-3 right-3 flex items-center gap-3 rounded bg-orange-500 p-3 transition-colors hover:bg-orange-400"
        type="button"
        onPointerDown={(e) => exportToJson(e, editorData)}
      >
        <FiDownload />
        Download
      </button>
    </>
  );
}
