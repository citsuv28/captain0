import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { PhotoCard } from "@/components/PhotoCard";
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

      <p className="mt-8 max-w-3xl text-sm text-ink-muted">
        Finished tables and epoxy pieces are labeled in{" "}
        <code className="font-mono text-ink">content/photos.json</code> with{" "}
        <code className="font-mono text-ink">type: &quot;table&quot;</code> or{" "}
        <code className="font-mono text-ink">type: &quot;epoxy&quot;</code>. They
        are not the main SKU.
      </p>

      <ul className="mt-12 grid gap-8 lg:grid-cols-2">
        {portfolio.items.map((item) => (
          <li key={item.id}>
            <PhotoCard item={item} variant="portfolio" />
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
