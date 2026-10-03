import { CampaignView } from "@/components/CampaignView";
import { getCopy, getFeaturedHero } from "@/lib/content";

export default function HomePage() {
  const copy = getCopy();
  const hero = getFeaturedHero();

  return (
    <main id="main" className="flex flex-1 flex-col">
      <h1 className="sr-only">{copy.home.hero}</h1>
      <CampaignView
        priority
        href={`/stock?piece=${encodeURIComponent(hero.id)}`}
        frame={{
          frameKey: hero.id,
          passportKey: hero.id,
          src: hero.photo.src,
          alt: hero.photo.alt,
          line: copy.brand.tagline,
          id: hero.id,
        }}
      />
    </main>
  );
}
