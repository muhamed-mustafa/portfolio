import type { Metadata } from "next";
import { content, type Locale } from "@/content";
import { siteUrl } from "./site";

const descriptions: Record<Locale, string> = {
  en: "Backend software engineer building production APIs and services with Node.js, TypeScript and NestJS: real-time features, event-driven microservices, PostgreSQL, MongoDB and Redis.",
  ar: "مهندس برمجيات Backend يبني واجهات برمجية وخدمات تعمل في بيئة الإنتاج باستخدام Node.js وTypeScript وNestJS: ميزات لحظية، وmicroservices قائمة على الأحداث، وPostgreSQL وMongoDB وRedis.",
};

/** The share image lives at the app root; route groups do not inherit it, so pages link it explicitly. */
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Muhammed Mustafa — Backend Software Engineer",
};

export function siteMetadata(locale: Locale): Metadata {
  const c = content[locale];
  const title = `${c.name} — ${c.role}`;
  const description = descriptions[locale];
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s — ${c.name}` },
    description,
    applicationName: `${c.name} — Portfolio`,
    authors: [{ name: content.en.name, url: "https://github.com/muhamed-mustafa" }],
    creator: content.en.name,
    keywords: [
      "Muhammed Mustafa",
      "محمد مصطفى",
      "Backend Engineer",
      "Software Engineer",
      "Node.js",
      "TypeScript",
      "NestJS",
      "Microservices",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Cairo",
      "Egypt",
    ],
    alternates: {
      canonical: c.home,
      languages: { en: "/", ar: "/ar", "x-default": "/" },
    },
    openGraph: {
      type: "profile",
      url: c.home,
      title,
      description,
      siteName: `${content.en.name} — Portfolio`,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_EG"],
      firstName: "Muhammed",
      lastName: "Mustafa",
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}
