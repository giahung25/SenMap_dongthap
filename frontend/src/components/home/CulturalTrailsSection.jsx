import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getAllTrails } from '../../data/culturalHeritageData';
import { getLocalizedMonument } from '../../data/monumentsTranslationsEn';
import { INITIAL_MONUMENTS } from '../../data/monumentsData';
import MapView from '../../pages/MapView';
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
  BookOpen,
  Route,
  ExternalLink,
} from 'lucide-react';

/**
 * =========================================================================================
 * COMPONENT: CulturalTrailsSection (Tầng 2 - 4 Tuyến Hành Trình Di Sản Chủ Đề)
 * =========================================================================================
 * Định hướng thiết kế: Heritage Warm Editorial Style (Vietnam Travel & Kyoto Travel)
 * - Nền sáng ấm Giấy Dó #FAF7F2, nhịp thở thoáng đãng --density 2 (py-20 md:py-28)
 * - Typography kép: H2 font-serif (Noto Serif Display) #1E1B18, kicker in hoa #9E1B32
 * - Bố cục Split-Screen 12 cột: lg:col-span-5 (4 thẻ Washi #FFFFFF) + lg:col-span-7 (Bản đồ WebGIS sticky)
 * =========================================================================================
 */
export default function CulturalTrailsSection({
  monuments = [],
  activeTrailId,
  onSelectTrail,
  onOpenTrailOnMap,
}) {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  // Danh sách 4 tuyến du lịch chủ đề đã bản địa hóa
  const trails = useMemo(() => getAllTrails(lang), [lang]);

  // Quản lý state tuyến đang kích hoạt
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

  // Danh sách các điểm dừng di tích theo thứ tự lộ trình của tuyến đang chọn
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

  const handleOpenFull = () => {
    if (onOpenTrailOnMap) {
      onOpenTrailOnMap(activeTrail);
    } else {
      navigate(`/ban-do?trail=${activeTrail?.id || ''}`);
    }
  };

  return (
    <section
      id="cultural-trails"
      data-testid="cultural-trails-section"
      className="relative w-full bg-[#FAF7F2] py-20 md:py-28 select-none border-t border-[#E6DEC8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* 1. TIÊU ĐỀ PHÂN ĐOẠN (SECTION HEADER) */}
        <div className="text-center space-y-3.5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] text-[#9E1B32] text-xs font-bold uppercase tracking-[0.18em] border border-[#E6DEC8] shadow-xs">
            <Route className="w-3.5 h-3.5 text-[#9E1B32]" />
            <span>
              {isEn ? 'Thematic Cultural Trails' : 'Tuyến Du Lịch Chủ Đề Đất Sen Hồng'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1E1B18] tracking-tight leading-[1.3] pb-1">
            {isEn ? (
              <>
                <span className="block">4 Curated Heritage Trails of</span>
                <span className="block mt-1 sm:mt-1.5 text-[#9E1B32] whitespace-nowrap">Đồng Tháp</span>
              </>
            ) : (
              <>
                <span className="block">4 Tuyến Du Lịch Di Sản Đặc Sắc</span>
                <span className="block mt-1 sm:mt-1.5 text-[#9E1B32] whitespace-nowrap">Đất Sen Hồng</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#4A453E] leading-relaxed font-sans max-w-2xl mx-auto">
            {isEn
              ? 'Thoughtfully curated itineraries connecting ancient Óc Eo ruins, revolutionary strongholds, romantic riverine towns, and wild Ramsar wetlands.'
              : 'Được tuyển chọn công phu xâu chuỗi nghìn năm văn hóa Óc Eo, ký ức chiến khu cách mạng, phố cổ làng nghề và thiên nhiên mùa nước nổi hoang sơ.'}
          </p>
        </div>

        {/* 2. BỐ CỤC SPLIT-SCREEN 12 CỘT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* CỘT TRÁI (lg:col-span-5): DANH SÁCH 4 THẺ TUYẾN WASHI & CHI TIẾT */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E6DEC8]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9E1B32]">
                {isEn ? 'Select a Thematic Trail' : 'Chọn Tuyến Hành Trình'}
              </span>
              <span className="text-xs text-[#4A453E] font-medium">
                {trails.length} {isEn ? 'Routes Available' : 'Tuyến Khám Phá'}
              </span>
            </div>

            {/* 4 Thẻ Tuyến Giấy Dó (Washi Cards) */}
            <div className="space-y-3.5">
              {trails.map((trail) => {
                const isActive = trail.id === currentActiveId;
                return (
                  <button
                    key={trail.id}
                    type="button"
                    data-testid={`trail-card-${trail.id}`}
                    onClick={() => handleSelect(trail.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group border ${
                      isActive
                        ? 'bg-[#FFFFFF] border-[#D5C390] shadow-md ring-2 ring-[#D5C390]/60'
                        : 'bg-[#FFFFFF] hover:bg-[#FAF7F2] border-[#E6DEC8] hover:border-[#D5C390] shadow-xs'
                    }`}
                  >
                    {/* Dải màu accent bên mép trái khi active */}
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9E1B32]" />
                    )}

                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs shrink-0"
                          style={{ backgroundColor: trail.theme_color || '#9E1B32' }}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {trail.badge_icon}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E1B32] block">
                            {trail.code}
                          </span>
                          <h3 className="font-serif font-bold text-base sm:text-lg text-[#1E1B18] group-hover:text-[#9E1B32] transition-colors leading-snug">
                            {trail.displayName}
                          </h3>
                        </div>
                      </div>

                      <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#4A453E] border border-[#E6DEC8] shrink-0">
                        {trail.monument_ids?.length} {isEn ? 'Stops' : 'Điểm'}
                      </span>
                    </div>

                    <p className="text-xs text-[#4A453E] line-clamp-2 leading-relaxed mb-3 pl-0 sm:pl-1">
                      {trail.displaySubtitle}
                    </p>

                    {/* Metadata Footer của Thẻ */}
                    <div className="pt-2.5 border-t border-[#E6DEC8] flex items-center justify-between text-[11px] text-[#4A453E]">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E3A94A]" />
                        <span>{trail.displayDuration}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-[#1E5631]" />
                        <span>{trail.displayTransport}</span>
                      </span>
                      <span
                        className="font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform"
                        style={{ color: trail.theme_color || '#9E1B32' }}
                      >
                        <span>{isEn ? 'Explore' : 'Khám phá'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Khối Thông Tin Chi Tiết Tuyến Đang Chọn */}
            {activeTrail && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DEC8] shadow-sm space-y-4">
                {/* Câu chuyện văn hóa (Editorial Quote) */}
                <div className="p-4 rounded-xl bg-[#F4ECE7] border border-[#E6DEC8] space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E1B32] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#9E1B32]" />
                    <span>{isEn ? 'Curated Trail Narrative' : 'Câu Chuyện Hành Trình:'}</span>
                  </span>
                  <p className="font-serif italic text-xs sm:text-sm leading-relaxed text-[#1E1B18] select-text">
                    &ldquo;{activeTrail.displayStory}&rdquo;
                  </p>
                </div>

                {/* Chuỗi điểm dừng có số thứ tự */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-[#1E1B18]">
                      {isEn ? 'Stop Sequence' : 'Chuỗi Điểm Dừng Thực Địa'}
                    </span>
                    <span className="text-[#4A453E]">
                      {trailMonuments.length} {isEn ? 'sites' : 'di tích'}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {trailMonuments.map((m, idx) => (
                      <div
                        key={m.id}
                        className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E6DEC8] flex items-center justify-between gap-2.5 text-xs hover:border-[#D5C390] transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-5 h-5 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0"
                            style={{ backgroundColor: activeTrail.theme_color || '#9E1B32' }}
                          >
                            {idx + 1}
                          </span>
                          <span className="font-medium text-[#1E1B18] truncate">
                            {m.displayName}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => navigate(`/di-tich/${m.id}`)}
                          className="text-[11px] text-[#9E1B32] hover:text-[#831427] font-semibold shrink-0 flex items-center gap-0.5"
                        >
                          <span>{isEn ? 'Detail' : 'Chi tiết'}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nút Hành Động Chính: Xem Bản Đồ Toàn Màn Hình */}
                <button
                  type="button"
                  onClick={handleOpenFull}
                  className="w-full py-3 px-4 rounded-xl bg-[#9E1B32] hover:bg-[#831427] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  <span>
                    {isEn
                      ? 'Navigate This Trail on Full WebGIS'
                      : 'Trải Nghiệm & Dẫn Đường Trên Bản Đồ Số'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* CỘT PHẢI (lg:col-span-7): KHUNG BẢN ĐỒ WEBGIS NHÚNG STICKY */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="rounded-3xl border border-[#E6DEC8] bg-[#FFFFFF] shadow-lg overflow-hidden h-[580px] lg:h-[700px] flex flex-col">
              {/* Header thanh viền bản đồ */}
              <div className="px-5 py-3.5 bg-[#FFFFFF] border-b border-[#E6DEC8] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activeTrail?.theme_color || '#9E1B32' }}
                  />
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#1E1B18]">
                    {activeTrail?.displayName}
                  </span>
                  <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#4A453E] border border-[#E6DEC8]">
                    {activeTrail?.code}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleOpenFull}
                  className="text-xs font-bold text-[#9E1B32] hover:text-[#831427] flex items-center gap-1 transition-colors"
                >
                  <span>{isEn ? 'Full Map' : 'Bản Đồ Lớn'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Khung nhúng MapView */}
              <div className="flex-1 w-full h-full relative">
                <MapView
                  isEmbedded={true}
                  externalTrailId={currentActiveId}
                  onOpenFullMap={handleOpenFull}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
