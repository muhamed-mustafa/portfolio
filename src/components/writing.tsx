"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useContent } from "@/content/context";
import { posts } from "@/content/posts";
import { SectionHeading } from "./reveal";

export function Writing() {
  const c = useContent();
  const s = c.sections.writing;
  return (
    <section id="writing" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} description={s.note ? `${s.description} ${s.note}` : s.description} />
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((p, i) => (
            <motion.a
              key={p.slug}
              href={`/blog/${p.slug}`}
              hrefLang="en"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
                e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
              }}
              className="card spotlight group flex flex-col rounded-3xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 font-mono text-xs text-muted" dir="ltr">
                <time dateTime={p.date}>{p.dateLabel}</time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" /> {p.readingTime}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-balance" dir="ltr" lang="en">
                {p.title}
              </h3>
              <p className="mt-3 text-pretty text-muted" dir="ltr" lang="en">
                {p.description}
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                <ul className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-full border border-border bg-surface-2/60 px-3 py-1 font-mono text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm text-accent">
                  {s.readMore}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
