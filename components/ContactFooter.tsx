import { Fragment } from "react";
import type { Contact } from "../payload-types";

export default function ContactFooter({ contact }: { contact: Contact }) {
  const phones = contact.phones ?? [];

  return (
    <section id="contact" className="section-padding bg-brand-light/60">
      <div className="container-section">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Contact & Informations
            </h2>
            {contact.intro && (
              <p className="mt-2 text-sm sm:text-base text-slate-700">
                {contact.intro}
              </p>
            )}
            <div className="mt-4 sm:mt-6 grid gap-3 text-sm sm:text-base text-slate-700">
              {contact.address && (
                <p>
                  <strong>Adresse:</strong>
                  <br className="sm:hidden" /> {contact.address}
                </p>
              )}
              {contact.landmark && (
                <p>
                  <strong>Repèrage:</strong>
                  <br className="sm:hidden" /> {contact.landmark}{" "}
                </p>
              )}

              {phones.length > 0 && (
                <p>
                  <strong>Téléphone:</strong>{" "}
                  {phones.map((phone, i) => (
                    <Fragment key={phone.id ?? i}>
                      {i > 0 && " / "}
                      <a href={`tel:${phone.number}`} className="text-brand hover:underline">
                        {phone.display}
                      </a>
                    </Fragment>
                  ))}
                </p>
              )}
              {contact.email && (
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-brand hover:underline"
                  >
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.hours && (
                <p>
                  <strong>Horaires:</strong> {contact.hours}
                </p>
              )}
            </div>
          </div>
          {contact.mapEmbedUrl && (
            <div className="card p-2 sm:p-4">
              <iframe
                src={contact.mapEmbedUrl}
                className="w-full h-48 sm:h-64 rounded-lg"
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
