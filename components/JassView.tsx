import React from 'react';
import { Users, MapPin, Signal, Battery, Wrench, MoreVertical, Search, Plus } from 'lucide-react';

interface JassEntity {
  id: number;
  name: string;
  location: string;
  population: number;
  status: 'online' | 'offline' | 'maintenance';
  battery: number;
  lastUpdate: string;
  chlorineLevel: number;
}

const JassView: React.FC = () => {
  const jassList: JassEntity[] = [
    { id: 1, name: 'JASS Molinos - Sector 1', location: 'La Tinguiña, Ica', population: 450, status: 'online', battery: 85, lastUpdate: '2 min', chlorineLevel: 1.2 },
    { id: 2, name: 'JASS Centro Poblado', location: 'San José de los Molinos', population: 1200, status: 'online', battery: 92, lastUpdate: '1 min', chlorineLevel: 1.1 },
    { id: 3, name: 'JASS Norte Alto', location: 'Parcona, Zona Alta', population: 320, status: 'maintenance', battery: 0, lastUpdate: '2 días', chlorineLevel: 0 },
    { id: 4, name: 'JASS Los Aquijes', location: 'Valle Sur', population: 850, status: 'offline', battery: 12, lastUpdate: '4 horas', chlorineLevel: 0.8 },
    { id: 5, name: 'JASS Santa Rosa', location: 'Sector La Máquina', population: 560, status: 'online', battery: 67, lastUpdate: '5 min', chlorineLevel: 1.3 },
    { id: 6, name: 'JASS El Rosario', location: 'Entrada Principal', population: 210, status: 'online', battery: 78, lastUpdate: '10 min', chlorineLevel: 1.2 },
    { id: 7, name: 'JASS Las Dunas', location: 'Residencial Sol', population: 340, status: 'online', battery: 45, lastUpdate: '12 min', chlorineLevel: 1.0 },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
        case 'online': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>Operativo</span>;
        case 'offline': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Sin Señal</span>;
        case 'maintenance': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200"><Wrench size={12} />Mantenimiento</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Directorio de Organizaciones</h2>
          <p className="text-slate-500 text-sm">Gestión centralizada de las juntas administradoras de agua.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Buscar JASS..." 
                    className="w-full sm:w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center gap-2">
                <Plus size={16} /> Nuevo
            </button>
        </div>
      </div>

      {/* Dynamic Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                        <th className="px-6 py-4 font-semibold">Organización (JASS)</th>
                        <th className="px-6 py-4 font-semibold">Ubicación</th>
                        <th className="px-6 py-4 font-semibold">Estado</th>
                        <th className="px-6 py-4 font-semibold text-center">Beneficiarios</th>
                        <th className="px-6 py-4 font-semibold">Sensores</th>
                        <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {jassList.map((jass) => (
                        <tr key={jass.id} className="hover:bg-blue-50/50 transition-colors group cursor-pointer">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {jass.name.substring(5, 7)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{jass.name}</p>
                                        <p className="text-xs text-slate-400">ID: J-{202400 + jass.id}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                                    <MapPin size={14} className="text-slate-400" />
                                    {jass.location}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {getStatusBadge(jass.status)}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-100">
                                    <Users size={14} className="text-slate-400" />
                                    <span className="font-semibold text-slate-700">{jass.population}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs">
                                        <Battery size={12} className={jass.battery < 20 ? "text-red-500" : "text-green-500"} />
                                        <span className="text-slate-600">{jass.battery}% Bat.</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <Signal size={12} className="text-blue-500" />
                                        <span className="text-slate-600">{jass.lastUpdate}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs text-slate-500">
            <span>Mostrando {jassList.length} registros</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white disabled:opacity-50" disabled>Anterior</button>
                <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white">Siguiente</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default JassView;