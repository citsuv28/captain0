import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { StockFinder } from "@/components/StockFinder";
import { getCopy, getStockListings } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.stock.title,
};

export default function StockPage() {
  const listings = getStockListings();

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageIntro kicker="Catalog" title={copy.stock.title}>
        <p>{copy.stock.intro}</p>
      </PageIntro>

      <p
        role="note"
        className="mt-10 border-l-4 border-copper bg-paper-2/70 px-4 py-3 text-sm"
      >
        {copy.stock.placeholderBanner}
      </p>

      <StockFinder listings={listings} />

      <section className="mt-14 max-w-3xl border border-rule bg-paper-2/40 p-6">
        <h2 className="font-display text-2xl">{copy.stock.howToTitle}</h2>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-ink-muted">
          {copy.stock.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
