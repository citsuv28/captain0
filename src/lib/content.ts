import copyEn from "../../content/en/copy.json";
import portfolioEn from "../../content/en/portfolio.json";
import stockEn from "../../content/en/stock.json";

export const LOCALES = ["en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export type Copy = typeof copyEn;
export type StockCatalog = typeof stockEn;
export type PortfolioCatalog = typeof portfolioEn;
export type StockItem = StockCatalog["items"][number];
export type PortfolioItem = PortfolioCatalog["items"][number];

const catalogs: Record<
  Locale,
  { copy: Copy; stock: StockCatalog; portfolio: PortfolioCatalog }
> = {
  en: { copy: copyEn, stock: stockEn, portfolio: portfolioEn },
};

function resolveLocale(locale: Locale = DEFAULT_LOCALE): Locale {
  return LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}

export function getCopy(locale: Locale = DEFAULT_LOCALE): Copy {
  return catalogs[resolveLocale(locale)].copy;
}

export function getStock(locale: Locale = DEFAULT_LOCALE): StockCatalog {
  return catalogs[resolveLocale(locale)].stock;
}

export function getPortfolio(
  locale: Locale = DEFAULT_LOCALE,
): PortfolioCatalog {
  return catalogs[resolveLocale(locale)].portfolio;
}
