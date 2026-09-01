import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { PhotoPlaceholder, type Grain } from "@/components/PhotoPlaceholder";
import { getCopy, getPortfolio } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.portfolio.title,
};

export default function PortfolioPage() {
  const portfolio = getPortfolio();

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageIntro kicker="Not the main SKU" title={copy.portfolio.title}>
        <p>{copy.portfolio.intro}</p>
      </PageIntro>

      <ul className="mt-12 grid gap-8 lg:grid-cols-2">
        {portfolio.items.map((item) => (
          <li key={item.id} className="border border-rule bg-paper">
            <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
              <span>Portfolio example</span>
              <span className="text-ink">{item.id}</span>
            </div>
            <PhotoPlaceholder
              grain={item.grain as Grain}
              label={item.photoNote}
              className="aspect-[16/10]"
            />
            <div className="p-5">
              <h2 className="font-display text-2xl">{item.title}</h2>
              <p className="mt-1 text-sm text-ink-muted">{item.wood}</p>
              <p className="mt-4 text-sm leading-relaxed">{item.disclaimer}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-ink-muted">
        Looking for material, not furniture?{" "}
        <Link href="/stock" className="font-semibold text-forest underline">
          Browse sample stock
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="font-semibold text-forest underline">
          ask for a freight quote
        </Link>
        .
      </p>
    </main>
  );
}
