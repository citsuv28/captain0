import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  FEATURED_ID,
  LOCALES,
  PHOTO_LANES,
  PHOTO_TYPES,
  getCopy,
  getFeaturedHero,
  getHomeHeroes,
  getPhotos,
  getPortfolio,
  getStock,
  getWorkshop,
} from "./content";

const STOCK_IDS = [
  "C0-A03",
  "C0-A04",
  "C0-A02",
  "C0-A09",
  "C0-A06",
  "C0-B04",
] as const;

const PORTFOLIO_IDS = [
  "C0-P01",
  "C0-P02",
  "C0-P03",
  "C0-P04",
  "C0-P05",
  "C0-P06",
] as const;

const REMOVED_IDS = [
  "C0-A01",
  "C0-A05",
  "C0-A07",
  "C0-B01",
  "C0-B02",
  "C0-B03",
  "C0-B05",
  "C0-C01",
  "C0-C02",
  "C0-C04",
  "C0-C05",
  "C0-E01",
  "C0-E02",
  "C0-E03",
  "C0-D04",
  "C0-B2-009",
  "C0-S01",
] as const;

describe("locale catalog", () => {
  it("ships English first and lists only locales that have copy", () => {
    expect(DEFAULT_LOCALE).toBe("en");
    expect(LOCALES).toEqual(["en"]);
  });
});

describe("locked English marketing copy", () => {
  it("uses the approved hero, subhead, and value props verbatim", () => {
    const copy = getCopy("en");

    expect(copy.brand.tagline).toBe("Rare wood concierge");
    expect(copy.home.tagline).toBe("Rare wood concierge");
    expect(copy.home.hero).toBe(
      "Raw European wood slabs from Neamț, Romania.",
    );
    expect(copy.home.subhead).toBe(
      "We cut and dry our own timber — mappa (poplar) burl, European walnut, and oak. Sold as raw material to makers, luthiers, and workshops. Finished epoxy tables are portfolio only.",
    );
    expect(copy.home.valueProps).toEqual([
      {
        title: "Source we control",
        body: "Logs selected, cut, and dried in our yard in Piatra Neamț. Origin and traceability docs with every shipment.",
      },
      {
        title: "Honest listings",
        body: "Exact piece in the photos. Dimensions, moisture, and defects written up front. No surprises on arrival.",
      },
      {
        title: "Built for freight",
        body: "Pallet shipping from Romania across the EU. Quote by postcode. B2B paperwork ready.",
      },
    ]);
  });

  it("keeps the approved about, stock intro, and contact lines, including [TBD] gaps", () => {
    const copy = getCopy("en");

    expect(copy.about.line).toBe(
      "Rare wood concierge. Slabs, logs and veneer, and special requests.",
    );
    expect(copy.about.lineRo).toBe("Concierge pentru lemn rar.");
    expect(copy.about.line.toLowerCase()).not.toMatch(/epoxy shop/);
    expect(copy.about.body).toBe(
      "Captain0 is a family workshop in Piatra Neamț, Romania. We buy standing or fallen timber locally, mill it ourselves, and dry it in our own yard. Primary product is raw material: live-edge slabs, burl, blanks, and bookmatched pairs — especially European poplar burl (mappa), European walnut (Juglans regia), and European oak. We have been cutting and drying our own timber for [TBD] years. Finished epoxy river tables are made from the same stock; they show what the wood can do. They are not the main SKU.",
    );
    expect(copy.stock.intro).toBe(
      "Every piece in stock is a one-off. Browse → message with slab ID + postcode → freight quote → pay → crate/pallet from Romania with origin docs. Shipping always quoted separately.",
    );
    expect(copy.contact.email).toBe("[TBD — e.g. contact@captain0.com]");
    expect(copy.contact.whatsapp).toBe("[TBD]");
    expect(copy.contact.location).toBe(
      "Piatra Neamț, Neamț County, Romania",
    );
  });

  it("exposes the locked CTAs and a footer that does not sell epoxy as primary", () => {
    const copy = getCopy("en");

    expect(copy.cta.requestStockList).toBe("Request stock list");
    expect(copy.cta.askFreightQuote).toBe("Ask for freight quote");
    expect(copy.footer.mark).toBe("Captain0");
    expect(copy.footer.place).toBe("Piatra Neamț, Romania");
    expect(copy.footer.productNote.toLowerCase()).toMatch(/raw/);
    expect(copy.footer.productNote.toLowerCase()).not.toMatch(
      /epoxy furniture shop/,
    );
  });
});

