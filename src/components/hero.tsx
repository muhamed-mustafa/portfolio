"use client";

import { ArrowDown, ArrowUpRight, FileDown, MapPin } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useContent } from "@/content/context";
import { links } from "@/content";
import { scrollToId } from "@/lib/cn";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { TerminalCard } from "./terminal-card";

const ease = [0.22, 1, 0.36, 1] as const;

function RoleRotator({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % roles.length), 2800);
    return () => window.clearInterval(id);
  }, [reduce, roles.length]);
  return (
    <span className="relative inline-flex h-[1.5em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.55, ease }}
          className="text-gradient whitespace-nowrap"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
      <span className="ms-0.5 animate-blink text-accent">|</span>
    </span>
  );
}

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const c = useContent();
  const nameWords = c.name.split(" ");
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, var(--glow), transparent 60%)`;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 animate-aurora rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--accent),transparent_60%)] opacity-25 blur-3xl" />
        <div className="absolute top-20 right-[-10rem] h-[30rem] w-[30rem] animate-aurora rounded-full bg-[radial-gradient(circle,var(--accent-2),transparent_60%)] opacity-20 blur-3xl [animation-delay:-6s]" />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.2fr_1fr]"
      >
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {c.badge}
          </motion.div>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl lg:text-6xl xl:text-7xl">
            {nameWords.map((word, i) => (
              <span key={word}>
                <span className="inline-block overflow-hidden pb-3 align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < nameWords.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
            className="mt-4 max-w-full text-lg font-medium tracking-tight sm:text-2xl md:text-3xl"
          >
            <RoleRotator roles={c.rotatingRoles} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="mt-6 max-w-xl text-lg text-pretty text-muted"
          >
            {c.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToId("projects")}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform active:scale-95"
              >
                {c.ui.viewWork}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={links.cv}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:border-accent"
              >
                <FileDown className="size-4" /> {c.ui.downloadCv}
              </a>
            </Magnetic>
            <div className="ms-1 flex items-center gap-1">
              <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground">
                <GitHubIcon className="size-5" />
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground">
                <LinkedInIcon className="size-5" />
              </a>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex items-center gap-1.5 text-sm text-muted"
          >
            <MapPin className="size-4" /> {c.location}
          </motion.p>
        </div>
        <div className="hidden lg:block">
          <TerminalCard />
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollToId("about")}
        aria-label={c.ui.scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.2 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 grid size-10 -translate-x-1/2 place-items-center rounded-full border border-border text-muted hover:text-foreground"
      >
        <ArrowDown className="size-4" />
      </motion.button>
    </section>
  );
}
