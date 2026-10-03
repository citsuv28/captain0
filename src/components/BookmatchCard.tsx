import { AskForPiece, DimField, NoteLine, PassportShell, SpeciesLine } from "@/components/PhotoCard";
import { PhotoMedia } from "@/components/PhotoMedia";
import { getCopy, type PhotoItem, type StockBookmatch } from "@/lib/content";

type BookmatchCardProps = {
  listing: StockBookmatch;
};

export function BookmatchCard({ listing }: BookmatchCardProps) {
  const copy = getCopy();
  const [left, right] = listing.pieces;

  return (
    <PassportShell
      kicker={`${copy.stock.bookmatchKicker} · ${copy.stock.bookmatchKickerRo}`}
      id={listing.id}
    >
      <div className="border-b border-rule px-4 py-3">
        <p className="text-sm text-ink-muted">
          {copy.stock.bookmatchHint}{" "}
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
            {copy.stock.bookmatchHintRo}
          </span>
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {copy.stock.pairId} · {copy.stock.pairIdRo}
        </p>
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
        <AskForPiece href={`/contact?slab=${encodeURIComponent(listing.id)}`} />
      </div>
    </PassportShell>
  );
}

function PiecePane({ item }: { item: PhotoItem }) {
  const copy = getCopy();

  return (
    <section className="flex flex-col gap-4 bg-paper p-4">
      <PhotoMedia
        src={item.photo.src}
        alt={item.photo.alt}
        caption={item.id}
        className="aspect-[4/5]"
      />
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {copy.stock.pieceId} · {copy.stock.pieceIdRo}
        </p>
        <p className="mt-1 font-mono text-lg text-ink">{item.id}</p>
        <h3 className="mt-2 font-display text-2xl leading-snug text-ink">{item.title}</h3>
      </div>
      <SpeciesLine
        speciesRo={item.species_ro}
        speciesEn={item.species_en}
        label={copy.stock.species}
        labelRo={copy.stock.speciesRo}
      />
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
