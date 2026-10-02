'use client';

import { useState, useEffect } from 'react';
import { Designation } from '@/lib/types';
import MatchCard from '@/components/MatchCard';
import { supabase } from '@/supabase';

export default function DesignationsPage() {
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('Tous');

  useEffect(() => {
    async function fetchDesignations() {
      const { data, error } = await supabase.from('designations').select('*');
      if (error) {
        console.error('Erreur lors du chargement :', error);
      } else if (data) {
        setDesignations(data);
      }
    }
    fetchDesignations();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cette désignation ?')) {
      const { error } = await supabase.from('designations').delete().eq('id', id);
      if (error) {
        console.error('Erreur lors de la suppression :', error);
      } else {
        const updated = designations.filter((d) => d.id !== id);
        setDesignations(updated);
      }
    }
  };

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

  const officialList = designations.filter(d => !d.isVolunteering);
  const filtered = officialList.filter((d) => {
    if (filterStatus === 'Tous') return true;
    return d.status === filterStatus;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Mes Désignations Officielles</h1>
          <p className="text-slate-400 mt-1">Historique de tes matchs officiels et validation e-Marque.</p>
        </div>
        <div className="flex gap-2 bg-[#1e3e62]/40 p-1.5 rounded-xl border border-[#1e3e62]">
          {['Tous', 'À venir', 'Effectuée'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterStatus === status ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#1e3e62]/20 border border-[#1e3e62] rounded-2xl p-12 text-center text-slate-400">
          Aucune désignation officielle trouvée.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d) => (
            <MatchCard key={d.id} designation={d} onDelete={handleDelete} onValidate={handleValidate} />
          ))}
        </div>
      )}
    </div>
  );
}