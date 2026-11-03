import React, { useState } from 'react';
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
  ChevronRight,
  Map,
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
    <section
      data-testid="hero-portal-section"
      className="relative w-full overflow-hidden bg-[#FAF7F2] text-[#1E1B18] py-16 sm:py-20 md:py-24 lg:py-28 select-none"
    >
      {/* 1. WARM VIETNAM & KYOTO TRAVEL BACKGROUND WITH SEAMLESS BLEND */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/monuments/monument_1.jpg"
          alt="SenMap Đồng Tháp Hero"
          className="w-full h-full object-cover object-center scale-105 filter blur-[1px] opacity-35"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/monuments/monument_2.jpg';
          }}
        />
        {/* Soft, warm paper gradients blending directly into #FAF7F2 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/80 via-[#FAF7F2]/90 to-[#FAF7F2]" />
        <div className="absolute inset-0 bg-radial-at-t from-amber-100/30 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/95 to-transparent" />
      </div>

      {/* 2. MAIN HERO CONTENT CONTAINER (SPACIOUS DENSITY 2) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Top Heritage Eyebrow Badge */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4ECE7] border border-[#E6DEC8] shadow-xs text-xs font-bold uppercase tracking-widest text-[#9E1B32] transition-all">
            <span className="material-symbols-outlined text-[16px] text-[#9E1B32]">
              local_florist
            </span>
            <span>
              {isEn ? 'SenMap Đồng Tháp • UNESCO & Mekong Heritage' : 'SenMap Đồng Tháp • Đất Sen Hồng Địa Linh Nhân Kiệt'}
            </span>
          </div>

          {/* Grand Headline (Noto Serif Display) */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1E1B18] leading-[1.18] max-w-4xl">
            {isEn ? (
              <>
                Explore the Sacred Heritage of{' '}
                <span className="bg-gradient-to-r from-[#9E1B32] via-rose-600 to-[#B45309] bg-clip-text text-transparent">
                  Đồng Tháp
                </span>
              </>
            ) : (
              <>
                Bản Đồ Số Di Sản & Du Lịch{' '}
                <span className="bg-gradient-to-r from-[#9E1B32] via-rose-600 to-[#B45309] bg-clip-text text-transparent">
                  Đất Sen Hồng Đồng Tháp
                </span>
              </>
            )}
          </h1>

          {/* Narrative Storytelling Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-[#4A453E] max-w-3xl leading-relaxed font-sans font-normal">
            {isEn ? storytelling.intro_story_en : storytelling.intro_story_vi}
          </p>
        </div>

        {/* 3. ICONIC FOLK VERSE CALLOUT (THƠ CA DAO TRÊN GIẤY DÓ WASHI) */}
        <div className="relative max-w-2xl mx-auto">
          <div className="card-heritage-washi rounded-3xl p-6 sm:p-8 border border-[#E6DEC8] shadow-md relative overflow-hidden backdrop-blur-md">
            {/* Watermark Quote Icon */}
            <div className="absolute -top-3 -right-3 text-[#E6DEC8]/40 pointer-events-none">
              <Quote className="w-28 h-28" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <span className="px-3 py-1 rounded-full bg-[#F4ECE7] text-[#9E1B32] text-[10px] font-extrabold uppercase tracking-widest border border-[#E6DEC8]">
                {isEn ? 'Immortal Mekong Folk Verse' : 'Khúc Ca Dao Bất Hủ'}
              </span>

              {/* Verse lines */}
              <blockquote className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#9E1B32] font-semibold tracking-normal leading-relaxed select-text">
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
                <span className="text-[#1E1B18] font-bold">
                  {isEn ? `— Poet ${verse.author}` : `— Nhà thơ ${verse.author}`}
                </span>
                <p className="text-[11px] sm:text-xs text-[#4A453E] max-w-lg italic font-sans leading-normal">
                  {isEn ? verse.meaning_en : verse.meaning_vi}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. FLOATING SEARCH CAPSULE BAR (NỀN TRẮNG NGÀ BẢN SẮC) */}
        <div className="max-w-2xl mx-auto space-y-3">
          <form
            onSubmit={handleSearch}
            className="relative flex items-center shadow-md hover:shadow-lg rounded-full overflow-hidden p-1.5 bg-white/95 border border-[#E6DEC8] focus-within:border-[#D5C390] transition-all duration-300 backdrop-blur-md"
          >
            <div className="pl-4 pr-2 text-[#4A453E] flex items-center justify-center">
              <Search className="w-5 h-5 text-[#9E1B32]" />
            </div>

            <input
              type="text"
              data-testid="hero-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isEn
                  ? 'Search 20 heritage sites, temples, archaeological relics...'
                  : 'Tìm kiếm 20 di tích, cổ tự, khu khảo cổ, căn cứ lịch sử...'
              }
              className="flex-1 bg-transparent border-none outline-none text-[#1E1B18] placeholder-[#4A453E]/60 text-xs sm:text-sm font-medium pr-3"
            />

            <button
              type="submit"
              className="btn-lotus-crimson px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all shrink-0"
            >
              <span>{isEn ? 'Search' : 'Tra cứu'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick search suggestion pills */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap text-[11px] text-[#4A453E]">
            <span className="font-semibold">{isEn ? 'Suggested:' : 'Gợi ý:'}</span>
            {quickPicks.map((pick) => (
              <button
                key={pick}
                type="button"
                onClick={() => {
                  setSearchQuery(pick);
                  if (onSearchSubmit) onSearchSubmit(pick);
                  else if (onOpenFullMap) onOpenFullMap(pick);
                }}
                className="px-3 py-1 rounded-full bg-[#F4ECE7] hover:bg-white text-[#1E1B18] hover:text-[#9E1B32] border border-[#E6DEC8] transition-all shadow-2xs font-medium"
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
            className="btn-lotus-crimson w-full sm:w-auto px-7 py-3.5 rounded-full text-sm sm:text-base font-bold shadow-lg shadow-[#9E1B32]/25"
          >
            <Route className="w-5 h-5 text-[#D5C390]" />
            <span>{isEn ? 'Explore 4 Curated Cultural Trails' : 'Khám Phá 4 Tuyến Du Lịch Chủ Đề'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* CTA 2: Open Full WebGIS Map */}
          <button
            type="button"
            onClick={() => {
              if (onOpenFullMap) onOpenFullMap();
            }}
            className="btn-washi-outline w-full sm:w-auto px-7 py-3.5 rounded-full text-sm sm:text-base font-bold shadow-sm"
          >
            <Compass className="w-5 h-5 text-[#1E5631]" />
            <span>{isEn ? 'Open Full WebGIS Map & Routing' : 'Mở Bản Đồ Số WebGIS Toàn Màn Hình'}</span>
          </button>
        </div>

        {/* 6. 4 PRIDE METRIC CARDS (THẺ CON SỐ TỰ HÀO DI SẢN TRÊN GIẤY DÓ) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-6">
          {storytelling.pride_metrics.map((item) => (
            <div
              key={item.id}
              className="card-heritage-washi rounded-2xl p-4 sm:p-5 border border-[#E6DEC8] hover:border-[#D5C390] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="material-symbols-outlined text-[24px] sm:text-[28px] group-hover:scale-110 transition-transform"
                  style={{ color: item.color === '#E11D48' ? '#9E1B32' : item.color }}
                >
                  {item.icon}
                </span>
                <span
                  className="font-black text-2xl sm:text-3xl font-mono tracking-tight"
                  style={{ color: item.color === '#E11D48' ? '#9E1B32' : item.color }}
                >
                  {item.metric}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-xs sm:text-sm text-[#1E1B18] group-hover:text-[#9E1B32] transition-colors leading-snug">
                  {isEn ? item.title_en : item.title_vi}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#4A453E] leading-relaxed line-clamp-2">
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
