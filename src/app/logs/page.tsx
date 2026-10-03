import type { Metadata } from "next";
import { LogsCampaign } from "@/components/LogsCampaign";
import { getCopy } from "@/lib/content";
import { getBusteni } from "@/lib/busteni";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.busteni.title,
};

export default function LogsPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <LogsCampaign catalog={getBusteni()} />
    </main>
  );
}
