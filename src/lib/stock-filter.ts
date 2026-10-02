import { isEmptyField, type PhotoItem } from "./content";

export type DimRange = {
  min: number;
  max: number;
};

export type DimFilter = {
  length: DimRange;
  width: DimRange;
  thickness: DimRange;
};

export type DimAxis = keyof DimFilter;

export const DIM_FILTER_BOUNDS: Record<
  DimAxis,
  { min: number; max: number; defaultMin: number; defaultMax: number }
> = {
  length: { min: 50, max: 800, defaultMin: 300, defaultMax: 500 },
  width: { min: 20, max: 300, defaultMin: 100, defaultMax: 200 },
  thickness: { min: 1, max: 40, defaultMin: 5, defaultMax: 15 },
};

export function defaultDimFilter(): DimFilter {
  return {
    length: {
      min: DIM_FILTER_BOUNDS.length.defaultMin,
      max: DIM_FILTER_BOUNDS.length.defaultMax,
    },
    width: {
      min: DIM_FILTER_BOUNDS.width.defaultMin,
      max: DIM_FILTER_BOUNDS.width.defaultMax,
    },
    thickness: {
      min: DIM_FILTER_BOUNDS.thickness.defaultMin,
      max: DIM_FILTER_BOUNDS.thickness.defaultMax,
    },
  };
}

export function parseDimCm(value: string): number | null {
  if (isEmptyField(value)) {
    return null;
  }
  const match = value.trim().match(/^(\d+(?:\.\d+)?)/);
  if (!match) {
    return null;
  }
  return Number(match[1]);
}

export function parsedDims(item: PhotoItem): {
  length: number | null;
  width: number | null;
  thickness: number | null;
} {
  return {
    length: parseDimCm(item.dims.length),
    width: parseDimCm(item.dims.width),
    thickness: parseDimCm(item.dims.thickness),
  };
}

export function hasCompleteDims(item: PhotoItem): boolean {
  const dims = parsedDims(item);
  return dims.length !== null && dims.width !== null && dims.thickness !== null;
}

function inRange(value: number, range: DimRange): boolean {
  return value >= range.min && value <= range.max;
}

export function itemMatchesDimFilter(item: PhotoItem, filter: DimFilter): boolean {
  if (!hasCompleteDims(item)) {
    return false;
  }
  const dims = parsedDims(item);
  return (
    inRange(dims.length as number, filter.length) &&
    inRange(dims.width as number, filter.width) &&
    inRange(dims.thickness as number, filter.thickness)
  );
}

export function partitionStockByFilter(
  items: PhotoItem[],
  filter: DimFilter,
): { matches: PhotoItem[]; tbd: PhotoItem[] } {
  const matches: PhotoItem[] = [];
  const tbd: PhotoItem[] = [];

  for (const item of items) {
    if (!hasCompleteDims(item)) {
      tbd.push(item);
      continue;
    }
    if (itemMatchesDimFilter(item, filter)) {
      matches.push(item);
    }
  }

  return { matches, tbd };
}

export function clampRange(range: DimRange, axis: DimAxis): DimRange {
  const bounds = DIM_FILTER_BOUNDS[axis];
  let min = Math.min(Math.max(range.min, bounds.min), bounds.max);
  let max = Math.min(Math.max(range.max, bounds.min), bounds.max);
  if (min > max) {
    [min, max] = [max, min];
  }
  return { min, max };
}
