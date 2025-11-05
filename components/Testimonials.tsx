const fr = [
  {
    name: 'Aymen',
    text: 'Accueil chaleureux et examen très complet. Je recommande vivement !'
  },
  {
    name: 'Nadia',
    text: 'Très professionnelle, explications claires et rassurantes.'
  }
];

const ar = [
  {
    name: 'أمينة',
    text: 'استقبال ممتاز وفحص شامل. أنصح به بشدة.'
  },
  {
    name: 'بلال',
    text: 'طبيبة محترفة وتوضيحات دقيقة ومطمئنة.'
  }
];

export default function Testimonials() {
  return (
    <section id="temoignages" className="section-padding bg-white">
      <div className="container-section">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Témoignages</h2>
        <p className="mt-2 text-slate-700">Quelques avis de nos patients (français et arabe)</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-slate-900">Français</h3>
            <div className="mt-3 grid gap-4">
              {fr.map((t) => (
                <blockquote key={t.name} className="card p-5">
                  <p className="text-slate-700">“{t.text}”</p>
                  <footer className="mt-2 text-sm text-slate-500">— {t.name}</footer>
                </blockquote>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">العربية</h3>
            <div className="mt-3 grid gap-4">
              {ar.map((t) => (
                <blockquote key={t.name} className="card p-5 text-right" dir="rtl">
                  <p className="text-slate-700">“{t.text}”</p>
                  <footer className="mt-2 text-sm text-slate-500">— {t.name}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

