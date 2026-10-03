import type { Metadata } from "next";
import { CollectionGrid } from "@/components/CollectionGrid";
import { getCollectionPieces } from "@/lib/collection";
import { getCopy } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.portfolio.title,
};

export default function PortfolioPage() {
  const pieces = getCollectionPieces().filter(
    (piece) => piece.category === "Furniture",
  );

  return (
    <main id="main" className="selection">
      <div className="sectionhead">
        <div>
          <p className="eyebrow">PORTFOLIO</p>
          <h1>{copy.portfolio.title}</h1>
        </div>
        <p>{copy.portfolio.intro}</p>
      </div>
      <CollectionGrid pieces={pieces} category="Furniture" showFilters={false} />
    </main>
  );
}
