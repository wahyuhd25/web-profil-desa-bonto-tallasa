"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import type { FarmPoint } from "@/types/farm";
import { listFarms } from "@/lib/farms";
import OwnerModal from "@/components/ui/OwnerModal";

// Fix default marker icon (leaflet sering blank di bundler)
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const DEFAULT_CENTER: [number, number] = [-5.497362, 119.891077];
const DEFAULT_ZOOM = 15;

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
            attribution='&copy; OpenStreetMap &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {rows.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={icon}
              eventHandlers={{
                click: () => setSelected(p),
              }}
            />
          ))}
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
