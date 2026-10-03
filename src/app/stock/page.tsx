import type { Metadata } from "next";
import { CollectionGrid } from "@/components/CollectionGrid";
import { getCollectionPieces } from "@/lib/collection";
import { getCopy } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.stock.title,
};

export default function StockPage() {
  const pieces = getCollectionPieces().filter((piece) => piece.category === "Slabs");

  return (
    <main id="main" className="selection">
      <div className="sectionhead">
        <div>
          <p className="eyebrow">RARE SLABS</p>
          <h1>{copy.stock.title}</h1>
        </div>
        <p>{copy.stock.intro}</p>
      </div>
      <CollectionGrid pieces={pieces} category="Slabs" showFilters={false} />
    </main>
  );
}
