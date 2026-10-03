"use client";

import Link from "next/link";
import { useState } from "react";
import { useProject } from "@/components/ProjectProvider";

const NAV = [
  { href: "/#collections", label: "Collections" },
  { href: "/#story", label: "Our story" },
  { href: "/#journey", label: "The journey" },
];

export function Header() {
  const { brief } = useProject();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <Link className="brand" href="/">
        Captain0
        <span>RARE WOOD · ROMANIA</span>
      </Link>
      <nav className="mainnav" aria-label="Main navigation">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="navcta" href="/#enquiry">
        Your project <span>{brief.references.length}</span>
      </Link>
      <button
        type="button"
        className="menu-toggle"
        aria-label="Open navigation"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((current) => !current)}
      >
        Menu
      </button>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        hidden={!open}
        aria-label="Mobile navigation"
      >
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link href="/stock" onClick={() => setOpen(false)}>
          Rare slabs
        </Link>
        <Link href="/logs" onClick={() => setOpen(false)}>
          Logs
        </Link>
        <Link href="/portfolio" onClick={() => setOpen(false)}>
          Furniture
        </Link>
        <Link href="/#enquiry" onClick={() => setOpen(false)}>
          Your project
        </Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <Link className="brand" href="/">
        Captain0
        <span>RARE WOOD · ROMANIA</span>
      </Link>
      <p>A family story, written in wood.</p>
      <span>
        Piatra Neamț · Romania
        <br />© Captain0
      </span>
    </footer>
  );
}
