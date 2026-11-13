import type { CollectionConfig, Field } from "payload";
import { anyone, authenticated } from "../access";

/** A reorderable list of single-line strings, stored as [{ item }]. */
const stringList = (name: string, label: string, itemLabel: string): Field => ({
  name,
  label,
  type: "array",
  labels: { singular: itemLabel, plural: label },
  fields: [{ name: "item", label: itemLabel, type: "text", required: true }],
});

/** A list of { name, desc } pairs (treatments, interventions). */
const nameDescList = (name: string, label: string, itemLabel: string): Field => ({
  name,
  label,
  type: "array",
  labels: { singular: itemLabel, plural: label },
  fields: [
    { name: "name", label: "Nom", type: "text", required: true },
    { name: "desc", label: "Description", type: "text", required: true },
  ],
});

export const ServiceCategories: CollectionConfig = {
  slug: "service-categories",
  labels: { singular: "Catégorie de services", plural: "Catégories de services" },
  admin: {
    group: "Contenu",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "sortOrder"],
  },
  defaultSort: "sortOrder",
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "slug",
      label: "Identifiant d’URL",
      type: "select",
      required: true,
      unique: true,
      index: true,
      options: [
        { label: "Examens (/services/examens)", value: "examens" },
        { label: "Pathologies (/services/pathologies)", value: "pathologies" },
        { label: "Interventions (/services/interventions)", value: "interventions" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "sortOrder",
      label: "Ordre d’affichage",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
    {
      name: "icon",
      label: "Icône",
      type: "select",
      required: true,
      options: [
        { label: "Œil", value: "eye" },
        { label: "Microscope", value: "microscope" },
        { label: "Éclair", value: "zap" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "title", label: "Titre", type: "text", required: true },
    {
      name: "subtitle",
      label: "Sous-titre de la page",
      type: "text",
    },
    {
      name: "card",
      label: "Carte sur la page d’accueil",
      type: "group",
      fields: [
        { name: "description", label: "Description", type: "textarea" },
        { name: "image", label: "Image", type: "upload", relationTo: "media" },
        stringList("features", "Points clés", "Point clé"),
      ],
    },
    {
      name: "subcategories",
      label: "Sous-catégories",
      type: "array",
      labels: { singular: "Sous-catégorie", plural: "Sous-catégories" },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "key",
          label: "Clé technique",
          type: "text",
          required: true,
          admin: { description: "Ex. : acuite, couleurs, globes. Sans espaces ni accents." },
        },
        { name: "name", label: "Nom", type: "text", required: true },
        {
          name: "image",
          label: "Image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        { name: "description", label: "Description", type: "textarea", required: true },
        stringList("equipment", "Équipements", "Équipement"),
        stringList("applications", "Applications", "Application"),
        stringList("conditions", "Pathologies traitées", "Pathologie"),
        nameDescList("treatments", "Traitements", "Traitement"),
        nameDescList("interventions", "Interventions", "Intervention"),
      ],
    },
  ],
};
