"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

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

export function TerminalCard() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? command.length : 0);
  const [lines, setLines] = useState(reduce ? response.length : 0);

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

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 30, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-accent-2/25 blur-2xl" />
      <div className="card relative overflow-hidden rounded-2xl font-mono text-[13px] leading-relaxed shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-muted">~/portfolio {"—"} zsh</span>
        </div>
        <div className="min-h-[19rem] p-5">
          <p>
            <span className="text-emerald-600 dark:text-emerald-400">{"➜"}</span> <span className="text-accent">~</span>{" "}
            <span>{command.slice(0, typed)}</span>
            {typed < command.length ? <span className="animate-blink text-accent">{"▋"}</span> : null}
          </p>
          <div className="mt-3">
            {response.slice(0, lines).map(([k, v], i) => (
              <motion.p key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="whitespace-pre">
                <span className="text-sky-700 dark:text-sky-300">{k}</span>
                <span className={v === "true" ? "text-violet-600 dark:text-violet-400" : "text-emerald-700 dark:text-emerald-400"}>{v}</span>
              </motion.p>
            ))}
            {lines >= response.length ? (
              <p className="mt-2">
                <span className="text-emerald-600 dark:text-emerald-400">{"➜"}</span> <span className="text-accent">~</span>{" "}
                <span className="animate-blink text-accent">{"▋"}</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
