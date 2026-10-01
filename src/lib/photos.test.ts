import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getHomeHeroes, getPhotos, getPortfolio, getStock, getWorkshop } from "./content";

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
  "heroes/A/A01_bookmatched-mappa.jpg",
  "heroes/A/A02_topdown-mappa-scara.jpg",
  "heroes/A/A03_placa-mare-scara.jpg",
  "heroes/A/A04_live-edge-curte.jpg",
  "heroes/A/A05_pereche-atelier-topdown.jpg",
  "heroes/A/A06_cookie-burl-atelier.jpg",
  "heroes/A/A07_flame-burl-detail.png",
  "heroes/B/B01_busteni-sectiune-scara.jpg",
  "heroes/B/B02_burl-sectiune-marcaj.jpg",
  "heroes/B/B03_busteni-scara-portret.jpg",
  "heroes/B/B04_flitch-stive-placi.jpg",
  "heroes/B/B05_semi-busteni-gigant.jpg",
  "heroes/C/C01_incarcare-busteni-lanturi.jpg",
  "heroes/C/C02_transport-camion-busteni.jpg",
  "heroes/C/C03_atelier-selectie-placi.jpg",
  "heroes/C/C04_macara-transport-B2-001.jpg",
  "heroes/C/C05_utilaj-macara-B2-005.jpg",
  "heroes/C/C06_utilaj-macara-B2-010.jpg",
  "heroes/C/C07_macara-atelier-B2-062.jpg",
  "heroes/C/C08_atelier-B2-022.jpg",
  "heroes/C/C09_atelier-B2-025.jpg",
  "heroes/D/D01_masa-epoxy-verde.jpg",
  "heroes/D/D02_dining-mappa-captain0.jpg",
  "heroes/D/D03_masa-lunga-outdoor.jpg",
  "heroes/D/D04_masa-studio-mappa.png",
  "heroes/E/E01_curte-busteni-iarna.jpg",
  "heroes/E/E02_Vedere_ansamblu_1.jpg",
  "heroes/E/E03_Vedere_ansamblu_2.jpg",
] as const;

describe("workshop photo files", () => {
  it("ships mapped photos under public/photos", () => {
    for (const name of REQUIRED) {
      expect(existsSync(resolve(PHOTO_ROOT, name)), name).toBe(true);
    }
  });

  it("points every catalog item at a file that exists on disk", () => {
    const srcs = getPhotos().map((item) => item.photo.src);

    expect(new Set(srcs).size).toBe(srcs.length);

    for (const src of srcs) {
      const file = src.replace(/^\/photos\//, "");
      expect(existsSync(resolve(PHOTO_ROOT, file)), src).toBe(true);
    }

    expect(srcs).toEqual(
      expect.arrayContaining([
        "/photos/heroes/A/A01_bookmatched-mappa.jpg",
        "/photos/heroes/A/A02_topdown-mappa-scara.jpg",
        "/photos/heroes/D/D04_masa-studio-mappa.png",
        "/photos/heroes/E/E01_curte-busteni-iarna.jpg",
      ]),
    );
    expect(getHomeHeroes()).toHaveLength(16);
    expect(getWorkshop()).toHaveLength(12);
    expect(getStock("en").items.some((item) => item.id === "C0-A01")).toBe(true);
    expect(getPortfolio("en").items.some((item) => item.id === "C0-D04")).toBe(
      true,
    );
  });
});
