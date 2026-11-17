import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="section-padding">
      <div className="container-section text-center">
        <p className="text-sm font-semibold text-brand">{t("code")}</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-fg">
          {t("title")}
        </h1>
        <p className="mt-4 text-fg-muted">{t("text")}</p>
        <Link
          href="/"
          className="btn btn-primary mt-8"
        >
          {t("back")}
        </Link>
      </div>
    </main>
  );
}
