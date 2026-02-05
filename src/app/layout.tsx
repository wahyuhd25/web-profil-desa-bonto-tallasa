import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/* ✅ Viewport (Next.js 16 correct way) */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* ✅ SEO + Google + Site Name fix */
export const metadata: Metadata = {
  title: {
    default: "Profil Desa Bonto Tallasa Bantaeng",
    template: "%s | Desa Bonto Tallasa",
  },
  description: "Website resmi Desa Bonto Tallasa, Kecamatan Uluere, Kabupaten Bantaeng, Provinsi Sulawesi Selatan.",
  applicationName: "Desa Bonto Tallasa",

  verification: {
    google: "73w5HzKn1ak9YZA5As9Jh1wEQ9jHtJDaImiFQ7fJpuA",
  },

  openGraph: {
    title: "Profil Desa Bonto Tallasa Bantaeng",
    description:
      "Website resmi Desa Bonto Tallasa, Kecamatan Uluere, Kabupaten Bantaeng, Provinsi Sulawesi Selatan.",
    siteName: "Desa Bonto Tallasa Bantaeng", 
    url: "https://web-profil-desa-bonto-tallasa-iord.vercel.app",
    type: "website",
    locale: "id_ID",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`
          ${jakartaSans.variable}
          antialiased
          overflow-x-hidden
          min-h-screen
        `}
      >
        {children}
      </body>
    </html>
  );
}
