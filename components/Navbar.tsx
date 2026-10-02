'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/designations', label: 'Désignations', icon: '🏀' },
    { href: '/benevolat', label: 'Bénévolat', icon: '🤝' },
    { href: '/nouveau', label: 'Ajouter', icon: '➕' },
  ];

  return (
    <>
      {/* BARRE LATÉRALE POUR PC / TABLETTES (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-[#1e3e62] p-6 min-h-screen fixed left-0 top-0">
        <div className="text-xl font-black text-white mb-8 flex items-center gap-2">
          <span>🏀</span> <span className="text-orange-500">OTM Manager</span>
        </div>
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e3e62]/30'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="text-xs text-slate-500 pt-4 border-t border-slate-900">
          FFBB OTM Region
        </div>
      </aside>

      {/* BARRE DE NAVIGATION FIXE EN BAS POUR SMARTPHONES (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-[#1e3e62] p-2 flex justify-around items-center z-50 shadow-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-4 rounded-xl text-xs font-bold transition ${
                isActive ? 'text-orange-500' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}