"use client";

import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

import { EDITOR_TOOLS } from "~/configs/editorJS";

export default function Editorjs(props: {
  data: any;
  onChange(data: any): void;
  holder: any;
}) {
  const ref = useRef<EditorJS>();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: props.holder,
        // @ts-ignore
        tools: EDITOR_TOOLS,
        data: {
          // time: 1552744582955,
          blocks: props.data,
          // version: "2.11.10"
        },
        async onChange(api, event) {
          const data = await api.saver.save();
          props.onChange(data.blocks);
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

  return <div id={props.holder} className="w-full" />;
}
