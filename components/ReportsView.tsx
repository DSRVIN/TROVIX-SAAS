import React, { useState } from 'react';
import { FileText, Download, Filter, Calendar, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const ReportsView: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const reports = [
    { id: 1, name: 'Reporte Mensual de Cloración - DIGESA', date: '01 Oct 2024', type: 'PDF', status: 'compliant', size: '2.4 MB' },
    { id: 2, name: 'Registro Diario de Turbidez', date: '30 Sep 2024', type: 'XLSX', status: 'compliant', size: '856 KB' },
    { id: 3, name: 'Auditoría de Calidad - Trimestre Q3', date: '15 Sep 2024', type: 'PDF', status: 'non-compliant', size: '5.1 MB' },
    { id: 4, name: 'Bitácora de Mantenimiento Preventivo', date: '10 Sep 2024', type: 'PDF', status: 'compliant', size: '1.2 MB' },
    { id: 5, name: 'Análisis Bacteriológico de Laboratorio', date: '01 Sep 2024', type: 'PDF', status: 'compliant', size: '3.4 MB' },
  ];

  const handleDownload = (id: number) => {
    setDownloadingId(id);
    setTimeout(() => {
        setDownloadingId(null);
        alert("Documento descargado correctamente.");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reportes Regulatorios</h2>
          <p className="text-slate-500 text-sm">Documentación oficial para cumplimiento normativo (DS-031-2010-SA).</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors">
                <Calendar size={16} />
                Octubre 2024
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-lg shadow-blue-500/20 transition-all">
                <Download size={16} />
                Exportar Todo
            </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 py-2 overflow-x-auto">
        <button className="px-3 py-1.5 rounded-full bg-slate-200 text-slate-700 text-xs font-semibold whitespace-nowrap">Todos</button>
        <button className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue-300 text-xs font-medium whitespace-nowrap transition-colors">Auditorías DIGESA</button>
        <button className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue-300 text-xs font-medium whitespace-nowrap transition-colors">Operativos</button>
        <button className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue-300 text-xs font-medium whitespace-nowrap transition-colors">Incidencias</button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Documento</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fecha Generación</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado Normativo</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${report.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">{report.name}</p>
                                    <p className="text-xs text-slate-400">{report.size} • {report.type}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                            {report.date}
                        </td>
                        <td className="px-6 py-4">
                            {report.status === 'compliant' ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    <CheckCircle2 size={12} />
                                    Cumple Norma
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
                                    <XCircle size={12} />
                                    Observado
                                </span>
                            )}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button 
                                onClick={() => handleDownload(report.id)}
                                disabled={downloadingId === report.id}
                                className="text-slate-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg disabled:opacity-50"
                            >
                                {downloadingId === report.id ? <Loader2 size={18} className="animate-spin text-blue-600" /> : <Download size={18} />}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsView;