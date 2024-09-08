import { Suspense } from "react";

import LogoBar from "~/components/LogoBar";
import LoadingSpinner from "~/components/LoadingSpinner";
import Toast from "~/components/Toast";
import EssayEditor from "~/components/EssayEditor";

export default function EssayPage() {
  return (
    <>
      <div className="serif-copy-ff relative flex h-screen flex-col overflow-hidden">
        <div className="z-[100] h-[60px] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,.3)]">
          <LogoBar />
        </div>

        <Suspense fallback={<></>}>
          <EssayEditor />
        </Suspense>
      </div>

      <LoadingSpinner />
      <Toast />
    </>
  );
}
