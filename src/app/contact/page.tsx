import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageIntro } from "@/components/PageIntro";
import { SlabFromQuery } from "@/components/SlabFromQuery";
import { getCopy } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.contact.title,
};

export default function ContactPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageIntro kicker="B2B" title={copy.contact.title}>
        <p>{copy.contact.lead}</p>
      </PageIntro>

      <Suspense fallback={null}>
        <SlabFromQuery />
      </Suspense>

      <dl className="mt-12 max-w-xl divide-y divide-rule border border-rule">
        <Row term="Email" value={copy.contact.email} />
        <Row term="WhatsApp" value={copy.contact.whatsapp} />
        <Row term="Location" value={copy.contact.location} />
      </dl>

      <section className="mt-12 max-w-xl">
        <h2 className="font-display text-2xl">{copy.contact.includeTitle}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
          {copy.contact.include.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-muted">
          Sample catalog cards:{" "}
          <Link href="/stock" className="text-ink underline">
            Stock
          </Link>
          . Freight is quoted separately from Romania.
        </p>
      </section>
    </main>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="grid gap-1 px-5 py-4 sm:grid-cols-[8rem_1fr] sm:items-baseline">
      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
        {term}
      </dt>
      <dd className="text-lg">{value}</dd>
    </div>
  );
}
