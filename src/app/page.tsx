import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/sections/Hero";
import Profil from "@/sections/Profil";
import Peta from "@/sections/Peta";
import Kontak from "@/sections/Kontak";

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <Profil />
      <Peta />
      <Kontak />
      <Footer />
    </main>
  );
}
