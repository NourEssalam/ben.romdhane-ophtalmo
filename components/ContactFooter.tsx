import { Fragment } from "react";
import { useTranslations } from "next-intl";
import type { Contact } from "../payload-types";

export default function ContactFooter({ contact }: { contact: Contact }) {
  const t = useTranslations("Contact");
  const phones = contact.phones ?? [];

  return (
    <section id="contact" className="section-padding bg-brand-light/60">
      <div className="container-section">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-fg">
              {t("title")}
            </h2>
            {contact.intro && (
              <p className="mt-2 text-sm sm:text-base text-fg-body">
                {contact.intro}
              </p>
            )}
            <div className="mt-4 sm:mt-6 grid gap-3 text-sm sm:text-base text-fg-body">
              {contact.address && (
                <p>
                  <strong>{t("address")}</strong>
                  <br className="sm:hidden" /> {contact.address}
                </p>
              )}
              {contact.landmark && (
                <p>
                  <strong>{t("landmark")}</strong>
                  <br className="sm:hidden" /> {contact.landmark}{" "}
                </p>
              )}

              {phones.length > 0 && (
                <p>
                  <strong>{t("phone")}</strong>{" "}
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
                  <strong>{t("email")}</strong>{" "}
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
                  <strong>{t("hours")}</strong> {contact.hours}
                </p>
              )}
            </div>
          </div>
          {contact.mapEmbedUrl && (
            <div className="card p-2 sm:p-4">
              <iframe
                src={contact.mapEmbedUrl}
                title={t("mapTitle")}
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
