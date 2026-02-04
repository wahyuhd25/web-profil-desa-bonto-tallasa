"use client";

import { useEffect } from "react";
import type { FarmPoint } from "@/types/farm";

type Props = {
  open: boolean;
  data: FarmPoint | null;
  onClose: () => void;
};

/**
 * Harus konsisten dengan COMMODITY_OPTIONS di admin page.
 * Kalau mau rapi, nanti bisa dipindah ke file shared, misal: "@/config/commodities".
 */
const COMMODITY_OPTIONS = [
  { id: "corn", label: "Jagung", emoji: "🌽" },
  { id: "tomato", label: "Tomat", emoji: "🍅" },
  { id: "eggplant", label: "Terong", emoji: "🍆" },
  { id: "grape", label: "Anggur", emoji: "🍇" },
  { id: "chili", label: "Cabai", emoji: "🌶️" },
  { id: "rice", label: "Padi", emoji: "🌾" },
  { id: "strawberry", label: "Stroberi", emoji: "🍓" },
  { id: "clove", label: "Cengkeh", emoji: "🌸" },
  { id: "cocoa", label: "Coklat", emoji: "🍫" },
  { id: "candlenut", label: "Kemiri", emoji: "🌰" },
  { id: "village_staff", label: "Aparat Desa", emoji: "🏛️" },
];


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

  const resolvedCommodities =
    data.commodities?.map((id) => {
      const opt = COMMODITY_OPTIONS.find((o) => o.id === id);
      return {
        id,
        label: opt?.label ?? id,
        emoji: opt?.emoji ?? "❓",
      };
    }) ?? [];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b-2 border-black">
          <h2 className="text-3xl font-extrabold">{data.ownerName}</h2>
        </div>

        <div className="px-8 py-4 bg-black text-white">
          <p className="text-xl">{data.shortDesc}</p>
        </div>

        <div className="p-8 space-y-4">
          <p className="text-xl">{data.dusun}</p>
          <p className="text-xl">No. HP: {data.phone}</p>

          {resolvedCommodities.length > 0 && (
            <div className="pt-2 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700">
                Riwayat komoditas / peran
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {resolvedCommodities.map((c) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm"
                  >
                    <span className="text-lg">{c.emoji}</span>
                    <span>{c.label}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 text-white py-4 font-semibold text-lg hover:bg-green-700"
            >
              <span className="text-2xl">🟢</span>
              WhatsApp
            </a>

            {/* Google Maps */}
            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-4 font-semibold text-lg hover:bg-blue-700"
            >
              <span className="text-2xl">📍</span>
              Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
