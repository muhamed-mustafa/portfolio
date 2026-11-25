import { Clock } from "lucide-react";
import { links } from "@/content";
import { getPost } from "@/content/posts";
import { GitHubIcon } from "./icons";

export function PostHeader({ slug }: { slug: string }) {
  const post = getPost(slug);
  return (
    <header className="not-prose mb-12 border-b border-border pb-10">
      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
        <time dateTime={post.date}>{post.dateLabel}</time>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" /> {post.readingTime}
        </span>
      </div>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
      <p className="mt-5 text-lg text-pretty text-muted">{post.description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {post.tags.map((t) => (
          <span key={t} className="rounded-full border border-border bg-surface-2/60 px-3 py-1 font-mono text-xs text-muted">
            {t}
          </span>
        ))}
        <a
          href={`${links.github}/${post.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ms-auto inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
        >
          <GitHubIcon className="size-4" /> {post.repo}
        </a>
      </div>
    </header>
  );
}

export function PostFooter() {
  return (
    <div className="not-prose mt-16 rounded-2xl border border-border bg-surface/60 p-6">
      <p className="font-semibold">Thanks for reading.</p>
      <p className="mt-2 text-muted">
        Questions or feedback? Email me at{" "}
        <a className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent" href={`mailto:${links.email}`}>
          {links.email}
        </a>{" "}
        or find me on{" "}
        <a className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent" href={links.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        .
      </p>
    </div>
  );
}
