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
import { initLocale, type LocaleParams } from "@/i18n/locale";

export default async function Page({ params }: LocaleParams) {
  const locale = await initLocale(params);
  const [hero, contact, categories, biography, testimonials] = await Promise.all([
    getGlobal("hero", locale),
    getGlobal("contact", locale),
    getServiceCategories(locale),
    getGlobal("biography", locale),
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
        phone={contact.phones?.[0] ?? null}
        hours={contact.hours}
      />
      <Services cards={cards} />
      <Biography data={biography} photo={mediaProps(biography.photo)} />
      <Testimonials
        reviews={testimonials.map(({ id, name, text, dir }) => ({ id, name, text, dir }))}
      />
    </main>
  );
}
