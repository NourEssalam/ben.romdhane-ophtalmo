"use client";
import Image from "next/image";
import { useState } from "react";
import {
  GraduationCap,
  Building2,
  Award,
  Stethoscope,
  ChevronDown,
} from "lucide-react";

export default function Biography() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="biographie"
      className="py-10 sm:py-12 md:py-14 bg-gradient-to-b from-white to-brand-light/20"
    >
      <div className="container-section">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            À Propos du Docteur
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Plus de 30 ans d'expertise en ophtalmologie
          </p>
        </div>

        <div className="card bg-gradient-to-br from-white to-slate-50/50 p-5 sm:p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            {/* Left Column - Image */}
            <div className="lg:col-span-4">
              <div className="relative h-48 sm:h-56 lg:h-72 rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/docteur.jpg"
                  alt="Docteur Ophtalmologue"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs sm:text-sm font-medium bg-brand/90 backdrop-blur-sm px-3 py-1.5 rounded-lg inline-block">
                    En exercice depuis 1990
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Professional Info */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              {/* Main Title */}
              <div className="border-l-4 border-brand pl-4">
                <div className="flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-brand flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                      Médecin Spécialiste en Ophtalmologie
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Formation internationale et expérience hospitalière
                    </p>
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              <div
                className={`space-y-4 sm:space-y-5 transition-all duration-500 ${
                  !isExpanded ? "max-sm:hidden" : ""
                }`}
              >
                {/* Education - Paris VI */}
                <div className="bg-blue-50/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-slate-900">
                        Université Pierre et Marie Curie (Paris VI)
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Diplôme en Ophtalmologie
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Experience */}
                <div className="bg-emerald-50/50 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Building2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <h4 className="font-semibold text-sm sm:text-base text-slate-900">
                      Parcours Professionnel
                    </h4>
                  </div>
                  <ul className="space-y-2 ml-8">
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                      <span>
                        Médecin ophtalmologue au centre universitaire Tahar Sfar
                        à Mahdia
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                      <span>
                        Cabinet libéral en ophtalmologie à Ksar-Hellal (jusqu'en
                        2018)
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                      <span>
                        Cabinet d'ophtalmologie à Mahdia - Complexe médical
                        EMNA, avenue 02 mars 1934
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Additional Diplomas */}
                <div className="bg-amber-50/50 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Award className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-slate-900">
                        Diplômes Complémentaires
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Université René Descartes (Paris V)
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 ml-8">
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                      <span>
                        Médecine aéronautique (Faculté des Saints Pères)
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                      <span>Pédiatrie préventive</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                      <span>Pédiatrie et puériculture</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mobile Toggle Button */}
              <div className="sm:hidden text-center pt-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:text-brand-dark transition-colors"
                >
                  <span>
                    {isExpanded ? "Voir moins" : "Voir plus de détails"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
