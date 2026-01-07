import React, { useState } from 'react';
import { AlertTriangle, BatteryWarning, Droplet, Check, Clock, Filter, AlertCircle, X } from 'lucide-react';
import { Alert } from '../types';

const initialAlerts: Alert[] = [
  { id: 1, time: 'Hace 10 min', location: 'JASS Molinos', message: 'Nivel de pH crítico (8.9) detectado en sensor S-01. Posible contaminación por vertido.', severity: 'critical' },
  { id: 2, time: 'Hace 45 min', location: 'Reservorio Norte', message: 'Corte de flujo inesperado en válvula de salida. Presión cayó a 0 PSI.', severity: 'critical' },
  { id: 3, time: 'Hace 1 hora', location: 'Sensor 02 - Tinguiña', message: 'Batería del módulo de transmisión al 15%. Se requiere cambio antes de 24h.', severity: 'warning' },
  { id: 4, time: 'Hace 3 horas', location: 'JASS Centro', message: 'Variación de turbidez post-mantenimiento. Valores inestables.', severity: 'info' },
  { id: 5, time: 'Ayer, 23:00', location: 'Sistema General', message: 'Reinicio automático del servidor de datos. Mantenimiento programado.', severity: 'info' },
];

const AlertsView: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const handleResolve = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlerts(alerts.filter(a => a.id !== id));
    if (selectedAlert?.id === id) setSelectedAlert(null);
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter);

  const getSeverityStyles = (severity: string) => {
    switch(severity) {
        case 'critical': return { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-700', icon: 'text-rose-500' };
        case 'warning': return { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', icon: 'text-amber-500' };
        default: return { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', icon: 'text-blue-500' };
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Centro de Alertas</h2>
          <p className="text-slate-500 text-sm">Gestión de incidencias y notificaciones del sistema.</p>
        </div>
        <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            {['all', 'critical', 'warning', 'info'].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                        filter === f 
                        ? 'bg-slate-800 text-white shadow-md' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                >
                    {f === 'all' ? 'Todas' : f}
                </button>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                <div className="inline-flex p-4 bg-green-50 rounded-full mb-3">
                    <Check className="text-green-500" size={32} />
                </div>
                <h3 className="text-lg font-medium text-slate-800">Todo en orden</h3>
                <p className="text-slate-500">No hay alertas activas en esta categoría.</p>
            </div>
        ) : (
            filteredAlerts.map((alert) => {
                const styles = getSeverityStyles(alert.severity);
                return (
                    <div 
                        key={alert.id} 
                        onClick={() => setSelectedAlert(alert)}
                        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
                    >
                        <div className={`p-3 rounded-xl ${styles.bg} border ${styles.border} self-start`}>
                            {alert.severity === 'critical' ? <AlertCircle className={styles.icon} /> : 
                             alert.severity === 'warning' ? <AlertTriangle className={styles.icon} /> : 
                             <AlertCircle className={styles.icon} />}
                        </div>
                        
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{alert.location}</h4>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${styles.bg} ${styles.border} ${styles.text} capitalize`}>
                                    {alert.severity}
                                </span>
                            </div>
                            <p className="text-slate-600 text-sm mb-3 line-clamp-1">{alert.message}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                    <Clock size={12} /> {alert.time}
                                </span>
                                <span>ID: #{2024000 + alert.id}</span>
                            </div>
                        </div>

                        <div className="flex sm:flex-col justify-end gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0">
                            <button 
                                onClick={(e) => handleResolve(alert.id, e)}
                                className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <Check size={14} /> Resolver
                            </button>
                            <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors">
                                Detalles
                            </button>
                        </div>
                    </div>
                );
            })
        )}
      </div>

      {/* Detail Modal Overlay */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
                <div className={`p-6 border-b ${selectedAlert.severity === 'critical' ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'} flex justify-between items-start`}>
                    <div className="flex gap-4">
                         <div className={`p-3 rounded-xl bg-white border shadow-sm`}>
                            {selectedAlert.severity === 'critical' ? <AlertTriangle className="text-rose-500" /> : <AlertCircle className="text-blue-500" />}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Detalles de Alerta</h3>
                            <p className="text-sm text-slate-500">ID: #{2024000 + selectedAlert.id}</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedAlert(null)} className="text-slate-400 hover:text-slate-600">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ubicación</label>
                        <p className="text-slate-800 font-medium">{selectedAlert.location}</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mensaje del Sistema</label>
                        <p className="text-slate-600 mt-1 p-3 bg-slate-50 rounded-lg border border-slate-100">{selectedAlert.message}</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tiempo de Registro</label>
                        <p className="text-slate-800 font-medium">{selectedAlert.time}</p>
                    </div>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button onClick={() => setSelectedAlert(null)} className="px-4 py-2 text-slate-600 font-medium text-sm hover:bg-slate-100 rounded-lg">Cerrar</button>
                    <button className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20">Generar Ticket de Soporte</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AlertsView;