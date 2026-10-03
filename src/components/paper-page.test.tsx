/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CollectionGrid } from "@/components/CollectionGrid";
import { ProjectProvider } from "@/components/ProjectProvider";
import { StorySection } from "@/components/StorySection";
import { getCollectionPieces } from "@/lib/collection";

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
  localStorage.clear();
});

describe("story section", () => {
  it("keeps the yard story with the large 50", () => {
    render(
      <StorySection src="/photos/stock/A03_placa-mare-scara.jpg" alt="Yard slab" />,
    );

    expect(screen.getByText("50")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /knowing what/i }).textContent).toMatch(
      /lies within/i,
    );
    expect(screen.getByText(/father's 50 years of working with timber/i)).toBeTruthy();
    expect(
      screen.getByText(/The yard in Piatra Neamț. The material speaks for itself./),
    ).toBeTruthy();
    expect(document.querySelector(".story")).toBeTruthy();
  });
});

describe("piece dialog", () => {
  it("opens a real slab passport without a price", () => {
    render(
      <ProjectProvider>
        <CollectionGrid pieces={getCollectionPieces()} />
      </ProjectProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /C0-A09/ }));
    expect(screen.getAllByText(/350 cm/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/chalk · cretă/).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Ask for this piece/i }).getAttribute("href")).toBe(
      "/contact?slab=C0-A09",
    );
    expect(document.body.textContent).not.toMatch(/€|\$|price/i);
  });
});
