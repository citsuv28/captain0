import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl">Page not found</h1>
      <p className="mt-4 text-ink-muted">
        That route is not on this preview site.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-forest px-5 py-3 text-sm font-semibold text-paper"
      >
        Back to home
      </Link>
    </main>
  );
}
