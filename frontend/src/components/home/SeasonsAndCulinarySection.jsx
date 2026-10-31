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
  ExternalLink,
  Heart,
  QrCode,
  Shield,
  ArrowUpRight,
  Store,
  Tag,
  Info,
  Clock,
  Layers,
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
 * COMPONENT: SeasonsAndCulinarySection (Tầng 5 & Chân Trang Văn Hóa Trang Chủ)
 * =========================================================================================
 * Bao gồm 3 phân khu văn hóa - du lịch đặc sắc:
 *   - Phần A (Tầng 5.1): Lịch Văn Hóa 4 Mùa Lễ Hội Đồng Tháp (4 seasonal tabs tương tác)
 *   - Phần B (Tầng 5.2): Bản Đồ Ẩm Thực 12 Đặc Sản Gắn Liền Di Tích (Lọc danh mục, quán ngon, ghim di tích lân cận)
 *   - Phần C (Tầng 6): Chân Trang Văn Hóa Đất Sen Hồng (Ca dao Bảo Định Giang, Liên kết nhanh, Thông tin KLTN)
 * =========================================================================================
 */
export default function SeasonsAndCulinarySection({ monuments = [], onSelectMonument }) {
  const { lang } = useLanguage();

  // Nguồn dữ liệu di tích thống nhất (props hoặc INITIAL_MONUMENTS)
  const allMonuments = useMemo(() => {
    return monuments && monuments.length > 0 ? monuments : INITIAL_MONUMENTS;
  }, [monuments]);

  // =======================================================================================
  // 1. STATE & LOGIC: PHẦN A (TẦNG 5.1 - LỊCH VĂN HÓA 4 MÙA)
  // =======================================================================================
  const [activeSeasonId, setActiveSeasonId] = useState('season-lotus');

  // Lấy dữ liệu mùa hiện tại đã bản địa hóa
  const activeSeasonData = useMemo(() => {
    return getSeasonalInfo(activeSeasonId, lang) || SEASONAL_CALENDAR[0];
  }, [activeSeasonId, lang]);

  // Danh sách các di tích gợi ý trong mùa đang chọn
  const recommendedMonuments = useMemo(() => {
    if (!activeSeasonData || !activeSeasonData.recommended_monument_ids) return [];
    return activeSeasonData.recommended_monument_ids
      .map((id) => {
        const found = allMonuments.find((m) => Number(m.id) === Number(id));
        return found ? getLocalizedMonument(found, lang) : null;
      })
      .filter(Boolean);
  }, [activeSeasonData, allMonuments, lang]);

  // Cấu hình biểu tượng và dải màu cho 4 mùa
  const seasonMeta = {
    'season-lotus': {
      icon: Flower2,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
      activeTab: 'bg-rose-600 text-white shadow-rose-900/50 shadow-lg ring-2 ring-rose-400/50',
      accentColor: 'text-rose-400',
      borderColor: 'border-rose-500',
    },
    'season-floating': {
      icon: Droplets,
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
      activeTab: 'bg-sky-600 text-white shadow-sky-900/50 shadow-lg ring-2 ring-sky-400/50',
      accentColor: 'text-sky-400',
      borderColor: 'border-sky-500',
    },
    'season-flower': {
      icon: Sun,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      activeTab: 'bg-amber-600 text-white shadow-amber-900/50 shadow-lg ring-2 ring-amber-400/50',
      accentColor: 'text-amber-400',
      borderColor: 'border-amber-500',
    },
    'season-festival': {
      icon: PartyPopper,
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
      activeTab: 'bg-purple-600 text-white shadow-purple-900/50 shadow-lg ring-2 ring-purple-400/50',
      accentColor: 'text-purple-400',
      borderColor: 'border-purple-500',
    },
  };

  // =======================================================================================
  // 2. STATE & LOGIC: PHẦN B (TẦNG 5.2 - BẢN ĐỒ ẨM THỰC 12 ĐẶC SẢN)
  // =======================================================================================
  const [selectedFoodCategory, setSelectedFoodCategory] = useState('all');

  // Lọc đặc sản theo danh mục
  const filteredSpecialties = useMemo(() => {
    if (selectedFoodCategory === 'all') return CULINARY_SPECIALTIES;
    return CULINARY_SPECIALTIES.filter((s) => s.specialty_type === selectedFoodCategory);
  }, [selectedFoodCategory]);

  // Helper tìm tên di tích lân cận từ danh sách ID
  const getNearbyMonumentDetails = (monumentIds = []) => {
    return monumentIds
      .map((id) => {
        const found = allMonuments.find((m) => Number(m.id) === Number(id));
        return found ? getLocalizedMonument(found, lang) : null;
      })
      .filter(Boolean);
  };

  // Từ điển nhãn giao diện song ngữ
  const t = {
    // Phần A - 4 Mùa
    seasonsBadge: lang === 'en' ? 'TIER 5.1 • 4 SEASONS CALENDAR' : 'TẦNG 5.1 • LỊCH VĂN HÓA 4 MÙA',
    seasonsTitlePrefix: lang === 'en' ? '4 Seasonal Festivals of' : 'Lịch Văn Hóa 4 Mùa Lễ Hội',
    seasonsTitleHighlight: lang === 'en' ? 'Đồng Tháp' : 'Đất Sen Hồng',
    seasonsSubtitle:
      lang === 'en'
        ? 'Experience the cyclical rhythm of the Mekong Delta across 4 signature seasons — from blooming lotus fields to the high water floods and fragrant Tết flowers.'
        : 'Khám phá nhịp sống châu thổ theo 4 mùa đặc trưng — từ sắc hồng bạt ngàn của mùa sen nở đến mùa lũ phù sa và ngàn hoa khoe sắc đón Tết cổ truyền.',
    experiencesTitle: lang === 'en' ? 'Signature Experiences' : 'Trải Nghiệm Văn Hóa Tiêu Biểu',
    recommendedMonumentsTitle: lang === 'en' ? 'Recommended Sites for this Season' : 'Di Tích Tiêu Biểu Mùa Này',
    viewSiteBtn: lang === 'en' ? 'Explore Site' : 'Xem Di Tích',

    // Phần B - Ẩm thực
    culinaryBadge: lang === 'en' ? 'TIER 5.2 • DELTA GASTRONOMY' : 'TẦNG 5.2 • ẨM THỰC ĐẶC SẢN VÙNG MIỀN',
    culinaryTitlePrefix: lang === 'en' ? '12 Iconic Culinary Delicacies of' : 'Bản Đồ Ẩm Thực 12 Đặc Sản Gắn Liền',
    culinaryTitleHighlight: lang === 'en' ? 'Đồng Tháp Mười' : 'Di Tích Đồng Tháp',
    culinarySubtitle:
      lang === 'en'
        ? 'Savor authentic Mekong Delta gastronomy intimately connected to our historical landmarks — taste the sweet lotus rice, crisp Sa Đéc noodles, and fresh river fish.'
        : 'Thưởng thức 12 món ăn quốc hồn quốc túy gắn liền với không gian các di tích lịch sử — cảm nhận trọn vẹn phong vị mộc mạc, đậm đà nghĩa tình phương Nam.',
    filterAll: lang === 'en' ? 'All (12 Specialties)' : 'Tất Cả (12 Món)',
    filterMain: lang === 'en' ? 'Signature Dishes' : 'Món Ăn Chính',
    filterGift: lang === 'en' ? 'Gifts & Souvenirs' : 'Quà Tặng Đặc Sản',
    filterFruit: lang === 'en' ? 'Famous Fruits' : 'Trái Cây Đặc Sản',
    priceLabel: lang === 'en' ? 'Price Reference' : 'Khoảng Giá',
    recommendedSpots: lang === 'en' ? 'Authentic Local Addresses' : 'Địa Chỉ Quán Ngon Gợi Ý',
    nearbyHeritageLabel: lang === 'en' ? 'Near Heritage Sites:' : 'Gần di tích:',

    // Phần C - Footer
    footerTagline:
      lang === 'en'
        ? 'Digital Cultural Heritage Map of Đồng Tháp Province • Land of Pink Lotuses'
        : 'Hệ thống Bản đồ số Giới thiệu & Tra cứu Di tích Văn hóa tỉnh Đồng Tháp • Đất Sen Hồng',
    quickLinks: lang === 'en' ? 'Quick Navigation' : 'Khám Phá Nhanh',
    linkHome: lang === 'en' ? 'Homepage' : 'Trang Chủ',
    linkMap: lang === 'en' ? 'Interactive WebGIS Map' : 'Bản Đồ Số WebGIS',
    linkQr: lang === 'en' ? 'Field QR Scanner' : 'Quét Mã QR Thực Địa',
    linkAdmin: lang === 'en' ? 'CMS Admin Panel' : 'Quản Trị Hệ Thống CMS',
    heritageMonuments: lang === 'en' ? 'Key Heritage Sites' : 'Di Tích Tiêu Biểu',
    thesisInfoTitle: lang === 'en' ? 'Graduation Thesis (KLTN 2026)' : 'Khóa Luận Tốt Nghiệp (KLTN 2026)',
    thesisTopic:
      lang === 'en'
        ? 'Building a Digital Map System for Cultural Heritage & Historic Landmarks in Đồng Tháp Province'
        : 'Xây dựng hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp',
    studentLabel: lang === 'en' ? 'Student Researcher:' : 'Sinh viên thực hiện:',
    studentName: 'Phan Trần Gia Hưng (MSSV: 0024417689 - ĐHCNTT24B-IT)',
    advisorLabel: lang === 'en' ? 'Faculty Advisor:' : 'Giảng viên hướng dẫn:',
    advisorName: 'ThS. GVC. Huỳnh Lê Uyên Minh',
    copyright: '© 2026 SenMap Đồng Tháp GIS. All rights reserved.',
  };

  return (
    <div className="w-full bg-slate-950 text-white select-none">
      {/* =================================================================================== */}
      {/* PHẦN A (TẦNG 5.1): LỊCH VĂN HÓA 4 MÙA LỄ HỘI ĐỒNG THÁP */}
      {/* =================================================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-slate-900">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Tiêu đề mục */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-extrabold uppercase tracking-widest shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.seasonsBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t.seasonsTitlePrefix}{' '}
              <span className="bg-gradient-to-r from-lotus-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                {t.seasonsTitleHighlight}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {t.seasonsSubtitle}
            </p>
          </div>

          {/* 4 Tabs Mùa Tương Tác */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {SEASONAL_CALENDAR.map((season) => {
              const isActive = activeSeasonId === season.id;
              const meta = seasonMeta[season.id] || seasonMeta['season-lotus'];
              const IconComp = meta.icon;
              const sName = lang === 'en' ? season.name_en : season.name_vi;
              const sMonths = lang === 'en' ? season.months_en : season.months_vi;

              return (
                <button
                  key={season.id}
                  type="button"
                  onClick={() => setActiveSeasonId(season.id)}
                  className={`relative p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                    isActive
                      ? `${meta.activeTab} border-transparent scale-[1.02]`
                      : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-white/10 hover:border-white/20 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive ? 'bg-white/25 text-white' : 'bg-slate-700/80 text-white shadow-sm'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/25 text-white font-mono' : 'bg-white/10 text-slate-300 font-mono'
                      }`}
                    >
                      {season.time_range}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm sm:text-base leading-tight mb-1 text-white">
                      {sName}
                    </h3>
                    <p
                      className={`text-xs font-medium ${
                        isActive ? 'text-white/85' : 'text-slate-400'
                      }`}
                    >
                      {sMonths}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nội dung Mùa Đang Chọn */}
          <div className="rounded-3xl border border-white/15 bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Cột trái: Mô tả văn hóa & Trải nghiệm tiêu biểu */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${
                        seasonMeta[activeSeasonId]?.badgeColor
                      }`}
                    >
                      {lang === 'en'
                        ? activeSeasonData.months_en
                        : activeSeasonData.months_vi}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      ID: {activeSeasonData.code}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
                    {lang === 'en' ? activeSeasonData.name_en : activeSeasonData.name_vi}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {lang === 'en'
                      ? activeSeasonData.description_en
                      : activeSeasonData.description_vi}
                  </p>
                </div>

                {/* Danh sách 4 trải nghiệm đặc trưng */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{t.experiencesTitle}</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(lang === 'en'
                      ? activeSeasonData.experiences_en
                      : activeSeasonData.experiences_vi
                    )?.map((exp, idx) => (
                      <li
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-sm flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-snug"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cột phải: Thẻ di tích gợi ý trong mùa đó */}
              <div className="lg:col-span-5 bg-slate-900/90 p-5 sm:p-6 rounded-2xl border border-white/10 shadow-sm space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>{t.recommendedMonumentsTitle}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {recommendedMonuments.length} địa điểm
                  </span>
                </h4>

                <div className="space-y-3">
                  {recommendedMonuments.map((m) => {
                    const thumb =
                      m.thumbnail ||
                      `/images/monuments/monument_${m.id}.jpg` ||
                      (m.gallery && m.gallery[0]) ||
                      m.wikimediaUrl;

                    return (
                      <div
                        key={m.id}
                        className="group p-3 rounded-2xl border border-white/10 hover:border-lotus-500/50 bg-slate-800/60 hover:bg-slate-800 transition-all duration-200 flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={thumb}
                            alt={m.displayName || m.name}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `/images/monuments/monument_${m.id}.jpg`;
                            }}
                          />
                          <div className="min-w-0 space-y-0.5">
                            <h5 className="text-sm font-bold text-white group-hover:text-amber-200 truncate transition-colors">
                              {m.displayName || m.name}
                            </h5>
                            <p className="text-xs text-slate-400 flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                              <span className="truncate">{m.displayDistrict || m.district}</span>
                            </p>
                            <span className="inline-block text-[10px] font-semibold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800/60">
                              {m.displayRanking || m.ranking}
                            </span>
                          </div>
                        </div>

                        {/* Cụm tương tác */}
                        <div className="flex flex-col gap-1 shrink-0">
                          <Link
                            to={`/di-tich/${m.id}`}
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-lotus-600 to-rose-600 hover:from-lotus-500 hover:to-rose-500 text-white text-xs font-bold transition-all flex items-center gap-1 text-center shadow-md"
                          >
                            <span>{t.viewSiteBtn}</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                          {onSelectMonument && (
                            <button
                              type="button"
                              onClick={() => onSelectMonument(m)}
                              className="px-2 py-1 rounded-md text-[11px] font-medium text-slate-400 hover:text-white hover:bg-white/10 text-center transition-colors"
                            >
                              {lang === 'en' ? 'Map pin' : 'Xem ghim'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================================== */}
      {/* PHẦN B (TẦNG 5.2): BẢN ĐỒ ẨM THỰC 12 ĐẶC SẢN GẮN LIỀN DI TÍCH */}
      {/* =================================================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header tiêu đề */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest shadow-sm">
              <Utensils className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.culinaryBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t.culinaryTitlePrefix}{' '}
              <span className="bg-gradient-to-r from-lotus-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                {t.culinaryTitleHighlight}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {t.culinarySubtitle}
            </p>
          </div>

          {/* Thanh lọc danh mục ẩm thực */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 border ${
                    active
                      ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-600/30 ring-2 ring-amber-400/40'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-white/10 shadow-xs'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Lưới 12 Đặc sản */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredSpecialties.map((item) => {
              const nearbyMonuments = getNearbyMonumentDetails(item.nearby_monument_ids);
              const displayName = lang === 'en' ? item.name_en : item.name_vi;
              const displayDesc = lang === 'en' ? item.description_en : item.description_vi;
              const displayPrice = lang === 'en' ? item.price_range_en : item.price_range_vnd;

              // Phân loại nhãn
              let typeLabel = lang === 'en' ? 'Main Dish' : 'Món ăn chính';
              let typeBadgeClass = 'bg-rose-500/20 text-rose-300 border-rose-400/30';
              if (item.specialty_type === 'qua-tang') {
                typeLabel = lang === 'en' ? 'Specialty Gift' : 'Quà tặng đặc sản';
                typeBadgeClass = 'bg-amber-500/20 text-amber-300 border-amber-400/30';
              } else if (item.specialty_type === 'trai-cay') {
                typeLabel = lang === 'en' ? 'Famous Fruit' : 'Trái cây đặc sản';
                typeBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
              }

              return (
                <div
                  key={item.id}
                  className="rounded-3xl bg-slate-900/90 border border-white/10 hover:border-amber-400/40 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 flex flex-col justify-between group backdrop-blur-md"
                >
                  <div>
                    {/* Ảnh món ăn & Badge giá */}
                    <div className="relative h-52 w-full overflow-hidden bg-slate-950">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                      {/* Phân loại món */}
                      <span
                        className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-md shadow-md ${typeBadgeClass}`}
                      >
                        {typeLabel}
                      </span>

                      {/* Giá tiền */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-white text-xs font-bold shadow-md">
                        {displayPrice}
                      </div>

                      {/* Tên món nổi trên nền ảnh */}
                      <div className="absolute bottom-3 left-3 right-28">
                        <h3 className="text-lg font-bold text-white leading-tight drop-shadow-md group-hover:text-amber-200 transition-colors">
                          {displayName}
                        </h3>
                      </div>
                    </div>

                    {/* Thân thẻ: Mô tả & Địa chỉ gợi ý */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Mô tả ẩm thực */}
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                        {displayDesc}
                      </p>

                      {/* Danh sách địa chỉ gợi ý quán ngon */}
                      {item.recommended_addresses && item.recommended_addresses.length > 0 && (
                        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 space-y-2">
                          <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Store className="w-3.5 h-3.5 text-amber-400" />
                            <span>{t.recommendedSpots}</span>
                          </p>
                          {item.recommended_addresses.slice(0, 1).map((spot, idx) => (
                            <div key={idx} className="text-xs">
                              <p className="font-semibold text-slate-200 leading-snug">
                                {spot.name}
                              </p>
                              <p className="text-slate-400 text-[11px] truncate mt-0.5">
                                {spot.address}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CHÂN THẺ: HUY HIỆU GẮN KẾT DI TÍCH LÂN CẬN */}
                  <div className="p-5 sm:p-6 pt-0">
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        <span>{t.nearbyHeritageLabel}</span>
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {nearbyMonuments.map((m) => (
                          <Link
                            key={m.id}
                            to={`/di-tich/${m.id}`}
                            onClick={() => onSelectMonument && onSelectMonument(m)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-950/40 hover:bg-rose-900/60 text-rose-200 border border-rose-700/50 transition-colors duration-150 shadow-2xs group/link"
                            title={m.displayName || m.name}
                          >
                            <span className="truncate max-w-[170px]">{m.displayName || m.name}</span>
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
      <footer className="relative w-full bg-slate-950 text-slate-300 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden">
        {/* Họa tiết cánh sen chìm */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-lotus-500 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          {/* KHỐI CA DAO ĐẶC TRƯNG ĐẤT SEN HỒNG */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/40 border border-rose-900/30 text-center max-w-3xl mx-auto shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-lotus-900/60 border border-lotus-500/40 text-lotus-300 flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Flower2 className="w-5 h-5 text-lotus-400" />
            </div>

            <blockquote className="text-lg sm:text-xl md:text-2xl font-serif italic text-rose-100 leading-relaxed drop-shadow-sm">
              {lang === 'en'
                ? `"${HOMEPAGE_STORYTELLING.folk_verse.translation_en}"`
                : `"${HOMEPAGE_STORYTELLING.folk_verse.original_vi.replace('\n', ' • ')}"`}
            </blockquote>

            <p className="mt-3 text-xs sm:text-sm text-rose-300/80 font-medium tracking-wide">
              — {HOMEPAGE_STORYTELLING.folk_verse.author} —
            </p>
          </div>

          {/* 4 CỘT THÔNG TIN LIÊN KẾT NHANH */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10 text-sm">
            {/* Cột 1: Thương hiệu SenMap & Sứ mệnh di sản (col-span-4) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-lotus-600 flex items-center justify-center text-white shadow-md shadow-lotus-600/30">
                  <Flower2 className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-xl font-extrabold text-white tracking-tight">SenMap</span>
                  <span className="ml-1.5 text-xs font-bold px-2 py-0.5 rounded-md bg-lotus-900 text-lotus-300 border border-lotus-700">
                    Đồng Tháp
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.footerTagline}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 text-slate-400 border border-slate-800">
                  WGS84 • EPSG:4326
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 text-slate-400 border border-slate-800">
                  VN-2000 Đồng Tháp
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 text-slate-400 border border-slate-800">
                  PostGIS • React Leaflet
                </span>
              </div>
            </div>

            {/* Cột 2: Điều hướng nhanh (col-span-2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {t.quickLinks}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{t.linkHome}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/ban-do" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{t.linkMap}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/quet-qr" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{t.linkQr}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{t.linkAdmin}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 3: Di tích kiệt tác tiêu biểu (col-span-3) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {t.heritageMonuments}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/di-tich/1" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 truncate">
                    <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                    <span>KDT Nguyễn Sinh Sắc</span>
                  </Link>
                </li>
                <li>
                  <Link to="/di-tich/2" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 truncate">
                    <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                    <span>KDT Khảo cổ Gò Tháp</span>
                  </Link>
                </li>
                <li>
                  <Link to="/di-tich/3" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 truncate">
                    <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                    <span>KDT Căn cứ Xẻo Quýt</span>
                  </Link>
                </li>
                <li>
                  <Link to="/di-tich/4" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 truncate">
                    <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                    <span>Nhà cổ Huỳnh Thủy Lê</span>
                  </Link>
                </li>
                <li>
                  <Link to="/di-tich/6" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 truncate">
                    <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                    <span>Vườn quốc gia Tràm Chim</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 4: Thông tin Khóa luận tốt nghiệp (col-span-3) */}
            <div className="lg:col-span-3 space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-white/10">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-rose-400" />
                <span>{t.thesisInfoTitle}</span>
              </h4>
              <p className="text-xs text-slate-300 font-medium leading-snug">
                {t.thesisTopic}
              </p>
              <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">{t.studentLabel}</span>
                  <span className="font-semibold text-slate-200">{t.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{t.advisorLabel}</span>
                  <span className="font-semibold text-slate-200">{t.advisorName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* DÒNG BẢN QUYỀN VÀ TRẠNG THÁI HỆ THỐNG */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>{t.copyright}</p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>20/20 Di tích sẵn sàng</span>
              </span>
              <span>•</span>
              <span className="text-slate-400">FastAPI & Leaflet Engine</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
