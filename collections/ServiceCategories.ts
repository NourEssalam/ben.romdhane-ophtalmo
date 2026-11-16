import type { CollectionConfig, Field } from "payload";
import { anyone, authenticated } from "../access";
import { type Label, common } from "../i18n/adminLabels";
import { ALL_PAGES, collectionRevalidate } from "../lib/revalidate";

/** A reorderable list of single-line strings, stored as [{ item }]. */
const stringList = (name: string, label: Label, itemLabel: Label): Field => ({
  name,
  label,
  type: "array",
  labels: { singular: itemLabel, plural: label },
  fields: [{ name: "item", label: itemLabel, type: "text", required: true, localized: true }],
});

/** A list of { name, desc } pairs (treatments, interventions). */
const nameDescList = (name: string, label: Label, itemLabel: Label): Field => ({
  name,
  label,
  type: "array",
  labels: { singular: itemLabel, plural: label },
  fields: [
    { name: "name", label: common.name, type: "text", required: true, localized: true },
    { name: "desc", label: common.description, type: "text", required: true, localized: true },
  ],
});

export const ServiceCategories: CollectionConfig = {
  slug: "service-categories",
  labels: {
    singular: {
      fr: "Catégorie de services",
      ar: "فئة خدمات",
      en: "Service category",
      de: "Leistungskategorie",
    },
    plural: {
      fr: "Catégories de services",
      ar: "فئات الخدمات",
      en: "Service categories",
      de: "Leistungskategorien",
    },
  },
  admin: {
    group: common.groupContent,
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
  hooks: collectionRevalidate(ALL_PAGES),
  fields: [
    {
      name: "slug",
      label: { fr: "Identifiant d’URL", ar: "معرّف الرابط", en: "URL slug", de: "URL-Kennung" },
      type: "select",
      required: true,
      unique: true,
      index: true,
      options: [
        {
          label: {
            fr: "Examens (/services/examens)",
            ar: "الفحوصات (/services/examens)",
            en: "Examinations (/services/examens)",
            de: "Untersuchungen (/services/examens)",
          },
          value: "examens",
        },
        {
          label: {
            fr: "Pathologies (/services/pathologies)",
            ar: "الأمراض (/services/pathologies)",
            en: "Conditions (/services/pathologies)",
            de: "Erkrankungen (/services/pathologies)",
          },
          value: "pathologies",
        },
        {
          label: {
            fr: "Interventions (/services/interventions)",
            ar: "العمليات (/services/interventions)",
            en: "Procedures (/services/interventions)",
            de: "Eingriffe (/services/interventions)",
          },
          value: "interventions",
        },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "sortOrder",
      label: common.sortOrder,
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
    {
      name: "icon",
      label: { fr: "Icône", ar: "الأيقونة", en: "Icon", de: "Symbol" },
      type: "select",
      required: true,
      options: [
        { label: { fr: "Œil", ar: "عين", en: "Eye", de: "Auge" }, value: "eye" },
        { label: { fr: "Microscope", ar: "مجهر", en: "Microscope", de: "Mikroskop" }, value: "microscope" },
        { label: { fr: "Éclair", ar: "برق", en: "Lightning", de: "Blitz" }, value: "zap" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "title", label: common.title, type: "text", required: true, localized: true },
    {
      name: "subtitle",
      label: {
        fr: "Sous-titre de la page",
        ar: "العنوان الفرعي للصفحة",
        en: "Page subtitle",
        de: "Seitenuntertitel",
      },
      type: "text",
      localized: true,
    },
    {
      name: "card",
      label: {
        fr: "Carte sur la page d’accueil",
        ar: "البطاقة في الصفحة الرئيسية",
        en: "Home page card",
        de: "Karte auf der Startseite",
      },
      type: "group",
      fields: [
        { name: "description", label: common.description, type: "textarea", localized: true },
        { name: "image", label: common.image, type: "upload", relationTo: "media" },
        stringList(
          "features",
          { fr: "Points clés", ar: "النقاط الرئيسية", en: "Key points", de: "Kernpunkte" },
          { fr: "Point clé", ar: "نقطة رئيسية", en: "Key point", de: "Kernpunkt" },
        ),
      ],
    },
    {
      name: "subcategories",
      label: { fr: "Sous-catégories", ar: "الفئات الفرعية", en: "Subcategories", de: "Unterkategorien" },
      type: "array",
      labels: {
        singular: { fr: "Sous-catégorie", ar: "فئة فرعية", en: "Subcategory", de: "Unterkategorie" },
        plural: { fr: "Sous-catégories", ar: "الفئات الفرعية", en: "Subcategories", de: "Unterkategorien" },
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "key",
          label: { fr: "Clé technique", ar: "المفتاح التقني", en: "Technical key", de: "Technischer Schlüssel" },
          type: "text",
          required: true,
          admin: {
            description: {
              fr: "Ex. : acuite, couleurs, globes. Sans espaces ni accents.",
              ar: "مثال: acuite، couleurs، globes. بدون مسافات أو حروف معلّمة.",
              en: "E.g. acuite, couleurs, globes. No spaces or accents.",
              de: "Z. B. acuite, couleurs, globes. Ohne Leerzeichen und Akzente.",
            },
          },
        },
        { name: "name", label: common.name, type: "text", required: true, localized: true },
        {
          name: "image",
          label: common.image,
          type: "upload",
          relationTo: "media",
          required: true,
        },
        { name: "description", label: common.description, type: "textarea", required: true, localized: true },
        stringList(
          "equipment",
          { fr: "Équipements", ar: "المعدات", en: "Equipment", de: "Geräte" },
          { fr: "Équipement", ar: "جهاز", en: "Equipment item", de: "Gerät" },
        ),
        stringList(
          "applications",
          { fr: "Applications", ar: "الاستخدامات", en: "Applications", de: "Anwendungen" },
          { fr: "Application", ar: "استخدام", en: "Application", de: "Anwendung" },
        ),
        stringList(
          "conditions",
          { fr: "Pathologies traitées", ar: "الأمراض المعالجة", en: "Conditions treated", de: "Behandelte Erkrankungen" },
          { fr: "Pathologie", ar: "مرض", en: "Condition", de: "Erkrankung" },
        ),
        nameDescList(
          "treatments",
          { fr: "Traitements", ar: "العلاجات", en: "Treatments", de: "Behandlungen" },
          { fr: "Traitement", ar: "علاج", en: "Treatment", de: "Behandlung" },
        ),
        nameDescList(
          "interventions",
          { fr: "Interventions", ar: "العمليات", en: "Procedures", de: "Eingriffe" },
          { fr: "Intervention", ar: "عملية", en: "Procedure", de: "Eingriff" },
        ),
      ],
    },
  ],
};
