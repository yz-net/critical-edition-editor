import { FiUpload } from "react-icons/fi";
import { useState } from "react";

import Modal from "../Modal";

export default function Import(props: any) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <button
        data-modal-target="metadata-modal"
        data-modal-toggle="metadata-modal"
        className="pointer-events-auto flex items-center gap-3 bg-critical-600 p-3 font-[Helvetica,Arial,sans-serif] text-white transition-colors hover:bg-critical-700"
        onPointerDown={(e) => {
          setShowModal(true);
        }}
        type="button"
      >
        <FiUpload /> Import
      </button>
      <Modal
        title="Data import"
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={() => setShowModal(false)}
      >
        <div>TODO drag and drop file (zip?) import</div>
        <button
          className="rounded bg-critical-600 p-3"
          type="button"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </Modal>
    </>
  );
}
