import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../access";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Témoignage", plural: "Témoignages" },
  admin: {
    group: "Contenu",
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
  fields: [
    { name: "name", label: "Nom du patient", type: "text", required: true },
    { name: "text", label: "Témoignage", type: "textarea", required: true },
    {
      name: "dir",
      label: "Sens d’écriture",
      type: "select",
      defaultValue: "ltr",
      required: true,
      options: [
        { label: "Gauche à droite (français)", value: "ltr" },
        { label: "Droite à gauche (arabe)", value: "rtl" },
      ],
    },
    {
      name: "sortOrder",
      label: "Ordre d’affichage",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};
