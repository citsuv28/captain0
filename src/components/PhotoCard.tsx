import Link from "next/link";
import type { ReactNode } from "react";
import { PhotoMedia } from "@/components/PhotoMedia";
import {
  getCopy,
  isEmptyField,
  type Copy,
  type DimBasis,
  type PhotoItem,
} from "@/lib/content";

type PhotoCardProps = {
  item: PhotoItem;
  variant: "stock" | "portfolio";
};

export function PhotoCard({ item, variant }: PhotoCardProps) {
  const copy = getCopy();
  const isPortfolio = variant === "portfolio";

  if (isPortfolio) {
    return (
      <article className="flex flex-col border border-rule bg-paper">
        <div className="border-b border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          Portfolio example — not the main SKU
        </div>
        <PhotoMedia
          src={item.photo.src}
          alt={item.photo.alt}
          caption={item.id}
          className="aspect-[4/5]"
        />
        <div className="flex flex-1 flex-col gap-5 p-5">
          <div>
            <p className="font-mono text-lg text-ink">{item.id}</p>
            <h3 className="mt-2 font-display text-3xl leading-snug text-ink">
              {item.title}
            </h3>
          </div>
          <SpeciesLine
            speciesRo={item.species_ro}
            speciesEn={item.species_en}
            label={copy.stock.species}
            labelRo={copy.stock.speciesRo}
          />
          <Dims item={item} />
          <NoteLine notes={item.notes} />
        </div>
      </article>
    );
  }

  return (
    <PassportShell
      kicker={`${copy.stock.pieceId} · ${copy.stock.pieceIdRo}`}
      id={item.id}
    >
      <PhotoMedia
        src={item.photo.src}
        alt={item.photo.alt}
        caption={item.id}
        className="aspect-[4/5] border-x-0 border-t-0"
      />
      <div className="flex flex-1 flex-col gap-5 p-5">
        <h3 className="font-display text-2xl leading-snug text-ink">{item.title}</h3>
        <SpeciesLine
          speciesRo={item.species_ro}
          speciesEn={item.species_en}
          label={copy.stock.species}
          labelRo={copy.stock.speciesRo}
        />
        <Dims item={item} />
        <NoteLine notes={item.notes} />
        <AskForPiece href={`/contact?slab=${encodeURIComponent(item.id)}`} />
      </div>
    </PassportShell>
  );
}

export function PassportShell({
  kicker,
  id,
  children,
}: {
  kicker: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <article className="flex flex-col border border-ink bg-paper p-1.5">
      <div className="flex flex-1 flex-col border border-rule bg-paper">
        <header className="border-b border-rule px-4 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            {kicker}
          </p>
          <p className="mt-1 font-mono text-2xl leading-tight tracking-[0.04em] text-ink sm:text-3xl">
            {id}
          </p>
        </header>
        {children}
      </div>
    </article>
  );
}

export function AskForPiece({ href }: { href: string }) {
  const copy = getCopy();

  return (
    <Link
      href={href}
      className="mt-auto w-fit text-sm font-semibold text-forest underline decoration-rule underline-offset-4 hover:decoration-forest"
    >
      {copy.cta.askForPiece}
      <span className="mt-1 block font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-ink-muted">
        {copy.cta.askForPieceRo}
      </span>
    </Link>
  );
}

export function SpeciesLine({
  speciesRo,
  speciesEn,
  label,
  labelRo,
}: {
  speciesRo: string;
  speciesEn: string;
  label: string;
  labelRo: string;
}) {
  const showRo = !isEmptyField(speciesRo);
  const showEn = !isEmptyField(speciesEn);
  if (!showRo && !showEn) return null;

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        {label} · {labelRo}
      </p>
      {showRo ? (
        <p className="mt-1 font-display text-2xl leading-snug text-ink">{speciesRo}</p>
      ) : null}
      {showEn ? <p className="text-ink-muted">{speciesEn}</p> : null}
    </div>
  );
}

export function NoteLine({
  notes,
  label,
}: {
  notes: string;
  label?: string;
}) {
  const copy = getCopy();
  const empty = isEmptyField(notes);
  const heading = label ?? `${copy.stock.note} · ${copy.stock.noteRo}`;

  return (
    <div className="border-t border-rule pt-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        {heading}
      </p>
      <p className="mt-2 text-base leading-relaxed text-ink">
        {empty ? <span className="text-ink-muted">—</span> : notes}
      </p>
    </div>
  );
}

function basisMark(basis: DimBasis, copy: Copy): { label: string; className: string } | null {
  switch (basis) {
    case "":
    case "measured":
      return null;
    case "demo":
      return {
        label: `${copy.stock.demo} · ${copy.stock.demoRo}`,
        className: "text-copper",
      };
    case "chalk":
      return {
        label: `${copy.stock.chalk} · ${copy.stock.chalkRo}`,
        className: "text-ink-muted",
      };
    default: {
      const exhaustive: never = basis;
      return exhaustive;
    }
  }
}

export function DimField({
  label,
  value,
  basis,
}: {
  label: string;
  value: string;
  basis: DimBasis;
}) {
  const copy = getCopy();
  const empty = isEmptyField(value);
  const mark = basisMark(basis, copy);

  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </dt>
      <dd className={`mt-1 text-lg ${empty ? "text-ink-muted" : "text-ink"}`}>
        {empty ? "—" : value}
        {mark ? (
          <span
            className={`mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] ${mark.className}`}
          >
            {mark.label}
          </span>
        ) : null}
      </dd>
    </div>
  );
}

function Dims({ item }: { item: PhotoItem }) {
  const copy = getCopy();

  return (
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
  );
}
