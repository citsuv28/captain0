import { describe, expect, it } from "vitest";
import { getStock } from "./content";
import {
  defaultDimFilter,
  hasCompleteDims,
  itemMatchesDimFilter,
  parseDimCm,
  partitionStockByFilter,
} from "./stock-filter";

describe("stock dimension filter", () => {
  it("parses cm strings and leaves blanks empty", () => {
    expect(parseDimCm("350 cm")).toBe(350);
    expect(parseDimCm("6 cm")).toBe(6);
    expect(parseDimCm("")).toBeNull();
    expect(parseDimCm("   ")).toBeNull();
  });

  it("matches the default 300–500 × 100–200 × 5–15 range on demo stock", () => {
    const stock = getStock().items;
    const filter = defaultDimFilter();
    const { matches, tbd } = partitionStockByFilter(stock, filter);

    expect(matches.map((item) => item.id)).toEqual([
      "C0-A03",
      "C0-A04",
      "C0-A09",
    ]);
    expect(tbd).toEqual([]);
    expect(itemMatchesDimFilter(stock[0], filter)).toBe(true);
    expect(
      itemMatchesDimFilter(
        stock.find((item) => item.id === "C0-A02")!,
        filter,
      ),
    ).toBe(false);
    expect(
      itemMatchesDimFilter(
        stock.find((item) => item.id === "C0-B04")!,
        filter,
      ),
    ).toBe(false);
  });

  it("returns no matches for an empty range and keeps incomplete pieces in TBD", () => {
    const complete = getStock().items.find((item) => item.id === "C0-A03")!;
    const incomplete = {
      ...complete,
      id: "C0-TBD",
      dims: { length: "400 cm", width: "", thickness: "8 cm" },
    };

    expect(hasCompleteDims(incomplete)).toBe(false);

    const { matches, tbd } = partitionStockByFilter(
      [complete, incomplete],
      { length: { min: 50, max: 60 }, width: { min: 20, max: 30 }, thickness: { min: 1, max: 2 } },
    );

    expect(matches).toEqual([]);
    expect(tbd.map((item) => item.id)).toEqual(["C0-TBD"]);
  });
});
