import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Compass, Map, QrCode, Shield, Languages, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const { lang, toggleLang, isAutoDetected, t } = useLanguage();

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-[1100] shadow-xs select-none">
      <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lotus-700 via-lotus-600 to-rose-400 text-white flex items-center justify-center shadow-md shadow-lotus-600/20 group-hover:scale-105 transition-transform duration-200">
            <span className="material-symbols-outlined text-[22px]">local_florist</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[16px] sm:text-[18px] tracking-tight bg-gradient-to-r from-lotus-700 via-lotus-600 to-tram-700 bg-clip-text text-transparent">
                {t('brandName')}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-lotus-100 text-lotus-700 uppercase tracking-wider hidden sm:inline-block">
                {t('brandBadge')}
              </span>
            </div>
            <span className="text-[11px] text-text-muted font-medium -mt-0.5 truncate max-w-[210px] sm:max-w-none">
              {t('brandTagline')}
            </span>
          </div>
        </Link>

        {/* Right Navigation & Bilingual Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5">
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
              <Compass className="w-4 h-4 text-lotus-600" />
              <span className="hidden md:inline">{t('navHome')}</span>
            </NavLink>

            <NavLink
              to="/ban-do"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-lotus-50 text-lotus-700 shadow-xs border border-lotus-200/60'
                    : 'text-slate-600 hover:text-lotus-600 hover:bg-slate-100/60'
                }`
              }
            >
              <Map className="w-4 h-4 text-sky-600" />
              <span className="hidden md:inline">{t('navMap')}</span>
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
              <span className="hidden md:inline">{t('navQr')}</span>
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
              <span className="hidden md:inline">{t('navAdmin')}</span>
            </NavLink>
          </nav>

          {/* Bilingual Switcher: [🇻🇳 VI | 🇬🇧 EN] with Auto-Detect Badge */}
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200/90 bg-slate-50 hover:bg-white text-xs font-bold transition-all shadow-xs group"
            title={t('langToggleTooltip')}
            aria-label={t('langToggleTooltip')}
          >
            <Languages className="w-3.5 h-3.5 text-slate-500 group-hover:text-lotus-600 transition-colors" />
            <span className={lang === 'vi' ? 'text-lotus-700 font-extrabold' : 'text-slate-400 font-medium'}>
              VI
            </span>
            <span className="text-slate-300">/</span>
            <span className={lang === 'en' ? 'text-sky-700 font-extrabold' : 'text-slate-400 font-medium'}>
              EN
            </span>
            {isAutoDetected && (
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 tracking-tight ml-0.5"
                title={t('autoDetectedTooltip')}
              >
                {t('autoDetectedBadge')}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
