import type { Locale } from "./i18n/routing";
import type messages from "./messages/fr.json";

// Typed locales and message keys for next-intl (fr.json is the source of truth).
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}
