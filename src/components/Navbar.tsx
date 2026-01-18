"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 z-50 w-full transition-all duration-300
        ${scrolled ? "bg-white/60 backdrop-blur-md shadow-sm" : "bg-transparent"}
      `}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* LOGO + TITLE */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="/images/Bantaeng_Regency_Logo 1.png"
              alt="Logo Desa"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex flex-col leading-none">
            <span className="font-bold text-[18px] tracking-[-1px]">
              BONTO
            </span>
            <span className="font-bold text-[18px] tracking-[-1px]">
              TALLASA
            </span>
          </div>
        </div>

        {/* NAV LINKS */}
        <div className="flex gap-12 font-bold text-[18px] tracking-[-1px]">
          <a href="#home">HOME</a>
          <a href="#profil">PROFIL</a>
          <a href="#peta">PETA</a>
          <a href="#kontak">KONTAK</a>
          <a href="#masuk">MASUK</a>
        </div>
      </div>
    </nav>
  );
}
