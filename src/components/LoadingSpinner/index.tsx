"use client";

import { useStateStore } from "~/store/state";

import Spinner from "../Spinner";

export default function LoadingSpinner() {
  const loading = useStateStore((state) => state.loading);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <Spinner />
        </div>
      )}
    </>
  );
}
