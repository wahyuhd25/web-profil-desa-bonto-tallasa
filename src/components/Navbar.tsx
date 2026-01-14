export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="font-semibold">Desa Bonto Tallasa</h1>
        <div className="flex gap-6 text-sm">
          <a href="#home">Home</a>
          <a href="#profil">Profil</a>
          <a href="#peta">Peta</a>
          <a href="#kontak">Kontak</a>
        </div>
      </div>
    </nav>
  );
}
