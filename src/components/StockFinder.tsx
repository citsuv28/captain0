"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PhotoCard } from "@/components/PhotoCard";
import { getCopy, type PhotoItem } from "@/lib/content";
import {
  DIM_FILTER_BOUNDS,
  clampRange,
  defaultDimFilter,
  partitionStockByFilter,
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

type StockFinderProps = {
  items: PhotoItem[];
};

export function StockFinder({ items }: StockFinderProps) {
  const copy = getCopy();
  const [filter, setFilter] = useState<DimFilter>(defaultDimFilter);

  const { matches, tbd } = useMemo(
    () => partitionStockByFilter(items, filter),
    [items, filter],
  );

  function updateAxis(axis: DimAxis, next: DimRange) {
    setFilter((current) => ({
      ...current,
      [axis]: clampRange(next, axis),
    }));
  }

  return (
    <section className="mt-12" aria-labelledby="size-finder">
      <div className="border border-rule bg-paper-2/40 p-6">
        <h2 id="size-finder" className="font-display text-2xl">
          {copy.stock.filterTitle}
        </h2>
        <p className="mt-2 text-ink-muted">{copy.stock.filterHint}</p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {copy.stock.filterHintRo}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {AXES.map((axis) => (
            <DimRangeControl
              key={axis.key}
              label={copy.stock[axis.label]}
              hint={copy.stock[axis.hint]}
              bounds={DIM_FILTER_BOUNDS[axis.key]}
              value={filter[axis.key]}
              onChange={(next) => updateAxis(axis.key, next)}
            />
          ))}
        </div>

        <button
          type="button"
          className="mt-6 border border-ink px-4 py-2 text-sm font-semibold text-ink hover:bg-ink hover:text-paper"
          onClick={() => setFilter(defaultDimFilter())}
        >
          {copy.stock.reset}
        </button>
      </div>

      {matches.length === 0 ? (
        <div
          role="status"
          className="mt-10 border-l-4 border-copper bg-paper-2/70 px-4 py-4"
        >
          <p className="font-display text-2xl text-ink">{copy.stock.empty}</p>
          <Link
            href="/contact"
            className="mt-3 inline-block text-sm font-semibold text-forest underline"
          >
            {copy.stock.emptyCta}
          </Link>
        </div>
      ) : (
        <div className="mt-10">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            {copy.stock.matchesTitle} · {matches.length}
          </h3>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {matches.map((item) => (
              <li key={item.id}>
                <PhotoCard item={item} variant="stock" />
              </li>
            ))}
          </ul>
        </div>
      )}

      {tbd.length > 0 ? (
        <div className="mt-14">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            {copy.stock.tbdTitle}
          </h3>
          <p className="mt-2 max-w-3xl text-sm text-ink-muted">
            {copy.stock.tbdNote}
          </p>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tbd.map((item) => (
              <li key={item.id}>
                <PhotoCard item={item} variant="stock" />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
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
      <legend className="font-display text-xl text-ink">
        {label}{" "}
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {hint} · cm
        </span>
      </legend>
      <p className="mt-2 font-mono text-sm text-ink">
        {value.min}–{value.max} cm
      </p>
      <label className="mt-4 block text-[11px] font-mono uppercase tracking-[0.14em] text-ink-muted">
        Min
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={value.min}
          onChange={(event) =>
            onChange({ min: Number(event.target.value), max: value.max })
          }
          className="mt-1 w-full accent-forest"
        />
      </label>
      <label className="mt-3 block text-[11px] font-mono uppercase tracking-[0.14em] text-ink-muted">
        Max
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={value.max}
          onChange={(event) =>
            onChange({ min: value.min, max: Number(event.target.value) })
          }
          className="mt-1 w-full accent-forest"
        />
      </label>
    </fieldset>
  );
}
