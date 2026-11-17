"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { categoryIcons, type ServiceLink } from "./icons";

/** Services sidebar (desktop) + select (mobile); needs the current path (without locale prefix). */
export default function ServicesNav({ links }: { links: ServiceLink[] }) {
  const t = useTranslations("Services");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <nav className="sticky top-24">
          <div className="card p-2">
            <div className="p-3 mb-1">
              <h2 className="font-sans text-xs font-semibold text-muted uppercase tracking-wider rtl:tracking-normal">
                {t("navTitle")}
              </h2>
            </div>
            <ul className="space-y-1">
              {links.map((item) => {
                const Icon = categoryIcons[item.icon];
                const isActive = pathname === item.href;
                return (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200 ${
                        isActive
                          ? "bg-brand text-on-brand"
                          : "text-text hover:bg-sand hover:text-ink"
                      }`}
                    >
                      <Icon
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 transition-colors ${
                          isActive ? "" : "text-muted group-hover:text-brand"
                        }`}
                      />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <select
          onChange={(e) => router.push(e.target.value)}
          value={pathname}
          aria-label={t("navTitle")}
          className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm font-medium text-ink"
        >
          {links.map((item) => (
            <option key={item.slug} value={item.href}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
