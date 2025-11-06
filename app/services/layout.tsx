"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Eye, Microscope, Zap } from "lucide-react";

const servicesNav = [
  {
    id: "examens",
    label: "Examens Réalisés",
    href: "/services/examens",
    icon: Eye,
  },
  {
    id: "pathologies",
    label: "Pathologies & Traitements",
    href: "/services/pathologies",
    icon: Microscope,
  },
  {
    id: "interventions",
    label: "Interventions Chirurgicales",
    href: "/services/interventions",
    icon: Zap,
  },
];

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="section-padding">
        <div className="container-section">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <nav className="sticky top-24">
                <div className="card p-2">
                  <div className="p-3 mb-2">
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      Nos Services
                    </h2>
                  </div>
                  <ul className="space-y-1">
                    {servicesNav.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.id}>
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
                            <span className="font-medium text-sm">
                              {item.label}
                            </span>
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
                onChange={(e) => {
                  window.location.href = e.target.value;
                }}
                value={pathname}
                className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium shadow-sm focus:ring-2 focus:ring-brand focus:border-brand"
              >
                {servicesNav.map((item) => (
                  <option key={item.id} value={item.href}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Content */}
            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
