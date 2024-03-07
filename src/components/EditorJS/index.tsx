"use client";

import dynamic from "next/dynamic";

const Editorjs = dynamic(() => import("~/components/EditorJS/_editor"), {
  ssr: false,
});

export default function Editor(props: {
  data: any;
  onDataChange: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <Editorjs
      data={props.data}
      onChange={props.onDataChange}
      holder="editorjs-container"
    />
  );
}
