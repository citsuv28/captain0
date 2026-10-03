"use client";

import { useMemo, useState } from "react";
import { BookmatchCard } from "@/components/BookmatchCard";
import { CampaignStage } from "@/components/CampaignStage";
import type { CampaignFrame } from "@/components/CampaignView";
import { PhotoCard } from "@/components/PhotoCard";
import {
  getCopy,
  stockListingId,
  type StockListing,
} from "@/lib/content";
import {
  DIM_FILTER_BOUNDS,
  clampRange,
  partitionListings,
  type DimAxis,
  type DimFilter,
  type DimRange,
} from "@/lib/stock-filter";

const AXES: {
  key: DimAxis;
  label: "length" | "width" | "thickness";
  hint: "lengthRo" | "widthRo" | "thicknessRo";
}[] = [
  { key: "length", label: "length", hint: "lengthRo" },
  { key: "width", label: "width", hint: "widthRo" },
  { key: "thickness", label: "thickness", hint: "thicknessRo" },
];

function collectionFilter(): DimFilter {
  return {
    length: {
      min: DIM_FILTER_BOUNDS.length.min,
      max: DIM_FILTER_BOUNDS.length.max,
    },
    width: {
      min: DIM_FILTER_BOUNDS.width.min,
      max: DIM_FILTER_BOUNDS.width.max,
    },
    thickness: {
      min: DIM_FILTER_BOUNDS.thickness.min,
      max: DIM_FILTER_BOUNDS.thickness.max,
    },
  };
}

function frameFor(listing: StockListing, line: string): CampaignFrame {
  switch (listing.kind) {
    case "single":
      return {
        frameKey: listing.item.id,
        passportKey: listing.item.id,
        src: listing.item.photo.src,
        alt: listing.item.photo.alt,
        line: listing.item.title,
        id: listing.item.id,
      };
    case "bookmatch":
      return {
        frameKey: listing.id,
        passportKey: listing.id,
        src: listing.pieces[0].photo.src,
        alt: listing.pieces[0].photo.alt,
        line,
        id: listing.id,
      };
    default: {
      const exhaustive: never = listing;
      return exhaustive;
    }
  }
}

type StockCampaignProps = {
  listings: StockListing[];
};

export function StockCampaign({ listings }: StockCampaignProps) {
  const copy = getCopy();
  const [filter, setFilter] = useState<DimFilter>(collectionFilter);

  const visible = useMemo(() => {
    const { matches, tbd } = partitionListings(listings, filter);
    const allowed = new Set(
      [...matches, ...tbd].map((listing) => stockListingId(listing)),
    );
    return listings.filter((listing) => allowed.has(stockListingId(listing)));
  }, [listings, filter]);

  const frames = useMemo(
    () => visible.map((listing) => frameFor(listing, copy.stock.bookmatchHint)),
    [visible, copy.stock.bookmatchHint],
  );

  function renderPassport(key: string) {
    const listing = visible.find((entry) => stockListingId(entry) === key);
    if (!listing) return null;
    switch (listing.kind) {
      case "single":
        return <PhotoCard item={listing.item} variant="stock" />;
      case "bookmatch":
        return <BookmatchCard listing={listing} />;
      default: {
        const exhaustive: never = listing;
        return exhaustive;
      }
    }
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <h1 className="sr-only">{copy.stock.title}</h1>
      <CampaignStage
        frames={frames}
        renderPassport={renderPassport}
        widePassportKeys={visible.flatMap((listing) =>
          listing.kind === "bookmatch" ? [listing.id] : [],
        )}
        empty={
          <p className="px-6 py-24 text-center">
            <span className="block font-display text-2xl text-casa-ink">
              {copy.stock.empty}
            </span>
            <a href="/contact" className="mt-3 inline-block text-sm text-casa-ink underline">
              {copy.stock.emptyCta}
            </a>
          </p>
        }
      />
      <details className="shrink-0 px-5 pb-4">
        <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.18em] text-casa-muted">
          {copy.stock.filterTitle}
        </summary>
        <div className="mt-4 border border-white/15 p-4">
          <p className="text-sm text-casa-muted">{copy.stock.filterHint}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-casa-muted">
            {copy.stock.filterHintRo}
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {AXES.map((axis) => (
              <DimRangeControl
                key={axis.key}
                label={copy.stock[axis.label]}
                hint={copy.stock[axis.hint]}
                bounds={DIM_FILTER_BOUNDS[axis.key]}
                value={filter[axis.key]}
                onChange={(next) =>
                  setFilter((current) => ({
                    ...current,
                    [axis.key]: clampRange(next, axis.key),
                  }))
                }
              />
            ))}
          </div>
          <button
            type="button"
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-casa-ink underline"
            onClick={() => setFilter(collectionFilter())}
          >
            {copy.stock.reset}
          </button>
        </div>
      </details>
    </div>
  );
}

function DimRangeControl({
  label,
  hint,
  bounds,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  bounds: { min: number; max: number };
  value: DimRange;
  onChange: (next: DimRange) => void;
}) {
  return (
    <fieldset>
      <legend className="font-display text-lg text-casa-ink">
        {label}{" "}
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-casa-muted">
          {hint} · cm
        </span>
      </legend>
      <p className="mt-2 font-mono text-sm text-casa-ink">
        {value.min}–{value.max} cm
      </p>
      <label className="mt-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-casa-muted">
        Min
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={value.min}
          onChange={(event) =>
            onChange({ min: Number(event.target.value), max: value.max })
          }
          className="mt-1 w-full accent-casa-ink"
        />
      </label>
      <label className="mt-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-casa-muted">
        Max
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={value.max}
          onChange={(event) =>
            onChange({ min: value.min, max: Number(event.target.value) })
          }
          className="mt-1 w-full accent-casa-ink"
        />
      </label>
    </fieldset>
  );
}
