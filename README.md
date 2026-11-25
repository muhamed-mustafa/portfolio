# Muhammed Mustafa — Portfolio

Personal portfolio of Muhammed Mustafa, backend software engineer (Node.js, TypeScript, NestJS).

A single, fully static page built with Next.js 16 and animated with Motion.

## Features

- **Live system diagram**: an interactive simulation of the real NATS event flow in [social-microservices](https://github.com/muhamed-mustafa/social-microservices). Trigger an action and watch events travel between services, with an event log
- **Interactive terminal** in the hero: type `help`, `projects`, `skills`, `contact`, `cv` and more
- **English and Arabic**: `/` and `/ar`, with full right-to-left layout, an Arabic typeface and `hreflang` links
- **Blog**: MDX articles with syntax highlighting in light and dark themes
- **Analytics**: Vercel Web Analytics and Speed Insights (active once deployed on Vercel)
- Animated hero with a rotating role line, cursor spotlight and magnetic buttons
- Scroll-driven experience timeline, scroll progress bar and section reveal animations
- Project cards with 3D tilt and spotlight hover, linked to their GitHub repositories
- Command menu (`Ctrl` + `K`) for navigation, links, copying the email and switching theme
- Dark and light themes with no flash on load, animated with the View Transitions API
- Smooth scrolling with Lenis; every animation respects `prefers-reduced-motion`
- SEO: metadata, generated Open Graph image, JSON-LD `Person` data, sitemap and robots
- Statically prerendered: the build fails if the page stops being static (`ensureStatic`)

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Motion, Lenis |
| Icons | Lucide |

## Getting started

Requirements: Node.js 20 or newer and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts:

```bash
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint
```

## Configuration

| Variable | Meaning |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the deployed site, used for canonical links, the sitemap and Open Graph tags |

## Editing content

- All text, experience, projects and skills, in both languages: [`src/content/index.ts`](src/content/index.ts)
- Article list: [`src/content/posts.ts`](src/content/posts.ts); articles themselves: `src/app/(en)/blog/<slug>/page.mdx`
- The CV served by the site: `public/Muhammed_Mustafa_CV.pdf`
