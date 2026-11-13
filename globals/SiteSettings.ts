import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Paramètres du site",
  admin: { group: "Paramètres" },
  access: { read: anyone, update: authenticated },
  fields: [
    {
      name: "title",
      label: "Titre du site (SEO)",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description du site (SEO)",
      type: "textarea",
      required: true,
    },
  ],
};
