import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getAllTrails } from '../../data/culturalHeritageData';
import { getLocalizedMonument } from '../../data/monumentsTranslationsEn';
import { INITIAL_MONUMENTS } from '../../data/monumentsData';
import {
  Compass,
  Navigation,
  Clock,
  Car,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Route,
} from 'lucide-react';

export default function CulturalTrailsSection({
  monuments = [],
  activeTrailId,
  onSelectTrail,
  onOpenTrailOnMap,
}) {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  // Get all localized trails
  const trails = useMemo(() => getAllTrails(lang), [lang]);

  // Internal state if activeTrailId is not controlled
  const [internalActiveId, setInternalActiveId] = useState(trails[0]?.id || 'trail-oceo');
  const currentActiveId = activeTrailId || internalActiveId;

  const activeTrail = useMemo(() => {
    return trails.find((t) => t.id === currentActiveId) || trails[0];
  }, [trails, currentActiveId]);

  const handleSelect = (trailId) => {
    if (onSelectTrail) {
      onSelectTrail(trailId);
    } else {
      setInternalActiveId(trailId);
    }
  };

  // Find and localize monuments belonging to active trail in exact sequential order
  const trailMonuments = useMemo(() => {
    if (!activeTrail || !activeTrail.monument_ids) return [];
    const sourceList = monuments && monuments.length > 0 ? monuments : INITIAL_MONUMENTS;

    return activeTrail.monument_ids
      .map((id) => {
        const raw = sourceList.find((m) => m.id === id);
        return raw ? getLocalizedMonument(raw, lang) : null;
      })
      .filter(Boolean);
  }, [activeTrail, monuments, lang]);

  return (
    <section id="cultural-trails" className="relative w-full bg-slate-900 text-white py-16 sm:py-20 lg:py-24 select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-at-c from-slate-800/40 via-slate-900 to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* 1. SECTION HEADER */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lotus-600/20 text-lotus-300 text-xs font-extrabold uppercase tracking-widest border border-lotus-500/30">
            <Route className="w-3.5 h-3.5 text-lotus-400" />
            <span>
              {isEn ? 'Thematic Cultural Trails' : 'Tuyến Du Lịch Chủ Đề Đất Sen Hồng'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {isEn ? (
              <>
                4 Curated Heritage Trails of{' '}
                <span className="bg-gradient-to-r from-lotus-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                  Đồng Tháp
                </span>
              </>
            ) : (
              <>
                4 Tuyến Du Lịch Di Sản Đặc Sắc{' '}
                <span className="bg-gradient-to-r from-lotus-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                  Đất Sen Hồng
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {isEn
              ? 'Thoughtfully curated itineraries connecting ancient Óc Eo ruins, revolutionary strongholds, romantic riverine towns, and wild Ramsar wetlands.'
              : 'Được tuyển chọn công phu xâu chuỗi nghìn năm văn hóa Óc Eo, ký ức chiến khu cách mạng, phố cổ làng nghề và thiên nhiên mùa nước nổi hoang sơ.'}
          </p>
        </div>

        {/* 2. INTERACTIVE 4-TRAIL SELECTOR TABS / CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {trails.map((trail) => {
            const isActive = trail.id === currentActiveId;
            return (
              <button
                key={trail.id}
                type="button"
                onClick={() => handleSelect(trail.id)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between group ${
                  isActive
                    ? 'bg-slate-800/90 border-2 shadow-2xl scale-[1.02] ring-2 ring-offset-2 ring-offset-slate-900'
                    : 'bg-slate-800/40 hover:bg-slate-800/70 border border-white/10 hover:border-white/20 shadow-md'
                }`}
                style={{
                  borderColor: isActive ? trail.theme_color : undefined,
                  boxShadow: isActive ? `0 10px 30px -10px ${trail.theme_color}55` : undefined,
                }}
              >
                {/* Top Badge Icon & Stops Count */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: trail.theme_color }}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {trail.badge_icon}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {trail.monument_ids?.length} {isEn ? 'Stops' : 'Điểm dừng'}
                  </span>
                </div>

                {/* Trail Titles */}
                <div className="space-y-1 mb-3">
                  <h3
                    className="font-extrabold text-sm sm:text-base leading-snug transition-colors line-clamp-2"
                    style={{ color: isActive ? '#FFFFFF' : '#E2E8F0' }}
                  >
                    {trail.displayName}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {trail.displaySubtitle}
                  </p>
                </div>

                {/* Metadata Pills */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{trail.displayDuration}</span>
                  </span>
                  <span
                    className="font-extrabold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
                    style={{ color: trail.theme_color }}
                  >
                    <span>{isEn ? 'Explore' : 'Khám phá'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3. ACTIVE TRAIL DETAILED SHOWCASE */}
        {activeTrail && (
          <div
            className="rounded-3xl border bg-slate-800/80 backdrop-blur-xl shadow-2xl p-5 sm:p-7 md:p-9 space-y-8 animate-in fade-in duration-300"
            style={{ borderColor: `${activeTrail.theme_color}66` }}
          >
            {/* Trail Showcase Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white"
                    style={{ backgroundColor: activeTrail.theme_color }}
                  >
                    {activeTrail.code}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5" />
                    <span>{activeTrail.displayTransport}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                  {activeTrail.displayName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium">
                  {activeTrail.displaySubtitle}
                </p>
              </div>

              {/* Main CTA to trigger routing on Map */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenTrailOnMap) {
                    onOpenTrailOnMap(activeTrail);
                  } else {
                    navigate('/');
                  }
                }}
                className="px-6 py-3.5 rounded-2xl text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2.5 shrink-0 transition-all transform hover:-translate-y-0.5 active:scale-95"
                style={{
                  backgroundColor: activeTrail.theme_color,
                  boxShadow: `0 12px 30px -10px ${activeTrail.theme_color}88`,
                }}
              >
                <Navigation className="w-4 h-4" />
                <span>
                  {isEn
                    ? 'Experience & Navigate This Trail on WebGIS Map'
                    : 'Trải Nghiệm & Dẫn Đường Tuyến Này Trên Bản Đồ Số'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Narrative Storytelling Container */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2">
              <span
                className="text-[11px] font-bold uppercase tracking-wider block"
                style={{ color: activeTrail.theme_color }}
              >
                {isEn ? 'Curated Trail Narrative' : 'Câu Chuyện Hành Trình Tuyến:'}
              </span>
              <p className="italic font-sans text-xs sm:text-sm leading-relaxed text-slate-200 select-text">
                &ldquo;{activeTrail.displayStory}&rdquo;
              </p>
            </div>

            {/* Key Highlights Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isEn ? 'Key Trail Highlights' : 'Điểm Nhấn Trải Nghiệm Tuyến:'}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {activeTrail.displayHighlights?.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: activeTrail.theme_color }}
                    />
                    <span className="leading-snug">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. STEP-BY-STEP ROUTE TIMELINE (SƠ ĐỒ CHUỖI ĐIỂM DỪNG TRỰC QUAN) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeTrail.theme_color }}
                  />
                  <span>
                    {isEn ? 'Step-by-Step Route Timeline' : 'Sơ Đồ Chuỗi Điểm Dừng Trực Quan:'}
                  </span>
                </h4>

                <span className="text-[11px] text-slate-400">
                  {trailMonuments.length} {isEn ? 'Sites in Sequential Order' : 'Di tích theo lộ trình'}
                </span>
              </div>

              {/* Horizontal Scrollable or Connected Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {trailMonuments.map((m, idx) => {
                  return (
                    <div
                      key={m.id}
                      className="rounded-2xl bg-slate-900 border border-white/10 hover:border-white/25 overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between group"
                    >
                      {/* Image Thumbnail with Stop Sequence Badge */}
                      <div className="relative w-full h-36 bg-slate-950 overflow-hidden">
                        <img
                          src={m.thumbnail || `/images/monuments/monument_${m.id}.jpg`}
                          alt={m.displayName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `/images/monuments/monument_${m.id}.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                        {/* Sequential Step Counter */}
                        <div
                          className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-white text-[11px] font-black shadow-md flex items-center gap-1"
                          style={{ backgroundColor: activeTrail.theme_color }}
                        >
                          <span>#{idx + 1}</span>
                          <span className="text-[9px] font-medium opacity-90">
                            {isEn ? 'Stop' : 'Điểm'}
                          </span>
                        </div>

                        {/* Rank Badge */}
                        <div className="absolute bottom-2 left-2.5 right-2.5">
                          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold truncate block max-w-max">
                            {m.displayRanking}
                          </span>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h5 className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-200 transition-colors line-clamp-2 leading-snug">
                            {m.displayName}
                          </h5>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 truncate">
                            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                            <span className="truncate">{m.displayDistrict || m.district}</span>
                          </p>
                        </div>

                        {/* View Detail Link */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => navigate(`/di-tich/${m.id}`)}
                            className="text-[11px] font-bold text-lotus-300 hover:text-white transition-colors flex items-center gap-1"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>{isEn ? 'View Profile' : 'Xem hồ sơ'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (onOpenTrailOnMap) {
                                onOpenTrailOnMap(activeTrail);
                              } else {
                                navigate(`/?focus=${m.id}`);
                              }
                            }}
                            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                            title={isEn ? 'Locate on Map' : 'Định vị trên bản đồ'}
                          >
                            <Compass className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
