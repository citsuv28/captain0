import type { Metadata } from "next";
import { PortfolioCampaign } from "@/components/PortfolioCampaign";
import { getCopy, getPortfolio } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.portfolio.title,
};

export default function PortfolioPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <PortfolioCampaign items={getPortfolio().items} />
    </main>
  );
}
