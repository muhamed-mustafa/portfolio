import Image from "next/image";
import adminShot from "@/assets/airbnb-admin-overview.png";

type Node = { id: string; x: number; y: number; w?: number; label: string; sub?: string; tone?: "accent" | "data" | "plain" };
type Diagram = { nodes: Node[]; edges: [string, string][]; bus?: { y: number; x1: number; x2: number; label: string } };

const W = 640;
const H = 220;
const NODE_H = 46;

const diagrams: Record<string, Diagram> = {
  "airbnb-clone-api": {
    nodes: [
      { id: "client", x: 60, y: 70, w: 84, label: "Client", sub: "REST" },
      { id: "presentation", x: 190, y: 70, w: 128, label: "Presentation", sub: "controllers · DTOs", tone: "accent" },
      { id: "application", x: 340, y: 70, w: 128, label: "Application", sub: "use cases", tone: "accent" },
      { id: "infra", x: 490, y: 70, w: 128, label: "Infrastructure", sub: "repositories", tone: "accent" },
      { id: "mongo", x: 420, y: 170, w: 112, label: "MongoDB", sub: "transactions", tone: "data" },
      { id: "storage", x: 565, y: 170, w: 112, label: "S3 / Cloudinary", sub: "storage port", tone: "data" },
    ],
    edges: [
      ["client", "presentation"],
      ["presentation", "application"],
      ["application", "infra"],
      ["infra", "mongo"],
      ["infra", "storage"],
    ],
  },
  "social-microservices": {
    bus: { y: 110, x1: 30, x2: 610, label: "NATS Streaming" },
    nodes: [
      { id: "auth", x: 85, y: 36, w: 92, label: "auth" },
      { id: "post", x: 240, y: 36, w: 92, label: "post" },
      { id: "comment", x: 395, y: 36, w: 92, label: "comment" },
      { id: "reply", x: 550, y: 36, w: 92, label: "reply" },
      { id: "market", x: 85, y: 184, w: 92, label: "market" },
      { id: "order", x: 240, y: 184, w: 92, label: "order" },
      { id: "payment", x: 395, y: 184, w: 92, label: "payment" },
      { id: "expiration", x: 550, y: 184, w: 92, label: "expiration" },
    ],
    edges: [],
  },
  "redis-mastery-lab": {
    nodes: [
      { id: "req", x: 70, y: 110, w: 110, label: "GET product", sub: "request" },
      { id: "cache", x: 255, y: 52, w: 128, label: "Redis cache", sub: "cache-aside · TTL", tone: "data" },
      { id: "lock", x: 255, y: 168, w: 128, label: "Lock", sub: "SET NX PX · token", tone: "accent" },
      { id: "source", x: 445, y: 168, w: 112, label: "Source", sub: "slow load" },
      { id: "write", x: 445, y: 52, w: 128, label: "Guarded write", sub: "Lua · owner check", tone: "accent" },
    ],
    edges: [
      ["req", "cache"],
      ["req", "lock"],
      ["lock", "source"],
      ["source", "write"],
      ["write", "cache"],
    ],
  },
  clinic: {
    bus: { y: 118, x1: 40, x2: 600, label: "NATS Streaming" },
    nodes: [
      { id: "auth", x: 120, y: 44, w: 120, label: "auth", sub: "roles · MongoDB" },
      { id: "appointment", x: 320, y: 44, w: 130, label: "appointment", sub: "booking · MongoDB" },
      { id: "notification", x: 520, y: 44, w: 130, label: "notification", sub: "Bull · Redis" },
      { id: "twilio", x: 520, y: 186, w: 112, label: "Twilio SMS", sub: "24h reminder", tone: "data" },
    ],
    edges: [["notification", "twilio"]],
  },
  "ecommerce-backend-nest": {
    nodes: [
      { id: "client", x: 60, y: 110, w: 84, label: "Client", sub: "JWT · roles" },
      { id: "auth", x: 225, y: 34, w: 112, label: "Auth", tone: "accent" },
      { id: "users", x: 225, y: 85, w: 112, label: "Users", tone: "accent" },
      { id: "products", x: 225, y: 136, w: 112, label: "Products", tone: "accent" },
      { id: "reviews", x: 225, y: 187, w: 112, label: "Reviews", tone: "accent" },
      { id: "orm", x: 410, y: 110, w: 104, label: "TypeORM", sub: "migrations" },
      { id: "pg", x: 560, y: 110, w: 112, label: "PostgreSQL", tone: "data" },
    ],
    edges: [
      ["client", "auth"],
      ["client", "users"],
      ["client", "products"],
      ["client", "reviews"],
      ["auth", "orm"],
      ["users", "orm"],
      ["products", "orm"],
      ["reviews", "orm"],
      ["orm", "pg"],
    ],
  },
};

