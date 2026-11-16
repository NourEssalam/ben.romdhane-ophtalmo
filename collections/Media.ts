import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../access";
import { common } from "../i18n/adminLabels";
import { ALL_PAGES, collectionRevalidate } from "../lib/revalidate";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: { fr: "Média", ar: "وسائط", en: "Media", de: "Medium" },
    plural: { fr: "Médias", ar: "الوسائط", en: "Media", de: "Medien" },
  },
  admin: { group: common.groupContent, useAsTitle: "alt" },
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
      label: { fr: "Texte alternatif", ar: "النص البديل", en: "Alt text", de: "Alternativtext" },
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: {
          fr: "Décrit l’image pour l’accessibilité et le référencement.",
          ar: "يصف الصورة لتسهيل الوصول وتحسين محركات البحث.",
          en: "Describes the image for accessibility and SEO.",
          de: "Beschreibt das Bild für Barrierefreiheit und SEO.",
        },
      },
    },
  ],
};
