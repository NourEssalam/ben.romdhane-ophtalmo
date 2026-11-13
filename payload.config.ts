import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import type { CollectionConfig } from "payload";
import { fr } from "payload/i18n/fr";
import sharp from "sharp";
import { fileURLToPath } from "url";

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
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [ServiceCategories, Testimonials, Media, Users],
  globals: [Hero, Biography, Contact, SiteSettings],
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
  }),
  sharp,
});
