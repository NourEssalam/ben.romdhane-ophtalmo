import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";
import { ALL_PAGES, globalRevalidate } from "../lib/revalidate";

export const Contact: GlobalConfig = {
  slug: "contact",
  label: "Contact",
  admin: { group: "Contenu" },
  access: { read: anyone, update: authenticated },
  hooks: globalRevalidate(ALL_PAGES),
  fields: [
    { name: "intro", label: "Texte d’introduction", type: "textarea", localized: true },
    { name: "address", label: "Adresse", type: "text", localized: true },
    { name: "landmark", label: "Repérage", type: "text", localized: true },
    {
      name: "phones",
      label: "Téléphones",
      type: "array",
      labels: { singular: "Téléphone", plural: "Téléphones" },
      fields: [
        {
          name: "display",
          label: "Numéro affiché",
          type: "text",
          required: true,
          admin: { description: "Ex. : 73 681 081" },
        },
        {
          name: "number",
          label: "Numéro pour l’appel (sans espaces)",
          type: "text",
          required: true,
          admin: { description: "Ex. : 73681081" },
        },
      ],
    },
    { name: "email", label: "E-mail", type: "email" },
    { name: "hours", label: "Horaires", type: "text", localized: true },
    {
      name: "mapEmbedUrl",
      label: "Lien d’intégration Google Maps",
      type: "text",
      admin: {
        description:
          "Google Maps › Partager › Intégrer une carte : copier uniquement l’URL du champ src.",
      },
    },
  ],
};
