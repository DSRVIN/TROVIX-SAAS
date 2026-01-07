import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const MapWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full overflow-hidden relative group">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-start pointer-events-none">
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-slate-100 pointer-events-auto">
          <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <Navigation size={14} className="text-water-600" />
            Red de Monitoreo: Ica, Perú
          </h3>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            ● Nodos Activos: 34/34
          </p>
        </div>
      </div>

      {/* Styled Mock Map Background */}
      <div className="w-full h-full bg-slate-100 relative min-h-[300px]">
        {/* Abstract Map Roads/Rivers */}
        <svg className="w-full h-full absolute inset-0 text-slate-300" preserveAspectRatio="none">
           <path d="M0 50 Q 50 40 100 80 T 200 150 T 350 120 T 500 200" fill="none" stroke="#cbd5e1" strokeWidth="6" />
           <path d="M50 300 Q 150 250 250 300 T 400 350" fill="none" stroke="#94a3b8" strokeWidth="4" />
           <path d="M300 0 L 320 100 L 250 200 L 400 400" fill="none" stroke="white" strokeWidth="8" />
        </svg>
        
        {/* River */}
        <svg className="w-full h-full absolute inset-0 text-blue-200 opacity-50" preserveAspectRatio="none">
            <path d="M100 0 C 150 100 50 200 150 300 S 300 400 400 350" fill="none" stroke="#7dd3fc" strokeWidth="12" strokeLinecap="round" />
        </svg>

        {/* Pins */}
        <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-bounce hover:scale-110 transition-transform cursor-pointer group/pin">
          <div className="relative">
             <MapPin className="text-water-600 drop-shadow-lg" size={32} fill="white" />
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                JASS Molinos
             </div>
          </div>
        </div>

        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer group/pin">
          <div className="relative">
             <MapPin className="text-emerald-500 drop-shadow-lg" size={32} fill="white" />
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                JASS Centro
             </div>
          </div>
        </div>

        <div className="absolute top-1/2 right-1/4 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer group/pin">
          <div className="relative">
             <MapPin className="text-water-600 drop-shadow-lg" size={32} fill="white" />
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                JASS Norte
             </div>
          </div>
        </div>
      </div>
      
      {/* Interactive overlay instructions */}
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur rounded-lg px-2 py-1 text-[10px] text-slate-500 border border-slate-100">
        Interactive Map v2.1
      </div>
    </div>
  );
};

export default MapWidget;