import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Volume2,
  Square,
  MapPin,
  Sparkles,
  Award,
  ChevronRight,
  BookOpen,
  Navigation,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getLocalizedMonument } from '../../data/monumentsTranslationsEn';
import { INITIAL_MONUMENTS } from '../../data/monumentsData';

/**
 * =========================================================================================
 * COMPONENT: FeaturedMasterpiecesSection (Tầng 3 - Kiệt Tác Di Sản Đồng Tháp)
 * =========================================================================================
 * Định hướng thiết kế: Heritage Warm Editorial Style (Vietnam Travel & Kyoto Travel)
 * - Nền Đất Nung Phù Sa: bg-[#F4ECE7], khoảng trắng --density 2 (py-20 md:py-28, gap-8 lg:gap-10)
 * - Lưới Tạp Chí Bất Đối Xung: 1 Thẻ Tiêu Điểm Lớn + 4 Thẻ Dọc Washi #FFFFFF viền #E6DEC8
 * - Tối đa 4 thông tin vàng/thẻ: Xếp hạng, Tên font-serif #1E1B18, Huyện/Thị, Mô tả ngắn font-sans #4A453E
 * - 2 nút hành động: Đọc Hồ Sơ Di Sản (#9E1B32) và Định Vị Bản Đồ (#FFFFFF viền #E6DEC8)
 * - Triệt tiêu hoàn toàn neon glow và nền đen công nghệ
 * =========================================================================================
 */
