import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";
import type { ReactNode } from "react";
import { content, links, type Locale } from "@/content";
import { siteUrl } from "./site";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07090d" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
  ],
  colorScheme: "dark light",
};

export const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

function jsonLd(locale: Locale) {
  const c = content[locale];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.en.name,
    alternateName: content.ar.name,
    jobTitle: c.role,
    url: siteUrl,
    email: `mailto:${links.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
    worksFor: { "@type": "Organization", name: "Awamer Alshabaka (AAIT)" },
    sameAs: [links.github, links.linkedin],
    knowsAbout: ["Node.js", "TypeScript", "NestJS", "Microservices", "PostgreSQL", "MongoDB", "Redis", "React", "Next.js"],
  };
}

export function Document({ locale, fontClass, children }: { locale: Locale; fontClass: string; children: ReactNode }) {
  return (
    <html lang={locale} dir={content[locale].dir} data-theme="dark" suppressHydrationWarning className={`${fontClass} antialiased`}>
      {/* App Router root layouts render <head> directly; this rule targets the Pages Router. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="noise min-h-svh">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
