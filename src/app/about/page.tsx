import type { Metadata } from "next";
import { CtaRow } from "@/components/CtaRow";
import { PageIntro } from "@/components/PageIntro";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { getCopy } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.about.title,
};

export default function AboutPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageIntro kicker="Captain0" title={copy.about.title}>
        <p>{copy.about.body}</p>
      </PageIntro>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <PhotoPlaceholder
          grain="yard"
          label="Placeholder — yard / mill, not a documentary photo"
          className="min-h-[260px]"
        />
        <PhotoPlaceholder
          grain="burl"
          label="Placeholder — mappa burl figure, not a listed slab"
          className="min-h-[260px]"
        />
      </div>

      <section className="mt-14 max-w-3xl border-t border-rule pt-10">
        <h2 className="font-display text-2xl">What we sell</h2>
        <p className="mt-4 leading-relaxed text-ink-muted">
          Primary product is raw material: live-edge slabs, burl, blanks, and
          bookmatched pairs. Species focus: European poplar burl (mappa / plop
          negru bubos), European walnut (Juglans regia / nuc), European oak
          (stejar). Finished epoxy river tables are portfolio examples only.
        </p>
        <CtaRow className="mt-8" />
      </section>
    </main>
  );
}
