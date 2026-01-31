import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/sections/Hero";
import Profil from "@/sections/Profil";
import Peta from "@/sections/Peta";
import Kontak from "@/sections/Kontak";

export default function Home() {
  return (
    <main className="min-h-screen font-sans flex flex-col">
      <Navbar />

      {/* Content grows and scrolls, footer stays at the bottom */}
      <div className="flex-1">
        <Hero />
        <Profil />
        <Peta />
        <Kontak />
      </div>
      <Footer />
    </main>
  );
}
