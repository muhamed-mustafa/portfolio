const DEFAULT_SITE_URL = "https://muhamed-mustafa.vercel.app";

function resolveSiteUrl() {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
  try {
    return new URL(raw).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/** Public origin of the site, used for canonical links, the sitemap and Open Graph tags. */
export const siteUrl = resolveSiteUrl();

export const siteTitle = "Muhammed Mustafa — Backend Software Engineer";

export const siteDescription =
  "Backend software engineer building production APIs and services with Node.js, TypeScript and NestJS: real-time features, event-driven microservices, PostgreSQL, MongoDB and Redis.";
