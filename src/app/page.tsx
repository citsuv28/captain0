import Image from "next/image";
import Link from "next/link";
import { CollectionGrid } from "@/components/CollectionGrid";
import { ProjectBrief } from "@/components/ProjectBrief";
import { StorySection } from "@/components/StorySection";
import { getCollectionPieces } from "@/lib/collection";
import { getBusteni } from "@/lib/busteni";
import { getCopy, getFeaturedHero, getPortfolio } from "@/lib/content";

export default function HomePage() {
  const copy = getCopy();
  const hero = getFeaturedHero();
  const pieces = getCollectionPieces();
  const furniture = getPortfolio().items.find((item) => item.id === "C0-P03");
  const yardLog = getBusteni().logs[0]?.photos[0];
  const slabCover = pieces.find((piece) => piece.id === "C0-A04");

  return (
    <main id="main">
      <section className="hero">
        <div className="herocopy">
          <p className="eyebrow">{copy.home.kicker}</p>
          <h1>
            Raw European wood
            <br />
            slabs from <em>Neamț</em>, Romania.
          </h1>
          <p className="intro">{copy.home.subhead}</p>
          <Link className="button" href="/stock">
            {copy.cta.requestStockList}
          </Link>
          <div className="herofoot">
            <span>{copy.footer.place.toUpperCase()}</span>
            <span>{hero.id}</span>
          </div>
        </div>
        <figure className="heroimage">
          <Image
            src={hero.photo.src}
            alt={hero.photo.alt}
            fill
            priority
            sizes="(min-width: 950px) 54vw, 100vw"
          />
          <figcaption>
            <span>{hero.title}</span>
            <span>{hero.id}</span>
          </figcaption>
        </figure>
      </section>

      <div className="manifesto">
        <span className="eyebrow">{copy.brand.tagline}</span>
        <p>
          Some wood is a material.
          <br />
          <em>Some wood is the starting point.</em>
        </p>
        <span className="small">{copy.footer.productNote}</span>
      </div>

      <section id="collections" className="collections">
        <div className="sectionhead">
          <div>
            <p className="eyebrow">THREE WAYS TO BEGIN</p>
            <h2>Follow the material.</h2>
          </div>
          <p>
            Furniture, rare slabs,
            <br />
            and logs.
          </p>
        </div>
        <div className="categorygrid">
          <Link className="category" href="/portfolio">
            {furniture ? (
              <Image
                src={furniture.photo.src}
                alt={furniture.photo.alt}
                fill
                sizes="(min-width: 950px) 33vw, 100vw"
              />
            ) : null}
            <span className="number">01</span>
            <div>
              <h3>Furniture</h3>
              <p>Portfolio only. Not the main SKU.</p>
            </div>
          </Link>
          <Link className="category" href="/stock">
            {slabCover ? (
              <Image
                src={slabCover.src}
                alt={slabCover.alt}
                fill
                sizes="(min-width: 950px) 33vw, 100vw"
              />
            ) : null}
            <span className="number">02</span>
            <div>
              <h3>Rare slabs</h3>
              <p>Every piece in stock is a one-off.</p>
            </div>
          </Link>
          <Link className="category" href="/logs">
            {yardLog ? (
              <Image
                src={yardLog.src}
                alt={yardLog.alt}
                fill
                sizes="(min-width: 950px) 33vw, 100vw"
              />
            ) : null}
            <span className="number">03</span>
            <div>
              <h3>Logs</h3>
              <p>{copy.busteni.intent}</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="selection" id="selection">
        <div className="sectionhead">
          <div>
            <p className="eyebrow">A CLOSER LOOK</p>
            <h2>The pieces we have.</h2>
          </div>
          <p>
            Open a piece.
            <br />
            Ask for that one.
          </p>
        </div>
        <CollectionGrid pieces={pieces} />
        <p className="collectionnote">
          Species and dimensions are shown only when they are already known.
          Demo sizes stay marked demo. Nothing here has a public price.
        </p>
      </section>

      <StorySection src={hero.photo.src} alt={hero.photo.alt} />

      <section className="journey" id="journey">
        <div>
          <p className="eyebrow">FOR MAKERS, LUTHIERS AND WORKSHOPS</p>
          <h2>
            From the yard
            <br />
            in Neamț.
          </h2>
        </div>
        <div className="steps">
          {copy.home.valueProps.map((step, index) => (
            <article className="step" key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <ProjectBrief />
    </main>
  );
}
