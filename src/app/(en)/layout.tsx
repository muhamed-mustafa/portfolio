import type { ReactNode } from "react";
import { Document } from "@/lib/document";
import { latinFonts } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import "../globals.css";

export { viewport } from "@/lib/document";

export const ensureStatic = "navigation";

export const metadata = siteMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <Document locale="en" fontClass={latinFonts}>
      {children}
    </Document>
  );
}
