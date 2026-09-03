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

describe("candidate stock listings", () => {
  it("lists the four photographed candidates with honest TBD fields and no prices", () => {
    const stock = getStock("en");
    const ids = stock.items.map((item) => item.id);

    expect(ids).toEqual(["C0-A9", "C0-S01", "C0-S02", "C0-W01"]);

    for (const item of stock.items) {
      expect(item.sample).toBe(true);
      expect(item.moisture).toContain("[TBD]");
      expect(item.weight).toContain("[TBD]");
      expect(item.defects).toContain("[TBD]");
      expect(item.year).toContain("[TBD]");
      expect(item).not.toHaveProperty("price");
      expect(item.photo.src).toMatch(/^\/photos\/C0-/);
    }

    const a9 = stock.items.find((item) => item.id === "C0-A9");
    expect(a9?.title).toMatch(/figured poplar/i);
    expect(a9?.dimensions.length).toBe("350 cm");
    expect(a9?.dimensions.width).toBe("125 cm");
    expect(a9?.dimensions.thickness).toContain("[TBD]");
    expect(a9?.photo.src).toBe("/photos/C0-A9-figured-poplar-350x125.png");

    const s01 = stock.items.find((item) => item.id === "C0-S01");
    expect(s01?.species.toLowerCase()).toContain("oak or poplar — confirm");
    expect(s01?.dimensions.length).toContain("[TBD]");
    expect(s01?.photo.src).toBe("/photos/C0-S01-wide-slab-yard.png");

    const s02 = stock.items.find((item) => item.id === "C0-S02");
    expect(s02?.species.toLowerCase()).toContain("unconfirmed");
    expect(s02?.photo.src).toBe("/photos/C0-S02-pale-slab-shop.png");

    const w01 = stock.items.find((item) => item.id === "C0-W01");
    expect(w01?.title).toBe("European walnut burl cookie");
    expect(w01?.photo.src).toBe("/photos/C0-W01-walnut-burl-cookie.png");
  });
});

describe("portfolio examples", () => {
  it("lists the three finished mappa tables as portfolio, not the primary product", () => {
    const portfolio = getPortfolio("en");
    const ids = portfolio.items.map((item) => item.id);

    expect(ids).toEqual(["C0-P01", "C0-P02", "C0-P03"]);

    for (const item of portfolio.items) {
      expect(item.kind).toBe("portfolio");
      expect(item.primarySku).toBe(false);
      expect(item.disclaimer.toLowerCase()).toMatch(/portfolio/);
      expect(item.disclaimer.toLowerCase()).toMatch(/not the main sku/);
      expect(item.wood.toLowerCase()).toMatch(/mappa|poplar burl/);
    }

    expect(portfolio.items[0].photo.src).toBe("/photos/C0-P01-mappa-finished.png");
    expect(portfolio.items[1].photo.src).toBe("/photos/C0-P02-mappa-finished.png");
    expect(portfolio.items[2].photo.src).toBe(
      "/photos/C0-P03-mappa-finished-workshop.png",
    );
  });
});
