"use client";

import { Command, Languages, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useContent } from "@/content/context";
import { cn, scrollToId } from "@/lib/cn";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const c = useContent();
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of c.nav) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [c.nav]);

  function go(id: string) {
    setOpen(false);
    scrollToId(id);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500",
          scrolled ? "border-border bg-background/70 shadow-lg shadow-black/5 backdrop-blur-xl" : "border-transparent",
        )}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 rounded-full px-2 py-1 font-semibold tracking-tight"
        >
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-sans text-sm font-bold text-white" dir="ltr">
            MM
          </span>
          <span className="hidden sm:inline">{c.firstName}</span>
          <span className="sr-only">{c.ui.backToTop}</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {c.nav.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                  active === item.id ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {active === item.id ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-menu"))}
            className="hidden items-center gap-1.5 rounded-full border border-border bg-surface/70 px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground sm:flex"
            dir="ltr"
          >
            <Command className="size-3.5" aria-hidden="true" /> K<span className="sr-only"> {c.ui.commandMenu}</span>
          </button>
          <a
            href={c.otherLocale.href}
            hrefLang={c.locale === "en" ? "ar" : "en"}
            title={c.otherLocale.label}
            className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface/70 px-3 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Languages className="size-4" aria-hidden="true" />
            <span className="font-medium">{c.otherLocale.short}</span>
            <span className="sr-only"> {c.ui.switchLanguage}</span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-border bg-surface/70 lg:hidden"
            aria-label={open ? c.ui.closeMenu : c.ui.openMenu}
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="card mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl p-2 lg:hidden"
          >
            {c.nav.map((item, i) => (
              <motion.li key={item.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  className="w-full rounded-2xl px-4 py-3 text-start text-sm hover:bg-surface-2"
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
