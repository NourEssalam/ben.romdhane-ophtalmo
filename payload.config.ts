import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import type { CollectionConfig } from "payload";
import { fr } from "payload/i18n/fr";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { defaultLocale, localeNames, locales } from "./i18n/locales";

import { Media } from "./collections/Media";
import { ServiceCategories } from "./collections/ServiceCategories";
import { Testimonials } from "./collections/Testimonials";
import { Biography } from "./globals/Biography";
import { Contact } from "./globals/Contact";
import { Hero } from "./globals/Hero";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Utilisateur", plural: "Utilisateurs" },
  admin: {
    useAsTitle: "email",
    group: "Paramètres",
  },
  auth: true,
  fields: [],
};

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [ServiceCategories, Testimonials, Media, Users],
  globals: [Hero, Biography, Contact, SiteSettings],
  // Content languages: fields marked `localized: true` store one value per locale.
  // Empty translations fall back to French.
  localization: {
    locales: locales.map((code) => ({ code, label: localeNames[code], rtl: code === "ar" })),
    defaultLocale,
    fallback: true,
  },
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: "fr",
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  plugins: [
    // Media files in a Public Vercel Blob store. Locally the dev store token
    // (BLOB_DEV_READ_WRITE_TOKEN) wins; on Vercel only BLOB_READ_WRITE_TOKEN
    // (prod store) is set. Without any token the plugin disables itself and
    // Media falls back to local disk.
    vercelBlobStorage({
      token: process.env.BLOB_DEV_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true, // browser → Blob, bypasses Vercel's 4.5 MB body limit
      collections: {
        // Media read is public, so serve files straight from the Blob CDN URL.
        media: { disablePayloadAccessControl: true },
      },
    }),
  ],
  sharp,
});
