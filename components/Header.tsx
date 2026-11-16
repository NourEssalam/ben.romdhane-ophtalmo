"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";
import type { ServiceLink } from "./icons";

const sections = [
  { id: "accueil", key: "home" },
  { id: "services", key: "services" },
  { id: "biographie", key: "biography" },
  { id: "temoignages", key: "testimonials" },
  { id: "contact", key: "contact" },
] as const;

export default function Header({ services }: { services: ServiceLink[] }) {
  const t = useTranslations("Header");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      // Close mobile menu on scroll
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        setMobileServicesOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    setMobileMenuOpen(false);

    // Handle smooth scroll with offset for anchor links
    if (id !== "accueil") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80; // Header height + some padding
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white/80 backdrop-blur-xs"
        } border-b border-slate-100`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="text-slate-700 hover:text-brand transition-colors duration-200">{t("home")}</Link>
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className="text-slate-700 hover:text-brand transition-colors duration-200 cursor-pointer">
                {t("services")}
              </button>
              <div className={`absolute left-0 top-full w-72 z-50 transition-all duration-200 ${
                servicesDropdownOpen ? 'visible opacity-100' : 'invisible opacity-0'
              }`}>
                {/* Invisible bridge area to prevent gap */}
                <div className="h-2 w-full" />
                <div className="card p-2 shadow-lg">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={service.href}
                      className="block px-3 py-2 rounded-sm hover:bg-slate-100 text-slate-700 transition-colors"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href={{ pathname: "/", hash: "biographie" }} className="text-slate-700 hover:text-brand transition-colors duration-200">{t("biography")}</Link>
            <Link href={{ pathname: "/", hash: "temoignages" }} className="text-slate-700 hover:text-brand transition-colors duration-200">{t("testimonials")}</Link>
            <a href="#contact" className="text-slate-700 hover:text-brand transition-colors duration-200">{t("contact")}</a>
            <LocaleSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors duration-200 relative z-50"
            aria-label={t("toggleMenu")}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Spacer to prevent content jump */}
      <div className="h-[60px]" />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-xs"
          onClick={() => {
            setMobileMenuOpen(false);
            setMobileServicesOpen(false);
          }}
          style={{ top: "60px" }}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed right-0 top-[60px] bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl transition-transform duration-300 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-1 overflow-y-auto h-full">
          {sections.map((s, index) => {
            if (s.id === "services") {
              return (
                <div key={s.id} className="border-b border-slate-100">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full text-left text-lg font-medium text-slate-700 hover:text-brand hover:bg-slate-50 transition-all duration-200 py-4 px-4 rounded-lg flex items-center justify-between"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <span>{t(s.key)}</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileServicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-4 pb-2 space-y-1">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={service.href}
                          onClick={() => {
                            setMobileServicesOpen(false);
                            setMobileMenuOpen(false);
                          }}
                          className="block px-4 py-3 rounded-lg text-base text-slate-600 hover:text-brand hover:bg-slate-50 transition-colors"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            // Contact is on every page (same-page anchor); other sections live on home.
            const isAnchorHere = s.id === "contact";
            const targetHref = s.id === "accueil" ? "/" : { pathname: "/", hash: s.id };
            return isAnchorHere ? (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => handleLinkClick(e, s.id)}
                className="text-lg font-medium text-slate-700 hover:text-brand hover:bg-slate-50 transition-all duration-200 py-4 px-4 rounded-lg border-b border-slate-100 last:border-b-0"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {t(s.key)}
              </a>
            ) : (
              <Link
                key={s.id}
                href={targetHref}
                onClick={() => {
                  // closing menu for navigation to home sections
                  setMobileMenuOpen(false);
                  setMobileServicesOpen(false);
                }}
                className="text-lg font-medium text-slate-700 hover:text-brand hover:bg-slate-50 transition-all duration-200 py-4 px-4 rounded-lg border-b border-slate-100 last:border-b-0"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {t(s.key)}
              </Link>
            );
          })}
          <div className="pt-4 px-4">
            <LocaleSwitcher className="w-full py-2 text-base" />
          </div>
        </nav>
      </div>
    </>
  );
}
