import Image from 'next/image';

const services = [
  {
    title: "Examens de l’acuité visuelle",
    desc: "Réfraction, auto-réfracteur Canon, réfracteur automatique Nidek, projecteur de tests, frontofocomètre Oculus, kératomètre de Javal, montures et boîtes d’essai.",
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Vision des couleurs',
    desc: "Tests d'Ishihara pour dépister les dyschromatopsies.",
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Examen des globes oculaires',
    desc: 'Biomicroscope 900BQ Haag Streit, ophtalmoscopie, fond d’œil, glaucométrie, exploration des vaisseaux rétiniens, pathologies rétiniennes et du nerf optique.',
    img: 'https://images.unsplash.com/photo-1551281044-8d8b7ae7e86c?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Chirurgie et laser',
    desc: 'LASIK, cataracte, glaucome, strabisme, chalazion, ptérygion: prise en charge adaptée.',
    img: 'https://images.unsplash.com/photo-1584982751630-c072f5a6b0f1?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-brand-light/60">
      <div className="container-section">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Examens et Services</h2>
          <p className="mt-3 text-slate-700">Des équipements performants pour diagnostiquer et traiter la grande majorité des problèmes oculaires.</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="card overflow-hidden group">
              <div className="relative h-44">
                <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

