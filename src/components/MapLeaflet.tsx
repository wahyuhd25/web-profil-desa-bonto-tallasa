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

export default function MapLeaflet() {
  const [rows, setRows] = useState<FarmPoint[]>([]);
  const [selected, setSelected] = useState<FarmPoint | null>(null);

  useEffect(() => {
    listFarms().then(setRows);
  }, []);

  const center: [number, number] = rows.length
    ? [rows[0].lat, rows[0].lng]
    : [-5.5, 120.0];

  return (
    <div className="w-full">
      <div className="h-[520px] w-full overflow-hidden rounded-xl border">
        <MapContainer center={center} zoom={13} className="h-full w-full">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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

      <OwnerModal open={!!selected} data={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
