"use client";

import Image from "next/image";

type Props = {
  title: string;
  image: string;
  onClick: () => void;
};

export default function InfoCard({ title, image, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        text-left bg-black
        shadow-md
        hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]
        transition-shadow duration-300
        overflow-hidden
      "
    >
      <div className="relative h-60 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-white">
          Klik untuk melihat detail
        </p>
      </div>
    </button>
  );
}
