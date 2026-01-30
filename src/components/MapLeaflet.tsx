"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import type { FarmPoint } from "@/types/farm";
import { listFarms } from "@/lib/farms";
import OwnerModal from "@/components/ui/OwnerModal";

const DEFAULT_CENTER: [number, number] = [-5.497362, 119.891077];
const DEFAULT_ZOOM = 15;

// Mapping markerType -> emoji
const SUBJECT_EMOJI: Record<string, string> = {
  farmer: "👨‍🌾",
  shop: "🏪",
  gov: "🏛️",
};

// Helper: create Leaflet divIcon with emoji
function createEmojiIcon(emoji: string) {
  return L.divIcon({
    className: "", // biar nggak ketimpa style bawaan leaflet
    html: `<span style="font-size: 28px; line-height: 1;">${emoji}</span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });
}

export default function MapLeaflet() {
  const [rows, setRows] = useState<FarmPoint[]>([]);
  const [selected, setSelected] = useState<FarmPoint | null>(null);

  useEffect(() => {
    listFarms().then(setRows);
  }, []);

  return (
    <div className="w-full">
      {/* Map wrapper with LOW z-index */}
      <div className="relative z-0 h-[520px] w-full overflow-hidden rounded-xl border">
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap &copy; CARTO"
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {rows.map((p) => {
            const lat = Number(p.lat);
            const lng = Number(p.lng);

            // ⛔ skip marker kalau koordinat tidak valid
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
              return null;
            }

            const emoji =
              SUBJECT_EMOJI[p.markerType ?? "farmer"] ?? "📍";

            return (
              <Marker
                key={p.id}
                position={[lat, lng]}
                icon={createEmojiIcon(emoji)}
                eventHandlers={{
                  click: () => setSelected(p),
                }}
              />
            );
          })}
        </MapContainer>
      </div>

      {/* Modal stays above everything */}
      <OwnerModal
        open={!!selected}
        data={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
