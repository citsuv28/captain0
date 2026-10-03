"use client";

import { useSearchParams } from "next/navigation";
import { getCopy } from "@/lib/content";

export function SlabFromQuery() {
  const copy = getCopy();
  const params = useSearchParams();
  const piece = params.get("piece") ?? params.get("slab");

  if (!piece) return null;

  return (
    <p
      role="status"
      className="mt-8 max-w-xl border-l-4 border-forest bg-paper-2/70 px-4 py-3 text-sm"
    >
      {copy.stock.pieceId} · {copy.stock.pieceIdRo}:{" "}
      <span className="font-mono font-medium">{piece}</span>
      . Include this ID and your postcode when you write.
    </p>
  );
}
