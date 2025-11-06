export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-section py-4 sm:py-6 text-xs sm:text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Dr B. Ben Romdhane — Ophtalmologiste</p>
        <p>Mahdia, Tunisie</p>
      </div>
    </footer>
  );
}

