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
            <div className="p-3 mb-2">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
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
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? "bg-brand text-white shadow-md shadow-brand/20"
                          : "text-slate-700 hover:bg-slate-100 hover:text-brand"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-brand"
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
      <div className="lg:hidden mb-6">
        <select
          onChange={(e) => router.push(e.target.value)}
          value={pathname}
          className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium shadow-sm focus:ring-2 focus:ring-brand focus:border-brand"
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
