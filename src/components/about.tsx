"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/content";
import { useContent } from "@/content/context";
import { Reveal, SectionHeading } from "./reveal";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums" dir="ltr">
      {display}
      {suffix}
    </span>
  );
}

function StatTile({ stat, index }: { stat: Stat; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="card flex flex-col rounded-2xl p-5 sm:p-6"
    >
      <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
        <span className="text-gradient inline-block pb-1">
          {stat.display ? (
            <span dir="ltr" className="whitespace-nowrap">
              {stat.display}
            </span>
          ) : (
            <Counter value={stat.value ?? 0} suffix={stat.suffix} />
          )}
        </span>
      </p>
      <p className="mt-3 font-medium text-pretty">{stat.label}</p>
      <p className="mt-1 text-sm text-pretty text-muted">{stat.note}</p>
    </motion.div>
  );
}

export function About() {
  const c = useContent();
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading {...c.sections.about} />
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-pretty text-muted">
          {c.about.map((p, i) => (
            <Reveal key={p} delay={i * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <h3 className="eyebrow mt-16 mb-5 font-mono text-xs tracking-[0.2em] text-accent uppercase">{c.impactTitle}</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.stats.map((s, i) => (
            <StatTile key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
