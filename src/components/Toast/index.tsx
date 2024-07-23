"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useStateStore } from "~/store/state";

export default function Toast() {
  const [data, setData] = useState<{
    className: string;
    text: string;
  } | null>(null);

  const { toast } = useStateStore();

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setData(null);
      }, 3000);
    }
  }, [data]);

  useEffect(() => {
    setData(toast);
  }, [toast]);

  return (
    <>
      <AnimatePresence>
        {data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={twMerge(
              "pointer-events-auto fixed bottom-5 left-0 right-0 z-50 mx-auto flex w-fit rounded-lg px-5 py-2 font-[Helvetica,Arial,sans-serif] shadow",
              data.className,
            )}
          >
            {data.text}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
