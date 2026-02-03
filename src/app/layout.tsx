import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap", // ✅ better font loading on mobile
});

/* ✅ FIX: viewport must be exported separately in Next.js 16 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* ✅ SEO + Google Search Console verification */
export const metadata: Metadata = {
  title: "Website Profil Desa Bonto Tallasa",
  description: "Website resmi Desa Bonto Tallasa",
  verification: {
    google: "73w5HzKn1ak9YZA5As9Jh1wEQ9jHtJDaImiFQ7fJpuA",
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
