import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Config, Media, ServiceCategory } from "../payload-types";
import type { ServiceLink } from "@/components/icons";

/** Local API client, created once per request (and reused by Payload across requests). */
export const getPayloadClient = cache(() => getPayload({ config }));

type GlobalSlug = keyof Config["globals"];

/** A global with its upload fields populated (depth 1). */
export const getGlobal = cache(
  async <S extends GlobalSlug>(slug: S): Promise<Config["globals"][S]> => {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({ slug, depth: 1 })) as Config["globals"][S];
  },
);

/** All service categories, in admin sort order. */
export const getServiceCategories = cache(async (): Promise<ServiceCategory[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "service-categories",
    sort: "sortOrder",
    depth: 1,
    limit: 100,
    pagination: false,
  });
  return docs;
});

export const getServiceCategory = cache(
  async (slug: ServiceCategory["slug"]): Promise<ServiceCategory | undefined> =>
    (await getServiceCategories()).find((c) => c.slug === slug),
);

export const getTestimonials = cache(async () => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "testimonials",
    sort: "sortOrder",
    depth: 0,
    limit: 100,
    pagination: false,
  });
  return docs;
});

/** `{ src, alt }` for next/image from a populated upload field, or null. */
export function mediaProps(
  media: number | Media | null | undefined,
): { src: string; alt: string } | null {
  if (!media || typeof media !== "object" || !media.url) return null;
  return { src: media.url, alt: media.alt };
}

const strings = (list?: { item: string }[] | null) =>
  list?.length ? list.map((l) => l.item) : undefined;
const nonEmpty = <T,>(list?: T[] | null) => (list?.length ? list : undefined);

/**
 * Subcategories ready to render: image as `{ src, alt }`, string lists
 * flattened, and empty lists as `undefined` so their section is skipped.
 */
export const toSubcategories = (category: ServiceCategory) =>
  (category.subcategories ?? []).map((sub) => ({
    key: sub.id ?? sub.key,
    name: sub.name,
    description: sub.description,
    image: mediaProps(sub.image),
    equipment: strings(sub.equipment),
    applications: strings(sub.applications),
    conditions: strings(sub.conditions),
    treatments: nonEmpty(sub.treatments),
    interventions: nonEmpty(sub.interventions),
  }));

/** Plain nav links (header, services sidebar) built from the categories. */
export const toServiceLinks = (categories: ServiceCategory[]): ServiceLink[] =>
  categories.map((c) => ({
    slug: c.slug,
    href: `/services/${c.slug}`,
    label: c.title,
    icon: c.icon,
  }));
