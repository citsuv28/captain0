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
  "C0-B1-001-masa-epoxy.jpg",
  "C0-B1-002-epoxy-detail.jpg",
  "C0-B1-003-cookie-masa.jpg",
  "C0-B1-013-slab-mappa.jpg",
  "C0-B1-022-mese-plop-negru-bubos-mappa.jpg",
  "C0-B1-025-mese-plop-negru-bubos-mappa.jpg",
  "C0-B1-026-slab-mappa.jpg",
  "C0-B1-042-rasina-plop-negru-bubos-mappa.jpg",
  "C0-B2-009-raw-log.jpg",
  "C0-B2-033-rasina-plop-negru-bubos-mappa.jpg",
  "C0-B2-034-raw-slab-nuc.jpg",
  "C0-B2-060-busteni-plop-negru-bubos-mappa.jpg",
  "C0-B2-061-busteni-plop-negru-bubos-mappa.jpg",
  "C0-B2-066-busteni-plop-negru-bubos-mappa.jpg",
] as const;

describe("workshop photo files", () => {
  it("ships mapped photos under public/photos", () => {
    for (const name of REQUIRED) {
      expect(existsSync(resolve(PHOTO_ROOT, name)), name).toBe(true);
    }
  });

  it("points every catalog item at a file that exists on disk", () => {
    const srcs = [
      ...getStock("en").items.map((item) => item.photo.src),
      ...getPortfolio("en").items.map((item) => item.photo.src),
    ];

    expect(new Set(srcs).size).toBe(srcs.length);

    for (const src of srcs) {
      const file = src.replace(/^\/photos\//, "");
      expect(existsSync(resolve(PHOTO_ROOT, file)), src).toBe(true);
    }

    expect(srcs).toEqual(
      expect.arrayContaining([
        "/photos/C0-B2-060-busteni-plop-negru-bubos-mappa.jpg",
        "/photos/C0-B1-042-rasina-plop-negru-bubos-mappa.jpg",
      ]),
    );
  });
});
