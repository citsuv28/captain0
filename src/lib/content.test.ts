import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  LOCALES,
  getCopy,
  getPortfolio,
  getStock,
} from "./content";

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

describe("sample stock listings", () => {
  it("marks 2–3 listings as sample/placeholder stock with honest TBD fields", () => {
    const stock = getStock("en");

    expect(stock.items.length).toBeGreaterThanOrEqual(2);
    expect(stock.items.length).toBeLessThanOrEqual(3);

    for (const item of stock.items) {
      expect(item.sample).toBe(true);
      expect(item.moisture).toContain("[TBD]");
      expect(item.weight).toContain("[TBD]");
      expect(item.defects).toContain("[TBD]");
      expect(item.year).toContain("[TBD]");
      expect(item.dimensions.length).toContain("[TBD]");
      expect(item.dimensions.width).toContain("[TBD]");
      expect(item.dimensions.thickness).toContain("[TBD]");
      expect(item).not.toHaveProperty("price");
    }

    expect(stock.items[0].title).toBe(
      "European Poplar Burl (Mappa) Slab",
    );
  });
});

describe("portfolio examples", () => {
  it("labels finished tables as portfolio, not the primary product", () => {
    const portfolio = getPortfolio("en");

    expect(portfolio.items.length).toBeGreaterThanOrEqual(1);
    expect(portfolio.items.length).toBeLessThanOrEqual(2);

    for (const item of portfolio.items) {
      expect(item.kind).toBe("portfolio");
      expect(item.primarySku).toBe(false);
      expect(item.disclaimer.toLowerCase()).toMatch(/portfolio/);
      expect(item.disclaimer.toLowerCase()).toMatch(/not the main sku/);
    }
  });
});
