import React, { useState } from 'react';
import { Bell, Menu, Search, UserCircle, Settings, LogOut, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, searchQuery, setSearchQuery, onNavigate, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-400 hover:bg-slate-800 rounded-lg lg:hidden transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex flex-col">
          <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            Panel de Control
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Search Bar - Functional with Dark Theme */}
        <div className="hidden sm:flex items-center bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 w-72 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar métricas, sensores..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-sm text-slate-200 ml-2 w-full placeholder:text-slate-500"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 border-r border-slate-700 pr-4">
            <button 
                onClick={() => onNavigate('alerts')}
                className="relative p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors group"
                title="Alertas"
            >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-slate-900 animate-pulse"></span>
            </button>
            
            <button 
                onClick={() => onNavigate('settings')}
                className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                title="Configuración"
            >
                <Settings size={20} />
            </button>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
            <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 pl-2 focus:outline-none group"
            >
                <div className="hidden md:block text-right">
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">Admin General</p>
                    <p className="text-xs text-slate-400">JASS Tinguiña</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20 border border-white/10">
                    <span className="font-bold text-sm">AG</span>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
                <>
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowProfileMenu(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-2 border-b border-slate-100">
                            <p className="text-sm font-semibold text-slate-800">Cuenta Administrativa</p>
                            <p className="text-xs text-slate-500">admin@trovix.com</p>
                        </div>
                        <button 
                            onClick={() => { setShowProfileMenu(false); onNavigate('settings'); }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"
                        >
                            <Settings size={16} /> Configuración
                        </button>
                        <button 
                            onClick={onLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                            <LogOut size={16} /> Cerrar Sesión
                        </button>
                    </div>
                </>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;