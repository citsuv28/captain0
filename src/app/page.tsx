import { CtaRow } from "@/components/CtaRow";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { getCopy } from "@/lib/content";

export default function HomePage() {
  const copy = getCopy();

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
        <PhotoPlaceholder
          grain="yard"
          label="Placeholder — mill yard, not a stock photo"
          className="min-h-[280px] lg:min-h-[420px]"
        />
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
