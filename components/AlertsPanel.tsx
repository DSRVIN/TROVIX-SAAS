import React from 'react';
import { AlertTriangle, BatteryWarning, Droplet } from 'lucide-react';
import { Alert } from '../types';

const alerts: Alert[] = [
  { id: 1, time: 'Hace 10 min', location: 'JASS Molinos', message: 'pH fuera de rango (8.5)', severity: 'critical' },
  { id: 2, time: 'Hace 1h', location: 'Sensor 02', message: 'Batería Baja (15%)', severity: 'warning' },
  { id: 3, time: 'Hace 3h', location: 'Reservorio Central', message: 'Nivel de turbidez elevado momentáneo', severity: 'info' },
];

const AlertsPanel: React.FC = () => {
  const getIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle size={18} className="text-rose-500" />;
      case 'warning': return <BatteryWarning size={18} className="text-amber-500" />;
      default: return <Droplet size={18} className="text-blue-500" />;
    }
  };

  const getBgColor = (severity: string) => {
      switch(severity) {
          case 'critical': return 'bg-rose-50 border-rose-100';
          case 'warning': return 'bg-amber-50 border-amber-100';
          default: return 'bg-blue-50 border-blue-100';
      }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
          Últimas Alertas - Crítico
        </h3>
        <button className="text-xs font-medium text-water-600 hover:text-water-700 hover:underline">
          Ver todas
        </button>
      </div>

      <div className="divide-y divide-slate-50">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
            <div className={`p-2 rounded-lg border ${getBgColor(alert.severity)} shrink-0`}>
              {getIcon(alert.severity)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-slate-800">{alert.location}</p>
                <span className="text-xs text-slate-400 whitespace-nowrap">{alert.time}</span>
              </div>
              <p className="text-sm text-slate-600 mt-0.5">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;