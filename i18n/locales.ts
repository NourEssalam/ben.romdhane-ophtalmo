// Plain constants shared by next-intl (i18n/routing.ts) and Payload (payload.config.ts).
// No framework imports here so the Payload CLI can load it too.

export const locales = ["fr", "ar", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

/** Native language names (switcher, Payload locale picker). */
export const localeNames: Record<Locale, string> = {
  fr: "Français",
  ar: "العربية",
  en: "English",
  de: "Deutsch",
};

export const localeDir = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");
