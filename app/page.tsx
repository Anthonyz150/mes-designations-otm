'use client';

import { useState, useEffect } from 'react';
import { Designation } from '@/lib/types';
import MatchCard from '@/components/MatchCard';
import StatsWidget from '@/components/StatsWidget';
import Link from 'next/link';
import { supabase } from '@/supabase';

export default function Home() {
  const [designations, setDesignations] = useState<Designation[]>([]);

  useEffect(() => {
    async function fetchDesignations() {
      const { data, error } = await supabase.from('designations').select('*');
      if (error) {
        console.error('Erreur de chargement', error);
      } else if (data) {
        setDesignations(data);
      }
    }
    fetchDesignations();
  }, []);

  const handleValidate = async (id: string, matchSheetName: string) => {
    const { error } = await supabase
      .from('designations')
      .update({ status: 'Effectuée', matchSheetName })
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la validation :', error);
    } else {
      const updated = designations.map((d) => {
        if (d.id === id) {
          return { ...d, status: 'Effectuée' as const, matchSheetName };
        }
        return d;
      });
      setDesignations(updated);
    }
  };

  const sortedDesignations = [...designations].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const prochainsMatchs = sortedDesignations.filter(d => d.status === 'À venir').slice(0, 3);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
          <span>Tableau de bord OTM</span>
          <span className="text-xs bg-orange-600 text-white px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">Région</span>
        </h1>
        <p className="text-slate-400 mt-1">Suivi de tes affectations fédérales, feuilles de match e-Marque et activités club.</p>
      </div>

      <StatsWidget designations={designations} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Prochaines désignations à venir</h2>
        <Link href="/designations" className="text-sm font-semibold text-orange-400 hover:underline">
          Voir tout &rarr;
        </Link>
      </div>

      {prochainsMatchs.length === 0 ? (
        <div className="bg-[#1e3e62]/20 border border-[#1e3e62] rounded-2xl p-12 text-center">
          <p className="text-slate-400 mb-4">Aucune désignation à venir pour le moment.</p>
          <Link href="/nouveau" className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-lg">
            Ajouter une désignation
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prochainsMatchs.map((d) => (
            <MatchCard key={d.id} designation={d} onValidate={handleValidate} />
          ))}
        </div>
      )}
    </div>
  );
}