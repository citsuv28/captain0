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

      <CtaRow className="mt-14" />
    </main>
  );
}
