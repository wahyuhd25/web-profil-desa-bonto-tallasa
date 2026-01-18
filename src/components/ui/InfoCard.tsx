
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
      className="text-left rounded-lg border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
    >
      <div className="relative h-60 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">
          Klik untuk melihat detail
        </p>
      </div>
    </button>
  );
}
