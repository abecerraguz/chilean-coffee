import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Body text & mono
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

// TITLES (Bebas Neue)
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas", // <- usaremos esta CSS var para los headings
});

export const metadata: Metadata = {
  title: "ChileanCoffee - Próximamente",
  description:
    "Café premium con la calidez de la cultura chilena. Estamos trabajando para usted.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
<html className={`${geist.variable} ${geistMono.variable} ${bebas.variable}`} lang="es">
      {/* Usamos Geist para el cuerpo; Bebas la aplicamos en headings vía CSS util */}
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
