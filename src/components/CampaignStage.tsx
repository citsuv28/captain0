"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CampaignView, type CampaignFrame } from "@/components/CampaignView";

type CampaignStageProps = {
  frames: CampaignFrame[];
  renderPassport?: (passportKey: string) => ReactNode;
  widePassportKeys?: string[];
  empty?: ReactNode;
};

function writePiece(piece: string | null) {
  const url = new URL(window.location.href);
  if (piece) {
    url.searchParams.set("piece", piece);
  } else {
    url.searchParams.delete("piece");
  }
  window.history.pushState({}, "", url);
}

export function CampaignStage({
  frames,
  renderPassport,
  widePassportKeys = [],
  empty = null,
}: CampaignStageProps) {
  const [index, setIndex] = useState(0);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const safeIndex = frames.length === 0 ? 0 : Math.min(index, frames.length - 1);
  const frame = frames[safeIndex];

  useEffect(() => {
    function applyLocation() {
      const piece = new URLSearchParams(window.location.search).get("piece");
      if (!piece) {
        setOpenKey(null);
        return;
      }
      const found = frames.findIndex((entry) => entry.passportKey === piece);
      if (found < 0) return;
      setIndex(found);
      setOpenKey(piece);
    }
    const timer = window.setTimeout(applyLocation, 0);
    window.addEventListener("popstate", applyLocation);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("popstate", applyLocation);
    };
  }, [frames]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, select")
      ) {
        return;
      }
      if (event.key === "Escape") {
        setOpenKey(null);
        writePiece(null);
        return;
      }
      if (frames.length < 2) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const delta = event.key === "ArrowRight" ? 1 : -1;
      setOpenKey(null);
      writePiece(null);
      setIndex((current) => {
        const base = Math.min(current, Math.max(frames.length - 1, 0));
        return (base + delta + frames.length) % frames.length;
      });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [frames.length]);

  useEffect(() => {
    if (openKey) closeRef.current?.focus();
  }, [openKey]);

  function step(delta: number) {
    if (frames.length < 2) return;
    setOpenKey(null);
    writePiece(null);
    setIndex((current) => {
      const base = Math.min(current, frames.length - 1);
      return (base + delta + frames.length) % frames.length;
    });
  }

  function openPassport(key: string) {
    setOpenKey(key);
    writePiece(key);
  }

  function closePassport() {
    setOpenKey(null);
    writePiece(null);
  }

  if (!frame) {
    return empty;
  }

  const passport =
    openKey && renderPassport ? renderPassport(openKey) : null;
  const wide = openKey ? widePassportKeys.includes(openKey) : false;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <CampaignView
        frame={frame}
        priority
        onOpen={
          frame.passportKey && renderPassport
            ? () => {
                if (frame.passportKey) openPassport(frame.passportKey);
              }
            : undefined
        }
      />
      {frames.length > 1 ? (
        <div className="flex shrink-0 items-center justify-between px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-casa-muted">
          <button type="button" onClick={() => step(-1)} aria-label="Previous piece">
            ←
          </button>
          <span>
            {safeIndex + 1} / {frames.length}
          </span>
          <button type="button" onClick={() => step(1)} aria-label="Next piece">
            →
          </button>
        </div>
      ) : null}
      {passport ? (
        <div
          className="fixed inset-0 z-40 overflow-y-auto bg-casa/85 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label={openKey ?? "Piece"}
          onClick={closePassport}
        >
          <div
            className={`mx-auto w-full ${wide ? "max-w-5xl" : "max-w-xl"}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={closePassport}
              className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-casa-ink"
            >
              Close
            </button>
            <div className="text-ink">{passport}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
