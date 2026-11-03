import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Compass, Map, QrCode, Shield, Languages, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const { lang, toggleLang, isAutoDetected, t } = useLanguage();

  return (
    <header className="h-16 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DEC8] sticky top-0 z-[1100] shadow-xs select-none">
      <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9E1B32] via-lotus-600 to-rose-400 text-white flex items-center justify-center shadow-md shadow-[#9E1B32]/20 group-hover:scale-105 transition-transform duration-200">
            <span className="material-symbols-outlined text-[22px]">local_florist</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[16px] sm:text-[18px] tracking-tight text-[#1E1B18] group-hover:text-[#9E1B32] transition-colors">
                {t('brandName')}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F4ECE7] text-[#9E1B32] border border-[#E6DEC8] uppercase tracking-wider hidden sm:inline-block">
                {t('brandBadge')}
              </span>
            </div>
            <span className="text-[11px] text-[#4A453E] font-medium -mt-0.5 truncate max-w-[210px] sm:max-w-none">
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
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#9E1B32] text-white shadow-sm'
                    : 'text-[#1E1B18] hover:text-[#9E1B32] hover:bg-[#F4ECE7]'
                }`
              }
            >
              <Compass className="w-4 h-4" />
              <span className="hidden md:inline">{t('navHome')}</span>
            </NavLink>

            <NavLink
              to="/ban-do"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#9E1B32] text-white shadow-sm'
                    : 'text-[#1E1B18] hover:text-[#9E1B32] hover:bg-[#F4ECE7]'
                }`
              }
            >
              <Map className="w-4 h-4" />
              <span className="hidden md:inline">{t('navMap')}</span>
            </NavLink>

            <NavLink
              to="/quet-qr"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#9E1B32] text-white shadow-sm'
                    : 'text-[#1E1B18] hover:text-[#9E1B32] hover:bg-[#F4ECE7]'
                }`
              }
            >
              <QrCode className="w-4 h-4 text-[#1E5631]" />
              <span className="hidden md:inline">{t('navQr')}</span>
            </NavLink>

            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#1E1B18] text-white shadow-sm'
                    : 'text-[#1E1B18] hover:text-[#9E1B32] hover:bg-[#F4ECE7]'
                }`
              }
            >
              <Shield className="w-4 h-4 text-[#D5C390]" />
              <span className="hidden md:inline">{t('navAdmin')}</span>
            </NavLink>
          </nav>

          {/* Bilingual Switcher: [🇻🇳 VI | 🇬🇧 EN] with Auto-Detect Badge */}
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#E6DEC8] bg-white hover:bg-[#FAF7F2] text-xs font-bold transition-all shadow-xs group"
            title={t('langToggleTooltip')}
            aria-label={t('langToggleTooltip')}
          >
            <Languages className="w-3.5 h-3.5 text-[#4A453E] group-hover:text-[#9E1B32] transition-colors" />
            <span className={lang === 'vi' ? 'text-[#9E1B32] font-extrabold' : 'text-[#4A453E]/60 font-medium'}>
              VI
            </span>
            <span className="text-[#E6DEC8]">/</span>
            <span className={lang === 'en' ? 'text-[#9E1B32] font-extrabold' : 'text-[#4A453E]/60 font-medium'}>
              EN
            </span>
            {isAutoDetected && (
              <span
                className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#F4ECE7] text-[#1E5631] border border-[#E6DEC8] tracking-tight ml-0.5"
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
