import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { monumentApi } from '../services/api';
import { INITIAL_MONUMENTS } from '../data/monumentsData';
import { useLanguage } from '../context/LanguageContext';
import {
  PASSPORT_TIERS,
  getPassportTier,
  MONUMENT_SEAL_SPECS,
  getMonumentSeal,
} from '../data/culturalHeritageData';

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
  Award,
  QrCode,
  Shield,
  ArrowRight,
  CheckCircle2,
  Stamp,
  Bookmark,
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  const [monuments, setMonuments] = useState(INITIAL_MONUMENTS);
  const [loading, setLoading] = useState(true);
  const [activeTrailId, setActiveTrailId] = useState('trail-oceo');

  // Simulated passport stamps count (reads from localStorage or default 4 stamps)
  const [collectedStamps, setCollectedStamps] = useState(() => {
    try {
      const saved = localStorage.getItem('senmap_passport_stamps');
      return saved ? JSON.parse(saved).length : 4;
    } catch (e) {
      return 4;
    }
  });

  const passportTier = useMemo(
    () => getPassportTier(collectedStamps, lang),
    [collectedStamps, lang]
  );

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
    const el = document.getElementById('embedded-webgis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/ban-do?trail=${trailId}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] text-[#1E1B18] flex flex-col overflow-x-hidden selection:bg-[#F4ECE7] selection:text-[#9E1B32]">
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
      {/* TẦNG 4: HỘ CHIẾU DI SẢN SEN HỒNG (HERITAGE PASSPORT BANNER)    */}
      {/* ============================================================== */}
      <section
        id="heritage-passport"
        className="relative w-full bg-[#FAF7F2] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 select-none"
      >
        <div className="max-w-6xl mx-auto">
          {/* Passport Washi Card with Tatami Gold border and tilted Red Seal */}
          <div className="relative rounded-3xl bg-white border-2 border-[#D5C390]/80 p-6 sm:p-10 shadow-lg overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Background Texture / Subtle Watermark */}
            <div className="absolute -right-8 -bottom-8 text-[#FAF7F2] pointer-events-none opacity-80">
              <span className="material-symbols-outlined text-[180px] text-[#E6DEC8]/30">
                local_florist
              </span>
            </div>

            {/* Left Content: Passport Tier & Progress */}
            <div className="relative z-10 space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4ECE7] text-[#9E1B32] border border-[#E6DEC8] text-xs font-extrabold uppercase tracking-widest shadow-2xs">
                <Award className="w-3.5 h-3.5 text-[#9E1B32]" />
                <span>
                  {isEn ? 'SenMap Digital Heritage Passport' : 'Hộ Chiếu Di Sản Đất Sen Hồng'}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E1B18] tracking-tight leading-[1.3] pb-1">
                {isEn ? (
                  <>
                    <span className="block">Collect 20 Red Ink Heritage Seals</span>
                    <span className="block mt-1 text-[#9E1B32] whitespace-nowrap">across Đồng Tháp</span>
                  </>
                ) : (
                  <>
                    <span className="block">Thu Thập 20 Con Dấu Mộc Đỏ</span>
                    <span className="block mt-1 text-[#9E1B32] whitespace-nowrap">Di Sản Khắp Đồng Tháp</span>
                  </>
                )}
              </h3>

              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed font-sans">
                {isEn
                  ? 'Each verified heritage site features a unique authentic seal. Scan QR codes on-site or explore digital profiles to stamp your passport, unlock prestigious cultural ranks, and become an official Ambassador of the Pink Lotus Land.'
                  : 'Mỗi di tích văn hóa lịch sử mang một con dấu mộc đỏ chu sa độc bản. Hãy quét mã QR tại thực địa để lưu dấu hành trình, thăng hạng danh hiệu văn hóa và trở thành Đại sứ Di sản Đất Sen Hồng.'}
              </p>

              {/* Progress & Tier Status Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-[#F4ECE7] border border-[#E6DEC8]">
                  <span className="material-symbols-outlined text-[18px] text-[#9E1B32]">
                    {passportTier.badge_icon || 'military_tech'}
                  </span>
                  <span className="font-bold text-[#1E1B18]">
                    {passportTier.displayTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-[#4A453E]">
                  <span className="w-2 h-2 rounded-full bg-[#1E5631] animate-pulse" />
                  <span>
                    {isEn
                      ? `${collectedStamps}/20 Seals collected`
                      : `Đã thu thập ${collectedStamps}/20 Con dấu`}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Authentic Red Ink Seal Graphic (-3deg tilt) & CTAs */}
            <div className="relative z-10 flex flex-col items-center sm:items-end justify-center gap-4 shrink-0">
              {/* Tilted Red Seal Stamp Badge */}
              <div
                className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-dashed border-[#9E1B32] p-2 flex items-center justify-center shadow-lg transition-transform hover:rotate-0 duration-300"
                style={{
                  transform: 'rotate(-3deg)',
                  backgroundColor: '#FFFDF9',
                }}
              >
                <div className="w-full h-full rounded-full border-2 border-[#9E1B32] p-2 flex flex-col items-center justify-center text-center text-[#9E1B32]">
                  <span className="text-[8px] font-black uppercase tracking-widest leading-none mb-1">
                    ★ ĐỒNG THÁP ★
                  </span>
                  <span className="material-symbols-outlined text-[26px] my-0.5 text-[#9E1B32]">
                    local_florist
                  </span>
                  <span className="font-serif font-black text-[11px] uppercase tracking-tight leading-tight">
                    HỘ CHIẾU
                    <br />
                    DI SẢN
                  </span>
                  <span className="text-[7px] font-mono font-bold mt-1 tracking-tighter opacity-80">
                    SENMAP HERITAGE SEAL
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => navigate('/quet-qr')}
                  className="btn-lotus-crimson px-5 py-2.5 rounded-full text-xs font-bold shadow-md shadow-[#9E1B32]/20 flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{isEn ? 'Scan On-Site QR' : 'Quét Mã Thực Địa'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/ban-do')}
                  className="btn-washi-outline px-4 py-2.5 rounded-full text-xs font-bold shadow-xs"
                >
                  <Compass className="w-4 h-4 text-[#1E5631]" />
                  <span>{isEn ? 'Explore Map' : 'Bản Đồ'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* TẦNG 5: BẢN ĐỒ SỐ WEBGIS TƯƠNG TÁC TRỰC TIẾP TRÊN TRANG CHỦ    */}
      {/* ============================================================== */}
      <section
        id="embedded-webgis"
        className="relative w-full bg-[#F4ECE7]/80 py-16 sm:py-20 px-3 sm:px-6 lg:px-8 border-y border-[#E6DEC8] select-none"
      >
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Section Header with Fullscreen Trigger */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#9E1B32] text-xs font-extrabold uppercase tracking-widest border border-[#E6DEC8] shadow-2xs">
                <Compass className="w-3.5 h-3.5 text-[#9E1B32]" />
                <span>{t('homeWebgisSectionBadge')}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E1B18] leading-[1.3] pb-1">
                {t('homeWebgisSectionTitle')}
              </h2>

              <p className="text-xs sm:text-sm text-[#4A453E] max-w-2xl font-normal leading-relaxed">
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
              className="btn-lotus-crimson px-5 py-3 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
              title={t('btnOpenFullMap')}
            >
              <MapIcon className="w-4 h-4 text-[#D5C390]" />
              <span>{t('btnOpenFullMap')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Embedded WebGIS Container */}
          <div className="w-full rounded-3xl overflow-hidden shadow-lg border border-[#E6DEC8] bg-white">
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
      {/* TẦNG 6: LỊCH 4 MÙA, ẨM THỰC 12 ĐẶC SẢN & CHÂN TRANG DI SẢN      */}
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
