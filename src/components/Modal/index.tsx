"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

import { type Metadata } from "~/types/metadata";

type ModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (metadata: Metadata) => void;
  children: React.ReactNode;
};

export default function Modal(props: ModalProps) {
  const [body, setBody] = useState<Element | null>(null);

  useEffect(() => {
    setBody(document.querySelector("body"));
  }, []);

  return body
    ? createPortal(
        <div
          id="metadata-modal"
          tabIndex={-1}
          aria-hidden="true"
          className={twMerge(
            props.open ? "visible" : "invisible",
            " fixed left-0 right-0 top-[56.5px] z-50 flex h-[calc(100%-56.5px)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/70",
          )}
        >
          <div className="sans-copy-ff relative max-h-full w-full max-w-md p-4">
            {/* Modal content */}
            <div className="relative rounded-lg bg-white shadow-lg shadow-neutral-800 dark:bg-neutral-700">
              {/* Modal header */}
              <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-neutral-600">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  {props.title}
                </h3>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">{props.children}</div>
            </div>
          </div>
        </div>,
        body,
      )
    : null;
}
