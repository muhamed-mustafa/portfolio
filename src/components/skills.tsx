"use client";

import { Boxes, Cable, Database, Layers, MonitorSmartphone, Server } from "lucide-react";
import { motion } from "motion/react";
import { marquee, skillGroups } from "@/data/profile";
import { SectionHeading } from "./reveal";

const icons = [Server, Cable, Database, Boxes, MonitorSmartphone, Layers];

export function Skills() {
  return (
    <section id="skills" className="overflow-hidden py-28">
      <div className="px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Skills" title="The tools I reach for." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="card rounded-2xl p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="font-semibold">{g.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-lg border border-border bg-surface-2/60 px-2.5 py-1 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
      </div>

      <div className="relative mt-20 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...marquee, ...marquee].map((s, i) => (
            <span key={`${s}-${i}`} className="rounded-full border border-border bg-surface px-5 py-2 font-mono text-sm whitespace-nowrap text-muted">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
