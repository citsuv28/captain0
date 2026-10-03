import Link from "next/link";
import { getCopy } from "@/lib/content";

const LANE_HREFS = new Set(["/stock", "/logs", "/portfolio"]);
const QUIET_HREFS = new Set(["/about", "/contact"]);

export function Header() {
  const copy = getCopy();
  const lanes = copy.nav.filter((item) => LANE_HREFS.has(item.href));
  const quiet = copy.nav.filter((item) => QUIET_HREFS.has(item.href));

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-casa/90 backdrop-blur">
      <div className="mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-lg tracking-wide text-casa-ink">
          Captain0
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-3 sm:gap-6">
          {lanes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-casa-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="House" className="hidden items-center gap-5 md:flex">
          {quiet.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-casa-muted hover:text-casa-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.16em] text-casa-muted">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-40 border border-white/15 bg-casa p-3">
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {quiet.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-casa-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  const copy = getCopy();

  return (
    <footer className="shrink-0 border-t border-white/10 text-casa-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
          {copy.footer.mark} · {copy.footer.place}
        </p>
        <p className="max-w-md text-[11px] leading-relaxed">{copy.footer.productNote}</p>
      </div>
      <p className="px-4 pb-3 font-mono text-[10px] uppercase tracking-[0.14em] sm:px-6">
        Preview site — not the live captain0.com domain
      </p>
    </footer>
  );
}
