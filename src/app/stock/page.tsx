import type { Metadata } from "next";
import { PhotoCard } from "@/components/PhotoCard";
import { PageIntro } from "@/components/PageIntro";
import { getCopy, getStock } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.stock.title,
};

export default function StockPage() {
  const stock = getStock();

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageIntro kicker="Catalog" title={copy.stock.title}>
        <p>{copy.stock.intro}</p>
      </PageIntro>

      <section className="mt-12 max-w-3xl border border-rule bg-paper-2/40 p-6">
        <h2 className="font-display text-2xl">{copy.stock.howToTitle}</h2>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-ink-muted">
          {copy.stock.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <p
        role="note"
        className="mt-10 border-l-4 border-copper bg-paper-2/70 px-4 py-3 text-sm"
      >
        {copy.stock.placeholderBanner}
      </p>

      <p className="mt-6 max-w-3xl text-sm text-ink-muted">
        Species, dimensions, and notes for each photo are edited in{" "}
        <code className="font-mono text-ink">content/photos.json</code>. Empty
        fields show as a dash — they are not measurements.
      </p>

      <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stock.items.map((item) => (
          <li key={item.id}>
            <PhotoCard item={item} variant="stock" />
          </li>
        ))}
      </ul>
    </main>
  );
}
