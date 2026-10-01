import type { Metadata } from "next";
import { CtaRow } from "@/components/CtaRow";
import { PageIntro } from "@/components/PageIntro";
import { PhotoMedia } from "@/components/PhotoMedia";
import { getCopy, getWorkshop } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.about.title,
};

export default function AboutPage() {
  const workshop = getWorkshop();

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageIntro kicker="Captain0" title={copy.about.title}>
        <p>{copy.about.body}</p>
      </PageIntro>

      <section className="mt-12">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          Workshop and yard
        </h2>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Process, machinery, and yard photos (lanes C and E). These are not
          stock SKUs.
        </p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workshop.map((item) => (
            <li key={item.id}>
              <PhotoMedia
                src={item.photo.src}
                alt={item.photo.alt}
                caption={`${item.id} — ${item.notes}`}
                className="min-h-[260px]"
              />
            </li>
          ))}
        </ul>
      </section>

      <CtaRow className="mt-14" />
    </main>
  );
}
