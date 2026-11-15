import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="section-padding">
      <div className="container-section text-center">
        <p className="text-sm font-semibold text-brand">{t("code")}</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
          {t("title")}
        </h1>
        <p className="mt-4 text-slate-600">{t("text")}</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-brand px-6 py-3 font-medium text-white shadow-md shadow-brand/20 hover:opacity-90"
        >
          {t("back")}
        </Link>
      </div>
    </main>
  );
}
