import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";
import { common } from "../i18n/adminLabels";
import { ALL_PAGES, globalRevalidate } from "../lib/revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: {
    fr: "Paramètres du site",
    ar: "إعدادات الموقع",
    en: "Site settings",
    de: "Website-Einstellungen",
  },
  admin: { group: common.groupSettings },
  access: { read: anyone, update: authenticated },
  hooks: globalRevalidate(ALL_PAGES),
  fields: [
    {
      name: "title",
      label: {
        fr: "Titre du site (SEO)",
        ar: "عنوان الموقع (SEO)",
        en: "Site title (SEO)",
        de: "Website-Titel (SEO)",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      label: {
        fr: "Description du site (SEO)",
        ar: "وصف الموقع (SEO)",
        en: "Site description (SEO)",
        de: "Website-Beschreibung (SEO)",
      },
      type: "textarea",
      required: true,
      localized: true,
    },
  ],
};
