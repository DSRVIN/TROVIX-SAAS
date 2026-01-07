import React from 'react';
import { KPIProps } from '../types';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const KPICard: React.FC<KPIProps> = ({ title, value, unit, status, icon: Icon }) => {
  
  const getStatusColor = (s: string) => {
    switch(s) {
      case 'optimal': return 'text-emerald-500 bg-emerald-50 border-emerald-100 ring-emerald-500/10';
      case 'neutral': return 'text-blue-500 bg-blue-50 border-blue-100 ring-blue-500/10';
      case 'warning': return 'text-amber-500 bg-amber-50 border-amber-100 ring-amber-500/10';
      case 'critical': return 'text-rose-500 bg-rose-50 border-rose-100 ring-rose-500/10';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  const getIconContainerStyle = (s: string) => {
    switch(s) {
        case 'optimal': return 'bg-emerald-100 text-emerald-600';
        case 'neutral': return 'bg-blue-100 text-blue-600';
        case 'warning': return 'bg-amber-100 text-amber-600';
        case 'critical': return 'bg-rose-100 text-rose-600';
        default: return 'bg-slate-100 text-slate-600';
    }
  }

  const getStatusIcon = (s: string) => {
      switch(s) {
          case 'optimal':
          case 'neutral': return <CheckCircle2 size={14} />;
          case 'warning': 
          case 'critical': return <AlertTriangle size={14} />;
          default: return null;
      }
  };

  const getStatusText = (s: string) => {
      switch(s) {
          case 'optimal': return 'Normal';
          case 'neutral': return 'Estable';
          case 'warning': return 'Revisar';
          case 'critical': return 'Crítico';
          default: return '';
      }
  };

  const statusBadgeClasses = getStatusColor(status);
  const iconContainerClasses = getIconContainerStyle(status);

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
      {/* Hover decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-full opacity-50 group-hover:from-blue-50 transition-colors"></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-xl ${iconContainerClasses} shadow-sm`}>
           <Icon size={24} />
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ring-1 ${statusBadgeClasses}`}>
            {getStatusIcon(status)}
            <span>{getStatusText(status)}</span>
        </div>
      </div>
      
      <div className="relative z-10">
        <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wide">{title}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
          <span className="text-sm text-slate-400 font-semibold">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default KPICard;