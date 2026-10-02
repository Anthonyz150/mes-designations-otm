'use client';

import { useState, useEffect } from 'react';
import { Designation } from '@/lib/types';

export default function CalendrierPage() {
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const saved = localStorage.getItem('ffbb_otm_designations');
    if (saved) {
      setDesignations(JSON.parse(saved));
    }
  }, []);

  const matchingMatches = designations.filter(d => d.date === selectedDate);
  const allDatesWithMatches = Array.from(new Set(designations.map(d => d.date)));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-white">Calendrier des Interventions</h1>
        <p className="text-slate-400 mt-1">Visualise tes désignations et matchs de bénévolat par date.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sélecteur de date / Calendrier */}
        <div className="bg-[#1e3e62]/40 border border-[#1e3e62] rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4">Sélectionner une date</h2>
          <input
            type="date"
            className="w-full bg-slate-950 border border-[#1e3e62] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 mb-6 font-semibold"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Dates avec matchs enregistrés :</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {allDatesWithMatches.length === 0 ? (
              <p className="text-xs text-slate-500">Aucune date enregistrée.</p>
            ) : (
              allDatesWithMatches.map(dateStr => (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex justify-between items-center ${
                    selectedDate === dateStr ? 'bg-orange-600 text-white' : 'bg-slate-900/60 text-slate-300 hover:bg-[#1e3e62]'
                  }`}
                >
                  <span>📅 {dateStr}</span>
                  <span className="bg-black/30 px-2 py-0.5 rounded-full text-[10px]">
                    {designations.filter(d => d.date === dateStr).length} match(s)
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Liste des matchs pour la date sélectionnée */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white mb-2">Matchs prévus le <span className="text-orange-400">{selectedDate}</span></h2>

          {matchingMatches.length === 0 ? (
            <div className="bg-[#1e3e62]/20 border border-[#1e3e62] rounded-2xl p-12 text-center text-slate-400">
              Aucun match ou intervention prévu à cette date.
            </div>
          ) : (
            matchingMatches.map(d => (
              <div key={d.id} className="bg-[#1e3e62]/40 border border-[#1e3e62] rounded-2xl p-5 shadow-xl">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
                    {d.isVolunteering ? '🤝 Bénévolat Club' : d.competition}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${d.status === 'Effectuée' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>
                    {d.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white my-2">{d.homeTeam} vs {d.awayTeam}</h3>
                <div className="text-sm text-slate-300 space-y-1">
                  <p>⏰ Heure : <strong className="text-white">{d.time}</strong></p>
                  <p>📍 Salle : <strong className="text-white">{d.venue}</strong></p>
                  <p>🛡️️ Rôle : <strong className="text-orange-300">{d.role}</strong></p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}