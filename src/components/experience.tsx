"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { experience } from "@/data/profile";
import { Reveal, SectionHeading } from "./reveal";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've been shipping."
          description="Production backends for client products, fintech systems and freelance projects since 2021."
        />
        <div ref={ref} className="relative pl-8 sm:pl-12">
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-border sm:left-[11px]" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-accent to-accent-2 sm:left-[11px]"
          />
          <ol className="space-y-12">
            {experience.map((job, i) => (
              <li key={job.company} className="relative">
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="absolute top-2 -left-8 grid size-4 place-items-center rounded-full border border-accent bg-background sm:-left-12 sm:size-6"
                >
                  <span className="size-1.5 rounded-full bg-accent sm:size-2" />
                </motion.span>
                <Reveal delay={i * 0.05}>
                  <div className="card spotlight-host rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl font-semibold tracking-tight">{job.role}</h3>
                      <span className="font-mono text-xs text-muted">{job.period}</span>
                    </div>
                    <p className="mt-1 text-accent">{job.company}</p>
                    <p className="text-sm text-muted">{job.location}</p>
                    <ul className="mt-5 space-y-2.5">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-3 text-pretty text-muted">
                          <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                      {job.tags.map((t) => (
                        <li key={t} className="rounded-full border border-border bg-surface-2/60 px-3 py-1 font-mono text-xs text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
