"use client";

import { Ban, CreditCard, MessageSquare, Play, RotateCcw, ShoppingCart, TimerOff } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore, type ComponentType } from "react";
import { links, type ScenarioId } from "@/content";
import { useContent } from "@/content/context";
import { cn } from "@/lib/cn";
import { GitHubIcon } from "./icons";
import { SectionHeading } from "./reveal";

type Svc = "auth" | "post" | "comment" | "reply" | "market" | "order" | "payment" | "expiration";

const SVCS: Svc[] = ["auth", "post", "comment", "reply", "market", "order", "payment", "expiration"];
const DB: Record<Svc, string> = {
  auth: "MongoDB",
  post: "MongoDB",
  comment: "MongoDB",
  reply: "MongoDB",
  market: "MongoDB",
  order: "MongoDB",
  payment: "MongoDB",
  expiration: "Redis · Bull",
};

type Layout = {
  w: number;
  h: number;
  nodeW: number;
  nodeH: number;
  vertical: boolean;
  bus: number;
  pos: Record<Svc, { x: number; y: number }>;
};

const wide: Layout = {
  w: 790,
  h: 460,
  nodeW: 128,
  nodeH: 54,
  vertical: false,
  bus: 230,
  pos: {
    auth: { x: 110, y: 78 },
    post: { x: 300, y: 78 },
    comment: { x: 490, y: 78 },
    reply: { x: 680, y: 78 },
    market: { x: 110, y: 382 },
    order: { x: 300, y: 382 },
    payment: { x: 490, y: 382 },
    expiration: { x: 680, y: 382 },
  },
};

const tall: Layout = {
  w: 360,
  h: 560,
  nodeW: 116,
  nodeH: 54,
  vertical: true,
  bus: 180,
  pos: {
    auth: { x: 66, y: 70 },
    post: { x: 66, y: 210 },
    comment: { x: 66, y: 350 },
    reply: { x: 66, y: 490 },
    market: { x: 294, y: 70 },
    order: { x: 294, y: 210 },
    payment: { x: 294, y: 350 },
    expiration: { x: 294, y: 490 },
  },
};

