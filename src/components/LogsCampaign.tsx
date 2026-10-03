"use client";

import { useMemo } from "react";
import { BusteniCard } from "@/components/BusteniCard";
import { CampaignStage } from "@/components/CampaignStage";
import type { CampaignFrame } from "@/components/CampaignView";
import { getCopy } from "@/lib/content";
import {
  BUSTENI_SPECIES_RO,
  busteniLogKey,
  type BusteniCatalog,
  type BusteniLog,
} from "@/lib/busteni";

function logFrames(log: BusteniLog): CampaignFrame[] {
  const id = log.numbers.join(" · ");
  const passportKey = busteniLogKey(log);
  return log.photos.map((photo, index) => ({
    frameKey: `${passportKey}-${index}`,
    passportKey,
    src: photo.src,
    alt: photo.alt,
    line: log.species_ro,
    id,
  }));
}

type LogsCampaignProps = {
  catalog: BusteniCatalog;
};

export function LogsCampaign({ catalog }: LogsCampaignProps) {
  const copy = getCopy();
  const frames = useMemo(() => {
    const hero: CampaignFrame = {
      frameKey: "hero",
      src: catalog.hero.src,
      alt: catalog.hero.alt,
      line: BUSTENI_SPECIES_RO,
      quiet: `${copy.busteni.intent}\n${copy.busteni.intentRo}`,
    };
    const context = catalog.context.map((photo) => ({
      frameKey: photo.src,
      src: photo.src,
      alt: photo.alt,
      line: photo.notes,
    }));
    return [hero, ...catalog.logs.flatMap(logFrames), ...context];
  }, [catalog, copy.busteni.intent, copy.busteni.intentRo]);

  function renderPassport(key: string) {
    const log = catalog.logs.find((entry) => busteniLogKey(entry) === key);
    if (!log) return null;
    return <BusteniCard log={log} />;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h1 className="sr-only">{copy.busteni.title}</h1>
      <CampaignStage frames={frames} renderPassport={renderPassport} />
    </div>
  );
}
