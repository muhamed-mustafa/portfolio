import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative grid min-h-svh place-items-center px-6 text-center">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page doesn&apos;t exist.</h1>
        <p className="mt-3 text-muted">The link may be broken, or the page may have moved.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
