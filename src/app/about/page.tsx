import type { Metadata } from "next";
import { CtaRow } from "@/components/CtaRow";
import { PageIntro } from "@/components/PageIntro";
import { PhotoMedia } from "@/components/PhotoMedia";
import { getCopy, getStock } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.about.title,
};

export default function AboutPage() {
  const stock = getStock();
  const yard = stock.items.find((item) => item.id === "C0-S01");
  const shop = stock.items.find((item) => item.id === "C0-S02");

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageIntro kicker="Captain0" title={copy.about.title}>
        <p>{copy.about.body}</p>
      </PageIntro>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {yard ? (
          <PhotoMedia
            src={yard.photo.src}
            alt={yard.photo.alt}
            caption={`${yard.id} — ${yard.species}`}
            className="min-h-[260px]"
          />
        ) : null}
        {shop ? (
          <PhotoMedia
            src={shop.photo.src}
            alt={shop.photo.alt}
            caption={`${shop.id} — ${shop.species}`}
            className="min-h-[260px]"
          />
        ) : null}
      </div>

      <CtaRow className="mt-14" />
    </main>
  );
}
