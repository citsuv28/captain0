import Image from "next/image";

type PhotoMediaProps = {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  priority?: boolean;
};

export function PhotoMedia({
  src,
  alt,
  caption,
  className = "",
  priority = false,
}: PhotoMediaProps) {
  return (
    <figure
      className={`relative overflow-hidden border border-rule bg-ink ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={2000}
        sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 92vw"
        className="h-full w-full object-contain"
        priority={priority}
      />
      <figcaption className="absolute bottom-0 left-0 right-0 bg-ink/80 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper">
        {caption}
      </figcaption>
    </figure>
  );
}
