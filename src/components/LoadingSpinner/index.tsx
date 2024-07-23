"use client";

import { useEffect, useState } from "react";
import { useStateStore } from "~/store/state";

import Spinner from "../Spinner";

export default function LoadingSpinner() {
  const [show, setShow] = useState<boolean>(false);

  const { loading } = useStateStore();

  useEffect(() => {
    setShow(loading);
  }, [loading]);

  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 shadow-lg shadow-black">
            <Spinner />
          </div>
        </div>
      )}
    </>
  );
}
