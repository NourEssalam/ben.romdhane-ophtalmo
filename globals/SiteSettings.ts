import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";
import { ALL_PAGES, globalRevalidate } from "../lib/revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Paramètres du site",
  admin: { group: "Paramètres" },
  access: { read: anyone, update: authenticated },
  hooks: globalRevalidate(ALL_PAGES),
  fields: [
    {
      name: "title",
      label: "Titre du site (SEO)",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      label: "Description du site (SEO)",
      type: "textarea",
      required: true,
      localized: true,
    },
  ],
};
