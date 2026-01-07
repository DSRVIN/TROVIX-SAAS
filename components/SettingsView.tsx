import React from 'react';
import { Settings, Bell, Shield, Database, Smartphone, Save } from 'lucide-react';

const SettingsView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Configuración del Sistema</h2>
            <p className="text-slate-500 text-sm">Administre preferencias, usuarios y parámetros de sensores.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2">
            <Save size={16} /> Guardar Cambios
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Settings */}
        <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-white border border-slate-200 shadow-sm font-medium text-blue-600 flex items-center gap-3">
                <Settings size={18} /> General
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white hover:shadow-sm text-slate-600 transition-all flex items-center gap-3">
                <Bell size={18} /> Notificaciones
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white hover:shadow-sm text-slate-600 transition-all flex items-center gap-3">
                <Database size={18} /> Calibración Sensores
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white hover:shadow-sm text-slate-600 transition-all flex items-center gap-3">
                <Shield size={18} /> Seguridad y Accesos
            </button>
        </div>

        {/* Main Panel */}
        <div className="lg:col-span-2 space-y-6">
            {/* Section 1 */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Preferencias Generales</h3>
                <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de la Organización</label>
                            <input type="text" defaultValue="JASS Tinguiña - Central" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Zona Horaria</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>GMT-05:00 (Lima, Bogotá)</option>
                                <option>GMT-04:00 (La Paz)</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Frecuencia de Actualización de Datos</label>
                        <div className="flex items-center gap-4">
                            <input type="range" min="1" max="60" defaultValue="5" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                            <span className="text-sm font-bold text-blue-600 min-w-[60px]">5 min</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Umbrales de Alerta (Previsualización)</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Settings size={18} /></div>
                            <div>
                                <p className="text-sm font-medium text-slate-800">Alerta de pH Alto</p>
                                <p className="text-xs text-slate-500">Notificar si pH &gt; 8.5</p>
                            </div>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" checked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-blue-600 right-0"/>
                            <label className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-600 cursor-pointer"></label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><Smartphone size={18} /></div>
                            <div>
                                <p className="text-sm font-medium text-slate-800">Notificaciones Push</p>
                                <p className="text-xs text-slate-500">Enviar alertas a app móvil de técnicos</p>
                            </div>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300"/>
                            <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;