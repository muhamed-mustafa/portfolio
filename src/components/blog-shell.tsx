import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ContentProvider } from "@/content/context";
import { Footer } from "./footer";
import { ScrollProgress } from "./scroll-progress";
import { ThemeToggle } from "./theme-toggle";

export function BlogShell({ children, back }: { children: ReactNode; back: { href: string; label: string } }) {
  return (
    <ContentProvider locale="en">
      <ScrollProgress />
      <header className="sticky top-0 z-50 border-b border-border bg-background/75 px-6 backdrop-blur-xl">
        <nav aria-label="Blog" className="mx-auto flex h-16 max-w-3xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-white">
              MM
            </span>
            Muhammed
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={back.href}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> {back.label}
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main className="px-6 pt-16 pb-28">{children}</main>
      <Footer />
    </ContentProvider>
  );
}
