"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { links, type Project } from "@/content";
import { useContent } from "@/content/context";
import { cn } from "@/lib/cn";
import { GitHubIcon } from "./icons";
import { SectionHeading } from "./reveal";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const c = useContent();
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 200, damping: 20 });
  const href = `${links.github}/${project.repo}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        px.set(x);
        py.set(y);
        e.currentTarget.style.setProperty("--mx", `${x * 100}%`);
        e.currentTarget.style.setProperty("--my", `${y * 100}%`);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className={cn("card spotlight group flex flex-col rounded-3xl p-6 sm:p-8", project.featured && "md:col-span-2")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {project.featured ? (
            <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-accent uppercase">
              <Star className="size-3" /> {c.ui.featured}
            </span>
          ) : null}
          <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-1 font-mono text-xs text-muted" dir="ltr">
            {project.repo}
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — GitHub`}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-muted transition-all group-hover:border-accent group-hover:text-foreground"
        >
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
        </a>
      </div>

      <p className="mt-5 text-pretty text-muted">{project.summary}</p>

      <ul className={cn("mt-5 grid gap-2", project.featured && "sm:grid-cols-2")}>
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-sm text-pretty">
            <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-2" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
        <ul className="flex flex-wrap gap-2" aria-label={c.ui.tech}>
          {project.stack.map((s) => (
            <li key={s} className="rounded-full border border-border bg-surface-2/60 px-3 py-1 font-mono text-xs text-muted">
              {s}
            </li>
          ))}
        </ul>
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
          <GitHubIcon className="size-4" /> {c.ui.source}
        </a>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const c = useContent();
  return (
    <section id="projects" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading {...c.sections.projects} />
        <div className="grid gap-5 md:grid-cols-2">
          {c.projects.map((p, i) => (
            <ProjectCard key={p.repo} project={p} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent hover:text-foreground"
          >
            <GitHubIcon className="size-4" /> {c.ui.moreOnGithub}
          </a>
        </div>
      </div>
    </section>
  );
}
