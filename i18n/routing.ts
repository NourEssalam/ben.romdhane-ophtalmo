import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./locales";

export { localeDir, localeNames, type Locale } from "./locales";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // French keeps today's URLs (/, /services/...); others get /ar, /en, /de.
  localePrefix: "as-needed",
  // `/` always serves French; visitors switch language explicitly.
  localeDetection: false,
});
