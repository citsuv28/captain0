/** @vitest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BookmatchCard } from "@/components/BookmatchCard";
import { BusteniCard } from "@/components/BusteniCard";
import { PhotoCard } from "@/components/PhotoCard";
import { getBusteni } from "@/lib/busteni";
import { getStock, resolveStockListings } from "@/lib/content";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <span role="img" aria-label={alt} data-src={src} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

afterEach(() => {
  cleanup();
});

describe("stock cards", () => {
  it("shows the public piece id, the note, and a demo label", () => {
    const a03 = getStock().items.find((item) => item.id === "C0-A03");
    if (!a03) {
      throw new Error("missing C0-A03");
    }

    render(<PhotoCard item={a03} variant="stock" />);

    expect(screen.getAllByText("C0-A03").length).toBeGreaterThan(0);
    expect(screen.getByText("Piece ID · Cod piesă")).toBeTruthy();
    expect(screen.getByText("Note · Notă")).toBeTruthy();
    expect(screen.getByText(a03.notes)).toBeTruthy();
    expect(screen.getAllByText("demo · estimare").length).toBe(3);
    expect(screen.getByText("plop negru bubos")).toBeTruthy();
    expect(screen.getByText("Species · Specie")).toBeTruthy();
    expect(screen.queryByText(/moisture|grade|€|\$\d|price/i)).toBeNull();
    expect(screen.getByRole("link", { name: /Ask for this piece/i }).getAttribute("href")).toBe(
      "/contact?slab=C0-A03",
    );
  });

  it("leaves an empty note blank and does not label an unknown thickness as demo", () => {
    const a09 = getStock().items.find((item) => item.id === "C0-A09");
    if (!a09) {
      throw new Error("missing C0-A09");
    }

    const { rerender } = render(<PhotoCard item={a09} variant="stock" />);

    expect(screen.getByText("Piece ID · Cod piesă")).toBeTruthy();
    expect(screen.getByText(a09.notes)).toBeTruthy();
    expect(screen.getAllByText("chalk · cretă")).toHaveLength(2);
    expect(screen.queryByText("demo · estimare")).toBeNull();

    rerender(
      <PhotoCard
        item={{ ...a09, notes: "" }}
        variant="stock"
      />,
    );
    expect(screen.getByText("Note · Notă")).toBeTruthy();
    expect(screen.getAllByText("—").length).toBeGreaterThan(0);
    expect(screen.queryByText(a09.notes)).toBeNull();
    expect(screen.getByText("350 cm")).toBeTruthy();
    expect(screen.getByText("125 cm")).toBeTruthy();
    expect(screen.queryByText(/moisture|grade|€|\$\d|price/i)).toBeNull();
  });

  it("omits species when the piece has none", () => {
    const a06 = getStock().items.find((item) => item.id === "C0-A06");
    if (!a06) {
      throw new Error("missing C0-A06");
    }

    render(<PhotoCard item={a06} variant="stock" />);

    expect(screen.queryByText("Species · Specie")).toBeNull();
    expect(screen.queryByText("plop negru bubos")).toBeNull();
    expect(screen.queryByText(/moisture|grade|€|\$\d|price/i)).toBeNull();
  });

  it("renders a confirmed bookmatch as one pair of two pieces", () => {
    const listings = resolveStockListings(getStock().items, [
      {
        id: "C0-BM-TEST",
        pieceIds: ["C0-A03", "C0-A04"],
        notes: "",
        confirmed: true,
      },
    ]);
    const pair = listings.find((listing) => listing.kind === "bookmatch");
    if (!pair || pair.kind !== "bookmatch") {
      throw new Error("expected a bookmatch listing");
    }

    render(<BookmatchCard listing={pair} />);

    expect(screen.getByText("Bookmatch pair · Pereche bookmatch")).toBeTruthy();
    expect(screen.getByText("Two pieces, one set.")).toBeTruthy();
    expect(screen.getByText("Două piese, un set.")).toBeTruthy();
    expect(screen.getByText("Pair ID · Cod pereche")).toBeTruthy();
    expect(screen.getByText("C0-BM-TEST")).toBeTruthy();
    expect(screen.getAllByText("C0-A03").length).toBeGreaterThan(0);
    expect(screen.getAllByText("C0-A04").length).toBeGreaterThan(0);
    expect(screen.getByText("Pair note · Notă pereche")).toBeTruthy();
    expect(screen.queryByText(/€|\$\d|price/i)).toBeNull();
    expect(screen.getByRole("link", { name: /Ask for this piece/i }).getAttribute("href")).toBe(
      "/contact?slab=C0-BM-TEST",
    );
  });
});

describe("log passports", () => {
  it("shows the painted numbers, the known species, and an ask with no stock link", () => {
    const log = getBusteni().logs[0];
    if (!log) {
      throw new Error("missing the first log");
    }

    render(<BusteniCard log={log} />);

    expect(screen.getAllByText("3 · 1 · 4").length).toBeGreaterThan(0);
    expect(screen.getByText("Numbers · Numere")).toBeTruthy();
    expect(screen.getByText("plop negru bubos")).toBeTruthy();
    expect(screen.getByText("black poplar")).toBeTruthy();
    expect(screen.queryByText(/Length|Lungime|moisture|grade|€|\$\d|price/i)).toBeNull();
    expect(screen.queryByText(/C0-A0|C0-B04/)).toBeNull();
    const ask = screen.getByRole("link", { name: /Ask for this piece/i });
    expect(ask.getAttribute("href")).toBe(
      `/contact?piece=${encodeURIComponent("3 · 1 · 4")}`,
    );
    expect(ask.getAttribute("href")).not.toMatch(/stock|C0-/);
  });
});