function MiniDiagram({ diagram, label }: { diagram: Diagram; label: string }) {
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  const compact = (n: Node) => (n.sub ? NODE_H : 34);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label={label}>
      {diagram.bus ? (
        <>
          {diagram.nodes
            .filter((n) => n.id !== "twilio")
            .map((n) => (
              <line key={`b-${n.id}`} x1={n.x} x2={n.x} y1={n.y} y2={diagram.bus!.y} stroke="var(--border)" strokeWidth={1.5} strokeDasharray="3 4" />
            ))}
          <rect
            x={diagram.bus.x1}
            y={diagram.bus.y - 11}
            width={diagram.bus.x2 - diagram.bus.x1}
            height={22}
            rx={11}
            fill="color-mix(in oklab, var(--accent) 18%, transparent)"
            stroke="color-mix(in oklab, var(--accent) 45%, transparent)"
          />
          <rect x={diagram.bus.x1} y={diagram.bus.y - 1} width={diagram.bus.x2 - diagram.bus.x1} height={2} fill="var(--accent)" className="flow-bus" opacity={0.7} />
          <text x={(diagram.bus.x1 + diagram.bus.x2) / 2} y={diagram.bus.y + 4} textAnchor="middle" className="fill-[var(--foreground)] font-mono text-[11px] font-semibold">
            {diagram.bus.label}
          </text>
        </>
      ) : null}

      {diagram.edges.map(([a, b]) => {
        const from = byId[a];
        const to = byId[b];
        return (
          <line
            key={`${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--accent)"
            strokeOpacity={0.55}
            strokeWidth={1.5}
            strokeDasharray="4 6"
            className="flow-edge"
          />
        );
      })}

      {diagram.nodes.map((n) => {
        const w = n.w ?? 110;
        const h = compact(n);
        const stroke = n.tone === "accent" ? "color-mix(in oklab, var(--accent) 55%, var(--border))" : n.tone === "data" ? "color-mix(in oklab, var(--accent-2) 55%, var(--border))" : "var(--border)";
        return (
          <g key={n.id}>
            <rect x={n.x - w / 2} y={n.y - h / 2} width={w} height={h} rx={10} fill="var(--surface)" stroke={stroke} strokeWidth={1.25} />
            <text x={n.x} y={n.sub ? n.y - 3 : n.y + 4} textAnchor="middle" className="fill-[var(--foreground)] font-mono text-[11.5px] font-semibold">
              {n.label}
            </text>
            {n.sub ? (
              <text x={n.x} y={n.y + 13} textAnchor="middle" className="fill-[var(--muted)] font-mono text-[9.5px]">
                {n.sub}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export function ProjectVisual({ repo, title }: { repo: string; title: string }) {
  if (repo === "airbnb-clone-web") {
    return (
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-surface-2 sm:aspect-[16/7]">
        <Image
          src={adminShot}
          alt={`${title}: overview screen`}
          placeholder="blur"
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>
    );
  }
  const diagram = diagrams[repo];
  if (!diagram) return null;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-2/50" dir="ltr">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
      <div className="relative mx-auto aspect-[640/220] w-full max-w-[560px] p-1">
        <MiniDiagram diagram={diagram} label={`${title}: architecture`} />
      </div>
    </div>
  );
}
