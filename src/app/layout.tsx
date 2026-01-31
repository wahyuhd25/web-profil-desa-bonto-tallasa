import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap", // ✅ better font loading on mobile
});

export const metadata: Metadata = {
  title: "Website Profil Desa Bonto Tallasa",
  description: "Website resmi Desa Bonto Tallasa",
  viewport: "width=device-width, initial-scale=1", // ✅ critical for mobile
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
