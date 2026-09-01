import Link from "next/link";
import { getCopy } from "@/lib/content";

type CtaRowProps = {
  className?: string;
};

export function CtaRow({ className = "" }: CtaRowProps) {
  const copy = getCopy();

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Link
        href="/stock"
        className="inline-flex items-center justify-center bg-forest px-5 py-3 text-sm font-semibold tracking-wide text-paper transition hover:bg-forest-2"
      >
        {copy.cta.requestStockList}
      </Link>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center border border-ink px-5 py-3 text-sm font-semibold tracking-wide text-ink transition hover:bg-ink hover:text-paper"
      >
        {copy.cta.askFreightQuote}
      </Link>
    </div>
  );
}
