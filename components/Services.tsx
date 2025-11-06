"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, Microscope, Zap, ArrowRight, ChevronDown } from "lucide-react";

const serviceCards = [
  {
    id: "examens",
    title: "Examens Réalisés",
    description:
      "Équipements de pointe pour un diagnostic précis de votre vision",
    icon: Eye,
    href: "/services/examens",
    image: "/examens1.jpg",
    features: [
      "Acuité visuelle",
      "Vision des couleurs",
      "Exploration des globes oculaires",
    ],
  },
  {
    id: "pathologies",
    title: "Pathologies & Traitements",
    description: "Prise en charge complète des pathologies oculaires",
    icon: Microscope,
    href: "/services/pathologies",
    image: "/Pathologies.jpg",
    features: [
      "Anomalies de réfraction",
      "Maladies des yeux",
      "Traitements adaptés",
    ],
  },
  {
    id: "interventions",
    title: "Interventions Chirurgicales",
    description: "Chirurgies modernes pour restaurer votre vision",
    icon: Zap,
    href: "/services/interventions",
    image: "/landscape_img/ls2.jpg",
    features: ["Cataracte", "Glaucome", "Chirurgie réfractive"],
  },
];

export default function Services() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="services"
      className="py-10 sm:py-12 md:py-14 bg-gradient-to-b from-white via-brand-light/30 to-white"
    >
      <div className="container-section">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 sm:mb-3">
            Nos Services Ophtalmologiques
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
            Des équipements performants et une expertise reconnue pour
            diagnostiquer et traiter la grande majorité des problèmes oculaires.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div
          className={`grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${
            !isExpanded ? "max-md:grid-rows-1 max-md:overflow-hidden" : ""
          }`}
        >
          {serviceCards.map((service, index) => {
            const Icon = service.icon;
            const isHidden = !isExpanded && index > 0;
            return (
              <Link
                key={service.id}
                href={service.href}
                className={`group card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isHidden ? "max-md:hidden" : ""
                }`}
              >
                {/* Image */}
                <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <div className="p-2 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-sm text-slate-700"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-brand font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all">
                    <span>En savoir plus</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden text-center mt-5">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:text-brand-dark transition-colors"
          >
            <span>{isExpanded ? "Voir moins" : "Voir tous les services"}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 sm:mt-8 md:mt-10 text-center">
          <p className="text-xs sm:text-sm text-slate-700 mb-2 sm:mb-3">
            Besoin d'un examen ou d'une consultation ?
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base text-white font-medium hover:bg-brand-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Prendre rendez-vous
          </Link>
        </div>
      </div>
    </section>
  );
}
