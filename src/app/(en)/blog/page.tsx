import { ArrowUpRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical write-ups by Muhammed Mustafa on backend engineering: caching, concurrency, authentication and system design.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">Writing</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Notes from things I&apos;ve built.</h1>
      <p className="mt-5 text-lg text-muted">Technical write-ups of problems I solved in my own projects, with the code linked.</p>
      <ul className="mt-14 space-y-5">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="card group block rounded-3xl p-6 transition-colors hover:border-accent sm:p-8">
              <div className="flex items-center gap-3 font-mono text-xs text-muted">
                <time dateTime={p.date}>{p.dateLabel}</time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" /> {p.readingTime}
                </span>
              </div>
              <h2 className="mt-3 flex items-start justify-between gap-4 text-2xl font-semibold tracking-tight">
                {p.title}
                <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </h2>
              <p className="mt-3 text-muted">{p.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
