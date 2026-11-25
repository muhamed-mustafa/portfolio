"use client";

import { ArrowUpRight, Copy, FileDown, Hash, Languages, Moon, NotebookPen, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { links } from "@/content";
import { useContent } from "@/content/context";
import { posts } from "@/content/posts";
import { scrollToId } from "@/lib/cn";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { applyTheme } from "./theme-toggle";

type Item = { id: string; label: string; group: string; icon: ReactNode; external?: boolean; run: () => void };

export function CommandMenu() {
  const c = useContent();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  const items = useMemo<Item[]>(() => {
    const g = c.ui.groups;
    return [
      ...c.nav.map((n) => ({
        id: `nav-${n.id}`,
        label: `${c.ui.goTo} ${n.label}`,
        group: g.navigate,
        icon: <Hash className="size-4" />,
        run: () => scrollToId(n.id),
      })),
      ...posts.map((p) => ({
        id: `post-${p.slug}`,
        label: p.title,
        group: c.sections.writing.eyebrow,
        icon: <NotebookPen className="size-4" />,
        run: () => router.push(`/blog/${p.slug}`),
      })),
      { id: "github", label: c.ui.openGithub, group: g.links, external: true, icon: <GitHubIcon className="size-4" />, run: () => window.open(links.github, "_blank", "noopener") },
      { id: "linkedin", label: c.ui.openLinkedin, group: g.links, external: true, icon: <LinkedInIcon className="size-4" />, run: () => window.open(links.linkedin, "_blank", "noopener") },
      { id: "cv", label: c.ui.downloadCv, group: g.links, external: true, icon: <FileDown className="size-4" />, run: () => window.open(links.cv, "_blank", "noopener") },
      {
        id: "email",
        label: c.ui.copyEmail,
        group: g.actions,
        icon: <Copy className="size-4" />,
        run: () => {
          void navigator.clipboard.writeText(links.email);
          setToast(c.ui.emailCopied);
          window.setTimeout(() => setToast(null), 1800);
        },
      },
      {
        id: "theme",
        label: c.ui.toggleTheme,
        group: g.actions,
        icon: <Moon className="size-4" />,
        run: () => applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"),
      },
      {
        id: "lang",
        label: c.otherLocale.label,
        group: g.actions,
        icon: <Languages className="size-4" />,
        run: () => window.location.assign(c.otherLocale.href),
      },
    ];
  }, [c, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-menu", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-menu", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 20);
  }, [open]);

  function select(item: Item | undefined) {
    if (!item) return;
    close();
    item.run();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(filtered[index]);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center bg-black/40 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
            data-lenis-prevent
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={c.ui.commandMenu}
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="size-4 text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  placeholder={c.ui.commandPlaceholder}
                  className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted"
                  aria-label={c.ui.commandPlaceholder}
                />
                <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
              </div>
              <ul className="max-h-[min(28rem,60vh)] overflow-y-auto p-2" role="listbox">
                {filtered.length === 0 ? <li className="px-3 py-6 text-center text-sm text-muted">{c.ui.noResults}</li> : null}
                {filtered.map((item, i) => {
                  const header = i === 0 || filtered[i - 1].group !== item.group ? item.group : null;
                  return (
                    <li key={item.id}>
                      {header ? <p className="px-3 pt-3 pb-1 font-mono text-[10px] tracking-widest text-muted uppercase">{header}</p> : null}
                      <button
                        type="button"
                        role="option"
                        aria-selected={i === index}
                        onMouseEnter={() => setIndex(i)}
                        onClick={() => select(item)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition-colors ${
                          i === index ? "bg-surface-2 text-foreground" : "text-muted"
                        }`}
                      >
                        {item.icon}
                        <span className="flex-1">{item.label}</span>
                        {item.external ? <ArrowUpRight className="size-3.5 rtl:-scale-x-100" /> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {toast ? (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-border bg-surface px-4 py-2 text-sm shadow-lg"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
