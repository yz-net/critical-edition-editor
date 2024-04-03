"use client";

import dynamic from "next/dynamic";

import type { EssayBlock } from "~/types/essay";

const Editorjs = dynamic(() => import("~/components/EditorJS/_editor"), {
  ssr: false,
});

export default function Editor(props: {
  data: EssayBlock[];
  onDataChange(data: EssayBlock[]): void;
}) {
  return (
    <Editorjs
      data={props.data}
      onChange={(data) => props.onDataChange(data)}
      holder="editorjs-container"
    />
  );
}
