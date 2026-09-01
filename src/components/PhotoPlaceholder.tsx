type Grain = "burl" | "walnut" | "oak" | "table-walnut" | "table-burl" | "yard";

type PhotoPlaceholderProps = {
  grain: Grain;
  label: string;
  className?: string;
};

const PALETTES: Record<Grain, { bg: string; a: string; b: string; c: string }> =
  {
    burl: { bg: "#6b4226", a: "#c48a4a", b: "#8a5a32", c: "#e8c48a" },
    walnut: { bg: "#2b1b12", a: "#5c3824", b: "#8b5a38", c: "#1a100c" },
    oak: { bg: "#7a5a32", a: "#c4a06a", b: "#5c4020", c: "#e2c898" },
    "table-walnut": { bg: "#24160f", a: "#3d6b78", b: "#6b4228", c: "#1a100c" },
    "table-burl": { bg: "#5a341c", a: "#2f5c62", b: "#c48a4a", c: "#8a5a32" },
    yard: { bg: "#3d2a18", a: "#8a6238", b: "#c4a06a", c: "#1e3228" },
  };

export function PhotoPlaceholder({
  grain,
  label,
  className = "",
}: PhotoPlaceholderProps) {
  const p = PALETTES[grain];

  return (
    <figure
      className={`relative overflow-hidden border border-rule bg-paper-2 ${className}`}
    >
      <svg
        viewBox="0 0 800 500"
        className="block h-full w-full"
        role="img"
        aria-label={label}
      >
        <rect width="800" height="500" fill={p.bg} />
        {grain === "burl" || grain === "table-burl" ? (
          <>
            <ellipse cx="400" cy="250" rx="280" ry="210" fill={p.a} opacity="0.45" />
            <ellipse cx="420" cy="240" rx="180" ry="140" fill={p.b} opacity="0.55" />
            <ellipse cx="390" cy="255" rx="90" ry="70" fill={p.c} opacity="0.4" />
            <ellipse cx="160" cy="120" rx="110" ry="80" fill={p.a} opacity="0.35" />
            <ellipse cx="650" cy="380" rx="130" ry="90" fill={p.b} opacity="0.4" />
          </>
        ) : null}
        {grain === "walnut" || grain === "oak" || grain === "yard" ? (
          <>
            <g opacity="0.55">
              {Array.from({ length: 18 }, (_, i) => (
                <path
                  key={i}
                  d={`M-20 ${20 + i * 28} C 200 ${10 + i * 28}, 400 ${40 + i * 28}, 820 ${18 + i * 28}`}
                  fill="none"
                  stroke={i % 2 ? p.a : p.c}
                  strokeWidth={grain === "oak" ? 8 : 14}
                />
              ))}
            </g>
            {grain === "oak"
              ? Array.from({ length: 9 }, (_, i) => (
                  <line
                    key={`ray-${i}`}
                    x1={80 + i * 80}
                    y1="0"
                    x2={60 + i * 80}
                    y2="500"
                    stroke={p.c}
                    strokeWidth="2"
                    opacity="0.35"
                  />
                ))
              : null}
          </>
        ) : null}
        {grain === "table-walnut" || grain === "table-burl" ? (
          <>
            <rect x="40" y="80" width="300" height="340" fill={p.b} />
            <rect x="460" y="80" width="300" height="340" fill={p.b} />
            <rect x="330" y="90" width="140" height="320" fill={p.a} opacity="0.85" />
            <text
              x="400"
              y="260"
              textAnchor="middle"
              fill="#efe6d4"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              opacity="0.8"
            >
              epoxy river — portfolio only
            </text>
          </>
        ) : null}
        {grain === "yard" ? (
          <>
            <rect x="60" y="300" width="680" height="24" fill={p.c} opacity="0.5" />
            <rect x="90" y="200" width="160" height="18" fill={p.a} />
            <rect x="280" y="188" width="200" height="22" fill={p.c} />
            <rect x="510" y="206" width="180" height="16" fill={p.a} />
          </>
        ) : null}
        <rect
          x="16"
          y="16"
          width="768"
          height="468"
          fill="none"
          stroke={p.c}
          strokeOpacity="0.25"
        />
      </svg>
      <figcaption className="absolute bottom-0 left-0 right-0 bg-ink/80 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper">
        {label}
      </figcaption>
    </figure>
  );
}
