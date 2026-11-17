"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, routing, type Locale } from "@/i18n/routing";

/** Language select: keeps the current page, swaps the locale prefix. */
export default function LocaleSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      aria-label={t("label")}
      value={locale}
      onChange={(e) => router.replace(pathname, { locale: e.target.value as Locale })}
      className={`h-10 rounded-full border border-line bg-surface px-3 lg:px-4 text-sm lg:text-base text-text cursor-pointer transition-colors duration-200 hover:border-brand ${className}`}
    >
      {routing.locales.map((l) => (
        <option key={l} value={l} lang={l}>
          {localeNames[l]}
        </option>
      ))}
    </select>
  );
}
