"use client";

import { useEffect } from "react";
import type { FarmPoint } from "@/types/farm";

type Props = {
  open: boolean;
  data: FarmPoint | null;
  onClose: () => void;
};

export default function OwnerModal({ open, data, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !data) return null;

  const waLink = `https://wa.me/${data.phone.replace(/\D/g, "")}`;
  const mapsLink = `https://www.google.com/maps?q=${data.lat},${data.lng}`;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white border-2 border-black shadow-[0_10px_0_rgba(0,0,0,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b-2 border-black">
          <h2 className="text-3xl font-extrabold">{data.ownerName}</h2>
        </div>

        <div className="px-6 py-4 bg-black text-white">
          <p className="text-xl">{data.shortDesc}</p>
        </div>

        <div className="p-6 space-y-3">
          <p className="text-xl">{data.dusun}</p>
          <p className="text-xl">No. HP: {data.phone}</p>

          {/* WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-3 bg-green-600 text-white py-4 font-semibold text-lg hover:bg-green-700"
          >
            <span className="text-2xl">🟢</span>
            Hubungi melalui WhatsApp
          </a>

          {/* Google Maps */}
          <a
            href={mapsLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 bg-blue-600 text-white py-4 font-semibold text-lg hover:bg-blue-700"
          >
            <span className="text-2xl">📍</span>
            Buka di Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
