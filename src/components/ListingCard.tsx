import Link from "next/link";
import { PhotoMedia } from "@/components/PhotoMedia";
import { getCopy, type StockItem } from "@/lib/content";

type ListingCardProps = {
  item: StockItem;
};

export function ListingCard({ item }: ListingCardProps) {
  const copy = getCopy();

  return (
    <article className="flex flex-col border border-rule bg-paper">
      <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
        <span>
          {item.sample
            ? "Candidate stock — fields incomplete"
            : "Stock"}
        </span>
        <span className="text-ink">{item.id}</span>
      </div>
      <PhotoMedia
        src={item.photo.src}
        alt={item.photo.alt}
        caption={item.photoNote}
        className="aspect-[4/5]"
      />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-display text-2xl leading-snug text-ink">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-ink-muted">{item.species}</p>
          <p className="mt-1 text-sm text-ink">{item.form}</p>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-rule pt-4 font-mono text-xs">
          <Spec label="Length" value={item.dimensions.length} />
          <Spec label="Width" value={item.dimensions.width} />
          <Spec label="Thickness" value={item.dimensions.thickness} />
          <Spec label="Moisture" value={item.moisture} />
          <Spec label="Weight" value={item.weight} />
          <Spec label="Year cut" value={item.year} />
        </dl>
        {"dimensionNote" in item && item.dimensionNote ? (
          <p className="text-sm text-ink-muted">{item.dimensionNote}</p>
        ) : null}
        <div className="border-t border-rule pt-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            Defects
          </p>
          <p className="mt-1 text-sm">{item.defects}</p>
        </div>
        <Link
          href={`/contact?slab=${encodeURIComponent(item.id)}`}
          className="mt-auto text-sm font-semibold text-forest underline decoration-rule underline-offset-4 hover:decoration-forest"
        >
          {copy.cta.askFreightQuote} →
        </Link>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
