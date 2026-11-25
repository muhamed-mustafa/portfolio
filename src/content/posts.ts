export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  readingTime: string;
  tags: string[];
  repo: string;
};

export const posts: Post[] = [
  {
    slug: "making-a-redis-cache-correct",
    title: "Making a Redis cache correct under concurrency",
    description:
      "Cache-aside is easy until two requests race. How I added stampede protection, token-owned locks, lock renewal and Lua-guarded writes, step by step.",
    date: "2026-11-20",
    dateLabel: "Nov 20, 2026",
    readingTime: "9 min read",
    tags: ["Redis", "NestJS", "Concurrency"],
    repo: "redis-mastery-lab",
  },
  {
    slug: "keeping-tokens-out-of-the-browser",
    title: "Keeping tokens out of the browser with a backend-for-frontend",
    description:
      "Why my Next.js admin panel never gives the browser an access token, and the session, CSRF and refresh-rotation details that make that work.",
    date: "2026-11-24",
    dateLabel: "Nov 24, 2026",
    readingTime: "8 min read",
    tags: ["Next.js", "Security", "Auth"],
    repo: "airbnb-clone-web",
  },
];

export function getPost(slug: string) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) throw new Error(`Unknown post: ${slug}`);
  return post;
}
