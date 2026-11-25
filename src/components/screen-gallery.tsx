"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import addDialog from "@/assets/admin-country-add-1440-en.png";
import countriesAr from "@/assets/admin-countries-1440-ar.png";
import overview from "@/assets/admin-home-1440-en.png";
import { useContent } from "@/content/context";
import { cn } from "@/lib/cn";

type Slide = { id: string; image: StaticImageData; path: string; label: (g: ReturnType<typeof useContent>["gallery"]) => string };

/**
 * Real screens of the admin app. When the customer-facing app exists, add its screens here
 * (for example with an `app: "customer"` group) and they appear in the same switcher.
 */
const slides: Slide[] = [
  { id: "overview", image: overview, path: "/", label: (g) => g.overview },
  { id: "rtl", image: countriesAr, path: "/locations/countries", label: (g) => g.rtl },
  { id: "dialog", image: addDialog, path: "/locations/countries", label: (g) => g.dialog },
];

const INTERVAL = 4200;

export function ScreenGallery({ title }: { title: string }) {
  const c = useContent();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  const slide = slides[index];

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-xl shadow-black/10"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      dir="ltr"
    >
      <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex h-7 min-w-0 flex-1 items-center rounded-md border border-border bg-surface-2/70 px-3 font-mono text-[11px] text-muted">
          <span className="truncate">localhost:4100{slide.path}</span>
        </div>
        <div className="hidden gap-1 sm:flex" role="tablist" aria-label={c.gallery.label}>
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs transition-colors",
                i === index ? "bg-accent/15 text-accent" : "text-muted hover:text-foreground",
              )}
            >
              {s.label(c.gallery)}
            </button>
          ))}
        </div>
      </div>

      <div className="relative aspect-[3/2] bg-[#f7f8fa]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={slide.image}
              alt={`${title}: ${slide.label(c.gallery)}`}
              placeholder="blur"
              sizes="(min-width: 1024px) 1100px, 100vw"
              priority={false}
              className="h-full w-full object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>

        {!reduce ? (
          <div className="absolute inset-x-0 bottom-0 flex gap-1 p-2" aria-hidden="true">
            {slides.map((s, i) => (
              <span key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-black/10">
                {i === index ? (
                  <motion.span
                    key={`${s.id}-${index}-${paused}`}
                    className="block h-full bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? "0%" : "100%" }}
                    transition={{ duration: paused ? 0 : INTERVAL / 1000, ease: "linear" }}
                  />
                ) : null}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex gap-1 border-t border-border bg-surface p-1.5 sm:hidden" role="tablist" aria-label={c.gallery.label}>
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={cn("flex-1 rounded-md px-2 py-1.5 text-xs", i === index ? "bg-accent/15 text-accent" : "text-muted")}
          >
            {s.label(c.gallery)}
          </button>
        ))}
      </div>
    </div>
  );
}
