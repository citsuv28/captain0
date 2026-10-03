import type { Metadata } from "next";
import Image from "next/image";
import { CollectionGrid } from "@/components/CollectionGrid";
import { getCollectionPieces } from "@/lib/collection";
import { getBusteni } from "@/lib/busteni";
import { getCopy } from "@/lib/content";

const copy = getCopy();

export const metadata: Metadata = {
  title: copy.busteni.title,
};

export default function LogsPage() {
  const logs = getBusteni();
  const pieces = getCollectionPieces().filter((piece) => piece.category === "Logs");

  return (
    <main id="main" className="selection">
      <div className="sectionhead">
        <div>
          <p className="eyebrow">{copy.busteni.kicker}</p>
          <h1>{copy.busteni.title}</h1>
        </div>
        <p>
          {copy.busteni.intent}
          <br />
          {copy.busteni.intentRo}
        </p>
      </div>
      <figure className="lanehero">
        <Image
          src={logs.hero.src}
          alt={logs.hero.alt}
          fill
          priority
          sizes="(min-width: 950px) 70vw, 100vw"
        />
        <figcaption>
          {logs.logs[0]?.species_ro} · {logs.logs[0]?.species_en}
        </figcaption>
      </figure>
      <CollectionGrid pieces={pieces} category="Logs" showFilters={false} />
      <section className="contextblock" aria-labelledby="logs-context">
        <h2 id="logs-context">{copy.busteni.contextTitle}</h2>
        <p>{copy.busteni.contextNote}</p>
        <ul>
          {logs.context.map((photo) => (
            <li key={photo.src}>
              <Image src={photo.src} alt={photo.alt} width={900} height={1200} />
              <p>{photo.notes}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
