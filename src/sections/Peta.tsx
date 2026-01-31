"use client";

import dynamic from "next/dynamic";

const MapLeaflet = dynamic(() => import("@/components/MapLeaflet"), {
  ssr: false,
});

export default function Peta() {
  return (
    <section id="peta" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Peta Desa</h2>

      <div className="h-[400px] w-full rounded-xl shadow-lg">
        <MapLeaflet />
      </div>
    </section>
  );
}
