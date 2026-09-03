import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getPortfolio, getStock } from "./content";

const PHOTO_ROOT = resolve(process.cwd(), "public/photos");

const REQUIRED = [
  "C0-P01-mappa-finished.png",
  "C0-P02-mappa-finished.png",
  "C0-P03-mappa-finished-workshop.png",
  "C0-S01-wide-slab-yard.png",
  "C0-A9-figured-poplar-350x125.png",
  "C0-S02-pale-slab-shop.png",
  "C0-W01-walnut-burl-cookie.png",
] as const;

describe("workshop photo files", () => {
  it("ships all seven mapped photos under public/photos", () => {
    for (const name of REQUIRED) {
      expect(existsSync(resolve(PHOTO_ROOT, name)), name).toBe(true);
    }
  });

  it("points every catalog item at one of those files", () => {
    const srcs = [
      ...getStock("en").items.map((item) => item.photo.src),
      ...getPortfolio("en").items.map((item) => item.photo.src),
    ];

    expect(srcs).toHaveLength(7);
    expect(new Set(srcs).size).toBe(7);

    for (const src of srcs) {
      const file = src.replace(/^\/photos\//, "");
      expect(REQUIRED).toContain(file);
    }
  });
});
