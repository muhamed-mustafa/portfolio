"use client";

import { ArrowUpRight, Check, Copy, FileDown, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { links } from "@/content";
import { useContent } from "@/content/context";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Reveal } from "./reveal";

export function Contact() {
  const c = useContent();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  }

  const socials = [
    { href: links.linkedin, label: "LinkedIn", icon: LinkedInIcon },
    { href: links.github, label: "GitHub", icon: GitHubIcon },
  ];

  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="card relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--accent),transparent_65%)] opacity-25 blur-3xl" />
              <div className="bg-grid absolute inset-0 opacity-60" />
            </div>
            <div className="relative">
              <p className="eyebrow mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">{c.contact.eyebrow}</p>
              <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {c.contact.titleStart}
                <span className="text-gradient">{c.contact.titleAccent}</span>
                {c.contact.titleEnd}
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-pretty text-muted">{c.contact.description}</p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${links.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform active:scale-95"
                >
                  <Mail className="size-4" /> <span dir="ltr">{links.email}</span>
                </a>
                <button
                  type="button"
                  onClick={copy}
                  aria-label={c.ui.copyEmail}
                  className="relative grid size-12 place-items-center rounded-full border border-border bg-surface/70 text-muted transition-colors hover:text-foreground"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "ok" : "copy"}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                    </motion.span>
                  </AnimatePresence>
                </button>
                <span className="sr-only" role="status">
                  {copied ? c.ui.emailCopied : ""}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {socials.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-foreground"
                  >
                    <Icon className="size-4" /> {label}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
                  </a>
                ))}
                <a
                  href={links.cv}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-foreground"
                >
                  <FileDown className="size-4" /> {c.ui.downloadCv}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
