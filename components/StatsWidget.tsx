import { Designation } from '@/lib/types';

interface StatsWidgetProps {
  designations: Designation[];
}

export default function StatsWidget({ designations }: StatsWidgetProps) {
  const total = designations.length;
  const effectues = designations.filter((d) => d.status === 'Effectuée').length;
  const aVenir = designations.filter((d) => d.status === 'À venir').length;
  const benevolats = designations.filter((d) => d.isVolunteering).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
      <div className="bg-[#1e3e62]/40 border border-[#1e3e62] p-5 rounded-xl shadow-lg">
        <p className="text-sm font-medium text-slate-400">Total Interventions</p>
        <p className="text-3xl font-black text-white mt-1">{total}</p>
      </div>
      <div className="bg-[#1e3e62]/40 border border-[#1e3e62] p-5 rounded-xl shadow-lg">
        <p className="text-sm font-medium text-slate-400">Matchs À Venir</p>
        <p className="text-3xl font-black text-blue-400 mt-1">{aVenir}</p>
      </div>
      <div className="bg-[#1e3e62]/40 border border-[#1e3e62] p-5 rounded-xl shadow-lg">
        <p className="text-sm font-medium text-slate-400">Matchs Effectués</p>
        <p className="text-3xl font-black text-emerald-400 mt-1">{effectues}</p>
      </div>
      <div className="bg-[#1e3e62]/40 border border-[#1e3e62] p-5 rounded-xl shadow-lg">
        <p className="text-sm font-medium text-slate-400">Bénévolats Club</p>
        <p className="text-3xl font-black text-orange-400 mt-1">{benevolats}</p>
      </div>
    </div>
  );
}