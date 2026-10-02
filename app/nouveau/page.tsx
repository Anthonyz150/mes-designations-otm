'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';

export default function NouveauPage() {
  const router = useRouter();
  const [isVolunteering, setIsVolunteering] = useState(false);
  const [form, setForm] = useState({
    date: '',
    time: '',
    competition: '',
    homeTeam: '',
    awayTeam: '',
    venue: '',
    address: '',
    role: 'Opérateur e-Marque',
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDesignation = {
      date: form.date,
      time: form.time,
      competition: isVolunteering ? 'Bénévolat Club' : form.competition,
      home_team: form.homeTeam,
      away_team: form.awayTeam,
      venue: form.venue,
      address: form.address,
      role: form.role,
      status: 'À venir',
      is_volunteering: isVolunteering,
      pdf_name: !isVolunteering && pdfFile ? pdfFile.name : null,
    };

    const { error } = await supabase
      .from('designations')
      .insert([newDesignation]);

    if (error) {
      console.error("Erreur lors de l'enregistrement dans Supabase :", error);
      alert("Une erreur est survenue lors de l'enregistrement.");
    } else {
      router.push(isVolunteering ? '/benevolat' : '/designations');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#1e3e62]/30 border border-[#1e3e62] rounded-2xl p-4 sm:p-8 shadow-2xl mb-20 md:mb-6">
      <h1 className="text-xl sm:text-2xl font-black text-white mb-1">Ajouter un match / intervention</h1>
      <p className="text-xs sm:text-sm text-slate-400 mb-6">Enregistre une désignation officielle ou une mission de bénévolat.</p>

      {/* Sélecteur de type */}
      <div className="grid grid-cols-2 gap-2 mb-6 bg-slate-950 p-1.5 rounded-xl border border-[#1e3e62]">
        <button
          type="button"
          onClick={() => setIsVolunteering(false)}
          className={`py-2.5 rounded-lg text-xs font-bold transition ${
            !isVolunteering ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          🏀 Désignation
        </button>
        <button
          type="button"
          onClick={() => setIsVolunteering(true)}
          className={`py-2.5 rounded-lg text-xs font-bold transition ${
            isVolunteering ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          🤝 Bénévolat
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
            <input
              type="date"
              required
              className="w-full bg-slate-950 border border-[#1e3e62] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Heure</label>
            <input
              type="time"
              required
              className="w-full bg-slate-950 border border-[#1e3e62] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
          </div>
        </div>

        {!isVolunteering && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Compétition / Championnat</label>
            <input
              type="text"
              required
              placeholder="ex: Région Masculin U18, NM3..."
              className="w-full bg-slate-950 border border-[#1e3e62] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
              value={form.competition}
              onChange={(e) => setForm({ ...form, competition: e.target.value })}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Équipe Domicile</label>
            <input
              type="text"
              required
              placeholder="Club A"
              className="w-full bg-slate-950 border border-[#1e3e62] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
              value={form.homeTeam}
              onChange={(e) => setForm({ ...form, homeTeam: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Équipe Extérieur</label>
            <input
              type="text"
              required
              placeholder="Club B"
              className="w-full bg-slate-950 border border-[#1e3e62] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
              value={form.awayTeam}
              onChange={(e) => setForm({ ...form, awayTeam: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Nom de la salle</label>
          <input
            type="text"
            required
            placeholder="ex: Gymnase Pierre de Coubertin"
            className="w-full bg-slate-950 border border-[#1e3e62] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Adresse complète (pour la carte)</label>
          <input
            type="text"
            required
            placeholder="ex: 12 Avenue des Sports, 06800 Cagnes-sur-Mer"
            className="w-full bg-slate-950 border border-[#1e3e62] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Rôle OTM</label>
          <select
            className="w-full bg-slate-950 border border-[#1e3e62] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="Opérateur e-Marque">Opérateur e-Marque</option>
            <option value="Chronométreur">Chronométreur</option>
            <option value="Opérateur 24 secondes">Opérateur 24 secondes</option>
            <option value="Responsable de salle">Responsable de salle</option>
          </select>
        </div>

        {!isVolunteering && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Fichier PDF de désignation</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-slate-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-500 cursor-pointer bg-slate-950 border border-[#1e3e62] rounded-xl p-2"
            />
          </div>
        )}

        <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto px-4 py-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white text-center"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl text-xs font-bold transition shadow-lg"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}