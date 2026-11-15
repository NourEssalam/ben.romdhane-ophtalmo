import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../access";
import { ALL_PAGES, collectionRevalidate } from "../lib/revalidate";

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
  hooks: collectionRevalidate(ALL_PAGES),
  // Local disk fallback; the Vercel Blob plugin (payload.config.ts) replaces it
  // whenever BLOB_READ_WRITE_TOKEN is set.
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      label: "Texte alternatif",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "Décrit l’image pour l’accessibilité et le référencement.",
      },
    },
  ],
};
