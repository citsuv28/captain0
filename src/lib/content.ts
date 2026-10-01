import copyEn from "../../content/en/copy.json";
import photosFile from "../../content/photos.json";

export const LOCALES = ["en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const PHOTO_TYPES = ["slab", "log", "veneer", "table", "epoxy"] as const;
export type PhotoType = (typeof PHOTO_TYPES)[number];

export const PHOTO_LANES = ["A_placi", "B_furnir", "C_special"] as const;
export type PhotoLane = (typeof PHOTO_LANES)[number];

const STOCK_TYPES: readonly PhotoType[] = ["slab", "log", "veneer"];
const PORTFOLIO_TYPES: readonly PhotoType[] = ["table", "epoxy"];

export type Copy = typeof copyEn;

export type PhotoItem = {
  id: string;
  title: string;
  species_ro: string;
  species_en: string;
  type: PhotoType;
  lane: PhotoLane;
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
}));

const catalogs: Record<Locale, { copy: Copy }> = {
  en: { copy: copyEn },
};

function resolveLocale(locale: Locale = DEFAULT_LOCALE): Locale {
  return LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}

export function getCopy(locale: Locale = DEFAULT_LOCALE): Copy {
  return catalogs[resolveLocale(locale)].copy;
}

export function getPhotos(): PhotoItem[] {
  return photos;
}

export function getStock(locale: Locale = DEFAULT_LOCALE): StockCatalog {
  void locale;
  return {
    items: photos.filter((item) => STOCK_TYPES.includes(item.type)),
  };
}

export function getPortfolio(
  locale: Locale = DEFAULT_LOCALE,
): PortfolioCatalog {
  void locale;
  return {
    items: photos.filter((item) => PORTFOLIO_TYPES.includes(item.type)),
  };
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
