import type { Field, GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";
import { HOME, globalRevalidate } from "../lib/revalidate";

const items: Field = {
  name: "items",
  label: "Éléments",
  type: "array",
  labels: { singular: "Élément", plural: "Éléments" },
  fields: [{ name: "item", label: "Texte", type: "text", required: true, localized: true }],
};

export const Biography: GlobalConfig = {
  slug: "biography",
  label: "Biographie",
  admin: { group: "Contenu" },
  access: { read: anyone, update: authenticated },
  hooks: globalRevalidate(HOME),
  fields: [
    { name: "photo", label: "Photo du docteur", type: "upload", relationTo: "media" },
    { name: "badge", label: "Badge sur la photo", type: "text", localized: true },
    { name: "headline", label: "Titre", type: "text", required: true, localized: true },
    { name: "headlineSubtitle", label: "Sous-titre", type: "text", localized: true },
    {
      name: "education",
      label: "Formation",
      type: "group",
      fields: [
        { name: "institution", label: "Établissement", type: "text", localized: true },
        { name: "diploma", label: "Diplôme", type: "text", localized: true },
      ],
    },
    {
      name: "experience",
      label: "Parcours professionnel",
      type: "group",
      fields: [{ name: "title", label: "Titre", type: "text", localized: true }, items],
    },
    {
      name: "diplomas",
      label: "Diplômes complémentaires",
      type: "group",
      fields: [
        { name: "title", label: "Titre", type: "text", localized: true },
        { name: "institution", label: "Établissement", type: "text", localized: true },
        items,
      ],
    },
  ],
};
