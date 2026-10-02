'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/designations', label: 'Désignations', icon: '🏀' },
    { href: '/benevolat', label: 'Bénévolat', icon: '🤝' },
    { href: '/nouveau', label: 'Ajouter', icon: '➕' },
  ];

  return (
    <>
      {/* BARRE SUPÉRIEURE MOBILE (Uniquement sur petit écran) */}
      <header className="md:hidden flex items-center justify-between bg-slate-950 border-b border-[#1e3e62] px-4 py-3 sticky top-0 z-50">
        <div className="text-lg font-black text-white flex items-center gap-2">
          <span>🏀</span> <span className="text-orange-500">OTM Manager</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-300 hover:text-white focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* MENU COULISSANT MOBILE (Overlay + Panneau latéral) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Fond noir transparent */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          {/* Panneau du menu */}
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-slate-950 border-r border-[#1e3e62] p-6 flex flex-col z-50 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div className="text-xl font-black text-white flex items-center gap-2">
                <span>🏀</span> <span className="text-orange-500">OTM Manager</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <nav className="space-y-2 flex-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
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
          </div>
        </div>
      )}

      {/* BARRE LATÉRALE CLASSIQUE PC (Fixe à gauche sur les écrans moyens et grands) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-[#1e3e62] p-6 min-h-screen fixed left-0 top-0 z-40">
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
    </>
  );
}