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
        className="text-sm tracking-wide text-ink underline decoration-rule underline-offset-4"
      >
        {copy.cta.requestStockList}
      </Link>
      <Link
        href="/contact"
        className="text-sm tracking-wide text-ink underline decoration-rule underline-offset-4"
      >
        {copy.cta.askFreightQuote}
      </Link>
    </div>
  );
}
