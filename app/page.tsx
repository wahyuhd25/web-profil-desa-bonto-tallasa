export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="font-semibold">Desa Bonto Tallasa</h1>
          <div className="flex gap-6 text-sm">
            <a href="#home" className="hover:underline">Home</a>
            <a href="#profil" className="hover:underline">Profil</a>
            <a href="#peta" className="hover:underline">Peta</a>
            <a href="#kontak" className="hover:underline">Kontak</a>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <section id="home" className="pt-24 min-h-screen flex items-center justify-center bg-zinc-50">
        <h2 className="text-3xl font-bold">Website Profil Desa Bonto Tallasa</h2>
      </section>

      <section id="profil" className="min-h-screen px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Profil Desa</h2>
        <p className="text-zinc-700 leading-relaxed">
          Desa Bonto Tallasa merupakan salah satu desa yang berada di wilayah Kabupaten Bantaeng.
          Desa ini memiliki potensi pertanian dan usaha masyarakat yang cukup besar.
        </p>
      </section>

      <section id="peta" className="min-h-screen px-6 py-20 bg-zinc-100">
        <h2 className="text-2xl font-semibold mb-4 text-center">Peta Interaktif Desa</h2>
        <div className="h-[400px] bg-white border flex items-center justify-center">
          <p className="text-zinc-500">Peta Leaflet akan ditampilkan di sini</p>
        </div>
      </section>

      <section id="kontak" className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Kontak</h2>
        <p className="text-zinc-700">
          Alamat Kantor Desa: Desa Bonto Tallasa<br />
          Kontak: 08xxxxxxxxxx
        </p>
      </section>

      <footer className="py-6 text-center text-sm text-zinc-500 border-t">
        © 2026 Desa Bonto Tallasa
      </footer>
    </main>
  );
}
