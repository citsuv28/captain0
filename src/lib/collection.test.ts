import { describe, expect, it } from "vitest";
import { getBusteni } from "@/lib/busteni";
import { getCollectionPieces, pieceAskHref } from "@/lib/collection";
import { getPortfolio, getStock } from "@/lib/content";

describe("collection pieces", () => {
  const pieces = getCollectionPieces();

  it("keeps the real stock, portfolio, and log records", () => {
    const ids = pieces.map((piece) => piece.id);
    expect(ids).toEqual([
      ...getStock().items.map((item) => item.id),
      ...getBusteni().logs.map((log) => log.numbers.join(" · ")),
      ...getPortfolio().items.map((item) => item.id),
    ]);
    expect(ids).not.toContain("B1-022");
    expect(ids).not.toContain("C0-A01");
  });

  it("keeps C0-A09 chalk dimensions and an empty thickness", () => {
    const slab = pieces.find((piece) => piece.id === "C0-A09");
    expect(slab?.dims).toMatchObject({
      length: "350 cm",
      width: "125 cm",
      thickness: "",
      length_basis: "chalk",
      width_basis: "chalk",
    });
  });

  it("keeps known species only and does not invent log dimensions or a slab link", () => {
    const log = pieces.find((piece) => piece.id === "3 · 1 · 4");
    expect(log?.speciesRo).toBe("plop negru bubos");
    expect(log?.speciesEn).toBe("black poplar");
    expect(log?.dims).toBeNull();
    expect(log?.text).not.toMatch(/C0-/);
    expect(pieceAskHref(log!)).toBe(
      `/contact?piece=${encodeURIComponent("3 · 1 · 4")}`,
    );
    expect(JSON.stringify(log)).not.toMatch(/stock_link|price|€/);
  });
});
