import type { Metadata } from "next";
import { StockCampaign } from "@/components/StockCampaign";
import { getCopy, getStockListings } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.stock.title,
};

export default function StockPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <StockCampaign listings={getStockListings()} />
    </main>
  );
}
