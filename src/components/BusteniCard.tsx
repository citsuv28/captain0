import { AskForPiece, NoteLine, PassportShell, SpeciesLine } from "@/components/PhotoCard";
import { PhotoMedia } from "@/components/PhotoMedia";
import { getCopy } from "@/lib/content";
import type { BusteniLog } from "@/lib/busteni";

type BusteniCardProps = {
  log: BusteniLog;
};

export function BusteniCard({ log }: BusteniCardProps) {
  const copy = getCopy();
  const id = log.numbers.join(" · ");

  return (
    <PassportShell kicker={`${copy.busteni.numbers} · ${copy.busteni.numbersRo}`} id={id}>
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
            caption={id}
            className="aspect-[4/5] border-x-0 bg-paper"
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-5 p-5">
        <SpeciesLine
          speciesRo={log.species_ro}
          speciesEn={log.species_en}
          label={copy.busteni.species}
          labelRo={copy.busteni.speciesRo}
        />
        <NoteLine notes={log.notes} />
        <AskForPiece href={`/contact?piece=${encodeURIComponent(id)}`} />
      </div>
    </PassportShell>
  );
}
