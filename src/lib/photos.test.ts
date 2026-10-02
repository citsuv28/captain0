import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getHomeHeroes, getPhotos, getPortfolio, getStock, getWorkshop } from "./content";

const PHOTO_ROOT = resolve(process.cwd(), "public/photos");

const REQUIRED = [
  "stock/A03_placa-mare-scara.jpg",
  "stock/A04_live-edge-curte.jpg",
  "stock/A02_topdown-mappa-scara.jpg",
  "stock/A09_350x125.jpg",
  "stock/A06_cookie-burl-atelier.jpg",
  "stock/B04_flitch-stive-placi.jpg",
  "portfolio/P01_birou-captain0.png",
  "portfolio/P02_masa-picioare-negre.png",
  "portfolio/P03_masuta-cafea.png",
  "portfolio/P04_river-albastru.png",
  "portfolio/P05_masa-lunga-outdoor.jpg",
  "portfolio/P06_cookie-vaza.jpg",
] as const;

function listPhotoFiles(dir: string, prefix = ""): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      return listPhotoFiles(resolve(dir, entry.name), rel);
    }
    return [rel];
  });
}

describe("curated photo files", () => {
  it("ships only the 12 curated files under public/photos", () => {
    for (const name of REQUIRED) {
      expect(existsSync(resolve(PHOTO_ROOT, name)), name).toBe(true);
    }

    const onDisk = listPhotoFiles(PHOTO_ROOT).sort();
    expect(onDisk).toEqual([...REQUIRED].sort());
    expect(onDisk.some((name) => /heroes|macara|utilaj|ansamblu|atelier-B2|crane/i.test(name))).toBe(
      false,
    );
  });

  it("points every catalog item at a unique file that exists on disk", () => {
    const srcs = getPhotos().map((item) => item.photo.src);

    expect(srcs).toHaveLength(12);
    expect(new Set(srcs).size).toBe(srcs.length);

    for (const src of srcs) {
      const file = src.replace(/^\/photos\//, "");
      expect(existsSync(resolve(PHOTO_ROOT, file)), src).toBe(true);
    }

    expect(getHomeHeroes()).toHaveLength(12);
    expect(getWorkshop()).toHaveLength(0);
    expect(getStock("en").items.map((item) => item.id)).toEqual([
      "C0-A03",
      "C0-A04",
      "C0-A02",
      "C0-A09",
      "C0-A06",
      "C0-B04",
    ]);
    expect(getPortfolio("en").items.map((item) => item.id)).toEqual([
      "C0-P01",
      "C0-P02",
      "C0-P03",
      "C0-P04",
      "C0-P05",
      "C0-P06",
    ]);
  });
});
