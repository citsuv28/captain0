import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  LOCALES,
  PHOTO_LANES,
  PHOTO_TYPES,
  getCopy,
  getPhotos,
  getPortfolio,
  getStock,
} from "./content";

const STOCK_IDS = [
  "C0-A9",
  "C0-S01",
  "C0-S02",
  "C0-W01",
  "C0-B2-009",
  "C0-B2-034",
  "C0-B2-060",
  "C0-B2-061",
  "C0-B2-066",
] as const;

const PORTFOLIO_IDS = [
  "C0-P01",
  "C0-P02",
  "C0-P03",
  "C0-B1-001",
  "C0-B1-002",
  "C0-B1-003",
  "C0-B1-013",
  "C0-B1-022",
  "C0-B1-025",
  "C0-B1-026",
  "C0-B1-042",
  "C0-B2-033",
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
  it("uses admin fields on every photo and does not invent numbers", () => {
    const items = getPhotos();
    const ids = items.map((item) => item.id);

    expect(ids).toEqual([...STOCK_IDS, ...PORTFOLIO_IDS]);

    for (const item of items) {
      expect(PHOTO_TYPES).toContain(item.type);
      expect(PHOTO_LANES).toContain(item.lane);
      expect(item).toHaveProperty("species_ro");
      expect(item).toHaveProperty("species_en");
      expect(item).toHaveProperty("notes");
      expect(item).not.toHaveProperty("price");
      expect(item.photo.src).toMatch(/^\/photos\/C0-/);

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
  it("keeps raw busteni/log listings with empty unfilled fields", () => {
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

    const a9 = stock.items.find((item) => item.id === "C0-A9");
    expect(a9?.species_ro).toBe("plop negru bubos");
    expect(a9?.species_en).toMatch(/mappa/i);
    expect(a9?.type).toBe("slab");
    expect(a9?.lane).toBe("A_placi");
    expect(a9?.dims.length).toBe("350 cm");
    expect(a9?.dims.width).toBe("125 cm");
    expect(a9?.dims.thickness).toBe("");
    expect(a9?.photo.src).toBe("/photos/C0-A9-figured-poplar-350x125.png");

    const s01 = stock.items.find((item) => item.id === "C0-S01");
    expect(s01?.species_en.toLowerCase()).toContain("oak or poplar — confirm");
    expect(s01?.species_ro).toBe("");
    expect(s01?.dims.length).toBe("");
    expect(s01?.photo.src).toBe("/photos/C0-S01-wide-slab-yard.png");

    const s02 = stock.items.find((item) => item.id === "C0-S02");
    expect(s02?.species_ro).toBe("");
    expect(s02?.species_en).toBe("");
    expect(s02?.photo.src).toBe("/photos/C0-S02-pale-slab-shop.png");

    const w01 = stock.items.find((item) => item.id === "C0-W01");
    expect(w01?.title).toBe("European walnut burl cookie");
    expect(w01?.species_ro).toBe("nuc");
    expect(w01?.lane).toBe("C_special");
    expect(w01?.photo.src).toBe("/photos/C0-W01-walnut-burl-cookie.png");

    const nuc = stock.items.find((item) => item.id === "C0-B2-034");
    expect(nuc?.species_ro).toBe("nuc");
    expect(nuc?.species_en.toLowerCase()).toContain("walnut");
    expect(nuc?.photo.src).toBe("/photos/C0-B2-034-raw-slab-nuc.jpg");

    const log = stock.items.find((item) => item.id === "C0-B2-009");
    expect(log?.type).toBe("log");
    expect(log?.species_ro).toBe("");
    expect(log?.species_en).toBe("");
  });
});

describe("portfolio examples", () => {
  it("keeps finished tables as portfolio, not the primary product", () => {
    const portfolio = getPortfolio("en");
    const ids = portfolio.items.map((item) => item.id);

    expect(ids).toEqual([...PORTFOLIO_IDS]);

    for (const item of portfolio.items) {
      expect(["table", "epoxy"]).toContain(item.type);
      expect(item.lane).toBe("C_special");
      expect(item.notes.toLowerCase()).toMatch(/portfolio/);
      expect(item.notes.toLowerCase()).toMatch(/not the main sku/);
    }

    expect(
      portfolio.items.find((item) => item.id === "C0-P01")?.photo.src,
    ).toBe("/photos/C0-P01-mappa-finished.png");
    expect(
      portfolio.items.find((item) => item.id === "C0-B1-042")?.type,
    ).toBe("epoxy");
    expect(
      portfolio.items.find((item) => item.id === "C0-B1-042")?.species_ro,
    ).toBe("plop negru bubos");
    expect(
      portfolio.items.find((item) => item.id === "C0-B1-001")?.species_en,
    ).toBe("");
  });
});
