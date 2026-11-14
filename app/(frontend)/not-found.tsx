import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-padding">
      <div className="container-section text-center">
        <p className="text-sm font-semibold text-brand">Erreur 404</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
          Page introuvable
        </h1>
        <p className="mt-4 text-slate-600">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-brand px-6 py-3 font-medium text-white shadow-md shadow-brand/20 hover:opacity-90"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
