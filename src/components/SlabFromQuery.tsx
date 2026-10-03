"use client";

import { useSearchParams } from "next/navigation";

export function SlabFromQuery() {
  const params = useSearchParams();
  const slab = params.get("slab");

  if (!slab) return null;

  return (
    <p
      role="status"
      className="mt-8 max-w-xl border-l-4 border-forest bg-paper-2/70 px-4 py-3 text-sm"
    >
      Catalog ID: <span className="font-mono font-medium">{slab}</span>
      . Include this ID and your postcode when you write.
    </p>
  );
}
