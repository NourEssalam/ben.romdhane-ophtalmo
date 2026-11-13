import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Média", plural: "Médias" },
  admin: { group: "Contenu", useAsTitle: "alt" },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  // Local storage for now; Vercel Blob adapter arrives in Phase 8.
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      label: "Texte alternatif (français)",
      type: "text",
      required: true,
      admin: {
        description: "Décrit l’image pour l’accessibilité et le référencement.",
      },
    },
  ],
};
