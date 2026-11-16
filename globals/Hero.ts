import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";
import { common } from "../i18n/adminLabels";
import { HOME, globalRevalidate } from "../lib/revalidate";

export const Hero: GlobalConfig = {
  slug: "hero",
  label: { fr: "Bandeau d’accueil", ar: "اللافتة الرئيسية", en: "Home banner", de: "Startseiten-Banner" },
  admin: { group: common.groupContent },
  access: { read: anyone, update: authenticated },
  hooks: globalRevalidate(HOME),
  fields: [
    {
      name: "slides",
      label: { fr: "Diapositives", ar: "الشرائح", en: "Slides", de: "Folien" },
      type: "array",
      labels: {
        singular: { fr: "Diapositive", ar: "شريحة", en: "Slide", de: "Folie" },
        plural: { fr: "Diapositives", ar: "الشرائح", en: "Slides", de: "Folien" },
      },
      minRows: 1,
      fields: [
        {
          name: "image",
          label: common.image,
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          label: { fr: "Légende", ar: "التعليق", en: "Caption", de: "Bildunterschrift" },
          type: "text",
          localized: true,
        },
      ],
    },
    {
      name: "heading",
      label: { fr: "Titre principal", ar: "العنوان الرئيسي", en: "Main heading", de: "Hauptüberschrift" },
      type: "text",
      required: true,
      localized: true,
    },
    { name: "intro", label: common.intro, type: "textarea", localized: true },
    {
      name: "primaryCtaLabel",
      label: {
        fr: "Bouton principal (vers les services)",
        ar: "الزر الرئيسي (إلى الخدمات)",
        en: "Primary button (to services)",
        de: "Hauptschaltfläche (zu den Leistungen)",
      },
      type: "text",
      localized: true,
    },
    {
      name: "secondaryCtaLabel",
      label: {
        fr: "Bouton secondaire (vers le contact)",
        ar: "الزر الثانوي (إلى التواصل)",
        en: "Secondary button (to contact)",
        de: "Zweite Schaltfläche (zum Kontakt)",
      },
      type: "text",
      localized: true,
    },
  ],
};
