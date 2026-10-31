import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { HOMEPAGE_STORYTELLING } from '../../data/culturalHeritageData';
import {
  Search,
  MapPin,
  Compass,
  ArrowRight,
  Route,
  Sparkles,
  Quote,
  Flame,
  Award,
  Layers,
  ChevronRight,
} from 'lucide-react';

export default function HeroPortalSection({
  onExploreTrails,
  onOpenFullMap,
  onSearchSubmit,
}) {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const isEn = lang === 'en';

  const storytelling = HOMEPAGE_STORYTELLING;
  const verse = storytelling.folk_verse;

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    } else if (onOpenFullMap) {
      onOpenFullMap(searchQuery);
    }
  };

  const quickPicks = isEn
    ? ['Gò Tháp', 'Nguyễn Sinh Sắc', 'Xẻo Quýt', 'Huỳnh Thủy Lê', 'Tràm Chim']
    : ['Gò Tháp', 'Nguyễn Sinh Sắc', 'Xẻo Quýt', 'Huỳnh Thủy Lê', 'Tràm Chim'];

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white py-12 sm:py-16 md:py-20 lg:py-24 select-none">
      {/* 1. LAYERED CINEMATIC BACKGROUND WITH GRADIENT & MESH GLOWS */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/monuments/monument_1.jpg"
          alt="SenMap Đồng Tháp Hero"
          className="w-full h-full object-cover object-center scale-105 filter blur-xs brightness-[0.28] contrast-125"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/monuments/monument_2.jpg';
          }}
        />
        {/* Multilayer gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950" />
        <div className="absolute inset-0 bg-radial-at-t from-lotus-600/25 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

        {/* Ambient atmospheric orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-lotus-500/10 filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-tram-500/10 filter blur-3xl pointer-events-none" />
      </div>

      {/* 2. MAIN HERO CONTENT CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Top Heritage Badge */}
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-[11px] sm:text-xs font-bold uppercase tracking-wider text-lotus-200 shadow-glass transition-all">
            <span className="material-symbols-outlined text-[16px] text-lotus-400 animate-pulse">
              local_florist
            </span>
            <span>
              {isEn ? 'SenMap Đồng Tháp • UNESCO & Mekong Heritage' : 'SenMap Đồng Tháp • Đất Sen Hồng Địa Linh Nhân Kiệt'}
            </span>
          </div>

          {/* Grand Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] max-w-4xl">
            {isEn ? (
              <>
                Discover the Sacred Heritage of{' '}
                <span className="bg-gradient-to-r from-lotus-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                  Đồng Tháp
                </span>
              </>
            ) : (
              <>
                Bản Đồ Số Di Sản & Du Lịch{' '}
                <span className="bg-gradient-to-r from-lotus-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                  Đất Sen Hồng Đồng Tháp
                </span>
              </>
            )}
          </h1>

          {/* Narrative Tagline & Story Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal">
            {isEn ? storytelling.intro_story_en : storytelling.intro_story_vi}
          </p>
        </div>

        {/* 3. ICONIC FOLK VERSE CALLOUT (THƠ CA DAO NGHỆ THUẬT) */}
        <div className="relative max-w-2xl mx-auto">
          <div className="glass-panel-dark rounded-3xl p-5 sm:p-7 border border-white/20 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            {/* Watermark Quote Icon */}
            <div className="absolute -top-3 -right-3 text-white/5 pointer-events-none">
              <Quote className="w-28 h-28" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-lotus-500/20 text-lotus-300 text-[10px] font-extrabold uppercase tracking-widest border border-lotus-400/30">
                {isEn ? 'Immortal Mekong Folk Verse' : 'Khúc Ca Dao Bất Hủ'}
              </span>

              {/* Verse lines */}
              <blockquote className="font-sans italic text-base sm:text-xl md:text-2xl text-amber-200/95 font-bold tracking-normal leading-relaxed select-text">
                {isEn ? (
                  <>
                    &ldquo;{verse.translation_en}&rdquo;
                  </>
                ) : (
                  <>
                    &ldquo;Tháp Mười đẹp nhất bông sen<br />
                    Việt Nam đẹp nhất có tên Bác Hồ&rdquo;
                  </>
                )}
              </blockquote>

              {/* Author & Meaning */}
              <div className="pt-1 flex flex-col items-center text-xs space-y-1">
                <span className="text-slate-400 font-medium">
                  {isEn ? `— Poet ${verse.author}` : `— Nhà thơ ${verse.author}`}
                </span>
                <p className="text-[11px] sm:text-xs text-slate-300/80 max-w-lg italic font-sans leading-normal">
                  {isEn ? verse.meaning_en : verse.meaning_vi}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. QUICK HERITAGE SEARCH CAPSULE BAR */}
        <div className="max-w-2xl mx-auto space-y-2.5">
          <form
            onSubmit={handleSearch}
            className="relative flex items-center shadow-glass-lg rounded-full overflow-hidden p-1.5 bg-white/10 hover:bg-white/15 focus-within:bg-white/20 border border-white/25 transition-all duration-300 backdrop-blur-xl"
          >
            <div className="pl-3.5 pr-2 text-slate-300 flex items-center justify-center">
              <Search className="w-5 h-5 text-lotus-400" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isEn
                  ? 'Search 20 heritage sites, temples, archaeological relics...'
                  : 'Tìm kiếm 20 di tích, cổ tự, khu khảo cổ, căn cứ lịch sử...'
              }
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-400 text-xs sm:text-sm font-medium pr-3"
            />

            <button
              type="submit"
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-lotus-600 to-rose-600 hover:from-lotus-500 hover:to-rose-500 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>{isEn ? 'Search' : 'Tra cứu'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick search suggestion pills */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap text-[11px] text-slate-400">
            <span className="text-slate-500 font-medium">{isEn ? 'Suggested:' : 'Gợi ý:'}</span>
            {quickPicks.map((pick) => (
              <button
                key={pick}
                type="button"
                onClick={() => {
                  setSearchQuery(pick);
                  if (onSearchSubmit) onSearchSubmit(pick);
                  else if (onOpenFullMap) onOpenFullMap(pick);
                }}
                className="px-2.5 py-0.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors"
              >
                {pick}
              </button>
            ))}
          </div>
        </div>

        {/* 5. PRIMARY CALL-TO-ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          {/* CTA 1: Explore Cultural Trails */}
          <button
            type="button"
            onClick={onExploreTrails}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-lotus-600 via-rose-600 to-lotus-700 hover:from-lotus-500 hover:to-rose-500 active:scale-95 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-lotus-600/30 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
          >
            <Route className="w-5 h-5 text-amber-300" />
            <span>{isEn ? 'Explore 4 Curated Cultural Trails' : 'Khám Phá 4 Tuyến Du Lịch Chủ Đề'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* CTA 2: Open Full WebGIS Map */}
          <button
            type="button"
            onClick={() => {
              if (onOpenFullMap) onOpenFullMap();
            }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/25 hover:border-white/40 font-bold text-sm sm:text-base backdrop-blur-md flex items-center justify-center gap-2.5 shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <Compass className="w-5 h-5 text-emerald-400" />
            <span>{isEn ? 'Open Full WebGIS Map & Routing' : 'Mở Bản Đồ Số WebGIS Toàn Màn Hình'}</span>
          </button>
        </div>

        {/* 6. 4 PRIDE METRIC CARDS (4 Ô CON SỐ TỰ HÀO DI SẢN ĐỒNG THÁP) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-6">
          {storytelling.pride_metrics.map((item) => (
            <div
              key={item.id}
              className="glass-panel-dark rounded-2xl p-4 sm:p-5 border border-white/15 hover:border-white/30 backdrop-blur-md shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="material-symbols-outlined text-[24px] sm:text-[28px] group-hover:scale-110 transition-transform"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </span>
                <span
                  className="font-black text-2xl sm:text-3xl font-mono tracking-tight"
                  style={{ color: item.color }}
                >
                  {item.metric}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-lotus-200 transition-colors leading-snug">
                  {isEn ? item.title_en : item.title_vi}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {isEn ? item.desc_en : item.desc_vi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
