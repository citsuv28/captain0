import Link from "next/link";
import { PhotoMedia } from "@/components/PhotoMedia";
import {
  getCopy,
  isEmptyField,
  type Copy,
  type DimBasis,
  type PhotoItem,
} from "@/lib/content";

const LANE_LABEL: Record<PhotoItem["lane"], string> = {
  A_placi: "A · plăci",
  B_furnir: "B · furnir",
  C_special: "C · special",
};

type PhotoCardProps = {
  item: PhotoItem;
  variant: "stock" | "portfolio";
};

export function PhotoCard({ item, variant }: PhotoCardProps) {
  const copy = getCopy();
  const isPortfolio = variant === "portfolio";

  return (
    <article className="flex flex-col border border-rule bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
        <span>
          {isPortfolio
            ? "Portfolio example — not the main SKU"
            : "Candidate stock — fields incomplete"}
        </span>
        <span className="text-ink">{item.id}</span>
      </div>
      <PhotoMedia
        src={item.photo.src}
        alt={item.photo.alt}
        caption={`${item.id} · ${item.type} · ${item.lane}`}
        className="aspect-[4/5]"
      />
      <div className="flex flex-1 flex-col gap-5 p-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            {copy.stock.pieceId} · {copy.stock.pieceIdRo}
          </p>
          <p className="mt-1 font-mono text-lg text-ink">{item.id}</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            {LANE_LABEL[item.lane]} · {item.type}
          </p>
          <h3 className="mt-2 font-display text-3xl leading-snug text-ink">
            {item.title}
          </h3>
        </div>

        <dl className="grid gap-4">
          <ReadableField
            label="species_ro"
            value={item.species_ro}
            size="xl"
          />
          <ReadableField
            label="species_en"
            value={item.species_en}
            size="xl"
          />
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

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-sm sm:grid-cols-4">
          <ReadableField label="moisture" value={item.moisture} size="sm" />
          <ReadableField label="weight" value={item.weight} size="sm" />
          <ReadableField label="year" value={item.year} size="sm" />
          <ReadableField label="defects" value={item.defects} size="sm" />
        </dl>

        <NoteLine notes={item.notes} />

        {isPortfolio ? null : (
          <Link
            href={`/contact?slab=${encodeURIComponent(item.id)}`}
            className="mt-auto text-sm font-semibold text-forest underline decoration-rule underline-offset-4 hover:decoration-forest"
          >
            {copy.cta.askFreightQuote} →
          </Link>
        )}
      </div>
    </article>
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

function ReadableField({
  label,
  value,
  size = "md",
}: {
  label: string;
  value: string;
  size?: "sm" | "md" | "xl";
}) {
  const empty = isEmptyField(value);
  const valueClass =
    size === "xl"
      ? "mt-1 font-display text-2xl leading-snug sm:text-[1.7rem]"
      : size === "sm"
        ? "mt-1 text-sm"
        : "mt-1 text-lg";

  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </dt>
      <dd className={`${valueClass} ${empty ? "text-ink-muted" : "text-ink"}`}>
        {empty ? "—" : value}
      </dd>
    </div>
  );
}
