// Admin UI labels in every admin language (payload.config.ts → i18n.supportedLanguages).
// Plain constants, no framework imports, so the Payload CLI can load it too.
import type { Locale } from "./locales";

/** One string per admin language; a missing language fails to type-check. */
export type Label = Record<Locale, string>;

/** Labels used in several collections/globals. */
export const common = {
  groupContent: { fr: "Contenu", ar: "المحتوى", en: "Content", de: "Inhalt" },
  groupSettings: { fr: "Paramètres", ar: "الإعدادات", en: "Settings", de: "Einstellungen" },
  title: { fr: "Titre", ar: "العنوان", en: "Title", de: "Titel" },
  subtitle: { fr: "Sous-titre", ar: "العنوان الفرعي", en: "Subtitle", de: "Untertitel" },
  description: { fr: "Description", ar: "الوصف", en: "Description", de: "Beschreibung" },
  image: { fr: "Image", ar: "الصورة", en: "Image", de: "Bild" },
  name: { fr: "Nom", ar: "الاسم", en: "Name", de: "Name" },
  text: { fr: "Texte", ar: "النص", en: "Text", de: "Text" },
  item: { fr: "Élément", ar: "عنصر", en: "Item", de: "Element" },
  items: { fr: "Éléments", ar: "العناصر", en: "Items", de: "Elemente" },
  institution: { fr: "Établissement", ar: "المؤسسة", en: "Institution", de: "Einrichtung" },
  intro: {
    fr: "Texte d’introduction",
    ar: "نص المقدمة",
    en: "Introduction text",
    de: "Einleitungstext",
  },
  sortOrder: {
    fr: "Ordre d’affichage",
    ar: "ترتيب العرض",
    en: "Display order",
    de: "Anzeigereihenfolge",
  },
} satisfies Record<string, Label>;
