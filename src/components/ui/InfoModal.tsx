"use client";

import Image from "next/image";
import { useEffect } from "react";

type Props = {
  open: boolean;
  title: string;
  image: string;
  content: string;
  onClose: () => void;
};

export default function InfoModal({
  open,
  title,
  image,
  content,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      {/* MODAL CONTAINER */}
      <div
        className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl
                   max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-3 right-3 z-20 flex h-9 w-9
                     items-center justify-center rounded-full
                     bg-white shadow hover:bg-gray-100"
        >
          ✕
        </button>

        {/* IMAGE (FIXED, NOT SCROLLING) */}
        <div className="relative h-56 w-full shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="leading-relaxed whitespace-pre-line">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
