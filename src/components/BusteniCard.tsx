import { PhotoMedia } from "@/components/PhotoMedia";
import { getCopy, isEmptyField } from "@/lib/content";
import type { BusteniLog } from "@/lib/busteni";

type BusteniCardProps = {
  log: BusteniLog;
};

export function BusteniCard({ log }: BusteniCardProps) {
  const copy = getCopy();
  const note = isEmptyField(log.notes) ? "—" : log.notes;

  return (
    <article className="flex flex-col border border-rule bg-paper">
      <div
        className={
          log.photos.length > 1 ? "grid gap-px bg-rule md:grid-cols-2" : "contents"
        }
      >
        {log.photos.map((photo) => (
          <PhotoMedia
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            caption={log.numbers.join(" · ")}
            className="aspect-[4/5] bg-paper"
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            {copy.busteni.numbers} · {copy.busteni.numbersRo}
          </p>
          <h2 className="mt-1 font-display text-4xl leading-none text-ink">
            {log.numbers.join(" · ")}
          </h2>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            {copy.busteni.species} · {copy.busteni.speciesRo}
          </p>
          <p className="mt-1 font-display text-2xl text-ink">{log.species_ro}</p>
          <p className="text-ink-muted">{log.species_en}</p>
        </div>
        <div className="border-t border-rule pt-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            {copy.stock.note} · {copy.stock.noteRo}
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink">{note}</p>
        </div>
      </div>
    </article>
  );
}
