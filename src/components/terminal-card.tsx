"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { content, links } from "@/content";
import { posts } from "@/content/posts";
import { scrollToId } from "@/lib/cn";
import { applyTheme } from "./theme-toggle";

const command = "curl -s localhost:3000/api/engineer | jq";

const response: Array<[string, string]> = [
  ["{", ""],
  ['  "name": ', '"Muhammed Mustafa",'],
  ['  "role": ', '"Backend Software Engineer",'],
  ['  "experience": ', '"4+ years",'],
  ['  "stack": ', '["Node.js", "TypeScript", "NestJS"],'],
  ['  "data": ', '["PostgreSQL", "MongoDB", "Redis"],'],
  ['  "focus": ', '["APIs", "Microservices", "Real-time"],'],
  ['  "available": ', "true"],
  ["}", ""],
];

const ARROW = "➜";
const CURSOR = "▋";

type Line = { id: number; node: ReactNode };

function Prompt() {
  return (
    <>
      <span className="text-emerald-600 dark:text-emerald-400">{ARROW}</span> <span className="text-accent">~</span>{" "}
    </>
  );
}

export function TerminalCard() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? command.length : 0);
  const [lines, setLines] = useState(reduce ? response.length : 0);
  const [history, setHistory] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const idRef = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ready = lines >= response.length;

  useEffect(() => {
    if (reduce) return;
    let t = window.setTimeout(function tick() {
      setTyped((n) => {
        if (n < command.length) {
          t = window.setTimeout(tick, 38);
          return n + 1;
        }
        return n;
      });
    }, 1100);
    return () => window.clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (reduce || typed < command.length) return;
    const id = window.setInterval(() => {
      setLines((n) => {
        if (n >= response.length) {
          window.clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 110);
    return () => window.clearInterval(id);
  }, [typed, reduce]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  function out(...nodes: ReactNode[]) {
    return nodes.map((node) => ({ id: idRef.current++, node }));
  }

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    const echo = out(
      <>
        <Prompt />
        <span>{raw}</span>
      </>,
    );
    const en = content.en;
    let result: Line[] = [];
    switch (cmd) {
      case "":
        break;
      case "help":
        result = out(
          <span className="text-muted">Available commands:</span>,
          ...[
            ["whoami", "who I am"],
            ["projects", "open-source projects"],
            ["experience", "where I've worked"],
            ["skills", "tools I use"],
            ["blog", "articles I've written"],
            ["contact", "how to reach me"],
            ["cv", "download my CV"],
            ["theme", "toggle light / dark"],
            ["clear", "clear the screen"],
          ].map(([k, v]) => (
            <span key={k}>
              <span className="text-accent">{k.padEnd(12)}</span>
              <span className="text-muted">{v}</span>
            </span>
          )),
        );
        break;
      case "whoami":
        result = out(<span>{en.name}: {en.role}, {en.location}.</span>, <span className="text-muted">{en.intro}</span>);
        break;
      case "projects":
        result = out(
          ...en.projects.map((p) => (
            <span key={p.repo}>
              <span className="text-accent">{p.repo.padEnd(24)}</span>
              <span className="text-muted">{p.stack.slice(0, 3).join(", ")}</span>
            </span>
          )),
        );
        scrollToId("projects");
        break;
      case "experience":
        result = out(
          ...en.experience.map((e) => (
            <span key={e.period}>
              <span className="text-accent">{e.company.padEnd(26)}</span>
              <span className="text-muted">{e.period}</span>
            </span>
          )),
        );
        break;
      case "skills":
        result = out(...en.skillGroups.map((g) => <span key={g.title}><span className="text-accent">{g.title.padEnd(18)}</span><span className="text-muted">{g.items.join(", ")}</span></span>));
        break;
      case "blog":
        result = out(...posts.map((p) => <a key={p.slug} className="underline decoration-dotted hover:text-accent" href={`/blog/${p.slug}`}>{p.title}</a>));
        break;
      case "contact":
        result = out(<a className="hover:text-accent" href={`mailto:${links.email}`}>{links.email}</a>, <a className="hover:text-accent" href={links.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/muhammedmustafa14</a>);
        break;
      case "cv":
        window.open(links.cv, "_blank", "noopener");
        result = out(<span className="text-muted">Opening CV...</span>);
        break;
      case "theme": {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        result = out(<span className="text-muted">Theme set to {next}.</span>);
        break;
      }
      case "sudo hire-me":
      case "sudo hire me":
        result = out(<span className="text-emerald-600 dark:text-emerald-400">Permission granted. Let&apos;s talk: {links.email}</span>);
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        result = out(<span className="text-rose-500">command not found: {cmd}. Try &quot;help&quot;.</span>);
    }
    setHistory((h) => [...h, ...echo, ...result].slice(-60));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      dir="ltr"
    >
      <div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-accent-2/25 blur-2xl" />
      <div
        className="card relative overflow-hidden rounded-2xl font-mono text-[13px] leading-relaxed shadow-2xl"
        onClick={() => ready && inputRef.current?.focus()}
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-muted">~/portfolio {"—"} zsh</span>
          {ready ? <span className="ml-auto text-[11px] text-muted">type &quot;help&quot;</span> : null}
        </div>
        <div ref={bodyRef} data-lenis-prevent className="h-[21rem] overflow-y-auto p-5">
          <p aria-hidden="true">
            <Prompt />
            <span>{command.slice(0, typed)}</span>
            {typed < command.length ? <span className="animate-blink text-accent">{CURSOR}</span> : null}
          </p>
          <div className="mt-3" aria-hidden="true">
            {response.slice(0, lines).map(([k, v], i) => (
              <motion.p key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="whitespace-pre">
                <span className="text-sky-700 dark:text-sky-300">{k}</span>
                <span className={v === "true" ? "text-violet-600 dark:text-violet-400" : "text-emerald-700 dark:text-emerald-400"}>{v}</span>
              </motion.p>
            ))}
          </div>
          {ready ? (
            <div className="mt-3 space-y-0.5" aria-live="polite">
              {history.map((l) => (
                <p key={l.id} className="whitespace-pre-wrap">
                  {l.node}
                </p>
              ))}
              <form
                className="flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  run(input);
                  setInput("");
                }}
              >
                <label htmlFor="terminal-input" className="shrink-0">
                  <Prompt />
                </label>
                <input
                  id="terminal-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal command"
                  placeholder="help"
                  className="w-full bg-transparent caret-accent outline-none placeholder:text-muted/60"
                />
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
