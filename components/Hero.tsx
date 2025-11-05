"use client";
import { useEffect, useState } from "react";

const slides = [
  {
    url: "/landscape_img/ls1.jpg",
    caption: "Votre vision, notre priorité",
  },
  {
    url: "/landscape_img/ls2.jpg",
    caption: "Examens complets et soins modernes",
  },
  {
    url: "/landscape_img/ls3.jpg",
    caption: "Technologies de pointe en ophtalmologie",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="accueil" className="relative">
      <div className="relative h-[68vh] min-h-[420px] w-full overflow-hidden">
        {/* Image Slides */}
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${s.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        {/* Enhanced Gradient Overlay - Darker at bottom for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 absolute bottom-10 left-0 right-0">
          <div className="max-w-2xl animate-fadeInUp">
            {/* Text Container with Backdrop */}
            <div className="bg-white/85 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900"
                style={{ textShadow: "1px 1px 3px rgba(255,255,255,0.8)" }}
              >
                Une Bonne Vision Pour Votre Bien-Être
              </h1>
              <p className="mt-4 text-slate-700 text-base sm:text-lg leading-relaxed">
                Notre cabinet d'ophtalmologie propose des examens complets, des
                traitements adaptés et un suivi personnalisé pour préserver
                votre santé visuelle.
              </p>

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full bg-[#2aa79b] px-6 py-3 text-white font-medium hover:bg-[#1b6f67] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Découvrir nos services
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full ring-2 ring-slate-300 bg-white px-6 py-3 text-slate-700 font-medium hover:bg-slate-50 hover:ring-slate-400 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
