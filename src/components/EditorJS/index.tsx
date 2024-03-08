"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import dummyData from "../../../public/data/intro-hvt-0170.json" assert { type: "json" };

const Editorjs = dynamic(() => import("~/components/EditorJS/_editor"), {
  ssr: false,
});

export default function Editor() {
  const [editorData, setEditorData] = useState(dummyData);

  return (
    <Editorjs data={editorData} onChange={setEditorData} holder="editor" />
  );
}
