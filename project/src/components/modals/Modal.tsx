import { useEffect, type ReactNode } from "react";

import clsx from "clsx";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
      )}
      onClick={onClose}
    >
      <div
        className="bg-black-custom rounded-lg p-4 max-w-[90%] max-h-[90%] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white-custom text-xl"
        >
          &times;
        </button>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
