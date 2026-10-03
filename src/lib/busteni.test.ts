import { describe, expect, it } from "vitest";
import { getCopy, getStock } from "./content";
import {
  BUSTENI_SPECIES_EN,
  BUSTENI_SPECIES_RO,
  getBusteni,
} from "./busteni";

const STOCK_IDS = ["C0-A03", "C0-A04", "C0-A02", "C0-A09", "C0-A06", "C0-B04"];

describe("Bușteni provenance", () => {
  it("lists only the painted end numbers and leaves stock links empty", () => {
    const busteni = getBusteni();
    const copy = getCopy();

    expect(copy.nav).toEqual(
      expect.arrayContaining([{ href: "/logs", label: "Logs" }]),
    );
    expect(copy.busteni.title).toBe("Logs");
    expect(copy.nav.map((item) => item.label)).not.toContain("Bușteni");
    expect(copy.busteni.intentRo).toBe(
      "Plăcile din stoc au fost tăiate din bușteni ca aceștia.",
    );
    expect(copy.busteni.intent.toLowerCase()).not.toMatch(/c0-a0|a03|a04|a09/);

    expect(busteni.hero.src).toBe(
      "/photos/busteni/08-standing-tree-burl-source.jpg",
    );
    expect(busteni.logs.map((log) => log.numbers)).toEqual([
      ["3", "1", "4"],
      ["25"],
      ["31", "1", "23", "10", "28"],
    ]);

    const srcs = [
      busteni.hero.src,
      ...busteni.logs.flatMap((log) => log.photos.map((photo) => photo.src)),
      ...busteni.context.map((photo) => photo.src),
    ];
    expect(srcs).toHaveLength(8);
    expect(srcs.some((src) => /09|slab/i.test(src))).toBe(false);

    for (const log of busteni.logs) {
      expect(log.species_ro).toBe(BUSTENI_SPECIES_RO);
      expect(log.species_en).toBe(BUSTENI_SPECIES_EN);
      expect(log.stock_link).toBe("");
      expect(log).not.toHaveProperty("price");
      expect(log).not.toHaveProperty("dims");
      expect(log).not.toHaveProperty("moisture");
    }

    expect(busteni.context.map((photo) => photo.src)).toEqual([
      "/photos/busteni/02-trailer-load.jpg",
      "/photos/busteni/04-forklift-lift.jpg",
      "/photos/busteni/07-trailer-side-profile.jpg",
    ]);
    expect(busteni.context.every((photo) => !("numbers" in photo))).toBe(true);

    const dumped = JSON.stringify(busteni);
    expect(dumped).not.toMatch(/price|€|moisture|C0-A01/i);
    for (const id of STOCK_IDS) {
      expect(dumped).not.toContain(id);
    }
    expect(getStock().items.map((item) => item.id)).toEqual(STOCK_IDS);
  });
});