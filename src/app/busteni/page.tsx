import type { Metadata } from "next";
import { BusteniCard } from "@/components/BusteniCard";
import { PageIntro } from "@/components/PageIntro";
import { PhotoMedia } from "@/components/PhotoMedia";
import { getCopy } from "@/lib/content";
import {
  BUSTENI_SPECIES_EN,
  BUSTENI_SPECIES_RO,
  busteniLogKey,
  getBusteni,
} from "@/lib/busteni";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.busteni.title,
};

export default function BusteniPage() {
  const busteni = getBusteni();

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageIntro kicker={copy.busteni.kicker} title={copy.busteni.title}>
        <p>{copy.busteni.intent}</p>
        <p className="mt-2">{copy.busteni.intentRo}</p>
      </PageIntro>

      <PhotoMedia
        src={busteni.hero.src}
        alt={busteni.hero.alt}
        caption={`${BUSTENI_SPECIES_RO} · ${BUSTENI_SPECIES_EN}`}
        className="mx-auto mt-10 aspect-[3/4] max-w-xl"
        priority
      />

      <ul className="mt-12 grid gap-8">
        {busteni.logs.map((log) => (
          <li key={busteniLogKey(log)}>
            <BusteniCard log={log} />
          </li>
        ))}
      </ul>

      <section className="mt-14" aria-labelledby="busteni-context">
        <h2
          id="busteni-context"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted"
        >
          {copy.busteni.contextTitle}
        </h2>
        <p className="mt-2 text-ink-muted">{copy.busteni.contextNote}</p>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {busteni.context.map((photo) => (
            <li key={photo.src} className="border border-rule bg-paper">
              <PhotoMedia
                src={photo.src}
                alt={photo.alt}
                caption={copy.busteni.contextTitle}
                className="aspect-[4/5]"
              />
              <div className="p-4">
                <p className="font-display text-xl text-ink">{BUSTENI_SPECIES_RO}</p>
                <p className="text-sm text-ink-muted">{BUSTENI_SPECIES_EN}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">{photo.notes}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
