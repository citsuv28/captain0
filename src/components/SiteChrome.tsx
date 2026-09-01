import Link from "next/link";
import { getCopy } from "@/lib/content";

export function Header() {
  const copy = getCopy();

  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="min-w-0">
          <span className="block font-display text-xl tracking-tight text-ink">
            Captain0
          </span>
          <span className="block truncate font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            Raw wood · Piatra Neamț
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 text-sm md:flex"
        >
          {copy.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-muted hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/stock"
            className="bg-forest px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-paper hover:bg-forest-2"
          >
            {copy.cta.requestStockList}
          </Link>
        </nav>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none border border-rule px-3 py-2 text-sm">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-56 border border-rule bg-paper p-3 shadow-sm">
            <nav aria-label="Mobile" className="flex flex-col gap-2 text-sm">
              {copy.nav.map((item) => (
                <Link key={item.href} href={item.href} className="py-1">
                  {item.label}
                </Link>
              ))}
              <Link href="/stock" className="bg-forest px-3 py-2 text-paper">
                {copy.cta.requestStockList}
              </Link>
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
    <footer className="mt-auto border-t border-forest bg-forest text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl">{copy.footer.mark}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-paper/80">
            {copy.footer.place}
          </p>
        </div>
        <p className="max-w-md text-sm text-paper/85">{copy.footer.productNote}</p>
      </div>
      <div className="border-t border-paper/15">
        <p className="mx-auto max-w-6xl px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60 sm:px-6">
          Preview site — not the live captain0.com domain
        </p>
      </div>
    </footer>
  );
}
