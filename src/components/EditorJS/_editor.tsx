"use client";

import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

import { EDITOR_TOOLS } from "~/configs/editorJS";

export default function Editorjs(props: {
  data: any;
  onChange(data: any): void;
  holder: any;
}) {
  //add a reference to editor
  const ref = useRef<EditorJS>();

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: props.holder,
        tools: EDITOR_TOOLS,
        data: props.data,
        async onChange(api, event) {
          const data = await api.saver.save();
          props.onChange(data);
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={props.holder} className="prose max-w-full" />;
}