function subscribeNarrow(cb: () => void) {
  const mq = window.matchMedia("(max-width: 639px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function useNarrow() {
  return useSyncExternalStore(subscribeNarrow, () => window.matchMedia("(max-width: 639px)").matches, () => false);
}

function anchor(L: Layout, s: Svc) {
  const p = L.pos[s];
  if (L.vertical) return { x: p.x < L.bus ? p.x + L.nodeW / 2 : p.x - L.nodeW / 2, y: p.y };
  return { x: p.x, y: p.y < L.bus ? p.y + L.nodeH / 2 : p.y - L.nodeH / 2 };
}

function route(L: Layout, from: Svc, to: Svc) {
  const a = anchor(L, from);
  const b = anchor(L, to);
  const pts = L.vertical
    ? [[a.x, a.y], [L.bus, a.y], [L.bus, b.y], [b.x, b.y]]
    : [[a.x, a.y], [a.x, L.bus], [b.x, L.bus], [b.x, b.y]];
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const total = seg.reduce((s, v) => s + v, 0) || 1;
  let acc = 0;
  const times = [0, ...seg.map((v) => (acc += v) / total)];
  return { cx: pts.map((p) => p[0]), cy: pts.map((p) => p[1]), times };
}

type Hop = { from: Svc; subject: string; to: { svc: Svc; effect: string }[] };

const scenarios: Record<ScenarioId, Hop[]> = {
  order: [
    {
      from: "order",
      subject: "order:created",
      to: [
        { svc: "market", effect: "market:reserve" },
        { svc: "payment", effect: "payment:replicate" },
        { svc: "expiration", effect: "expiration:schedule" },
      ],
    },
  ],
  pay: [{ from: "payment", subject: "payment:created", to: [{ svc: "order", effect: "order:complete" }] }],
  expire: [
    { from: "expiration", subject: "expiration:complete", to: [{ svc: "order", effect: "order:cancel" }] },
    {
      from: "order",
      subject: "order:cancelled",
      to: [
        { svc: "market", effect: "market:release" },
        { svc: "payment", effect: "payment:cancel" },
      ],
    },
  ],
  comment: [
    {
      from: "comment",
      subject: "comment:created",
      to: [
        { svc: "post", effect: "post:count" },
        { svc: "market", effect: "market:count" },
        { svc: "reply", effect: "reply:replicate" },
      ],
    },
  ],
  ban: [
    { from: "auth", subject: "admin:created:ban", to: [{ svc: "expiration", effect: "expiration:ban" }] },
    { from: "expiration", subject: "expiration:ban", to: [{ svc: "auth", effect: "auth:unban" }] },
  ],
};

const actionIcons: Record<ScenarioId, ComponentType<{ className?: string }>> = {
  order: ShoppingCart,
  pay: CreditCard,
  expire: TimerOff,
  comment: MessageSquare,
  ban: Ban,
};

const palette: Record<ScenarioId, string> = {
  order: "#4f8dff",
  pay: "#22c55e",
  expire: "#f59e0b",
  comment: "#a78bfa",
  ban: "#f43f5e",
};

type Packet = { id: number; from: Svc; to: Svc; color: string };
type LogEntry = { id: number; t: string; kind: "pub" | "ack"; subject: string; from: Svc; to?: Svc; effect?: string; color: string };

const sleep = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

let clockStart = 0;
function resetClock() {
  clockStart = performance.now();
}
function stamp() {
  return `+${((performance.now() - clockStart) / 1000).toFixed(2)}s`;
}

export function Systems() {
  const c = useContent();
  const reduce = useReducedMotion();
  const [packets, setPackets] = useState<Packet[]>([]);
  const [flash, setFlash] = useState<Record<string, number>>({});
  const [log, setLog] = useState<LogEntry[]>([]);
  const [running, setRunning] = useState<ScenarioId | null>(null);
  const idRef = useRef(0);
  const runRef = useRef(0);
  const logRef = useRef<HTMLOListElement>(null);
  const duration = reduce ? 0 : 1400;
  const L = useNarrow() ? tall : wide;
  const busRect = L.vertical
    ? { x: L.bus - 14, y: 24, width: 28, height: L.h - 48 }
    : { x: 40, y: L.bus - 14, width: L.w - 80, height: 28 };

  useEffect(() => () => void (runRef.current += 1), []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [log]);

  function pulse(s: Svc) {
    setFlash((f) => ({ ...f, [s]: (f[s] ?? 0) + 1 }));
  }

  async function run(id: ScenarioId) {
    const token = ++runRef.current;
    setRunning(id);
    if (log.length === 0) resetClock();
    const color = palette[id];
    for (const hop of scenarios[id]) {
      if (runRef.current !== token) return;
      pulse(hop.from);
      setLog((l) => [...l, { id: idRef.current++, t: stamp(), kind: "pub", subject: hop.subject, from: hop.from, color }]);
      const batch = hop.to.map((t) => ({ id: idRef.current++, from: hop.from, to: t.svc, color }));
      setPackets((p) => [...p, ...batch]);
      await sleep(duration + 40);
      if (runRef.current !== token) return;
      setPackets((p) => p.filter((x) => !batch.some((b) => b.id === x.id)));
      for (const t of hop.to) pulse(t.svc);
      setLog((l) => [
        ...l,
        ...hop.to.map((t) => ({ id: idRef.current++, t: stamp(), kind: "ack" as const, subject: hop.subject, from: hop.from, to: t.svc, effect: t.effect, color })),
      ]);
      await sleep(reduce ? 0 : 500);
    }
    if (runRef.current === token) setRunning(null);
  }

  function clear() {
    runRef.current += 1;
    setPackets([]);
    setLog([]);
    setRunning(null);
  }

  return (
    <section id="systems" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading {...c.sections.systems} />

        <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          <div className="card self-start overflow-hidden rounded-3xl">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
              <p className="font-mono text-xs text-muted" dir="ltr">
                social-microservices / NATS Streaming
              </p>
              <a
                href={`${links.github}/social-microservices`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground"
              >
                <GitHubIcon className="size-3.5" /> {c.ui.source}
              </a>
            </div>
            <div dir="ltr">
              <svg viewBox={`0 0 ${L.w} ${L.h}`} className="mx-auto block w-full max-w-md sm:max-w-none" role="img" aria-label={c.sections.systems.title}>
                <defs>
                  <linearGradient id="bus" x1="0" x2={L.vertical ? "0" : "1"} y1="0" y2={L.vertical ? "1" : "0"}>
                    <stop offset="0" stopColor="var(--accent)" stopOpacity="0.15" />
                    <stop offset="0.5" stopColor="var(--accent-2)" stopOpacity="0.35" />
                    <stop offset="1" stopColor="var(--accent)" stopOpacity="0.15" />
                  </linearGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {SVCS.map((s) => {
                  const a = anchor(L, s);
                  return (
                    <line
                      key={`l-${s}`}
                      x1={a.x}
                      y1={a.y}
                      x2={L.vertical ? L.bus : a.x}
                      y2={L.vertical ? a.y : L.bus}
                      stroke="var(--border)"
                      strokeWidth={2}
                      strokeDasharray="4 5"
                    />
                  );
                })}

                <rect {...busRect} rx={14} fill="url(#bus)" stroke="var(--border)" />
                <motion.rect
                  {...busRect}
                  rx={14}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={1.5}
                  initial={false}
                  animate={{ opacity: packets.length ? 0.9 : 0 }}
                />
                <text
                  x={L.vertical ? L.bus : L.w / 2}
                  y={L.vertical ? L.h / 2 : L.bus + 5}
                  textAnchor="middle"
                  transform={L.vertical ? `rotate(-90 ${L.bus} ${L.h / 2}) translate(0 4)` : undefined}
                  className="fill-[var(--foreground)] font-mono text-[12px] font-semibold"
                >
                  NATS Streaming
                </text>

                {SVCS.map((s) => {
                  const { x, y } = L.pos[s];
                  const db = DB[s];
                  return (
                    <g key={s}>
                      <motion.rect
                        key={`${s}-${flash[s] ?? 0}`}
                        x={x - L.nodeW / 2}
                        y={y - L.nodeH / 2}
                        width={L.nodeW}
                        height={L.nodeH}
                        rx={14}
                        fill="var(--surface)"
                        stroke="var(--border)"
                        strokeWidth={1.5}
                        initial={flash[s] ? { stroke: "var(--accent)", strokeWidth: 3 } : false}
                        animate={{ stroke: "var(--border)", strokeWidth: 1.5 }}
                        transition={{ duration: 1.1 }}
                      />
                      <text x={x} y={y - 2} textAnchor="middle" className="fill-[var(--foreground)] font-mono text-[13px] font-semibold">
                        {s}
                      </text>
                      <text x={x} y={y + 15} textAnchor="middle" className="fill-[var(--muted)] font-mono text-[10px]">
                        {db}
                      </text>
                    </g>
                  );
                })}

                <AnimatePresence>
                  {packets.map((p) => {
                    const r = route(L, p.from, p.to);
                    return (
                      <motion.circle
                        key={p.id}
                        r={6}
                        fill={p.color}
                        filter="url(#glow)"
                        initial={{ cx: r.cx[0], cy: r.cy[0], opacity: 0 }}
                        animate={{ cx: r.cx, cy: r.cy, opacity: 1 }}
                        exit={{ opacity: 0, scale: 2 }}
                        transition={{ duration: duration / 1000, times: r.times, ease: "linear", opacity: { duration: 0.15 } }}
                      />
                    );
                  })}
                </AnimatePresence>
              </svg>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border px-5 py-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm border border-border bg-surface" /> {c.systems.legend.db}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-5 rounded-full bg-gradient-to-r from-accent/40 to-accent-2/60" /> {c.systems.legend.bus}
              </span>
              <span>{c.systems.hint}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {(Object.keys(scenarios) as ScenarioId[]).map((id) => {
                const Icon = actionIcons[id];
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => void run(id)}
                    disabled={running !== null}
                    className={cn(
                      "card group flex items-center gap-3 rounded-2xl px-4 py-3 text-start text-sm transition-all",
                      "hover:-translate-y-0.5 hover:border-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
                      running === id && "border-accent !opacity-100",
                    )}
                  >
                    <span className="grid size-8 place-items-center rounded-xl" style={{ background: `${palette[id]}22`, color: palette[id] }}>
                      <Icon className="size-4" />
                    </span>
                    <span className="flex-1 font-medium">{c.systems.actions[id]}</span>
                    <Play className="size-3.5 text-muted transition-colors group-hover:text-foreground rtl:-scale-x-100" />
                  </button>
                );
              })}
            </div>

            <div className="card flex min-h-64 flex-1 flex-col overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <p className="text-sm font-medium">{c.systems.log}</p>
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted hover:bg-surface-2 hover:text-foreground"
                >
                  <RotateCcw className="size-3" /> {c.systems.replay}
                </button>
              </div>
              <ol ref={logRef} data-lenis-prevent className="max-h-72 flex-1 space-y-1.5 overflow-y-auto p-4 font-mono text-[11.5px]" aria-live="polite">
                {log.length === 0 ? <li className="font-sans text-sm text-muted">{c.systems.idle}</li> : null}
                <AnimatePresence initial={false}>
                  {log.map((e) => (
                    <motion.li
                      key={e.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-wrap items-baseline gap-x-2"
                    >
                      <span className="text-muted" dir="ltr">{e.t}</span>
                      <span dir="ltr" style={{ color: e.color }}>
                        {e.kind === "pub" ? "PUB" : "ACK"}
                      </span>
                      <span dir="ltr" className="font-semibold">{e.subject}</span>
                      <span dir="ltr" className="text-muted">
                        {e.kind === "pub" ? e.from : `${e.from} → ${e.to}`}
                      </span>
                      {e.effect ? <span className="font-sans text-foreground/80">· {c.systems.effects[e.effect]}</span> : null}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
