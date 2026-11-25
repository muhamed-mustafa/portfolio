import type { ReactNode } from "react";
import { Document } from "@/lib/document";
import { arabicFonts } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import "../globals.css";

export { viewport } from "@/lib/document";

export const ensureStatic = "navigation";

export const metadata = siteMetadata("ar");

export default function ArabicLayout({ children }: { children: ReactNode }) {
  return (
    <Document locale="ar" fontClass={arabicFonts}>
      {children}
    </Document>
  );
}
