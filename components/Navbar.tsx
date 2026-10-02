import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#0b192c] text-white shadow-lg border-b border-[#1e3e62]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              🏀 FFBB OTM Manager
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto py-2">
            <Link href="/" className="hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
              Tableau de bord
            </Link>
            <Link href="/designations" className="hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
              Désignations
            </Link>
            <Link href="/benevolat" className="hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
              Bénévolat Club
            </Link>
            <Link href="/calendrier" className="hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
              Calendrier
            </Link>
            <Link href="/nouveau" className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md whitespace-nowrap">
              + Ajouter
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}