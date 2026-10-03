import Image from "next/image";
import Link from "next/link";

export type CampaignFrame = {
  frameKey: string;
  passportKey?: string;
  src: string;
  alt: string;
  line: string;
  id?: string;
  quiet?: string;
};

type CampaignViewProps = {
  frame: CampaignFrame;
  href?: string;
  onOpen?: () => void;
  priority?: boolean;
};

export function CampaignView({
  frame,
  href,
  onOpen,
  priority = false,
}: CampaignViewProps) {
  const className = "flex min-h-0 flex-1 flex-col text-left";
  const inner = (
    <>
      <span className="relative block min-h-[58vh] w-full flex-1">
        <Image
          src={frame.src}
          alt={frame.alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-contain"
        />
      </span>
      <span className="mt-4 block px-6 text-center font-display text-lg text-casa-ink">
        {frame.line}
      </span>
      {frame.quiet ? (
        <span className="mx-auto mt-2 block max-w-md whitespace-pre-line px-6 text-center text-[11px] leading-relaxed text-casa-muted">
          {frame.quiet}
        </span>
      ) : null}
      {frame.id ? (
        <span className="mt-3 block text-center font-mono text-[11px] uppercase tracking-[0.22em] text-casa-muted">
          {frame.id}
        </span>
      ) : (
        <span className="mt-3 block" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  if (onOpen) {
    return (
      <button type="button" onClick={onOpen} className={className}>
        {inner}
      </button>
    );
  }

  return <div className={className}>{inner}</div>;
}
