'use client';

import { useState } from 'react';
import { Designation } from '@/lib/types';

interface MatchCardProps {
  designation: Designation;
  onDelete?: (id: string) => void;
  onValidate?: (id: string, matchSheetName: string) => void;
}

export default function MatchCard({ designation, onDelete, onValidate }: MatchCardProps) {
  const [showMapModal, setShowMapModal] = useState(false);
  const [showValidateModal, setShowValidateModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validating, setValidating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const statusColors = {
    'À venir': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Effectuée': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  };

  // Simulation intelligente de lecture du PDF e-Marque avec barre de progression
  const handleStartValidation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setValidating(true);
    setProgress(10);
    setVerificationResult(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          // Vérification automatique du nom / contenu du fichier simulée
          setTimeout(() => {
            const isValidMatch = true; // Simulation de vérification réussie
            if (isValidMatch) {
              setVerificationResult('success');
              setProgress(100);
              setTimeout(() => {
                if (onValidate) onValidate(designation.id, selectedFile.name);
                setValidating(false);
                setShowValidateModal(false);
                setSelectedFile(null);
              }, 1200);
            }
          }, 500);
          return 95;
        }
        return prev + 25;
      });
    }, 400);
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(designation.address || designation.venue)}`;

  return (
    <>
      <div className="bg-[#1e3e62]/40 border border-[#1e3e62] rounded-xl p-5 shadow-xl flex flex-col justify-between hover:border-orange-500/50 transition-all">
        <div>
          <div className="flex justify-between items-start gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
              {designation.isVolunteering ? '🤝 Bénévolat Club' : designation.competition}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${statusColors[designation.status]}`}>
              {designation.status}
            </span>
          </div>

          <div className="my-3">
            <h3 className="text-lg font-extrabold text-white flex flex-wrap items-center gap-2">
              <span>{designation.homeTeam}</span>
              <span className="text-slate-400 text-sm font-normal">vs</span>
              <span>{designation.awayTeam}</span>
            </h3>
            {designation.isVolunteering && (
              <p className="text-xs text-slate-400 mt-1">{designation.competition}</p>
            )}
          </div>

          <div className="space-y-2 text-sm text-slate-300 mt-4 pt-3 border-t border-[#1e3e62]">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span className="font-medium">{designation.date} à {designation.time}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <span>📍</span>
                <span className="truncate">{designation.venue}</span>
              </div>
              <button
                onClick={() => setShowMapModal(true)}
                className="text-xs bg-orange-600/20 text-orange-400 hover:bg-orange-600/30 px-2.5 py-1 rounded border border-orange-500/30 transition whitespace-nowrap font-medium"
              >
                Voir carte
              </button>
            </div>
            <div className="flex items-center gap-2 font-semibold text-orange-300">
              <span>🛡️</span>
              <span>Rôle : {designation.role}</span>
            </div>

            {designation.pdfName && (
              <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                <span>📄</span>
                <span className="truncate">Désignation : {designation.pdfName}</span>
              </div>
            )}
            {designation.matchSheetName && (
              <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                <span>✅</span>
                <span className="truncate">Feuille de match (e-Marque) : {designation.matchSheetName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-[#1e3e62] flex items-center justify-between">
          {designation.status === 'À venir' && onValidate && (
            <button
              onClick={() => setShowValidateModal(true)}
              className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-semibold transition shadow"
            >
              Marquer effectué (PDF e-Marque)
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(designation.id)}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 ml-auto"
            >
              🗑️ Supprimer
            </button>
          )}
        </div>
      </div>

      {/* Modal Carte interactive */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0b192c] border border-[#1e3e62] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#1e3e62]/60 flex justify-between items-center border-b border-[#1e3e62]">
              <h3 className="font-bold text-white">Localisation : {designation.venue}</h3>
              <button onClick={() => setShowMapModal(false)} className="text-slate-400 hover:text-white text-lg font-bold">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-slate-300">Adresse : <strong className="text-white">{designation.address || designation.venue}</strong></p>
              <div className="w-full h-80 rounded-xl overflow-hidden border border-[#1e3e62] bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-4xl mb-2">🗺️</span>
                <p className="text-sm text-slate-300 mb-4">Clique ci-dessous pour ouvrir l'itinéraire vers la salle sur Google Maps.</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-lg"
                >
                  Ouvrir dans Google Maps &rarr;
                </a>
              </div>
            </div>
            <div className="p-4 bg-[#1e3e62]/40 flex justify-end">
              <button onClick={() => setShowMapModal(false)} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Validation e-Marque avec Barre de progression */}
      {showValidateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0b192c] border border-[#1e3e62] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">Valider le match avec l'e-Marque</h3>
            <p className="text-xs text-slate-400 mb-4">Importe le fichier PDF de la feuille de match pour certifier ta présence et valider la prestation.</p>

            {!validating ? (
              <form onSubmit={handleStartValidation} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Fichier PDF e-Marque</label>
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-500 cursor-pointer bg-slate-950 border border-[#1e3e62] rounded-xl p-2"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowValidateModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedFile}
                    className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow"
                  >
                    Lancer la vérification
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 py-4 text-center">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                </div>
                <p className="text-sm font-semibold text-white">Analyse et lecture du PDF e-Marque en cours...</p>
                
                {/* Barre de progression */}
                <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-[#1e3e62]">
                  <div
                    className="bg-gradient-to-r from-orange-600 to-amber-400 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-400">{progress}% - Vérification des équipes, de la date et de la licence...</p>

                {verificationResult === 'success' && (
                  <p className="text-xs text-emerald-400 font-bold mt-2">✓ Match vérifié avec succès ! Mise à jour du statut...</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}