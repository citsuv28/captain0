import Link from "next/link";
import { DimField, NoteLine } from "@/components/PhotoCard";
import { PhotoMedia } from "@/components/PhotoMedia";
import {
  getCopy,
  type PhotoItem,
  type StockBookmatch,
} from "@/lib/content";

const LANE_LABEL: Record<PhotoItem["lane"], string> = {
  A_placi: "A · plăci",
  B_furnir: "B · furnir",
  C_special: "C · special",
};

type BookmatchCardProps = {
  listing: StockBookmatch;
};

export function BookmatchCard({ listing }: BookmatchCardProps) {
  const copy = getCopy();
  const [left, right] = listing.pieces;

  return (
    <article className="flex flex-col border border-rule bg-paper">
      <div className="border-b border-rule px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-copper">
          {copy.stock.bookmatchKicker} · {copy.stock.bookmatchKickerRo}
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          {copy.stock.bookmatchHint}{" "}
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
            {copy.stock.bookmatchHintRo}
          </span>
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {copy.stock.pairId} · {copy.stock.pairIdRo}
        </p>
        <p className="mt-1 font-mono text-lg text-ink">{listing.id}</p>
      </div>

      <div className="grid gap-px bg-rule md:grid-cols-2">
        <PiecePane item={left} />
        <PiecePane item={right} />
      </div>

      <div className="flex flex-col gap-5 p-5">
        <NoteLine
          notes={listing.notes}
          label={`${copy.stock.pairNote} · ${copy.stock.pairNoteRo}`}
        />
        <Link
          href={`/contact?slab=${encodeURIComponent(listing.id)}`}
          className="text-sm font-semibold text-forest underline decoration-rule underline-offset-4 hover:decoration-forest"
        >
          {copy.cta.askFreightQuote} →
        </Link>
      </div>
    </article>
  );
}

function PiecePane({ item }: { item: PhotoItem }) {
  const copy = getCopy();

  return (
    <section className="flex flex-col gap-4 bg-paper p-4">
      <PhotoMedia
        src={item.photo.src}
        alt={item.photo.alt}
        caption={`${item.id} · ${item.type} · ${item.lane}`}
        className="aspect-[4/5]"
      />
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {copy.stock.pieceId} · {copy.stock.pieceIdRo}
        </p>
        <p className="mt-1 font-mono text-lg text-ink">{item.id}</p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {LANE_LABEL[item.lane]} · {item.type}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-snug text-ink">
          {item.title}
        </h3>
      </div>
      <dl className="grid gap-3">
        <Field label="species_ro" value={item.species_ro} />
        <Field label="species_en" value={item.species_en} />
      </dl>
      <dl className="grid grid-cols-3 gap-3 border-t border-rule pt-4">
        <DimField
          label={`${copy.stock.length} · ${copy.stock.lengthRo}`}
          value={item.dims.length}
          basis={item.dims.length_basis}
        />
        <DimField
          label={`${copy.stock.width} · ${copy.stock.widthRo}`}
          value={item.dims.width}
          basis={item.dims.width_basis}
        />
        <DimField
          label={`${copy.stock.thickness} · ${copy.stock.thicknessRo}`}
          value={item.dims.thickness}
          basis={item.dims.thickness_basis}
        />
      </dl>
      <NoteLine notes={item.notes} />
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  const empty = value.trim() === "";
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </dt>
      <dd className={`mt-1 text-lg ${empty ? "text-ink-muted" : "text-ink"}`}>
        {empty ? "—" : value}
      </dd>
    </div>
  );
}
