import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Map, QrCode, Shield, Sparkles, Navigation, Layers } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-xs select-none">
      <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lotus-700 via-lotus-600 to-rose-400 text-white flex items-center justify-center shadow-md shadow-lotus-600/20 group-hover:scale-105 transition-transform duration-200">
            <span className="material-symbols-outlined text-[22px]">local_florist</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[16px] sm:text-[18px] tracking-tight bg-gradient-to-r from-lotus-700 via-lotus-600 to-tram-700 bg-clip-text text-transparent">
                SenMap
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-lotus-100 text-lotus-700 uppercase tracking-wider hidden sm:inline-block">
                Đồng Tháp GIS
              </span>
            </div>
            <span className="text-[11px] text-text-muted font-medium -mt-0.5 truncate max-w-[220px] sm:max-w-none">
              Bản đồ số Di tích & Di sản Văn hóa Đồng Tháp
            </span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-lotus-50 text-lotus-700 shadow-xs border border-lotus-200/60'
                  : 'text-slate-600 hover:text-lotus-600 hover:bg-slate-100/60'
              }`
            }
          >
            <Map className="w-4 h-4 text-lotus-600" />
            <span className="hidden md:inline">Bản đồ số</span>
          </NavLink>

          <NavLink
            to="/quet-qr"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-lotus-50 text-lotus-700 shadow-xs border border-lotus-200/60'
                  : 'text-slate-600 hover:text-lotus-600 hover:bg-slate-100/60'
              }`
            }
          >
            <QrCode className="w-4 h-4 text-tram-600" />
            <span className="hidden md:inline">Quét mã QR</span>
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`
            }
          >
            <Shield className="w-4 h-4 text-amber-500" />
            <span className="hidden md:inline">Quản trị CMS</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
