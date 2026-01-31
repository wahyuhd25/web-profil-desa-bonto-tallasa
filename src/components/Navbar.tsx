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
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [activeNav, setActiveNav] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const navButtonClass = (key: string) =>
    [
      "relative px-3 md:px-4 py-1 transition-all duration-200 ease-out",
      "hover:bg-black hover:text-white",
      activeNav === key
        ? "font-black underline decoration-3 underline-offset-4"
        : "font-regular",
    ].join(" ");

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

  const handleNavClick = (key: string) => {
    setActiveNav(key);
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={[
          "fixed top-0 z-50 w-full bg-transparent transition-all duration-300",
          scrolled ? "backdrop-blur-md bg-white/60 shadow-sm" : "",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6 py-3 md:py-4 relative">
          {/* LOGO */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* LOGO IMAGE */}
            <div className="relative h-8 w-8 md:h-10 md:w-10">
              <Image
                src="/images/Bantaeng_Regency_Logo 1.png"
                alt="Logo Desa"
                fill
                className="object-contain"
              />
            </div>

            {/* LOGO TEXT */}
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[14px] md:text-[18px] tracking-[-1px] md:tracking-[-1.4px]">
                BONTO
              </span>
              <span className="font-bold text-[14px] md:text-[18px] tracking-[-1px] md:tracking-[-1.4px]">
                TALLASA
              </span>
            </div>
          </div>

          {/* NAV LINKS – DESKTOP */}
          <div className="hidden md:flex gap-4 text-[18px] tracking-[-1px]">
            <a
              href="#home"
              className={navButtonClass("home")}
              onClick={() => handleNavClick("home")}
            >
              HOME
            </a>
            <a
              href="#profil"
              className={navButtonClass("profil")}
              onClick={() => handleNavClick("profil")}
            >
              PROFIL
            </a>
            <a
              href="#peta"
              className={navButtonClass("peta")}
              onClick={() => handleNavClick("peta")}
            >
              PETA
            </a>
            <a
              href="#kontak"
              className={navButtonClass("kontak")}
              onClick={() => handleNavClick("kontak")}
            >
              KONTAK
            </a>

            {authed === false && (
              <button
                type="button"
                className={navButtonClass("masuk")}
                onClick={() => {
                  handleNavClick("masuk");
                  setOpenLogin(true);
                }}
              >
                MASUK
              </button>
            )}

            {authed === true && (
              <button
                type="button"
                className={navButtonClass("admin")}
                onClick={() => {
                  handleNavClick("admin");
                  router.push("/admin");
                }}
              >
                ADMIN
              </button>
            )}
          </div>

          {/* BURGER BUTTON – MOBILE */}
          <button
            type="button"
            className="
              md:hidden
              flex items-center justify-center
              h-9 w-9
              rounded-full
              border border-black/15
              bg-white/80
              shadow-sm
              hover:bg-black hover:border-black hover:shadow-md
              transition-all duration-200
            "
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <div className="flex flex-col items-center justify-center gap-[3px]">
              {/* Line 1 */}
              <span
                className={`
                  h-[2px] w-4 rounded-full bg-black
                  transition-all duration-200
                  ${mobileOpen ? "translate-y-[5px] rotate-45 bg-white" : ""}
                `}
              />
              {/* Line 2 */}
              <span
                className={`
                  h-[2px] w-4 rounded-full bg-black
                  transition-all duration-200
                  ${mobileOpen ? "opacity-0" : ""}
                `}
              />
              {/* Line 3 */}
              <span
                className={`
                  h-[2px] w-4 rounded-full bg-black
                  transition-all duration-200
                  ${mobileOpen ? "-translate-y-[5px] -rotate-45 bg-white" : ""}
                `}
              />
            </div>
          </button>

          {/* MOBILE MENU DROPDOWN */}
          {mobileOpen && (
            <div
              className="
                md:hidden
                absolute right-4 top-full mt-2
                w-48
                rounded-xl
                bg-white
                shadow-lg
                border border-black/10
                overflow-hidden
                text-sm
              "
            >
              <a
                href="#home"
                className={`
                  block px-4 py-2
                  ${
                    activeNav === "home"
                      ? "bg-black text-white font-semibold"
                      : "hover:bg-black/5"
                  }
                `}
                onClick={() => handleNavClick("home")}
              >
                HOME
              </a>
              <a
                href="#profil"
                className={`
                  block px-4 py-2
                  ${
                    activeNav === "profil"
                      ? "bg-black text-white font-semibold"
                      : "hover:bg-black/5"
                  }
                `}
                onClick={() => handleNavClick("profil")}
              >
                PROFIL
              </a>
              <a
                href="#peta"
                className={`
                  block px-4 py-2
                  ${
                    activeNav === "peta"
                      ? "bg-black text-white font-semibold"
                      : "hover:bg-black/5"
                  }
                `}
                onClick={() => handleNavClick("peta")}
              >
                PETA
              </a>
              <a
                href="#kontak"
                className={`
                  block px-4 py-2
                  ${
                    activeNav === "kontak"
                      ? "bg-black text-white font-semibold"
                      : "hover:bg-black/5"
                  }
                `}
                onClick={() => handleNavClick("kontak")}
              >
                KONTAK
              </a>

              {authed === false && (
                <button
                  type="button"
                  className={`
                    w-full text-left px-4 py-2
                    ${
                      activeNav === "masuk"
                        ? "bg-black text-white font-semibold"
                        : "hover:bg-black/5"
                    }
                  `}
                  onClick={() => {
                    handleNavClick("masuk");
                    setOpenLogin(true);
                  }}
                >
                  MASUK
                </button>
              )}

              {authed === true && (
                <button
                  type="button"
                  className={`
                    w-full text-left px-4 py-2
                    ${
                      activeNav === "admin"
                        ? "bg-black text-white font-semibold"
                        : "hover:bg-black/5"
                    }
                  `}
                  onClick={() => {
                    handleNavClick("admin");
                    router.push("/admin");
                  }}
                >
                  ADMIN
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={() => {
          setActiveNav("admin");
          setMobileOpen(false);
          router.push("/admin");
        }}
      />
    </>
  );
}
