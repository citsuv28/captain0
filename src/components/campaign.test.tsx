/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LogsCampaign } from "@/components/LogsCampaign";
import { StockCampaign } from "@/components/StockCampaign";
import { getBusteni } from "@/lib/busteni";
import { getStockListings } from "@/lib/content";

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
  window.history.pushState({}, "", "/");
});

function showPiece(id: string) {
  for (let step = 0; step < 8; step += 1) {
    if (screen.queryByText(id)) return;
    fireEvent.click(screen.getByRole("button", { name: "Next piece" }));
  }
  throw new Error(`missing ${id}`);
}

describe("casa campaign", () => {
  it("shows one stock photograph at a time and opens the existing passport", () => {
    render(<StockCampaign listings={getStockListings()} />);

    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getByText("C0-A03")).toBeTruthy();
    expect(screen.queryByText("C0-A04")).toBeNull();
    expect(screen.queryByText("Bookmatch pair · Pereche bookmatch")).toBeNull();
    expect(screen.getByText("Size finder")).toBeTruthy();
    expect(screen.queryByText(/€|\$\d|price|moisture/i)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Next piece" }));
    expect(screen.getByText("C0-A04")).toBeTruthy();
    expect(screen.queryByText("C0-A03")).toBeNull();

    showPiece("C0-A09");
    fireEvent.click(screen.getByRole("button", { name: /C0-A09/ }));
    expect(screen.getByText("350 cm")).toBeTruthy();
    expect(screen.getByText("125 cm")).toBeTruthy();
    expect(screen.getAllByText("chalk · cretă")).toHaveLength(2);
    expect(screen.queryByText("demo · estimare")).toBeNull();
    expect(screen.getByRole("link", { name: /Ask for this piece/i }).getAttribute("href")).toBe(
      "/contact?slab=C0-A09",
    );
    expect(screen.queryByText(/€|\$\d|price|moisture/i)).toBeNull();
  });

  it("opens a log passport from the campaign and does not link a slab", () => {
    render(<LogsCampaign catalog={getBusteni()} />);

    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getByText("plop negru bubos")).toBeTruthy();
    expect(screen.getByText(/The log stays whole until it is cut/)).toBeTruthy();
    expect(screen.queryByText("3 · 1 · 4")).toBeNull();
    expect(screen.queryByText(/C0-A0|C0-B04/)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Next piece" }));
    expect(screen.getByText("3 · 1 · 4")).toBeTruthy();
    expect(screen.queryByText(/The log stays whole until it is cut/)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /3 · 1 · 4/ }));
    const ask = screen.getByRole("link", { name: /Ask for this piece/i });
    expect(ask.getAttribute("href")).toBe(
      `/contact?piece=${encodeURIComponent("3 · 1 · 4")}`,
    );
    expect(ask.getAttribute("href")).not.toMatch(/stock|C0-/);
    expect(screen.queryByText(/C0-A0|€|\$\d|price/i)).toBeNull();
  });
});
