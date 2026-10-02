'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/supabase';
import Link from 'next/link';

interface Designation {
  id: number;
  date: string;
  time: string;
  competition: string;
  home_team: string;
  away_team: string;
  venue: string;
  address: string;
  role: string;
  status?: string;
  pdf_name?: string | null;
}

export default function DesignationsPage() {
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDesignations() {
      const { data, error } = await supabase
        .from('designations')
        .select('*')
        .eq('is_volunteering', false)
        .order('date', { ascending: true });

      if (error) {
        console.error('Erreur lors du chargement :', error);
      } else {
        setDesignations(data || []);
      }
      setLoading(false);
    }

    fetchDesignations();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Voulez-vous vraiment supprimer cette désignation ?')) {
      const { error } = await supabase.from('designations').delete().eq('id', id);
      if (!error) {
        setDesignations(designations.filter((item) => item.id !== id));
      }
    }
  };

  if (loading) {
    return <div className="text-center text-slate-400 py-10 md:ml-64">Chargement de tes désignations...</div>;
  }

  return (
    /* Le `md:ml-64` décale le contenu pour ne pas qu'il passe sous la barre latérale PC */
    <div className="max-w-6xl mx-auto p-4 sm:p-8 md:ml-64 mb-20 md:mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Mes Désignations Officielles</h1>
          <p className="text-xs sm:text-sm text-slate-400">Retrouve l'historique et le suivi de tes matchs officiels.</p>
        </div>
        <Link
          href="/nouveau"
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-lg whitespace-nowrap"
        >
          + Ajouter
        </Link>
      </div>

      {designations.length === 0 ? (
        <div className="bg-[#1e3e62]/30 border border-[#1e3e62] rounded-2xl p-8 text-center text-slate-400">
          Aucune désignation officielle enregistrée pour le moment.
        </div>
      ) : (
        <div className="space-y-4">
          {/* VERSION MOBILE : Cartes empilées (visible uniquement sur petit écran) */}
          <div className="block sm:hidden space-y-3">
            {designations.map((item: Designation) => (
              <div key={item.id} className="bg-[#1e3e62]/30 border border-[#1e3e62] rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-orange-400">{item.competition}</span>
                  <span className="text-xs font-semibold text-slate-300 bg-slate-950 px-2 py-1 rounded-lg">
                    {item.date} • {item.time}
                  </span>
                </div>
                <div className="text-sm font-black text-white">
                  {item.home_team} vs {item.away_team}
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-1">
                  <span>📍</span> {item.venue}
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-xs bg-slate-950 px-2.5 py-1 rounded-lg text-slate-300 font-medium">
                    {item.role}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300 text-xs font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* VERSION PC / TABLETTE : Ton tableau d'origine inchangé */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-[#1e3e62] bg-[#1e3e62]/20">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs uppercase text-slate-400 border-b border-[#1e3e62]">
                <tr>
                  <th className="px-4 py-3">Date / Heure</th>
                  <th className="px-4 py-3">Compétition</th>
                  <th className="px-4 py-3">Match</th>
                  <th className="px-4 py-3">Salle</th>
                  <th className="px-4 py-3">Rôle</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e3e62]/40">
                {designations.map((item: Designation) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {item.date} <br />
                      <span className="text-xs text-slate-500">{item.time}</span>
                    </td>
                    <td className="px-4 py-3 font-bold text-orange-400">{item.competition}</td>
                    <td className="px-4 py-3 text-white font-medium">
                      {item.home_team} vs {item.away_team}
                    </td>
                    <td className="px-4 py-3 text-slate-400">{item.venue}</td>
                    <td className="px-4 py-3">
                      <span className="bg-slate-950 px-2.5 py-1 rounded-lg text-xs">{item.role}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-400 hover:text-red-300 text-xs font-medium px-2.5 py-1.5 bg-red-950/30 rounded-lg border border-red-900/50 hover:bg-red-900/40 transition"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}