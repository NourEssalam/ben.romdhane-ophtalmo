export default function ContactFooter() {
  return (
    <section id="contact" className="section-padding bg-brand-light/60">
      <div className="container-section">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Contact & Informations</h2>
            <p className="mt-2 text-slate-700">N’hésitez pas à nous contacter pour une consultation ou toute information complémentaire.</p>
            <div className="mt-6 grid gap-3 text-slate-700">
              <p><strong>Adresse:</strong> Complexe médical EMNA, Avenue 02 mars 1934, Mahdia</p>
              <p><strong>Téléphone:</strong> 73 000 000</p>
              <p><strong>Email:</strong> contact@ophtalmo-mahdia.tn</p>
              <p><strong>Horaires:</strong> Lun - Ven: 09:00 - 17:00</p>
            </div>
          </div>
          <div className="card p-4">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Mahdia%20Tunisia&output=embed"
              className="w-full h-64 rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <footer className="mt-12 border-t border-slate-200">
        <div className="container-section py-6 text-sm text-slate-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Dr B. Ben Romdhane — Ophtalmologiste</p>
          <p>Mahdia, Tunisie</p>
        </div>
      </footer>
    </section>
  );
}

