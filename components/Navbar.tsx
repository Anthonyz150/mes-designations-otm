'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/designations', label: 'Désignations' },
    { href: '/benevolat', label: 'Bénévolat' },
    { href: '/nouveau', label: 'Ajouter' },
  ];

  return (
    <header className="bg-slate-950 border-b border-[#1e3e62] px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-black text-white flex items-center gap-2">
        <span>🏀</span> <span className="text-orange-500">OTM Manager</span>
      </div>
      <nav className="flex gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                isActive
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-[#1e3e62]/30'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}