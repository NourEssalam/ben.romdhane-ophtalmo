import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";

export const Hero: GlobalConfig = {
  slug: "hero",
  label: "Bandeau d’accueil",
  admin: { group: "Contenu" },
  access: { read: anyone, update: authenticated },
  fields: [
    {
      name: "slides",
      label: "Diapositives",
      type: "array",
      labels: { singular: "Diapositive", plural: "Diapositives" },
      minRows: 1,
      fields: [
        {
          name: "image",
          label: "Image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        { name: "caption", label: "Légende", type: "text" },
      ],
    },
    { name: "heading", label: "Titre principal", type: "text", required: true },
    { name: "intro", label: "Texte d’introduction", type: "textarea" },
    {
      name: "primaryCtaLabel",
      label: "Bouton principal (vers les services)",
      type: "text",
    },
    {
      name: "secondaryCtaLabel",
      label: "Bouton secondaire (vers le contact)",
      type: "text",
    },
  ],
};
