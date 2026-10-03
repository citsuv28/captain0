import { getPortfolio, getStock, type PhotoItem } from "@/lib/content";
import { getBusteni } from "@/lib/busteni";

export const PIECE_CATEGORIES = ["Furniture", "Slabs", "Logs"] as const;
export type PieceCategory = (typeof PIECE_CATEGORIES)[number];
export type PieceFilter = "All" | PieceCategory;

export type PieceDims = PhotoItem["dims"];

export type CollectionPiece = {
  id: string;
  category: PieceCategory;
  title: string;
  text: string;
  alt: string;
  src: string;
  photos: { src: string; alt: string }[];
  speciesRo: string;
  speciesEn: string;
  dims: PieceDims | null;
};

function fromCatalogItem(item: PhotoItem, category: PieceCategory): CollectionPiece {
  return {
    id: item.id,
    category,
    title: item.title,
    text: item.notes,
    alt: item.photo.alt,
    src: item.photo.src,
    photos: [{ src: item.photo.src, alt: item.photo.alt }],
    speciesRo: item.species_ro,
    speciesEn: item.species_en,
    dims: item.dims,
  };
}

export function getCollectionPieces(): CollectionPiece[] {
  const slabs = getStock().items.map((item) => fromCatalogItem(item, "Slabs"));
  const furniture = getPortfolio().items.map((item) =>
    fromCatalogItem(item, "Furniture"),
  );
  const logs = getBusteni().logs.map((log) => {
    const id = log.numbers.join(" · ");
    const [first] = log.photos;
    if (!first) {
      throw new Error(`Log ${id} needs a photo`);
    }
    return {
      id,
      category: "Logs" as const,
      title: id,
      text: log.notes,
      alt: first.alt,
      src: first.src,
      photos: log.photos.map((photo) => ({ src: photo.src, alt: photo.alt })),
      speciesRo: log.species_ro,
      speciesEn: log.species_en,
      dims: null,
    };
  });

  return [...slabs, ...logs, ...furniture];
}

export function pieceAskHref(piece: CollectionPiece): string {
  const id = encodeURIComponent(piece.id);
  switch (piece.category) {
    case "Slabs":
      return `/contact?slab=${id}`;
    case "Furniture":
    case "Logs":
      return `/contact?piece=${id}`;
    default: {
      const exhaustive: never = piece.category;
      return exhaustive;
    }
  }
}

export function pieceMatchesFilter(piece: CollectionPiece, filter: PieceFilter): boolean {
  switch (filter) {
    case "All":
      return true;
    case "Furniture":
    case "Slabs":
    case "Logs":
      return piece.category === filter;
    default: {
      const exhaustive: never = filter;
      return exhaustive;
    }
  }
}
