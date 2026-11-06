import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Sparkles,
  MapPin,
  Utensils,
  Compass,
  ChevronRight,
  Flower2,
  Droplets,
  Sun,
  PartyPopper,
  CheckCircle2,
  ArrowUpRight,
  Store,
  Award,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  SEASONAL_CALENDAR,
  CULINARY_SPECIALTIES,
  getSeasonalInfo,
  HOMEPAGE_STORYTELLING,
} from '../../data/culturalHeritageData';
import { INITIAL_MONUMENTS } from '../../data/monumentsData';
import { getLocalizedMonument } from '../../data/monumentsTranslationsEn';

/**
 * =========================================================================================
 * COMPONENT: SeasonsAndCulinarySection (Tầng 5 - Lịch 4 Mùa & 12 Đặc Sản Văn Hóa)
 * =========================================================================================
 * Định hướng thiết kế: Heritage Warm Editorial Style (Vietnam Travel & Kyoto Travel)
 * - Nền sáng ấm Giấy Dó #FAF7F2 và Đất Nung Phù Sa #F4ECE7, xóa bỏ hoàn toàn nền đen công nghệ
 * - Thanh chọn 4 mùa ngang phong cách Kyoto Travel trên nền #FFFFFF viền #E6DEC8
 * - Lưới Tạp chí Ẩm thực 3 cột (gap-8): Thẻ Washi #FFFFFF viền #E6DEC8, ảnh sắc nét,
 *   tên món font-serif #1E1B18, câu chuyện văn hóa font-sans #4A453E, liên kết di tích lân cận
 * - Chân trang Văn hóa Đất Sen Hồng sáng ấm, ca dao Bảo Định Giang trên nền Washi Card
 * =========================================================================================
 */
