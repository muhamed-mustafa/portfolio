import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © 2026 {profile.name}. Built with Next.js, TypeScript and Motion.
        </p>
        <div className="flex items-center gap-1">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-9 place-items-center rounded-full hover:bg-surface-2 hover:text-foreground">
            <GitHubIcon className="size-4" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-9 place-items-center rounded-full hover:bg-surface-2 hover:text-foreground">
            <LinkedInIcon className="size-4" />
          </a>
          <span className="ml-2 hidden font-mono text-xs sm:inline">
            Press <kbd className="rounded border border-border px-1">Ctrl</kbd> + <kbd className="rounded border border-border px-1">K</kbd>
          </span>
        </div>
      </div>
    </footer>
  );
}
