import busteniFile from "../../content/busteni.json";

export const BUSTENI_SPECIES_RO = "plop negru bubos";
export const BUSTENI_SPECIES_EN = "black poplar";

export type BusteniPhoto = {
  src: string;
  alt: string;
};

export type BusteniLog = {
  numbers: string[];
  species_ro: string;
  species_en: string;
  stock_link: string;
  notes: string;
  photos: BusteniPhoto[];
};

export type BusteniContext = BusteniPhoto & {
  notes: string;
};

export type BusteniCatalog = {
  hero: BusteniPhoto;
  logs: BusteniLog[];
  context: BusteniContext[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asPhoto(value: unknown, label: string): BusteniPhoto {
  if (!isRecord(value)) {
    throw new Error(`${label} must be a photo`);
  }
  if ("price" in value) {
    throw new Error(`${label} must not include a price`);
  }
  const { src, alt } = value;
  if (typeof src !== "string" || !src.startsWith("/photos/busteni/")) {
    throw new Error(`${label} needs a busteni photo src`);
  }
  if (src.includes("09") || /slab/i.test(src)) {
    throw new Error(`${label} must not use the slab photo`);
  }
  if (typeof alt !== "string" || alt.trim() === "") {
    throw new Error(`${label} needs alt text`);
  }
  return { src, alt };
}

function asNumbers(value: unknown, label: string): string[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} needs the painted end numbers`);
  }
  const numbers = value.map((entry, index) => {
    if (typeof entry !== "string" || !/^\d+$/.test(entry)) {
      throw new Error(`${label} number ${index} is not a painted digit`);
    }
    return entry;
  });
  if (new Set(numbers).size !== numbers.length) {
    throw new Error(`${label} repeats a painted number`);
  }
  return numbers;
}

function loadBusteni(raw: unknown): BusteniCatalog {
  if (!isRecord(raw)) {
    throw new Error("busteni.json must be an object");
  }
  if ("price" in raw) {
    throw new Error("busteni.json must not include a price");
  }

  const hero = asPhoto(raw.hero, "hero");
  if (!hero.src.includes("08-standing-tree")) {
    throw new Error("busteni hero must be the standing tree");
  }

  if (!Array.isArray(raw.logs)) {
    throw new Error("busteni logs must be an array");
  }

  const logs = raw.logs.map((entry, index) => {
    const label = `logs[${index}]`;
    if (!isRecord(entry)) {
      throw new Error(`${label} must be an object`);
    }
    if ("price" in entry || "dims" in entry || "moisture" in entry) {
      throw new Error(`${label} must not include price, dims, or moisture`);
    }
    const numbers = asNumbers(entry.numbers, label);
    if (entry.species_ro !== BUSTENI_SPECIES_RO || entry.species_en !== BUSTENI_SPECIES_EN) {
      throw new Error(`${label} species must stay plop negru bubos / black poplar`);
    }
    if (typeof entry.stock_link !== "string") {
      throw new Error(`${label} stock_link must be a string`);
    }
    if (typeof entry.notes !== "string") {
      throw new Error(`${label} notes must be a string`);
    }
    if (!Array.isArray(entry.photos) || entry.photos.length === 0) {
      throw new Error(`${label} needs at least one photo`);
    }
    return {
      numbers,
      species_ro: BUSTENI_SPECIES_RO,
      species_en: BUSTENI_SPECIES_EN,
      stock_link: entry.stock_link,
      notes: entry.notes,
      photos: entry.photos.map((photo, photoIndex) =>
        asPhoto(photo, `${label}.photos[${photoIndex}]`),
      ),
    };
  });

  if (!Array.isArray(raw.context)) {
    throw new Error("busteni context must be an array");
  }

  const context = raw.context.map((entry, index) => {
    const label = `context[${index}]`;
    if (!isRecord(entry)) {
      throw new Error(`${label} must be an object`);
    }
    if ("numbers" in entry || "price" in entry || "stock_link" in entry) {
      throw new Error(`${label} is not a numbered log`);
    }
    if (typeof entry.notes !== "string") {
      throw new Error(`${label} notes must be a string`);
    }
    return { ...asPhoto(entry, label), notes: entry.notes };
  });

  return { hero, logs, context };
}

const catalog = loadBusteni(busteniFile);

export function getBusteni(): BusteniCatalog {
  return catalog;
}

export function busteniLogKey(log: BusteniLog): string {
  return log.numbers.join("-");
}
