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

const photos: PhotoItem[] = photosFile.items.map((item) => ({
  ...item,
  type: item.type as PhotoType,
  lane: item.lane as PhotoLane,
  hero_lane: (item.hero_lane ?? "") as HeroLane,
  sort: item.sort,
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
