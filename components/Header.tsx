"use client";
import { useEffect, useState } from "react";

const sections = [
  { id: "accueil", label: "Accueil" },
  { id: "services", label: "Services" },
  { id: "biographie", label: "Biographie" },
  { id: "temoignages", label: "Témoignages" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/90 backdrop-blur shadow-sm"
          : "bg-white/60 backdrop-blur"
      } border-b border-slate-100`}
    >
      <div className="container-section py-3 flex items-center justify-between">
        <a href="#accueil" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-brand/20 ring-1 ring-brand/30 grid place-items-center">
            <span className="text-brand font-bold">BR</span>
          </div>
          <div className="leading-tight">
            <p className="font-semibold">Dr B. Ben Romdhane</p>
            <p className="text-xs text-slate-500">Ophtalmologiste</p>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-slate-700 hover:text-brand transition"
            >
              {s.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="ml-4 inline-flex items-center rounded-full bg-brand px-4 py-2 text-white text-sm hover:bg-brand-dark transition"
        >
          Prendre RDV
        </a>
      </div>
    </header>
  );
}
