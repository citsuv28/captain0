"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useProject } from "@/components/ProjectProvider";
import {
  pieceAskHref,
  pieceMatchesFilter,
  PIECE_CATEGORIES,
  type CollectionPiece,
  type PieceCategory,
  type PieceDims,
  type PieceFilter,
} from "@/lib/collection";
import { getCopy, type DimBasis } from "@/lib/content";

const FILTERS: PieceFilter[] = ["All", ...PIECE_CATEGORIES];

type CollectionGridProps = {
  pieces: CollectionPiece[];
  category?: PieceCategory;
  showFilters?: boolean;
};

function basisLabel(basis: DimBasis): string | null {
  const copy = getCopy();
  switch (basis) {
    case "":
    case "measured":
      return null;
    case "demo":
      return `${copy.stock.demo} · ${copy.stock.demoRo}`;
    case "chalk":
      return `${copy.stock.chalk} · ${copy.stock.chalkRo}`;
    default: {
      const exhaustive: never = basis;
      return exhaustive;
    }
  }
}

function Dimensions({ dims }: { dims: PieceDims | null }) {
  const copy = getCopy();
  if (!dims) {
    return <>—</>;
  }

  const axes = [
    ["length", copy.stock.length, copy.stock.lengthRo, dims.length, dims.length_basis],
    ["width", copy.stock.width, copy.stock.widthRo, dims.width, dims.width_basis],
    [
      "thickness",
      copy.stock.thickness,
      copy.stock.thicknessRo,
      dims.thickness,
      dims.thickness_basis,
    ],
  ] as const;

  return (
    <span className="dimstack">
      {axes.map(([key, label, labelRo, value, basis]) => {
        const mark = basisLabel(basis);
        const empty = value.trim() === "";
        return (
          <span key={key}>
            {label} · {labelRo}: {empty ? "—" : value}
            {mark ? ` · ${mark}` : ""}
          </span>
        );
      })}
    </span>
  );
}

export function CollectionGrid({
  pieces,
  category,
  showFilters = true,
}: CollectionGridProps) {
  const copy = getCopy();
  const { brief, addReference } = useProject();
  const [filter, setFilter] = useState<PieceFilter>(category ?? "All");
  const [active, setActive] = useState<CollectionPiece | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible = pieces.filter((piece) => pieceMatchesFilter(piece, filter));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !active || dialog.open) return;
    try {
      dialog.showModal();
    } catch {
      dialog.setAttribute("open", "");
    }
  }, [active]);

  const species = active
    ? [active.speciesRo, active.speciesEn].filter((value) => value.trim() !== "")
    : [];

  return (
    <>
      {showFilters ? (
        <div className="tabs" role="group" aria-label="Filter the collection">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item === "Slabs" ? "Rare slabs" : item}
            </button>
          ))}
        </div>
      ) : null}
      <div className="productgrid">
        {visible.map((piece) => (
          <button
            key={piece.id}
            type="button"
            className="product"
            onClick={() => setActive(piece)}
          >
            <div className="productimg">
              <Image src={piece.src} alt={piece.alt} fill sizes="(min-width: 950px) 30vw, 50vw" />
              <span>{brief.references.includes(piece.id) ? "Selected" : "View piece"}</span>
            </div>
            <div className="productmeta">
              <span>{piece.category === "Slabs" ? "RARE SLABS" : piece.category.toUpperCase()}</span>
              <span>{piece.id}</span>
            </div>
            <h3>{piece.title}</h3>
          </button>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="dialog"
        aria-labelledby="piece-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) setActive(null);
        }}
        onClose={() => setActive(null)}
      >
        {active ? (
          <>
            <button
              type="button"
              className="close"
              aria-label="Close piece details"
              onClick={() => setActive(null)}
            >
              ×
            </button>
            <div className="dialoginner">
              <div className="dialogphoto">
                {active.photos.map((photo) => (
                  <Image
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    width={1400}
                    height={1800}
                  />
                ))}
              </div>
              <div className="dialogcopy">
                <p className="eyebrow" id="piece-code">
                  {active.category === "Slabs" ? "RARE SLABS" : active.category.toUpperCase()} / {active.id}
                </p>
                <h2 id="piece-title">{active.title}</h2>
                {active.text ? <p>{active.text}</p> : null}
                <dl>
                  <dt>Species</dt>
                  <dd>{species.length > 0 ? species.join(" · ") : "—"}</dd>
                  <dt>Origin</dt>
                  <dd>{copy.footer.place}</dd>
                  <dt>Dimensions</dt>
                  <dd>
                    <Dimensions dims={active.dims} />
                  </dd>
                </dl>
                {active.category === "Logs" ? (
                  <p className="small">
                    {copy.busteni.intent} {copy.busteni.intentRo}
                  </p>
                ) : null}
                <Link className="button" href={pieceAskHref(active)}>
                  {copy.cta.askForPiece}
                  <span className="askro">{copy.cta.askForPieceRo}</span>
                </Link>
                <button
                  type="button"
                  className="textbutton"
                  onClick={() => addReference(active.id)}
                >
                  {brief.references.includes(active.id)
                    ? "In your project brief"
                    : "Add to project brief"}
                </button>
              </div>
            </div>
          </>
        ) : null}
      </dialog>
    </>
  );
}
