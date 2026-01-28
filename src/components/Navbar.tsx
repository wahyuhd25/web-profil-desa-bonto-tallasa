"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LoginModal from "@/components/ui/LoginModal";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null); // null = belum dicek
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthed(!!user);
    });
    return () => unsub();
  }, []);

  return (
    <>
      <nav
        className={[
          "fixed top-0 z-50 w-full bg-transparent transition-all duration-300",
          scrolled ? "backdrop-blur-md bg-white/60 shadow-sm" : "",
        ].join(" ")}
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
              <span className="font-bold text-[18px] tracking-[-1.4px]">
                BONTO
              </span>
              <span className="font-bold text-[18px] tracking-[-1.4px]">
                TALLASA
              </span>
            </div>
          </div>

          {/* NAV LINKS */}
          <div className="flex gap-12 font-bold text-[18px] tracking-[-1.4px]">
            <a href="#home">HOME</a>
            <a href="#profil">PROFIL</a>
            <a href="#peta">PETA</a>
            <a href="#kontak">KONTAK</a>

            {/* Auth-aware button */}
            {authed === false && (
              <button type="button" onClick={() => setOpenLogin(true)}>
                MASUK
              </button>
            )}

            {authed === true && (
              <button type="button" onClick={() => router.push("/admin")}>
                ADMIN
              </button>
            )}
          </div>
        </div>
      </nav>

      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={() => router.push("/admin")}
      />
    </>
  );
}
