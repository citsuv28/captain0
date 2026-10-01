import Link from "next/link";
import { CtaRow } from "@/components/CtaRow";
import { PhotoMedia } from "@/components/PhotoMedia";
import { getCopy, getFeaturedHero, getHomeHeroes, homeHref } from "@/lib/content";

export default function HomePage() {
  const copy = getCopy();
  const hero = getFeaturedHero();
  const heroes = getHomeHeroes();

  return (
    <main id="main">
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            {copy.home.kicker}
          </p>
          <h1 className="mt-4 font-display text-[2.35rem] leading-[1.12] text-ink sm:text-5xl lg:text-[3.4rem]">
            {copy.home.hero}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            {copy.home.subhead}
          </p>
          <CtaRow className="mt-8" />
        </div>
        <PhotoMedia
          src={hero.photo.src}
          alt={hero.photo.alt}
          caption={`${hero.id} — ${hero.notes}`}
          className="min-h-[280px] lg:min-h-[420px]"
          priority
        />
      </section>

      <section
        aria-labelledby="gallery"
        className="border-t border-rule"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2
            id="gallery"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted"
          >
            Curated heroes
          </h2>
          <p className="mt-3 max-w-2xl text-ink-muted">
            Raw stock heroes (lanes A–B) and a few finished-table examples
            (lane D). Tables are not the main SKU.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {heroes.map((item) => (
              <li key={item.id}>
                <Link href={homeHref(item)} className="block">
                  <PhotoMedia
                    src={item.photo.src}
                    alt={item.photo.alt}
                    caption={`${item.hero_lane === "D" ? "Portfolio" : "Stock"} · ${item.id}`}
                    className="aspect-[4/5]"
                    priority={item.id === "C0-A01"}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="value-props"
        className="border-t border-rule bg-paper-2/50"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2
            id="value-props"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted"
          >
            For makers, luthiers, and workshops
          </h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {copy.home.valueProps.map((prop, index) => (
              <li key={prop.title} className="border-t border-rule pt-5">
                <p className="font-mono text-xs text-copper">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl">{prop.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{prop.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
