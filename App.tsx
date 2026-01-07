import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginScreen from './components/LoginScreen'; // New Import
import KPICard from './components/KPICard';
import WaterChart from './components/WaterChart';
import MapWidget from './components/MapWidget';
import AlertsPanel from './components/AlertsPanel';
import ReportsView from './components/ReportsView';
import AlertsView from './components/AlertsView';
import JassView from './components/JassView';
import SettingsView from './components/SettingsView'; // New Import
import { Droplet, Activity, Waves, Thermometer, Database, Wrench } from 'lucide-react';
import { KPIProps } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard'); // Reset view on logout
  };

  // Auth Guard
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Datos base de KPIs
  const allKpis: KPIProps[] = [
    { title: 'Nivel de Cloro', value: '1.2', unit: 'mg/L', status: 'optimal', icon: Droplet },
    { title: 'pH del Agua', value: '7.4', unit: 'pH', status: 'optimal', icon: Activity },
    { title: 'Turbidez', value: '4.5', unit: 'NTU', status: 'warning', icon: Waves },
    { title: 'Temperatura', value: '24', unit: '°C', status: 'neutral', icon: Thermometer },
  ];

  const filteredKpis = allKpis.filter(kpi => 
    kpi.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="max-w-6xl mx-auto space-y-6"> {/* Centralized Layout */}
            {/* Header de la sección */}
            <div className="flex justify-between items-end mb-2">
              <div>
                 <h2 className="text-2xl font-bold text-slate-800">Resumen General</h2>
                 <p className="text-slate-500 text-sm">Monitoreo en tiempo real de la estación principal.</p>
              </div>
              <div className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                SERVER_TIME: {new Date().toLocaleTimeString()}
              </div>
            </div>

            {/* 1. KPI Row */}
            {filteredKpis.length > 0 ? (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {filteredKpis.map((kpi, index) => (
                  <KPICard key={index} {...kpi} />
                ))}
              </section>
            ) : (
              <div className="p-8 text-center text-slate-500 bg-slate-100 rounded-xl border border-slate-200 border-dashed">
                No se encontraron métricas con "{searchQuery}"
              </div>
            )}

            {/* 2. Middle Section: Charts & Map */}
            <section className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[420px]">
              <div className="w-full lg:w-3/5 h-[350px] lg:h-full">
                <WaterChart />
              </div>
              <div className="w-full lg:w-2/5 h-[300px] lg:h-full">
                <MapWidget />
              </div>
            </section>

            {/* 3. Bottom Panel: Alerts */}
            <section>
              <AlertsPanel />
            </section>
          </div>
        );
      
      case 'map':
        return (
          <div className="h-[calc(100vh-140px)] w-full flex flex-col max-w-7xl mx-auto">
             <div className="mb-4">
                 <h2 className="text-2xl font-bold text-slate-800">Mapa de Geolocalización</h2>
                 <p className="text-slate-500 text-sm">Vista satelital de nodos activos.</p>
             </div>
             <div className="flex-1 border-4 border-white rounded-2xl overflow-hidden shadow-xl">
                <MapWidget />
             </div>
          </div>
        );

      case 'reports':
        return (
            <div className="max-w-6xl mx-auto">
                <ReportsView />
            </div>
        );
      
      case 'alerts':
        return <AlertsView />;

      case 'jass':
        return (
            <div className="max-w-7xl mx-auto">
                <JassView />
            </div>
        );

      case 'settings':
        return <SettingsView />;

      default:
        return <div>Vista no encontrada</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f8fafc]">
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
        />

        {/* Scrollable Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          {renderContent()}
          
          <footer className="mt-12 text-center text-slate-400 text-xs pb-4">
            &copy; 2024 TROVIX Systems v2.5.0 - Powered by Sentinel KRX
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;