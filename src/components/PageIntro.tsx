type PageIntroProps = {
  kicker?: string;
  title: string;
  children: React.ReactNode;
};

export function PageIntro({ kicker, title, children }: PageIntroProps) {
  return (
    <header className="max-w-3xl">
      {kicker ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-casa-muted">
          {kicker}
        </p>
      ) : null}
      <h1 className="mt-2 font-display text-4xl leading-tight text-casa-ink sm:text-5xl">
        {title}
      </h1>
      <div className="mt-5 text-lg leading-relaxed text-casa-muted">{children}</div>
    </header>
  );
}
