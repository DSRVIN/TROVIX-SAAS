import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const initialData = [
  { time: '10:00', ph: 7.2 },
  { time: '10:05', ph: 7.3 },
  { time: '10:10', ph: 7.1 },
  { time: '10:15', ph: 7.4 },
  { time: '10:20', ph: 7.5 },
  { time: '10:25', ph: 7.3 },
  { time: '10:30', ph: 7.4 },
  { time: '10:35', ph: 7.2 },
];

const WaterChart: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [parameter, setParameter] = useState('ph');

  // Simulación de datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setData((currentData) => {
        const lastTime = currentData[currentData.length - 1].time;
        // Lógica simple para incrementar tiempo
        const [hours, minutes] = lastTime.split(':').map(Number);
        let newMinutes = minutes + 5;
        let newHours = hours;
        if (newMinutes >= 60) {
          newMinutes = 0;
          newHours = (hours + 1) % 24;
        }
        const newTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;

        // Generar valor aleatorio realista
        const lastVal = currentData[currentData.length - 1].ph;
        const change = (Math.random() - 0.5) * 0.3; // Pequeña variación
        let newVal = Number((lastVal + change).toFixed(1));
        
        // Mantener dentro de rangos lógicos
        if (newVal < 6.5) newVal = 6.6;
        if (newVal > 8.5) newVal = 8.4;

        const newPoint = { time: newTime, ph: newVal };
        
        // Mantener ventana de datos (eliminar el primero, agregar uno al final)
        return [...currentData.slice(1), newPoint];
      });
    }, 2000); // Actualiza cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col relative overflow-hidden">
      {/* Background Decorator */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Activity size={18} className="text-blue-600" />
            Monitoreo en Tiempo Real
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Visualización dinámica de {parameter === 'ph' ? 'pH' : parameter}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
           <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold text-green-600 mr-4">LIVE</span>

            <select 
              value={parameter}
              onChange={(e) => setParameter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="ph">Nivel de pH</option>
              <option value="cloro">Cloro Residual</option>
              <option value="turbidez">Turbidez (NTU)</option>
            </select>
        </div>
      </div>

      <div className="flex-1 min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
              domain={[6, 9]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                borderRadius: '8px', 
                border: 'none',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                color: '#fff'
              }}
              itemStyle={{ color: '#38bdf8', fontWeight: 600 }}
              labelStyle={{ color: '#94a3b8', marginBottom: '0.25rem' }}
            />
            <Area 
              type="monotone" 
              dataKey="ph" 
              stroke="#2563eb" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPh)" 
              animationDuration={1500}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WaterChart;