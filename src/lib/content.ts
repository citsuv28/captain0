import copyEn from "../../content/en/copy.json";
import photosFile from "../../content/photos.json";

export const LOCALES = ["en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const PHOTO_TYPES = [
  "slab",
  "log",
  "veneer",
  "table",
  "epoxy",
  "workshop",
] as const;
export type PhotoType = (typeof PHOTO_TYPES)[number];

export const PHOTO_LANES = ["A_placi", "B_furnir", "C_special"] as const;
export type PhotoLane = (typeof PHOTO_LANES)[number];

export const HERO_LANES = ["A", "B", "D"] as const;
export type HeroLane = (typeof HERO_LANES)[number] | "";

export const DIM_BASES = ["", "demo", "chalk", "measured"] as const;
export type DimBasis = (typeof DIM_BASES)[number];

const STOCK_TYPES: readonly PhotoType[] = ["slab", "log", "veneer"];
const PORTFOLIO_TYPES: readonly PhotoType[] = ["table", "epoxy"];

export const FEATURED_ID = "C0-A03";

export type Copy = typeof copyEn;

export type PhotoItem = {
  id: string;
  title: string;
  species_ro: string;
  species_en: string;
  type: PhotoType;
  lane: PhotoLane;
  hero_lane: HeroLane;
  sort: number;
  dims: {
    length: string;
    width: string;
    thickness: string;
    length_basis: DimBasis;
    width_basis: DimBasis;
    thickness_basis: DimBasis;
  };
  moisture: string;
  weight: string;
  year: string;
  defects: string;
  notes: string;
  photo: {
    src: string;
    alt: string;
  };
};

export type StockItem = PhotoItem;
export type PortfolioItem = PhotoItem;
export type StockCatalog = { items: PhotoItem[] };
export type PortfolioCatalog = { items: PhotoItem[] };

function asDimBasis(value: string, id: string, axis: string): DimBasis {
  if (
    value === "" ||
    value === "demo" ||
    value === "chalk" ||
    value === "measured"
  ) {
    return value;
  }
  throw new Error(`Unknown ${axis} basis on ${id}: ${value}`);
}

function mapDims(
  id: string,
  dims: {
    length: string;
    width: string;
    thickness: string;
    length_basis?: string;
    width_basis?: string;
    thickness_basis?: string;
  },
): PhotoItem["dims"] {
  const mapped = {
    length: dims.length,
    width: dims.width,
    thickness: dims.thickness,
    length_basis: asDimBasis(dims.length_basis ?? "", id, "length"),
    width_basis: asDimBasis(dims.width_basis ?? "", id, "width"),
    thickness_basis: asDimBasis(dims.thickness_basis ?? "", id, "thickness"),
  };

  const axes = ["length", "width", "thickness"] as const;
  for (const axis of axes) {
    const value = mapped[axis];
    const basis = mapped[`${axis}_basis`];
    if (value.trim() === "" && basis !== "") {
      throw new Error(`${id} ${axis} is empty and cannot be labeled ${basis}`);
    }
    if (value.trim() !== "" && basis === "") {
      throw new Error(
        `${id} ${axis} is filled and needs a demo, chalk, or measured basis`,
      );
    }
  }

  return mapped;
}

const photos: PhotoItem[] = photosFile.items.map((item) => ({
  ...item,
  type: item.type as PhotoType,
  lane: item.lane as PhotoLane,
  hero_lane: (item.hero_lane ?? "") as HeroLane,
  sort: item.sort,
  dims: mapDims(item.id, item.dims),
}));

const catalogs: Record<Locale, { copy: Copy }> = {
  en: { copy: copyEn },
};

function resolveLocale(locale: Locale = DEFAULT_LOCALE): Locale {
  return LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}

function bySortThenId(a: PhotoItem, b: PhotoItem): number {
  const rank = a.sort - b.sort;
  return rank !== 0 ? rank : a.id.localeCompare(b.id);
}

export function getCopy(locale: Locale = DEFAULT_LOCALE): Copy {
  return catalogs[resolveLocale(locale)].copy;
}

export function getPhotos(): PhotoItem[] {
  return [...photos].sort(bySortThenId);
}

export function getStock(locale: Locale = DEFAULT_LOCALE): StockCatalog {
  void locale;
  return {
    items: photos.filter((item) => STOCK_TYPES.includes(item.type)).sort(bySortThenId),
  };
}

export function getPortfolio(
  locale: Locale = DEFAULT_LOCALE,
): PortfolioCatalog {
  void locale;
  return {
    items: photos
      .filter((item) => PORTFOLIO_TYPES.includes(item.type))
      .sort(bySortThenId),
  };
}

export function getWorkshop(): PhotoItem[] {
  return [];
}

export function getHomeHeroes(): PhotoItem[] {
  return getPhotos();
}

