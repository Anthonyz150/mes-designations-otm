'use client';

import { useState, useEffect } from 'react';
import { Designation } from '@/lib/types';
import MatchCard from '@/components/MatchCard';
import Link from 'next/link';

export default function BenevolatPage() {
  const [designations, setDesignations] = useState<Designation[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ffbb_otm_designations');
    if (saved) {
      setDesignations(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cet enregistrement de bénévolat ?')) {
      const updated = designations.filter((d) => d.id !== id);
      setDesignations(updated);
      localStorage.setItem('ffbb_otm_designations', JSON.stringify(updated));
    }
  };

  const benevolatList = designations.filter(d => d.isVolunteering);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Bénévolat Club</h1>
          <p className="text-slate-400 mt-1">Matchs non désignés par la commission où tu interviens bénévolement pour ton club.</p>
        </div>
        <Link href="/nouveau" className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow">
          + Ajouter un bénévolat
        </Link>
      </div>

      {benevolatList.length === 0 ? (
        <div className="bg-[#1e3e62]/20 border border-[#1e3e62] rounded-2xl p-12 text-center">
          <p className="text-slate-400 mb-4">Aucun match de bénévolat enregistré.</p>
          <Link href="/nouveau" className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition">
            Ajouter un match bénévole
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benevolatList.map((d) => (
            <MatchCard key={d.id} designation={d} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}