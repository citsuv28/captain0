"use client";

import { useMemo } from "react";
import { CampaignStage } from "@/components/CampaignStage";
import { PhotoCard } from "@/components/PhotoCard";
import { getCopy, type PhotoItem } from "@/lib/content";

type PortfolioCampaignProps = {
  items: PhotoItem[];
};

export function PortfolioCampaign({ items }: PortfolioCampaignProps) {
  const copy = getCopy();
  const frames = useMemo(
    () =>
      items.map((item) => ({
        frameKey: item.id,
        passportKey: item.id,
        src: item.photo.src,
        alt: item.photo.alt,
        line: item.title,
        id: item.id,
      })),
    [items],
  );

  function renderPassport(key: string) {
    const item = items.find((entry) => entry.id === key);
    if (!item) return null;
    return <PhotoCard item={item} variant="portfolio" />;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h1 className="sr-only">{copy.portfolio.title}</h1>
      <CampaignStage frames={frames} renderPassport={renderPassport} />
    </div>
  );
}
