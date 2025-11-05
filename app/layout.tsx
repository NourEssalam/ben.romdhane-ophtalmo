import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dr Brahim Ben Romdhane | Ophtalmologiste à Mahdia',
  description: 'Cabinet d\'ophtalmologie à Mahdia: examens, traitements, chirurgie, et suivi visuel.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

