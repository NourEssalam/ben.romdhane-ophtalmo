import { Fragment, type ReactNode } from "react";
import { Clock, Landmark, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Contact } from "../payload-types";

const iconTile =
  "grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-surface text-brand";

const link = "text-brand hover:text-brand-hover hover:underline";

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 p-4 sm:p-5">
      <div className={iconTile}>
        <Icon aria-hidden="true" className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm lg:text-base font-medium text-muted">{label}</p>
        <p className="mt-0.5 text-base text-text">{children}</p>
      </div>
    </li>
  );
}

export default function ContactFooter({ contact }: { contact: Contact }) {
  const t = useTranslations("Contact");
  const phones = contact.phones ?? [];

  return (
    <section id="contact" className="section-padding bg-bg">
      <div className="container-section">
        {/* Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl">{t("title")}</h2>
          {contact.intro && (
            <p className="mt-3 text-base leading-relaxed text-text">
              {contact.intro}
            </p>
          )}
        </div>

        <div className="grid gap-6 lg:gap-8 md:grid-cols-2 items-stretch">
          {/* Information */}
          <ul className="card divide-y divide-line">
            {contact.address && (
              <Row icon={MapPin} label={t("address")}>
                {contact.address}
              </Row>
            )}
            {contact.landmark && (
              <Row icon={Landmark} label={t("landmark")}>
                {contact.landmark}
              </Row>
            )}
            {phones.length > 0 && (
              <Row icon={Phone} label={t("phone")}>
                {phones.map((phone, i) => (
                  <Fragment key={phone.id ?? i}>
                    {i > 0 && " / "}
                    <a href={`tel:${phone.number}`} className={link}>
                      <span dir="ltr">{phone.display}</span>
                    </a>
                  </Fragment>
                ))}
              </Row>
            )}
            {contact.email && (
              <Row icon={Mail} label={t("email")}>
                <a
                  href={`mailto:${contact.email}`}
                  dir="ltr"
                  className={`${link} break-all`}
                >
                  {contact.email}
                </a>
              </Row>
            )}
            {contact.hours && (
              <Row icon={Clock} label={t("hours")}>
                {contact.hours}
              </Row>
            )}
          </ul>

          {/* Map */}
          {contact.mapEmbedUrl && (
            <div className="card flex p-2 sm:p-3">
              <iframe
                src={contact.mapEmbedUrl}
                title={t("mapTitle")}
                className="w-full h-64 md:h-auto md:min-h-80 rounded-2xl"
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