export default function FeaturedMasterpiecesSection({ monuments = [], onLocateMonument }) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [speakingId, setSpeakingId] = useState(null);
  const utteranceRef = useRef(null);

  // 1. Tuyển chọn 5 di tích kiệt tác trọng điểm (1 Tiêu điểm lớn + 4 thẻ dọc)
  const masterpieceList = useMemo(() => {
    const source = monuments && monuments.length > 0 ? monuments : INITIAL_MONUMENTS;

    const id1 = source.find((m) => Number(m.id) === 1); // Nguyễn Sinh Sắc (Tiêu điểm)
    const id2 = source.find((m) => Number(m.id) === 2); // Gò Tháp
    const id3 = source.find((m) => Number(m.id) === 3); // Xẻo Quýt
    const id4 = source.find((m) => Number(m.id) === 4); // Huỳnh Thủy Lê
    const id6 = source.find((m) => Number(m.id) === 6); // Tràm Chim

    const candidates = [id1, id2, id3, id4, id6].filter(Boolean);
    return candidates.map((m) => getLocalizedMonument(m, lang));
  }, [monuments, lang]);

  const heroMonument = masterpieceList[0];
  const verticalMonuments = masterpieceList.slice(1, 5);

  // 2. Dừng phát audio khi đổi ngôn ngữ hoặc unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lang]);

  // 3. Xử lý nghe thử thuyết minh / Audio Preview
  const handleToggleAudio = (monument, e) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert(
        isEn
          ? 'Speech synthesis is not supported on this device.'
          : 'Trình duyệt không hỗ trợ đọc thuyết minh tự động.'
      );
      return;
    }

    if (speakingId === monument.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    const rawText =
      monument.displayAudioScript ||
      monument.audioScript ||
      monument.displayHistory ||
      monument.history ||
      '';
    let speechExcerpt = rawText;
    const sentenceMatches = rawText.match(/[^.!?]+[.!?]+/g);
    if (sentenceMatches && sentenceMatches.length > 0) {
      speechExcerpt = sentenceMatches.slice(0, 2).join(' ');
    } else if (rawText.length > 220) {
      speechExcerpt = rawText.substring(0, 220) + '...';
    }

    if (!speechExcerpt.trim()) return;

    const utterance = new SpeechSynthesisUtterance(speechExcerpt);
    utteranceRef.current = utterance;

    const targetLang = isEn ? 'en-US' : 'vi-VN';
    utterance.lang = targetLang;
    utterance.rate = 0.96;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const prefix = isEn ? 'en' : 'vi';
      const matched = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
      if (matched) {
        utterance.voice = matched;
      }
    }

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    window.speechSynthesis.speak(utterance);
    setSpeakingId(monument.id);
  };

  const t = {
    badge: isEn ? 'TIER 3 • HERITAGE MASTERPIECES' : 'TẦNG 3 • KIỆT TÁC DI SẢN ĐỒNG THÁP',
    titlePrefix: isEn ? 'Curated Masterpieces of' : 'Kiệt Tác Di Sản Tiêu Biểu',
    titleHighlight: isEn ? 'Đồng Tháp' : 'Đất Sen Hồng',
    subtitle: isEn
      ? 'A curated showcase of premier cultural, historic, and ecological landmarks — experienced through spatial discovery, voice narration, and high-precision GIS mapping.'
      : 'Bộ sưu tập tuyển chọn các di tích văn hóa - lịch sử và sinh thái kiệt xuất nhất tỉnh Đồng Tháp — trải nghiệm hồ sơ không gian, nghe thử thuyết minh giọng đọc và định vị bản đồ tức thì.',
    listenAudio: isEn ? 'Audio Preview' : 'Nghe Thuyết Minh',
    stopAudio: isEn ? 'Stop Audio' : 'Dừng Lại',
    viewHeritageSpace: isEn ? 'Read Heritage Profile' : 'Đọc Hồ Sơ Di Sản',
    locateOnMap: isEn ? 'Locate on Map' : 'Định Vị Bản Đồ',
  };

  return (
    <section
      id="featured-masterpieces"
      data-testid="featured-masterpieces-section"
      className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F4ECE7] select-none border-t border-[#E6DEC8]"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E6DEC8] text-[#9E1B32] text-xs font-bold uppercase tracking-[0.18em] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#9E1B32]" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1E1B18] tracking-tight leading-tight">
            {t.titlePrefix}{' '}
            <span className="text-[#9E1B32]">{t.titleHighlight}</span>
          </h2>

          <p className="text-sm sm:text-base text-[#4A453E] font-sans leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* 2. LƯỚI TẠP CHÍ BẤT ĐỐI XỨNG (EDITORIAL BENTO GRID) */}
        <div className="space-y-8 lg:space-y-10">
          {/* THẺ TIÊU ĐIỂM LỚN (HERO FEATURE CARD - KDT NGUYỄN SINH SẮC) */}
          {heroMonument && (
            <div className="rounded-3xl bg-[#FFFFFF] border border-[#E6DEC8] shadow-sm hover:shadow-md hover:border-[#D5C390] transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Ảnh Tiêu Điểm bên trái (7 cột) */}
              <div className="lg:col-span-7 relative h-72 sm:h-80 lg:h-[420px] bg-[#FAF7F2] overflow-hidden">
                <img
                  src={
                    heroMonument.thumbnail ||
                    `/images/monuments/monument_${heroMonument.id}.jpg`
                  }
                  alt={heroMonument.displayName}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `/images/monuments/monument_${heroMonument.id}.jpg`;
                  }}
                />
                {/* Ranking Badge nổi trên ảnh */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-[#9E1B32] text-white shadow-xs">
                  <Award className="w-3.5 h-3.5" />
                  <span>{heroMonument.displayRanking || heroMonument.ranking}</span>
                </div>
              </div>

              {/* Nội dung Tiêu Điểm bên phải (5 cột) */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#4A453E] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#9E1B32] shrink-0" />
                    <span>{heroMonument.displayDistrict || heroMonument.district}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B18] leading-tight">
                    {heroMonument.displayName}
                  </h3>

                  <p className="text-[#4A453E] text-sm leading-relaxed line-clamp-4 font-sans">
                    {heroMonument.displayHistory || heroMonument.history}
                  </p>
                </div>

                {/* Cụm Điều Khiển Âm Thanh & 2 Nút Hành Động */}
                <div className="space-y-3 pt-3 border-t border-[#E6DEC8]">
                  {/* Nút Audio Preview */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleAudio(heroMonument, e)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-between transition-all border ${
                      speakingId === heroMonument.id
                        ? 'bg-[#9E1B32] text-white border-[#9E1B32]'
                        : 'bg-[#FAF7F2] hover:bg-[#F4ECE7] text-[#1E1B18] border-[#E6DEC8]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {speakingId === heroMonument.id ? (
                        <Square className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-[#9E1B32]" />
                      )}
                      <span>
                        {speakingId === heroMonument.id ? t.stopAudio : t.listenAudio}
                      </span>
                    </div>
                    <span className="text-[11px] opacity-80">
                      {isEn ? 'AI Voice Tour' : 'Thuyết minh tự động'}
                    </span>
                  </button>

                  {/* 2 Nút Hành Động */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to={`/di-tich/${heroMonument.id}`}
                      className="py-2.5 px-3 rounded-xl bg-[#9E1B32] hover:bg-[#831427] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs text-center"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="truncate">{t.viewHeritageSpace}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => onLocateMonument && onLocateMonument(heroMonument)}
                      className="py-2.5 px-3 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF7F2] text-[#1E1B18] border border-[#E6DEC8] hover:border-[#D5C390] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs text-center"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#1E5631]" />
                      <span className="truncate">{t.locateOnMap}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4 THẺ DỌC WASHI (4 VERTICAL WASHI CARDS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {verticalMonuments.map((m) => {
              const isSpeaking = speakingId === m.id;
              const isSpecialNational =
                m.ranking?.includes('đặc biệt') ||
                m.ranking?.includes('Special') ||
                m.displayRanking?.includes('Special');

              return (
                <div
                  key={m.id}
                  className="rounded-2xl bg-[#FFFFFF] border border-[#E6DEC8] hover:border-[#D5C390] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Ảnh tỉ lệ 16:10 */}
                    <div className="relative h-48 w-full bg-[#FAF7F2] overflow-hidden">
                      <img
                        src={m.thumbnail || `/images/monuments/monument_${m.id}.jpg`}
                        alt={m.displayName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `/images/monuments/monument_${m.id}.jpg`;
                        }}
                      />
                      {/* 1. Xếp hạng (Ranking) */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs ${
                            isSpecialNational
                              ? 'bg-[#9E1B32] text-white'
                              : 'bg-[#FAF7F2] text-[#9E1B32] border border-[#E6DEC8]'
                          }`}
                        >
                          <Award className="w-3 h-3" />
                          <span>{m.displayRanking || m.ranking}</span>
                        </span>
                      </div>
                    </div>

                    {/* Nội dung thông tin vàng */}
                    <div className="p-5 space-y-2.5">
                      {/* 3. Huyện/Thị */}
                      <div className="flex items-center gap-1.5 text-xs text-[#4A453E]">
                        <MapPin className="w-3 h-3 text-[#9E1B32] shrink-0" />
                        <span className="truncate">{m.displayDistrict || m.district}</span>
                      </div>

                      {/* 2. Tên font-serif #1E1B18 */}
                      <h4 className="font-serif font-bold text-base text-[#1E1B18] group-hover:text-[#9E1B32] transition-colors leading-snug line-clamp-2">
                        {m.displayName}
                      </h4>

                      {/* 4. Mô tả ngắn font-sans #4A453E */}
                      <p className="text-xs text-[#4A453E] line-clamp-3 leading-relaxed font-sans">
                        {m.displayHistory || m.history}
                      </p>
                    </div>
                  </div>

                  {/* Chân thẻ: Audio Preview & 2 Nút Hành Động */}
                  <div className="p-5 pt-0 space-y-2.5">
                    {/* Audio Preview nhỏ gọn */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleAudio(m, e)}
                      className={`w-full py-1.5 px-2.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors border ${
                        isSpeaking
                          ? 'bg-[#9E1B32] text-white border-[#9E1B32]'
                          : 'bg-[#FAF7F2] hover:bg-[#F4ECE7] text-[#1E1B18] border-[#E6DEC8]'
                      }`}
                    >
                      {isSpeaking ? (
                        <Square className="w-3 h-3 fill-current" />
                      ) : (
                        <Volume2 className="w-3 h-3 text-[#9E1B32]" />
                      )}
                      <span>{isSpeaking ? t.stopAudio : t.listenAudio}</span>
                    </button>

                    {/* 2 Nút Hành Động */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E6DEC8]">
                      <Link
                        to={`/di-tich/${m.id}`}
                        className="py-2 px-2 rounded-xl bg-[#9E1B32] hover:bg-[#831427] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors text-center shadow-xs"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span className="truncate">{isEn ? 'Profile' : 'Hồ Sơ'}</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => onLocateMonument && onLocateMonument(m)}
                        className="py-2 px-2 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF7F2] text-[#1E1B18] border border-[#E6DEC8] hover:border-[#D5C390] text-[11px] font-bold flex items-center justify-center gap-1 transition-colors text-center shadow-xs"
                      >
                        <Navigation className="w-3 h-3 text-[#1E5631]" />
                        <span className="truncate">{isEn ? 'Map' : 'Bản Đồ'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
