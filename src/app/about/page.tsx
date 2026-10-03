import type { Metadata } from "next";
import { CtaRow } from "@/components/CtaRow";
import { PageIntro } from "@/components/PageIntro";
import { getCopy } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.about.title,
};

export default function AboutPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageIntro kicker={copy.brand.tagline} title={copy.about.title}>
        <p className="font-display text-2xl text-ink">{copy.about.line}</p>
        <p className="mt-2">{copy.about.lineRo}</p>
        <p className="mt-5">{copy.about.body}</p>
      </PageIntro>
      <CtaRow className="mt-14" />
    </main>
  );
}
