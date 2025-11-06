"use client";
import { useState } from "react";
import Image from "next/image";
import { Eye, ChevronDown } from "lucide-react";

interface ExamType {
  title: string;
  image: string;
  equipment: string[];
}

const examens: ExamType[] = [
  {
    title: "Acuité visuelle (réfraction)",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    equipment: [
      "Auto-réfracteur Canon",
      "Réfracteur automatique Nidek",
      "Projecteur de tests Nidek",
      "Frontofocomètre Oculus",
      "Kératomètre de Javal",
      "Boîte de verres d'essai complète",
      "Montures d'essai",
      "Échelles visuelles Monoyer, Snellen, Pigassou",
      "Tests optométriques Parinaud",
    ],
  },
  {
    title: "Vision des couleurs",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    equipment: ["Test d'Ishihara"],
  },
  {
    title: "Examen des globes oculaires",
    image:
      "https://images.unsplash.com/photo-1551281044-8d8b7ae7e86c?q=80&w=1200&auto=format&fit=crop",
    equipment: [
      "Table élévatrice oscillante Haag Streit",
      "Biomicroscope 900BQ Haag Streit (LAF)",
      "Ophtalmoscope direct",
      "Fond d'œil",
      "Mesure de la tension oculaire, glaucome, glaucométrie",
      "Ophtalmoscopie, exploration vaisseaux rétiniens",
    ],
  },
];

export default function ExamensSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="examens" className="section-padding bg-white">
      <div className="container-section">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Eye className="w-7 h-7 text-brand" />
            Examens Réalisés
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            Équipements performants pour diagnostiquer vos besoins visuels
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5">
          {examens.map((exam, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div key={idx} className="card overflow-hidden">
                <div className="grid sm:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
                  {/* Image */}
                  <div className="relative h-40 sm:h-auto">
                    <Image
                      src={exam.image}
                      alt={exam.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                      {exam.title}
                    </h3>

                    {/* Equipment List */}
                    <div className="space-y-1.5">
                      {exam.equipment
                        .slice(0, isExpanded ? undefined : 3)
                        .map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-sm text-slate-700"
                          >
                            <span className="text-brand mt-1">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                    </div>

                    {/* Show More Button */}
                    {exam.equipment.length > 3 && (
                      <button
                        onClick={() =>
                          setExpandedIndex(isExpanded ? null : idx)
                        }
                        className="mt-3 text-sm font-medium text-brand hover:text-brand-dark flex items-center gap-1"
                      >
                        {isExpanded
                          ? "Voir moins"
                          : `Voir plus (${exam.equipment.length - 3})`}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
