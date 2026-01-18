"use client";

import { useState } from "react";
import InfoCard from "@/components/ui/InfoCard";
import InfoModal from "@/components/ui/InfoModal";
import { informasiDesa } from "@/data/informasiDesa";

export default function Profil() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <section
      id="profil"
      className="py-20 px-6 max-w-6xl mx-auto"
    >
      {/* JUDUL SECTION */}
      <h2 className="text-3xl font-bold text-center mb-10">
        Profil Desa
      </h2>

      {/* GRID CARD 2 KOLOM */}
      <div className="grid gap-6 md:grid-cols-2">
        {informasiDesa.map((item) => (
          <InfoCard
            key={item.id}
            title={item.title}
            image={item.image}
            onClick={() => setSelected(item)}
          />
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <InfoModal
          open={!!selected}
          title={selected.title}
          image={selected.image}
          content={selected.content}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
