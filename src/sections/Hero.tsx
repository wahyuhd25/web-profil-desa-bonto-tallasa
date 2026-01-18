import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-24 h-[92vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/images/FotoGapura.jpg"
        alt="Hero background desa"
        fill
        className="object-cover"
        priority
      />

      {/* TOP Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-[30%] z-[6] pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(255,255,255,1) 40%,
              rgba(255,255,255,0.3) 70%,
              rgba(255,255,255,0) 100%
            )
          `,
        }}
      />

      {/* Bottom Overlay */}
      <div
        className="absolute bottom-0 left-0 w-full h-[70%] z-[5] pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to top,
              rgba(255,255,255,1) 0%,
              rgba(255,255,255,0.85) 50%,
              rgba(255,255,255,0.6) 75%,
              rgba(255,255,255,0) 100%
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center pt-82">
        <h3 className="text-[28px] text-black mb-1 font-semibold tracking-[-0.7px]">
          Selamat Datang di Website Profil Desa
        </h3>

        {/* Logo + Title */}
        <div className="flex items-center justify-center gap-3 pb-14">
          <div className="relative w-24 h-24">
            <Image
              src="/images/Bantaeng_Regency_Logo 1.png"
              alt="Logo Desa Bonto Tallasa"
              fill
              className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
              priority
            />
          </div>

          <h2 className="text-[92px] font-extrabold text-black leading-none tracking-[-6px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
            Bonto Tallasa.
          </h2>
        </div>
      </div>

{/* BLACK INFO BAR – WIDER SOLID CENTER */}
<div className="absolute bottom-2 left-0 w-full z-20 flex justify-center pointer-events-none">
  <div
    className="px-92 py-5 pointer-events-auto"
    style={{
      background: `
        linear-gradient(
          to right,
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,1) 25%,
          rgba(0,0,0,1) 75%,
          rgba(0,0,0,0) 100%
        )
      `,
    }}
  >
    <p className="text-[24px] text-white tracking-[-0.7px] text-center">
      Kecamatan Uluere, Kabupaten Bantaeng, Provinsi Sulawesi Selatan
    </p>
  </div>

      </div>
    </section>
  );
}