export function getFeaturedHero(): PhotoItem {
  return photos.find((item) => item.id === FEATURED_ID) ?? getStock().items[0];
}

export function homeHref(item: PhotoItem): string {
  if (item.hero_lane === "D" || PORTFOLIO_TYPES.includes(item.type)) {
    return "/portfolio";
  }
  return "/stock";
}

export function speciesCaption(item: PhotoItem): string {
  const parts = [item.species_ro, item.species_en].filter((part) =>
    part.trim(),
  );
  return parts.join(" / ") || item.title;
}

export function isEmptyField(value: string): boolean {
  return value.trim() === "";
}

export type BookmatchRecord = {
  id: string;
  pieceIds: [string, string];
  notes: string;
  confirmed: boolean;
};

export type StockSingle = {
  kind: "single";
  item: PhotoItem;
};

export type StockBookmatch = {
  kind: "bookmatch";
  id: string;
  notes: string;
  pieces: [PhotoItem, PhotoItem];
};

export type StockListing = StockSingle | StockBookmatch;

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function loadBookmatches(raw: unknown): BookmatchRecord[] {
  if (!Array.isArray(raw)) {
    throw new Error("photos.json bookmatches must be an array");
  }

  return raw.map((entry, index) => {
    if (!isPlainRecord(entry)) {
      throw new Error(`bookmatches[${index}] must be an object`);
    }
    if ("price" in entry) {
      throw new Error(`bookmatches[${index}] must not include a price`);
    }
    const { id, notes, confirmed, pieceIds } = entry;
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error(`bookmatches[${index}] needs a public id`);
    }
    if (typeof notes !== "string") {
      throw new Error(`bookmatches[${index}] notes must be a string`);
    }
    if (typeof confirmed !== "boolean") {
      throw new Error(`bookmatches[${index}] confirmed must be true or false`);
    }
    if (
      !Array.isArray(pieceIds) ||
      pieceIds.length !== 2 ||
      pieceIds.some((pieceId) => typeof pieceId !== "string" || pieceId.trim() === "")
    ) {
      throw new Error(`bookmatches[${index}] must list exactly two piece ids`);
    }
    return {
      id,
      notes,
      confirmed,
      pieceIds: [pieceIds[0], pieceIds[1]],
    };
  });
}

function listingSort(listing: StockListing): number {
  switch (listing.kind) {
    case "single":
      return listing.item.sort;
    case "bookmatch":
      return Math.min(listing.pieces[0].sort, listing.pieces[1].sort);
    default: {
      const exhaustive: never = listing;
      return exhaustive;
    }
  }
}

export function stockListingId(listing: StockListing): string {
  switch (listing.kind) {
    case "single":
      return listing.item.id;
    case "bookmatch":
      return listing.id;
    default: {
      const exhaustive: never = listing;
      return exhaustive;
    }
  }
}

export function resolveStockListings(
  items: readonly PhotoItem[],
  records: readonly BookmatchRecord[],
): StockListing[] {
  const byId = new Map(items.map((item) => [item.id, item]));
  const consumed = new Set<string>();
  const listings: StockListing[] = [];

  for (const record of records) {
    if (!record.confirmed) {
      continue;
    }
    const [leftId, rightId] = record.pieceIds;
    if (leftId === rightId) {
      throw new Error(`Confirmed bookmatch ${record.id} lists the same piece twice`);
    }
    const left = byId.get(leftId);
    const right = byId.get(rightId);
    if (
      !left ||
      !right ||
      !STOCK_TYPES.includes(left.type) ||
      !STOCK_TYPES.includes(right.type)
    ) {
      throw new Error(
        `Confirmed bookmatch ${record.id} does not match two in-stock pieces`,
      );
    }
    if (consumed.has(leftId) || consumed.has(rightId)) {
      throw new Error(
        `Confirmed bookmatch ${record.id} reuses a piece already in a pair`,
      );
    }
    consumed.add(leftId);
    consumed.add(rightId);
    listings.push({
      kind: "bookmatch",
      id: record.id,
      notes: record.notes,
      pieces: [left, right],
    });
  }

  for (const item of items) {
    if (!consumed.has(item.id)) {
      listings.push({ kind: "single", item });
    }
  }

  return listings.sort((a, b) => {
    const rank = listingSort(a) - listingSort(b);
    return rank !== 0 ? rank : stockListingId(a).localeCompare(stockListingId(b));
  });
}

const bookmatchRecords = loadBookmatches(photosFile.bookmatches);

resolveStockListings(
  photos.filter((item) => STOCK_TYPES.includes(item.type)),
  bookmatchRecords,
);

export function getBookmatchRecords(): BookmatchRecord[] {
  return bookmatchRecords.map((record) => ({
    ...record,
    pieceIds: [record.pieceIds[0], record.pieceIds[1]],
  }));
}

export function getStockListings(): StockListing[] {
  return resolveStockListings(getStock().items, bookmatchRecords);
}
