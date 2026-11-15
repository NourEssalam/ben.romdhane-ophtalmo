import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "./routing";

export type LocaleParams = { params: Promise<{ locale: string }> };

/**
 * Validates the [locale] segment (404 if unknown) and enables static rendering
 * for it. Call at the top of every layout/page under app/(frontend)/[locale].
 */
export async function initLocale(params: LocaleParams["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return locale;
}
