<div className="space-y-4 mb-20 md:mb-6">
  {/* VUE MOBILE : Cartes empilées verticales (affichée uniquement sur téléphone) */}
  <div className="block sm:hidden space-y-3">
    {designations.map((item) => (
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
          {/* Boutons d'actions rapides */}
        </div>
      </div>
    ))}
  </div>

  {/* VUE TABLETTE / PC : Tableau classique (masqué sur mobile, affiché à partir de 'sm') */}
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
        {designations.map((item) => (
          <tr key={item.id} className="hover:bg-slate-900/40 transition">
            <td className="px-4 py-3 font-medium whitespace-nowrap">{item.date} <br/><span className="text-xs text-slate-500">{item.time}</span></td>
            <td className="px-4 py-3 font-bold text-orange-400">{item.competition}</td>
            <td className="px-4 py-3 text-white font-medium">{item.home_team} vs {item.away_team}</td>
            <td className="px-4 py-3 text-slate-400">{item.venue}</td>
            <td className="px-4 py-3"><span className="bg-slate-950 px-2.5 py-1 rounded-lg text-xs">{item.role}</span></td>
            <td className="px-4 py-3 text-right">...</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>