describe("photo metadata schema", () => {
  it("ships only the 12 curated photos and does not invent numbers", () => {
    const items = getPhotos();
    const ids = items.map((item) => item.id);

    expect(ids).toEqual([...STOCK_IDS, ...PORTFOLIO_IDS]);
    expect(ids).toHaveLength(12);
    expect(ids).not.toEqual(expect.arrayContaining([...REMOVED_IDS]));

    for (const item of items) {
      expect(PHOTO_TYPES).toContain(item.type);
      expect(PHOTO_LANES).toContain(item.lane);
      expect(item).toHaveProperty("species_ro");
      expect(item).toHaveProperty("species_en");
      expect(item).toHaveProperty("notes");
      expect(item).not.toHaveProperty("price");
      expect(item.photo.src).toMatch(/^\/photos\/(stock|portfolio)\//);
      expect(item.type).not.toBe("workshop");

      for (const value of [
        item.dims.length,
        item.dims.width,
        item.dims.thickness,
        item.moisture,
        item.weight,
        item.year,
        item.defects,
      ]) {
        expect(value).not.toMatch(/^\d+(\.\d+)?$/);
      }
    }
  });
});

describe("candidate stock listings", () => {
  it("keeps the six RAW photos in manifest order with empty unfilled fields", () => {
    const stock = getStock("en");
    const ids = stock.items.map((item) => item.id);

    expect(ids).toEqual([...STOCK_IDS]);

    for (const item of stock.items) {
      expect(["slab", "log", "veneer"]).toContain(item.type);
      expect(item.moisture).toBe("");
      expect(item.weight).toBe("");
      expect(item.defects).toBe("");
      expect(item.year).toBe("");
    }

    const a03 = stock.items[0];
    expect(a03?.id).toBe("C0-A03");
    expect(a03?.species_ro).toBe("plop negru bubos");
    expect(a03?.species_en).toMatch(/mappa/i);
    expect(a03?.photo.src).toBe("/photos/stock/A03_placa-mare-scara.jpg");

    const a09 = stock.items.find((item) => item.id === "C0-A09");
    expect(a09?.dims.length).toBe("350 cm");
    expect(a09?.dims.width).toBe("125 cm");
    expect(a09?.dims.thickness).toBe("");
    expect(a09?.photo.src).toBe("/photos/stock/A09_350x125.jpg");

    const a06 = stock.items.find((item) => item.id === "C0-A06");
    expect(a06?.species_ro).toBe("");
    expect(a06?.species_en).toBe("");
    expect(a06?.dims.length).toBe("");

    const b04 = stock.items.find((item) => item.id === "C0-B04");
    expect(b04?.type).toBe("veneer");
    expect(b04?.lane).toBe("B_furnir");
    expect(b04?.species_ro).toBe("");
  });
});

describe("portfolio examples", () => {
  it("keeps the six finished pieces as portfolio, not stock SKUs", () => {
    const portfolio = getPortfolio("en");
    const ids = portfolio.items.map((item) => item.id);

    expect(ids).toEqual([...PORTFOLIO_IDS]);

    for (const item of portfolio.items) {
      expect(["table", "epoxy"]).toContain(item.type);
      expect(item.lane).toBe("C_special");
      expect(item.notes.toLowerCase()).toMatch(/portfolio/);
      expect(item.notes.toLowerCase()).toMatch(/not the main sku/);
      expect(item.notes.toLowerCase()).toMatch(/not for sale as stock/);
    }

    expect(
      portfolio.items.find((item) => item.id === "C0-P01")?.photo.src,
    ).toBe("/photos/portfolio/P01_birou-captain0.png");
    expect(
      portfolio.items.find((item) => item.id === "C0-P04")?.type,
    ).toBe("epoxy");
    expect(
      portfolio.items.find((item) => item.id === "C0-P06")?.species_ro,
    ).toBe("");
  });
});

describe("curated 12-photo set", () => {
  it("features A03 on Home and keeps workshop galleries empty", () => {
    const home = getHomeHeroes();
    const featured = getFeaturedHero();

    expect(FEATURED_ID).toBe("C0-A03");
    expect(featured.id).toBe("C0-A03");
    expect(featured.species_ro).toBe("plop negru bubos");
    expect(home.map((item) => item.id)).toEqual([
      ...STOCK_IDS,
      ...PORTFOLIO_IDS,
    ]);
    expect(getWorkshop()).toEqual([]);
  });
});
