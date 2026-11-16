import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../access";
import { common } from "../i18n/adminLabels";
import { HOME, collectionRevalidate } from "../lib/revalidate";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: { fr: "Témoignage", ar: "شهادة", en: "Testimonial", de: "Erfahrungsbericht" },
    plural: { fr: "Témoignages", ar: "الشهادات", en: "Testimonials", de: "Erfahrungsberichte" },
  },
  admin: {
    group: common.groupContent,
    useAsTitle: "name",
    defaultColumns: ["name", "dir", "sortOrder"],
  },
  defaultSort: "sortOrder",
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: collectionRevalidate(HOME),
  fields: [
    {
      name: "name",
      label: { fr: "Nom du patient", ar: "اسم المريض", en: "Patient name", de: "Name des Patienten" },
      type: "text",
      required: true,
    },
    {
      name: "text",
      label: { fr: "Témoignage", ar: "الشهادة", en: "Testimonial", de: "Erfahrungsbericht" },
      type: "textarea",
      required: true,
    },
    {
      name: "dir",
      label: { fr: "Sens d’écriture", ar: "اتجاه الكتابة", en: "Text direction", de: "Schreibrichtung" },
      type: "select",
      defaultValue: "ltr",
      required: true,
      options: [
        {
          label: {
            fr: "Gauche à droite (français)",
            ar: "من اليسار إلى اليمين (الفرنسية)",
            en: "Left to right (French)",
            de: "Links nach rechts (Französisch)",
          },
          value: "ltr",
        },
        {
          label: {
            fr: "Droite à gauche (arabe)",
            ar: "من اليمين إلى اليسار (العربية)",
            en: "Right to left (Arabic)",
            de: "Rechts nach links (Arabisch)",
          },
          value: "rtl",
        },
      ],
    },
    {
      name: "sortOrder",
      label: common.sortOrder,
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};
