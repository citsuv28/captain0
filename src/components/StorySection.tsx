import Image from "next/image";

type StorySectionProps = {
  src: string;
  alt: string;
};

export function StorySection({ src, alt }: StorySectionProps) {
  return (
    <section className="story" id="story">
      <div>
        <div className="storyphoto">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 950px) 46vw, 100vw"
            className="storyimg"
          />
        </div>
        <p className="caption">
          The yard in Piatra Neamț. The material speaks for itself.
        </p>
      </div>
      <div>
        <p className="eyebrow">A FAMILY KNOWLEDGE OF WOOD</p>
        <span className="year">50</span>
        <p className="eyebrow storyyear">YEARS OF TIMBER EXPERIENCE</p>
        <h2>
          Knowing what
          <br />
          <em>lies within.</em>
        </h2>
        <p>
          Captain0 is a family business with a story rooted in a father&apos;s 50
          years of working with timber. That experience shapes how the family
          sees a log: its character, its challenges and what it might become.
        </p>
        <p>
          Finding an exceptional piece is only the beginning. Moving it, opening
          it and choosing how to work with its natural form are all part of the
          story.
        </p>
      </div>
    </section>
  );
}
