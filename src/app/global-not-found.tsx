import type { Metadata } from "next";
import Link from "next/link";
import { latinFonts } from "@/lib/fonts";
import { themeScript } from "@/lib/document";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Page not found — Muhammed Mustafa",
  description: "This page does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${latinFonts} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-svh">
        <main className="relative grid min-h-svh place-items-center px-6 text-center">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
          <div className="relative">
            <p className="font-mono text-sm text-accent">404</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page doesn&apos;t exist.</h1>
            <p className="mt-3 text-muted">The link may be broken, or the page may have moved.</p>
            <p className="mt-1 text-muted" dir="rtl" lang="ar">
              هذه الصفحة غير موجودة.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">
                Back to the portfolio
              </Link>
              <Link href="/ar" lang="ar" className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-medium">
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
