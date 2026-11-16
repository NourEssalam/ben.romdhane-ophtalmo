import type { Field, GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";
import { common } from "../i18n/adminLabels";
import { HOME, globalRevalidate } from "../lib/revalidate";

const items: Field = {
  name: "items",
  label: common.items,
  type: "array",
  labels: { singular: common.item, plural: common.items },
  fields: [{ name: "item", label: common.text, type: "text", required: true, localized: true }],
};

export const Biography: GlobalConfig = {
  slug: "biography",
  label: { fr: "Biographie", ar: "السيرة الذاتية", en: "Biography", de: "Biografie" },
  admin: { group: common.groupContent },
  access: { read: anyone, update: authenticated },
  hooks: globalRevalidate(HOME),
  fields: [
    {
      name: "photo",
      label: { fr: "Photo du docteur", ar: "صورة الطبيب", en: "Doctor’s photo", de: "Foto der Ärztin / des Arztes" },
      type: "upload",
      relationTo: "media",
    },
    {
      name: "badge",
      label: { fr: "Badge sur la photo", ar: "شارة على الصورة", en: "Badge on the photo", de: "Abzeichen auf dem Foto" },
      type: "text",
      localized: true,
    },
    { name: "headline", label: common.title, type: "text", required: true, localized: true },
    { name: "headlineSubtitle", label: common.subtitle, type: "text", localized: true },
    {
      name: "education",
      label: { fr: "Formation", ar: "التكوين", en: "Education", de: "Ausbildung" },
      type: "group",
      fields: [
        { name: "institution", label: common.institution, type: "text", localized: true },
        {
          name: "diploma",
          label: { fr: "Diplôme", ar: "الشهادة", en: "Degree", de: "Abschluss" },
          type: "text",
          localized: true,
        },
      ],
    },
    {
      name: "experience",
      label: {
        fr: "Parcours professionnel",
        ar: "المسار المهني",
        en: "Professional experience",
        de: "Beruflicher Werdegang",
      },
      type: "group",
      fields: [{ name: "title", label: common.title, type: "text", localized: true }, items],
    },
    {
      name: "diplomas",
      label: {
        fr: "Diplômes complémentaires",
        ar: "شهادات إضافية",
        en: "Additional qualifications",
        de: "Zusatzqualifikationen",
      },
      type: "group",
      fields: [
        { name: "title", label: common.title, type: "text", localized: true },
        { name: "institution", label: common.institution, type: "text", localized: true },
        items,
      ],
    },
  ],
};
