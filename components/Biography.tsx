export default function Biography() {
  return (
    <section id="biographie" className="section-padding">
      <div className="container-section">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Médecin Spécialiste en ophtalmologie</h2>
            <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
              <li>Diplômé de l’université de Pierre et Marie CURIE (Paris VI)</li>
              <li>Médecin ophtalmologue au centre universitaire Tahar Sfar à Mahdia (Tunisie).</li>
              <li>Cabinet libéral en ophtalmologie à Ksar- Hellal (TN) jusqu’à l’année 2018.</li>
              <li>Actuellement cabinet d’ophtalmologie à Mahdia.</li>
              <li>Complexe médical EMNA avenue 02 mars 1934 (près de la CNSS et Aziza)</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-slate-900">Diplôme de l’université de René Descartes (Paris V)</h3>
            <ul className="mt-3 space-y-2 text-slate-700 list-disc pl-5">
              <li>médecine aéronautique (faculté des Saints Pères)</li>
              <li>pédiatrie préventive</li>
              <li>pédiatrie et puériculture</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

