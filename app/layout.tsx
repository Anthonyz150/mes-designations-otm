import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'OTM Manager',
  description: 'Gestion des désignations et bénévolat OTM',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <Navbar />
        <main className="p-4 sm:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}