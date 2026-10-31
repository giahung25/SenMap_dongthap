import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { monumentApi } from '../services/api';
import { INITIAL_MONUMENTS } from '../data/monumentsData';
import { useLanguage } from '../context/LanguageContext';

// 6 Cultural Experience Layers
import HeroPortalSection from '../components/home/HeroPortalSection';
import CulturalTrailsSection from '../components/home/CulturalTrailsSection';
import FeaturedMasterpiecesSection from '../components/home/FeaturedMasterpiecesSection';
import MapView from './MapView';
import SeasonsAndCulinarySection from '../components/home/SeasonsAndCulinarySection';

import {
  Compass,
  Map as MapIcon,
  ExternalLink,
  Route,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  const [monuments, setMonuments] = useState(INITIAL_MONUMENTS);
  const [loading, setLoading] = useState(true);
  const [activeTrailId, setActiveTrailId] = useState('trail-oceo');

  // Load monuments from API with fallback
  useEffect(() => {
    let mounted = true;
    monumentApi
      .getAll()
      .then((data) => {
        if (mounted && data && data.length > 0) {
          setMonuments(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('API unavailable, using INITIAL_MONUMENTS fallback', err);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTrailOnMap = (trail) => {
    const trailId = trail?.id || trail;
    setActiveTrailId(trailId);
    // Smooth scroll down to embedded WebGIS map or navigate
    const el = document.getElementById('embedded-webgis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/ban-do?trail=${trailId}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-x-hidden selection:bg-lotus-200 selection:text-lotus-900">
      {/* ============================================================== */}
      {/* TẦNG 1: HERO BANNER & CỔNG KHÁM PHÁ ĐẤT SEN HỒNG              */}
      {/* ============================================================== */}
      <HeroPortalSection
        onExploreTrails={() => scrollToSection('cultural-trails')}
        onOpenFullMap={() => navigate('/ban-do')}
        onSearchSubmit={(query) => {
          if (query && query.trim()) {
            navigate(`/ban-do?q=${encodeURIComponent(query.trim())}`);
          } else {
            navigate('/ban-do');
          }
        }}
      />

      {/* ============================================================== */}
      {/* TẦNG 2: 4 TUYẾN DU LỊCH CHỦ ĐỀ ĐẤT SEN HỒNG (CURATED TRAILS)   */}
      {/* ============================================================== */}
      <div id="cultural-trails">
        <CulturalTrailsSection
          monuments={monuments}
          activeTrailId={activeTrailId}
          onSelectTrail={(id) => setActiveTrailId(id)}
          onOpenTrailOnMap={handleOpenTrailOnMap}
        />
      </div>

      {/* ============================================================== */}
      {/* TẦNG 3: KIỆT TÁC DI SẢN ĐỒNG THÁP (FEATURED MASTERPIECES)      */}
      {/* ============================================================== */}
      <div id="featured-masterpieces">
        <FeaturedMasterpiecesSection
          monuments={monuments}
          onLocateMonument={(m) => {
            navigate(`/ban-do?monument=${m.id}`);
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* TẦNG 4: BẢN ĐỒ SỐ WEBGIS TƯƠNG TÁC TRỰC TIẾP TRÊN TRANG CHỦ    */}
      {/* ============================================================== */}
      <section
        id="embedded-webgis"
        className="relative w-full bg-slate-900 py-12 sm:py-16 px-3 sm:px-6 lg:px-8 border-y border-white/10 select-none"
      >
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Section Header with Fullscreen Trigger */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lotus-600/20 text-lotus-300 text-xs font-extrabold uppercase tracking-widest border border-lotus-500/30">
                <Compass className="w-3.5 h-3.5 text-lotus-400" />
                <span>{t('homeWebgisSectionBadge')}</span>
              </div>

              <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
                {t('homeWebgisSectionTitle')}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal leading-relaxed">
                {t('homeWebgisSectionDesc')}
              </p>
            </div>

            {/* Quick Action Button: Open Fullscreen Map */}
            <button
              type="button"
              onClick={() => {
                const queryParam = activeTrailId ? `?trail=${activeTrailId}` : '';
                navigate(`/ban-do${queryParam}`);
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-lotus-600 to-rose-600 hover:from-lotus-500 hover:to-rose-500 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-lotus-600/25 transition-all shrink-0"
              title={t('btnOpenFullMap')}
            >
              <MapIcon className="w-4 h-4 text-amber-300" />
              <span>{t('btnOpenFullMap')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Embedded WebGIS Container */}
          <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-950">
            <MapView
              isEmbedded={true}
              externalTrailId={activeTrailId}
              onOpenFullMap={() => {
                navigate(`/ban-do${activeTrailId ? `?trail=${activeTrailId}` : ''}`);
              }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* TẦNG 5 & 6: LỊCH 4 MÙA, ẨM THỰC 12 ĐẶC SẢN & CHÂN TRANG        */}
      {/* ============================================================== */}
      <div id="seasons-culinary">
        <SeasonsAndCulinarySection
          monuments={monuments}
          onSelectMonument={(m) => {
            navigate(`/di-tich/${m.id}`);
          }}
        />
      </div>
    </div>
  );
}
