import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";
import { common } from "../i18n/adminLabels";
import { ALL_PAGES, globalRevalidate } from "../lib/revalidate";

export const Contact: GlobalConfig = {
  slug: "contact",
  label: { fr: "Contact", ar: "التواصل", en: "Contact", de: "Kontakt" },
  admin: { group: common.groupContent },
  access: { read: anyone, update: authenticated },
  hooks: globalRevalidate(ALL_PAGES),
  fields: [
    { name: "intro", label: common.intro, type: "textarea", localized: true },
    {
      name: "address",
      label: { fr: "Adresse", ar: "العنوان", en: "Address", de: "Adresse" },
      type: "text",
      localized: true,
    },
    {
      name: "landmark",
      label: { fr: "Repérage", ar: "معلم قريب", en: "Landmark", de: "Orientierungspunkt" },
      type: "text",
      localized: true,
    },
    {
      name: "phones",
      label: { fr: "Téléphones", ar: "الهواتف", en: "Phone numbers", de: "Telefonnummern" },
      type: "array",
      labels: {
        singular: { fr: "Téléphone", ar: "هاتف", en: "Phone number", de: "Telefonnummer" },
        plural: { fr: "Téléphones", ar: "الهواتف", en: "Phone numbers", de: "Telefonnummern" },
      },
      fields: [
        {
          name: "display",
          label: {
            fr: "Numéro affiché",
            ar: "الرقم المعروض",
            en: "Displayed number",
            de: "Angezeigte Nummer",
          },
          type: "text",
          required: true,
          admin: {
            description: { fr: "Ex. : 73 681 081", ar: "مثال: 73 681 081", en: "E.g. 73 681 081", de: "Z. B. 73 681 081" },
          },
        },
        {
          name: "number",
          label: {
            fr: "Numéro pour l’appel (sans espaces)",
            ar: "رقم الاتصال (بدون مسافات)",
            en: "Number to call (no spaces)",
            de: "Nummer zum Anrufen (ohne Leerzeichen)",
          },
          type: "text",
          required: true,
          admin: {
            description: { fr: "Ex. : 73681081", ar: "مثال: 73681081", en: "E.g. 73681081", de: "Z. B. 73681081" },
          },
        },
      ],
    },
    { name: "email", label: { fr: "E-mail", ar: "البريد الإلكتروني", en: "Email", de: "E-Mail" }, type: "email" },
    {
      name: "hours",
      label: { fr: "Horaires", ar: "مواعيد العمل", en: "Opening hours", de: "Öffnungszeiten" },
      type: "text",
      localized: true,
    },
    {
      name: "mapEmbedUrl",
      label: {
        fr: "Lien d’intégration Google Maps",
        ar: "رابط تضمين خرائط Google",
        en: "Google Maps embed link",
        de: "Google-Maps-Einbettungslink",
      },
      type: "text",
      admin: {
        description: {
          fr: "Google Maps › Partager › Intégrer une carte : copier uniquement l’URL du champ src.",
          ar: "خرائط Google › مشاركة › تضمين خريطة: انسخ عنوان URL الموجود في الحقل src فقط.",
          en: "Google Maps › Share › Embed a map: copy only the URL from the src attribute.",
          de: "Google Maps › Teilen › Karte einbetten: nur die URL aus dem src-Attribut kopieren.",
        },
      },
    },
  ],
};
