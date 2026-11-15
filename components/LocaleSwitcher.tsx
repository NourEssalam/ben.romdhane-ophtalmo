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
      className={`rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700 focus:border-brand focus:ring-2 focus:ring-brand ${className}`}
    >
      {routing.locales.map((l) => (
        <option key={l} value={l} lang={l}>
          {localeNames[l]}
        </option>
      ))}
    </select>
  );
}
