export default function ContactFooter() {
  return (
    <section id="contact" className="section-padding bg-brand-light/60">
      <div className="container-section">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Contact & Informations
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700">
              N'hésitez pas à nous contacter pour une consultation ou toute
              information complémentaire.
            </p>
            <div className="mt-4 sm:mt-6 grid gap-3 text-sm sm:text-base text-slate-700">
              <p>
                <strong>Adresse:</strong>
                <br className="sm:hidden" /> Complexe medical EMNA, Avenue 02
                mars 1934, 5100 MAHDIA(Tunisie)
              </p>
              <p>
                <strong>Repèrage:</strong>
                <br className="sm:hidden" /> 70m à droite de la CNSS, au dissus
                de magazin AZIZA et près de CARREFOUR{" "}
              </p>

              <p>
                <strong>Téléphone:</strong>{" "}
                <a href="tel:73681081" className="text-brand hover:underline">
                  73 681 081
                </a>{" "}
                /{" "}
                <a href="tel:50455700" className="text-brand hover:underline">
                  50 455 700
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:dr.benromdhanebrahim@gmail.com"
                  className="text-brand hover:underline"
                >
                  dr.benromdhanebrahim@gmail.com
                </a>
              </p>
              <p>
                <strong>Horaires:</strong> Lun - Sam: 08:30 - 13:00
              </p>
            </div>
          </div>
          <div className="card p-2 sm:p-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.8648203743223!2d11.052349565645988!3d35.50762066766645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130223c23bc07003%3A0x1c3850aef7b1dbc0!2sAv.%20du%202%20Mars%201934%2C%20Mahdia!5e0!3m2!1sen!2stn!4v1762465178754!5m2!1sen!2stn"
              className="w-full h-48 sm:h-64 rounded-lg"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
