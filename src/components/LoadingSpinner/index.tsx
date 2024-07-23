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
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <Spinner />
        </div>
      )}
    </>
  );
}
