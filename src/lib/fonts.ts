import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";

export const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
export const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
export const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const latinFonts = `${geistSans.variable} ${geistMono.variable}`;
export const arabicFonts = `${geistSans.variable} ${geistMono.variable} ${plexArabic.variable}`;