export default function SeasonsAndCulinarySection({ monuments = [], onSelectMonument }) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  // Nguồn dữ liệu di tích thống nhất
  const allMonuments = useMemo(() => {
    return monuments && monuments.length > 0 ? monuments : INITIAL_MONUMENTS;
  }, [monuments]);

  // =======================================================================================
  // 1. STATE & LOGIC: PHẦN A (TẦNG 5.1 - LỊCH VĂN HÓA 4 MÙA)
  // =======================================================================================
  const [activeSeasonId, setActiveSeasonId] = useState('season-lotus');

  const activeSeasonData = useMemo(() => {
    return getSeasonalInfo(activeSeasonId, lang) || SEASONAL_CALENDAR[0];
  }, [activeSeasonId, lang]);

  const recommendedMonuments = useMemo(() => {
    if (!activeSeasonData || !activeSeasonData.recommended_monument_ids) return [];
    return activeSeasonData.recommended_monument_ids
      .map((id) => {
        const found = allMonuments.find((m) => Number(m.id) === Number(id));
        return found ? getLocalizedMonument(found, lang) : null;
      })
      .filter(Boolean);
  }, [activeSeasonData, allMonuments, lang]);

  // Cấu hình biểu tượng và dải màu văn hóa cho 4 mùa
  const seasonMeta = {
    'season-lotus': {
      icon: Flower2,
      accentColor: '#9E1B32',
      badgeBg: 'bg-[#FAF7F2] text-[#9E1B32] border-[#E6DEC8]',
    },
    'season-floating': {
      icon: Droplets,
      accentColor: '#1E5631',
      badgeBg: 'bg-[#FAF7F2] text-[#1E5631] border-[#E6DEC8]',
    },
    'season-flower': {
      icon: Sun,
      accentColor: '#E3A94A',
      badgeBg: 'bg-[#FAF7F2] text-[#B45309] border-[#E6DEC8]',
    },
    'season-festival': {
      icon: PartyPopper,
      accentColor: '#7C3AED',
      badgeBg: 'bg-[#FAF7F2] text-[#7C3AED] border-[#E6DEC8]',
    },
  };

  // =======================================================================================
  // 2. STATE & LOGIC: PHẦN B (TẦNG 5.2 - BẢN ĐỒ ẨM THỰC 12 ĐẶC SẢN)
  // =======================================================================================
  const [selectedFoodCategory, setSelectedFoodCategory] = useState('all');

  const filteredSpecialties = useMemo(() => {
    if (selectedFoodCategory === 'all') return CULINARY_SPECIALTIES;
    return CULINARY_SPECIALTIES.filter((s) => s.specialty_type === selectedFoodCategory);
  }, [selectedFoodCategory]);

  const getNearbyMonumentDetails = (monumentIds = []) => {
    return monumentIds
      .map((id) => {
        const found = allMonuments.find((m) => Number(m.id) === Number(id));
        return found ? getLocalizedMonument(found, lang) : null;
      })
      .filter(Boolean);
  };

  const t = {
    seasonsBadge: isEn ? 'TIER 5.1 • 4 SEASONS CALENDAR' : 'TẦNG 5.1 • LỊCH VĂN HÓA 4 MÙA',
    seasonsTitlePrefix: isEn ? '4 Seasonal Rhythms of' : 'Lịch Văn Hóa 4 Mùa Lễ Hội',
    seasonsTitleHighlight: isEn ? 'Đồng Tháp' : 'Đất Sen Hồng',
    seasonsSubtitle: isEn
      ? 'Experience the cyclical rhythm of the Mekong Delta across 4 signature seasons — from blooming pink lotus fields to rich floodplains and fragrant spring blooms.'
      : 'Khám phá nhịp sống châu thổ theo 4 mùa đặc trưng — từ sắc hồng bạt ngàn của mùa sen nở đến mùa lũ phù sa và ngàn hoa khoe sắc đón Tết cổ truyền.',
    experiencesTitle: isEn ? 'Signature Cultural Experiences' : 'Trải Nghiệm Văn Hóa Tiêu Biểu',
    recommendedMonumentsTitle: isEn ? 'Recommended Sites for this Season' : 'Di Tích Tiêu Biểu Mùa Này',
    viewSiteBtn: isEn ? 'Explore Site' : 'Xem Di Tích',

    culinaryBadge: isEn ? 'TIER 5.2 • DELTA GASTRONOMY' : 'TẦNG 5.2 • ẨM THỰC ĐẶC SẢN VÙNG MIỀN',
    culinaryTitlePrefix: isEn ? '12 Iconic Delicacies of' : '12 Đặc Sản Ẩm Thực Gắn Liền',
    culinaryTitleHighlight: isEn ? 'Đồng Tháp Mười' : 'Di Tích Đất Sen Hồng',
    culinarySubtitle: isEn
      ? 'Savor authentic Mekong Delta gastronomy intimately connected to historic landmarks — sweet lotus dishes, crispy Sa Đéc noodles, and fresh river flavors.'
      : 'Thưởng thức 12 món ăn quốc hồn quốc túy gắn liền với không gian các di tích lịch sử — cảm nhận trọn vẹn phong vị mộc mạc, đậm đà nghĩa tình phương Nam.',
    filterAll: isEn ? 'All (12 Specialties)' : 'Tất Cả (12 Món)',
    filterMain: isEn ? 'Signature Dishes' : 'Món Ăn Chính',
    filterGift: isEn ? 'Gifts & Souvenirs' : 'Quà Tặng Đặc Sản',
    filterFruit: isEn ? 'Famous Fruits' : 'Trái Cây Đặc Sản',
    recommendedSpots: isEn ? 'Authentic Local Addresses' : 'Địa Chỉ Quán Ngon Gợi Ý',
    nearbyHeritageLabel: isEn ? 'Near Heritage Sites:' : 'Gần di tích:',

    footerTagline: isEn
      ? 'Digital Cultural Heritage Map of Đồng Tháp Province • Land of Pink Lotuses'
      : 'Hệ thống Bản đồ số Giới thiệu & Tra cứu Di tích Văn hóa tỉnh Đồng Tháp • Đất Sen Hồng',
    quickLinks: isEn ? 'Quick Navigation' : 'Khám Phá Nhanh',
    linkHome: isEn ? 'Homepage' : 'Trang Chủ',
    linkMap: isEn ? 'Interactive WebGIS Map' : 'Bản Đồ Số WebGIS',
    linkQr: isEn ? 'Field QR Scanner' : 'Quét Mã QR Thực Địa',
    linkAdmin: isEn ? 'CMS Admin Panel' : 'Quản Trị Hệ Thống CMS',
    heritageMonuments: isEn ? 'Key Heritage Sites' : 'Di Tích Tiêu Biểu',
    thesisInfoTitle: isEn ? 'Graduation Thesis (KLTN 2026)' : 'Khóa Luận Tốt Nghiệp (KLTN 2026)',
    thesisTopic: isEn
      ? 'Building a Digital Map System for Cultural Heritage & Historic Landmarks in Đồng Tháp Province'
      : 'Xây dựng hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp',
    studentLabel: isEn ? 'Student Researcher:' : 'Sinh viên thực hiện:',
    studentName: 'Phan Trần Gia Hưng (MSSV: 0024417689 - ĐHCNTT24B-IT)',
    advisorLabel: isEn ? 'Faculty Advisor:' : 'Giảng viên hướng dẫn:',
    advisorName: 'ThS. GVC. Huỳnh Lê Uyên Minh',
    copyright: '© 2026 SenMap Đồng Tháp GIS. All rights reserved.',
  };

  return (
    <div
      data-testid="seasons-culinary-section"
      className="w-full bg-[#FAF7F2] select-none text-[#1E1B18]"
    >
      {/* =================================================================================== */}
      {/* PHẦN A (TẦNG 5.1): LỊCH VĂN HÓA 4 MÙA LỄ HỘI ĐỒNG THÁP */}
      {/* =================================================================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#E6DEC8] bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          {/* Header tiêu đề */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E6DEC8] text-[#9E1B32] text-xs font-bold uppercase tracking-[0.18em] shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-[#9E1B32]" />
              <span>{t.seasonsBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1E1B18] tracking-tight leading-[1.3] pb-1">
              <span className="block">{t.seasonsTitlePrefix}</span>
              <span className="inline-block mt-1 sm:mt-1.5 pb-1.5 bg-gradient-to-r from-[#FF1E56] via-[#F43F5E] to-[#F59E0B] bg-clip-text text-transparent whitespace-nowrap">{t.seasonsTitleHighlight}</span>
            </h2>

            <p className="text-sm sm:text-base text-[#4A453E] font-sans leading-relaxed max-w-2xl mx-auto">
              {t.seasonsSubtitle}
            </p>
          </div>

          {/* 4 Tabs Mùa Tương Tác Phong Cách Kyoto Travel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SEASONAL_CALENDAR.map((season) => {
              const isActive = activeSeasonId === season.id;
              const meta = seasonMeta[season.id] || seasonMeta['season-lotus'];
              const IconComp = meta.icon;
              const sName = isEn ? season.name_en : season.name_vi;
              const sMonths = isEn ? season.months_en : season.months_vi;

              return (
                <button
                  key={season.id}
                  type="button"
                  data-testid={`season-tab-${season.id}`}
                  onClick={() => setActiveSeasonId(season.id)}
                  className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#FFFFFF] border-[#D5C390] ring-2 ring-[#D5C390]/60 shadow-md'
                      : 'bg-[#FFFFFF] hover:bg-[#F4ECE7] text-[#4A453E] border-[#E6DEC8] shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
                      style={{
                        backgroundColor: isActive ? meta.accentColor : '#FAF7F2',
                        color: isActive ? '#FFFFFF' : meta.accentColor,
                      }}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#4A453E] border border-[#E6DEC8]">
                      {season.time_range}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base leading-snug text-[#1E1B18] mb-0.5">
                      {sName}
                    </h3>
                    <p className="text-xs text-[#4A453E] font-medium">{sMonths}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Khung Nội Dung Mùa Đang Chọn */}
          <div className="rounded-3xl border border-[#E6DEC8] bg-[#FFFFFF] p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Cột trái: Văn hóa & 4 Trải nghiệm (7 cột) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${
                        seasonMeta[activeSeasonId]?.badgeBg
                      }`}
                    >
                      {isEn ? activeSeasonData.months_en : activeSeasonData.months_vi}
                    </span>
                    <span className="text-xs text-[#4A453E] font-mono">
                      ID: {activeSeasonData.code}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B18] mb-3">
                    {isEn ? activeSeasonData.name_en : activeSeasonData.name_vi}
                  </h3>

                  <p className="text-[#4A453E] text-sm sm:text-base leading-relaxed font-sans">
                    {isEn ? activeSeasonData.description_en : activeSeasonData.description_vi}
                  </p>
                </div>

                {/* 4 Trải nghiệm đặc trưng */}
                <div className="space-y-3 pt-2 border-t border-[#E6DEC8]">
                  <h4 className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#9E1B32]" />
                    <span>{t.experiencesTitle}</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(isEn
                      ? activeSeasonData.experiences_en
                      : activeSeasonData.experiences_vi
                    )?.map((exp, idx) => (
                      <li
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E6DEC8] flex items-start gap-2.5 text-xs sm:text-sm text-[#1E1B18] font-medium leading-snug"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#1E5631] shrink-0 mt-0.5" />
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cột phải: Di tích gợi ý trong mùa (5 cột) */}
              <div className="lg:col-span-5 bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E6DEC8] space-y-4">
                <h4 className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#9E1B32]" />
                    <span>{t.recommendedMonumentsTitle}</span>
                  </div>
                  <span className="text-[11px] text-[#4A453E] font-normal">
                    {recommendedMonuments.length} địa điểm
                  </span>
                </h4>

                <div className="space-y-3">
                  {recommendedMonuments.map((m) => (
                    <div
                      key={m.id}
                      className="group p-3 rounded-2xl border border-[#E6DEC8] hover:border-[#D5C390] bg-[#FFFFFF] transition-all flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={m.thumbnail || `/images/monuments/monument_${m.id}.jpg`}
                          alt={m.displayName}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `/images/monuments/monument_${m.id}.jpg`;
                          }}
                        />
                        <div className="min-w-0 space-y-0.5">
                          <h5 className="text-sm font-serif font-bold text-[#1E1B18] group-hover:text-[#9E1B32] truncate transition-colors">
                            {m.displayName}
                          </h5>
                          <p className="text-xs text-[#4A453E] flex items-center gap-1 truncate font-sans">
                            <MapPin className="w-3 h-3 text-[#9E1B32] shrink-0" />
                            <span className="truncate">{m.displayDistrict || m.district}</span>
                          </p>
                          <span className="inline-block text-[10px] font-semibold text-[#9E1B32] bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#E6DEC8]">
                            {m.displayRanking || m.ranking}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 shrink-0">
                        <Link
                          to={`/di-tich/${m.id}`}
                          className="px-3 py-1.5 rounded-xl bg-[#9E1B32] hover:bg-[#831427] text-white text-xs font-bold transition-all flex items-center gap-1 text-center shadow-xs"
                        >
                          <span>{t.viewSiteBtn}</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                        {onSelectMonument && (
                          <button
                            type="button"
                            onClick={() => onSelectMonument(m)}
                            className="px-2 py-1 rounded-md text-[11px] font-medium text-[#4A453E] hover:text-[#9E1B32] hover:bg-[#FAF7F2] text-center transition-colors"
                          >
                            {isEn ? 'Map pin' : 'Xem ghim'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================================== */}
      {/* PHẦN B (TẦNG 5.2): BẢN ĐỒ ẨM THỰC 12 ĐẶC SẢN GẮN LIỀN DI TÍCH */}
      {/* =================================================================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#E6DEC8] bg-[#F4ECE7]">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          {/* Header tiêu đề */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E6DEC8] text-[#9E1B32] text-xs font-bold uppercase tracking-[0.18em] shadow-xs">
              <Utensils className="w-3.5 h-3.5 text-[#9E1B32]" />
              <span>{t.culinaryBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1E1B18] tracking-tight leading-[1.3] pb-1">
              <span className="block">{t.culinaryTitlePrefix}</span>
              <span className="inline-block mt-1 sm:mt-1.5 pb-1.5 bg-gradient-to-r from-[#FF1E56] via-[#F43F5E] to-[#F59E0B] bg-clip-text text-transparent whitespace-nowrap">{t.culinaryTitleHighlight}</span>
            </h2>

            <p className="text-sm sm:text-base text-[#4A453E] font-sans leading-relaxed max-w-2xl mx-auto">
              {t.culinarySubtitle}
            </p>
          </div>

          {/* Bộ Lọc Danh Mục Ẩm Thực */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {[
              { id: 'all', label: t.filterAll },
              { id: 'mon-an-chinh', label: t.filterMain },
              { id: 'qua-tang', label: t.filterGift },
              { id: 'trai-cay', label: t.filterFruit },
            ].map((tab) => {
              const active = selectedFoodCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFoodCategory(tab.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all border ${
                    active
                      ? 'bg-[#9E1B32] text-white border-[#9E1B32] shadow-xs'
                      : 'bg-[#FFFFFF] hover:bg-[#FAF7F2] text-[#4A453E] border-[#E6DEC8] shadow-2xs'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Lưới Tạp Chí Ẩm Thực 3 Cột (gap-8) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpecialties.map((item) => {
              const nearbyMonuments = getNearbyMonumentDetails(item.nearby_monument_ids);
              const displayName = isEn ? item.name_en : item.name_vi;
              const displayDesc = isEn ? item.description_en : item.description_vi;
              const displayPrice = isEn ? item.price_range_en : item.price_range_vnd;

              let typeLabel = isEn ? 'Signature Dish' : 'Món ăn chính';
              if (item.specialty_type === 'qua-tang') {
                typeLabel = isEn ? 'Specialty Gift' : 'Quà tặng đặc sản';
              } else if (item.specialty_type === 'trai-cay') {
                typeLabel = isEn ? 'Famous Fruit' : 'Trái cây đặc sản';
              }

              return (
                <div
                  key={item.id}
                  className="rounded-3xl bg-[#FFFFFF] border border-[#E6DEC8] hover:border-[#D5C390] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Ảnh món ăn & Badge giá */}
                    <div className="relative h-60 w-full bg-[#FAF7F2] overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={displayName}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80';
                        }}
                      />

                      {/* Loại món */}
                      <span className="absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md text-[#9E1B32] border border-[#E6DEC8] shadow-xs">
                        {typeLabel}
                      </span>

                      {/* Giá tiền */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-[#1E1B18]/85 backdrop-blur-md text-white font-mono text-xs font-semibold shadow-xs">
                        {displayPrice}
                      </div>
                    </div>

                    {/* Thân thẻ: Tên món font-serif, Mô tả font-sans & Địa chỉ */}
                    <div className="p-5 sm:p-6 space-y-3.5">
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1E1B18] group-hover:text-[#9E1B32] transition-colors leading-snug">
                        {displayName}
                      </h3>

                      <p className="text-[#4A453E] text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
                        {displayDesc}
                      </p>

                      {/* Địa chỉ quán gợi ý */}
                      {item.recommended_addresses && item.recommended_addresses.length > 0 && (
                        <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E6DEC8] space-y-1.5">
                          <p className="text-[11px] font-bold text-[#9E1B32] uppercase tracking-wider flex items-center gap-1.5">
                            <Store className="w-3.5 h-3.5 text-[#9E1B32]" />
                            <span>{t.recommendedSpots}</span>
                          </p>
                          {item.recommended_addresses.slice(0, 1).map((spot, idx) => (
                            <div key={idx} className="text-xs">
                              <p className="font-semibold text-[#1E1B18] leading-snug">
                                {spot.name}
                              </p>
                              <p className="text-[#4A453E] text-[11px] truncate mt-0.5">
                                {spot.address}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chân thẻ: Huy hiệu liên kết di tích */}
                  <div className="p-5 sm:p-6 pt-0">
                    <div className="pt-3 border-t border-[#E6DEC8]">
                      <p className="text-[11px] font-bold text-[#4A453E] uppercase tracking-wider mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#9E1B32]" />
                        <span>{t.nearbyHeritageLabel}</span>
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {nearbyMonuments.map((m) => (
                          <Link
                            key={m.id}
                            to={`/di-tich/${m.id}`}
                            onClick={() => onSelectMonument && onSelectMonument(m)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FAF7F2] hover:bg-[#F4ECE7] text-[#9E1B32] border border-[#E6DEC8] transition-colors duration-150 group/link"
                            title={m.displayName}
                          >
                            <span className="truncate max-w-[170px]">{m.displayName}</span>
                            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================================== */}
      {/* PHẦN C (TẦNG 6): CHÂN TRANG VĂN HÓA / CULTURAL FOOTER ĐẤT SEN HỒNG */}
      {/* =================================================================================== */}
      <footer className="relative w-full bg-[#FAF7F2] text-[#4A453E] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#E6DEC8] overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* KHỐI CA DAO ĐẶC TRƯNG ĐẤT SEN HỒNG (SONG SẾU CHẦU CA DAO) */}
          <div className="relative max-w-4xl mx-auto">
            {/* Sếu Đứng Chầu Bên Trái (sarus_crane_standing_guard_left.png) */}
            <div className="hidden sm:block absolute -left-4 md:-left-12 lg:-left-16 bottom-0 w-24 sm:w-28 md:w-36 pointer-events-none select-none z-10 opacity-85 transition-transform duration-300 hover:scale-105">
              <img
                src="/images/cultural_motifs/sarus_cranes/sarus_crane_standing_guard_left.png"
                alt="Sếu Đầu Đỏ đứng chầu bên trái"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Sếu Đứng Chầu Bên Phải (sarus_crane_standing_tall_right.png) */}
            <div className="hidden sm:block absolute -right-4 md:-right-12 lg:-right-16 bottom-0 w-24 sm:w-28 md:w-36 pointer-events-none select-none z-10 opacity-85 transition-transform duration-300 hover:scale-105">
              <img
                src="/images/cultural_motifs/sarus_cranes/sarus_crane_standing_tall_right.png"
                alt="Sếu Đầu Đỏ đứng chầu bên phải"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Nội dung Ca Dao Trung Tâm */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E6DEC8] text-center max-w-2xl sm:max-w-3xl mx-auto shadow-xs relative z-0">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E6DEC8] text-[#9E1B32] flex items-center justify-center mx-auto mb-3 shadow-2xs">
                <Flower2 className="w-5 h-5 text-[#9E1B32]" />
              </div>

              <blockquote className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#1E1B18] leading-relaxed font-bold select-text px-2 sm:px-6">
                {isEn
                  ? `"${HOMEPAGE_STORYTELLING.folk_verse.translation_en}"`
                  : `"${HOMEPAGE_STORYTELLING.folk_verse.original_vi.replace('\n', ' • ')}"`}
              </blockquote>

              <p className="mt-2.5 text-xs sm:text-sm text-[#9E1B32] font-semibold tracking-wide">
                — {HOMEPAGE_STORYTELLING.folk_verse.author} —
              </p>
            </div>
          </div>

          {/* 4 CỘT THÔNG TIN LIÊN KẾT NHANH */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#E6DEC8] text-sm">
            {/* Cột 1: Thương hiệu SenMap & Sứ mệnh di sản (col-span-4) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#9E1B32] flex items-center justify-center text-white shadow-xs">
                  <Flower2 className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-xl font-serif font-bold text-[#1E1B18] tracking-tight">
                    SenMap
                  </span>
                  <span className="ml-1.5 text-xs font-bold px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#9E1B32] border border-[#E6DEC8]">
                    Đồng Tháp
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed font-sans">
                {t.footerTagline}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#FFFFFF] text-[#4A453E] border border-[#E6DEC8]">
                  WGS84 • EPSG:4326
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#FFFFFF] text-[#4A453E] border border-[#E6DEC8]">
                  VN-2000 Đồng Tháp
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#FFFFFF] text-[#4A453E] border border-[#E6DEC8]">
                  PostGIS • React Leaflet
                </span>
              </div>
            </div>

            {/* Cột 2: Điều hướng nhanh (col-span-2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider">
                {t.quickLinks}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-[#4A453E] hover:text-[#9E1B32] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-[#9E1B32]" />
                    <span>{t.linkHome}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ban-do"
                    className="text-[#4A453E] hover:text-[#9E1B32] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-[#9E1B32]" />
                    <span>{t.linkMap}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/quet-qr"
                    className="text-[#4A453E] hover:text-[#9E1B32] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-[#9E1B32]" />
                    <span>{t.linkQr}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="text-[#4A453E] hover:text-[#9E1B32] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-[#9E1B32]" />
                    <span>{t.linkAdmin}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 3: Di tích kiệt tác tiêu biểu (col-span-3) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider">
                {t.heritageMonuments}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/di-tich/1"
                    className="text-[#4A453E] hover:text-[#9E1B32] transition-colors flex items-center gap-1.5 truncate"
                  >
                    <ChevronRight className="w-3 h-3 text-[#9E1B32] shrink-0" />
                    <span>KDT Nguyễn Sinh Sắc</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/di-tich/2"
                    className="text-[#4A453E] hover:text-[#9E1B32] transition-colors flex items-center gap-1.5 truncate"
                  >
                    <ChevronRight className="w-3 h-3 text-[#9E1B32] shrink-0" />
                    <span>KDT Khảo cổ Gò Tháp</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/di-tich/3"
                    className="text-[#4A453E] hover:text-[#9E1B32] transition-colors flex items-center gap-1.5 truncate"
                  >
                    <ChevronRight className="w-3 h-3 text-[#9E1B32] shrink-0" />
                    <span>KDT Căn cứ Xẻo Quýt</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/di-tich/4"
                    className="text-[#4A453E] hover:text-[#9E1B32] transition-colors flex items-center gap-1.5 truncate"
                  >
                    <ChevronRight className="w-3 h-3 text-[#9E1B32] shrink-0" />
                    <span>Nhà cổ Huỳnh Thủy Lê</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/di-tich/6"
                    className="text-[#4A453E] hover:text-[#9E1B32] transition-colors flex items-center gap-1.5 truncate"
                  >
                    <ChevronRight className="w-3 h-3 text-[#9E1B32] shrink-0" />
                    <span>Vườn quốc gia Tràm Chim</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 4: Thông tin Khóa luận tốt nghiệp (col-span-3) */}
            <div className="lg:col-span-3 space-y-3 bg-[#FFFFFF] p-5 rounded-2xl border border-[#E6DEC8] shadow-xs">
              <h4 className="text-xs font-bold text-[#9E1B32] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#9E1B32]" />
                <span>{t.thesisInfoTitle}</span>
              </h4>
              <p className="text-xs text-[#1E1B18] font-medium leading-snug">
                {t.thesisTopic}
              </p>
              <div className="pt-2.5 border-t border-[#E6DEC8] space-y-1.5 text-xs">
                <div>
                  <span className="text-[#4A453E] block text-[11px]">{t.studentLabel}</span>
                  <span className="font-semibold text-[#1E1B18]">{t.studentName}</span>
                </div>
                <div>
                  <span className="text-[#4A453E] block text-[11px]">{t.advisorLabel}</span>
                  <span className="font-semibold text-[#1E1B18]">{t.advisorName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* DÒNG BẢN QUYỀN VÀ TRẠNG THÁI HỆ THỐNG */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A453E]">
            <p>{t.copyright}</p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[#1E5631] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#1E5631] animate-pulse" />
                <span>20/20 Di tích sẵn sàng</span>
              </span>
              <span>•</span>
              <span className="text-[#4A453E]">FastAPI & Leaflet Engine</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
