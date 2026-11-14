import Hero, { type HeroSlide } from "@/components/Hero";
import Services from "@/components/Services";
import type { ServiceCard } from "@/components/ServicesCards";
import Biography from "@/components/Biography";
import Testimonials from "@/components/Testimonials";
import {
  getGlobal,
  getServiceCategories,
  getTestimonials,
  mediaProps,
  toServiceLinks,
} from "@/lib/payload";

export default async function Page() {
  const [hero, categories, biography, testimonials] = await Promise.all([
    getGlobal("hero"),
    getServiceCategories(),
    getGlobal("biography"),
    getTestimonials(),
  ]);

  const slides = (hero.slides ?? [])
    .map((s) => mediaProps(s.image))
    .filter((s): s is HeroSlide => s !== null);

  const links = toServiceLinks(categories);
  const cards: ServiceCard[] = categories.map((c, i) => ({
    ...links[i],
    title: c.title,
    description: c.card?.description,
    image: mediaProps(c.card?.image),
    features: (c.card?.features ?? []).map((f) => f.item),
  }));

  return (
    <main>
      <Hero
        slides={slides}
        heading={hero.heading}
        intro={hero.intro}
        primaryCtaLabel={hero.primaryCtaLabel}
        secondaryCtaLabel={hero.secondaryCtaLabel}
      />
      <Services cards={cards} />
      <Biography data={biography} photo={mediaProps(biography.photo)} />
      <Testimonials
        reviews={testimonials.map(({ id, name, text, dir }) => ({ id, name, text, dir }))}
      />
    </main>
  );
}
