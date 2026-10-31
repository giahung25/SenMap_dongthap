import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Volume2,
  Square,
  MapPin,
  Eye,
  Sparkles,
  Compass,
  Clock,
  Award,
  ChevronRight,
  ShieldCheck,
  Bookmark,
  Radio,
  Navigation,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getLocalizedMonument } from '../../data/monumentsTranslationsEn';
import { INITIAL_MONUMENTS } from '../../data/monumentsData';

/**
 * =========================================================================================
 * COMPONENT: FeaturedMasterpiecesSection (Tầng 3 - Kiệt Tác Di Sản Đồng Tháp)
 * =========================================================================================
 * Tuyển chọn 6 di tích kiệt tác tiêu biểu nhất của Đất Sen Hồng:
 *   1. Khu di tích Nguyễn Sinh Sắc (ID: 1) - Quốc gia đặc biệt
 *   2. Khu di tích khảo cổ Gò Tháp (ID: 2) - Quốc gia đặc biệt (Óc Eo / Phù Nam)
 *   3. Khu di tích Xẻo Quýt (ID: 3) - Căn cứ cách mạng ngập nước
 *   4. Nhà cổ Huỳnh Thủy Lê (ID: 4) - Kiệt tác kiến trúc Đông - Tây & tiểu thuyết Người Tình
 *   5. Vườn quốc gia Tràm Chim (ID: 6) - Khu Ramsar Thế giới thứ 2.000
 *   6. Chùa Kiến An Cung (ID: 5/8) - Cổ tự Phúc Kiến trăm năm tuổi
 *
 * Tính năng nổi bật:
 *   - Bento Grid / Editorial Cards đậm chất nghệ thuật dark luxury đồng bộ toàn trang
 *   - Audio Preview sống động với window.speechSynthesis (vi-VN / en-US), hiệu ứng sóng âm đang phát
 *   - 2 nút hành động trên mỗi thẻ: [Xem Không Gian Di Tích] & [Định Vị Trên Bản Đồ]
 *   - Song ngữ Việt - Anh hoàn hảo, chuẩn tương phản WCAG AAA
 * =========================================================================================
 */
export default function FeaturedMasterpiecesSection({ monuments = [], onLocateMonument }) {
  const { lang } = useLanguage();
  const [speakingId, setSpeakingId] = useState(null);
  const utteranceRef = useRef(null);

  // 1. Tuyển chọn 6 di tích kiệt tác từ nguồn dữ liệu (props hoặc INITIAL_MONUMENTS)
  const masterpieceList = useMemo(() => {
    const source = monuments && monuments.length > 0 ? monuments : INITIAL_MONUMENTS;

    const id1 = source.find((m) => Number(m.id) === 1);
    const id2 = source.find((m) => Number(m.id) === 2);
    const id3 = source.find((m) => Number(m.id) === 3);
    const id4 = source.find((m) => Number(m.id) === 4);
    const id6 = source.find((m) => Number(m.id) === 6);

    // Chùa Kiến An Cung: trong dataset chuẩn là ID 5, hỗ trợ linh hoạt nếu mock dùng ID 8 hoặc tên
    const idKienAnCung =
      source.find((m) => Number(m.id) === 8 && m.name?.toLowerCase().includes('kiến an cung')) ||
      source.find((m) => Number(m.id) === 5) ||
      source.find((m) => m.name?.toLowerCase().includes('kiến an cung')) ||
      source.find((m) => Number(m.id) === 8);

    const candidates = [id1, id2, id3, id4, id6, idKienAnCung].filter(Boolean);

    // Bản địa hóa từng di tích dựa trên ngôn ngữ hiện tại
    return candidates.map((m) => getLocalizedMonument(m, lang));
  }, [monuments, lang]);

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
      alert(lang === 'en' ? 'Speech synthesis is not supported on this device.' : 'Trình duyệt không hỗ trợ đọc thuyết minh tự động.');
      return;
    }

    // Nếu đang phát chính di tích này -> Dừng lại
    if (speakingId === monument.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    // Dừng âm thanh trước đó
    window.speechSynthesis.cancel();

    // Chuẩn bị đoạn văn bản mở đầu (1-2 câu đầu truyền cảm)
    const rawText = monument.displayAudioScript || monument.audioScript || monument.displayHistory || monument.history || '';
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

    const targetLang = lang === 'en' ? 'en-US' : 'vi-VN';
    utterance.lang = targetLang;
    utterance.rate = 0.96;
    utterance.pitch = 1.0;

    // Chọn giọng đọc phù hợp nếu danh sách giọng đã sẵn sàng
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const prefix = lang === 'en' ? 'en' : 'vi';
      const matched = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
      if (matched) {
        utterance.voice = matched;
      }
    }

    utterance.onend = () => {
      setSpeakingId(null);
    };

    utterance.onerror = () => {
      setSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
    setSpeakingId(monument.id);
  };

  // Dịch các nhãn giao diện
  const t = {
    badge: lang === 'en' ? 'TIER 3 • HERITAGE MASTERPIECES' : 'TẦNG 3 • KIỆT TÁC DI SẢN ĐỒNG THÁP',
    titleViPrefix: '6 Di Tích Kiệt Tác Tiêu Biểu',
    titleViHighlight: 'Đất Sen Hồng',
    titleEnPrefix: '6 Iconic Heritage Masterpieces of',
    titleEnHighlight: 'Đồng Tháp',
    subtitle:
      lang === 'en'
        ? 'Curated editorial showcase of premier heritage destinations — combining spatial discovery, automated voice narration, and high-precision GIS mapping.'
        : 'Bộ sưu tập tuyển chọn 6 di tích văn hóa - lịch sử và sinh thái kiệt xuất nhất tỉnh Đồng Tháp — trải nghiệm hồ sơ không gian, nghe thử thuyết minh giọng đọc và định vị bản đồ tức thì.',
    listenAudio: lang === 'en' ? 'Audio Preview' : 'Nghe Thử Thuyết Minh',
    stopAudio: lang === 'en' ? 'Stop Audio' : 'Dừng Lại',
    viewHeritageSpace: lang === 'en' ? 'Explore Heritage' : 'Xem Không Gian',
    locateOnMap: lang === 'en' ? 'Locate on Map' : 'Định Vị Bản Đồ',
    specialRank: lang === 'en' ? 'Special National' : 'Quốc gia đặc biệt',
    nationalRank: lang === 'en' ? 'National Heritage' : 'Cấp Quốc gia',
    provincialRank: lang === 'en' ? 'Provincial' : 'Cấp Tỉnh',
    viewsCount: lang === 'en' ? 'views' : 'lượt xem',
    scansCount: lang === 'en' ? 'scans' : 'quét QR',
    statusLive: lang === 'en' ? 'Verified Heritage' : 'Di sản chuẩn hóa',
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden border-t border-white/10 select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-at-c from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-lotus-600/10 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full bg-tram-600/10 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">
        {/* Header tiêu đề khu vực */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lotus-600/20 border border-lotus-500/30 text-lotus-300 text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-lotus-400 animate-pulse" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {lang === 'en' ? (
              <>
                {t.titleEnPrefix}{' '}
                <span className="bg-gradient-to-r from-lotus-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                  {t.titleEnHighlight}
                </span>
              </>
            ) : (
              <>
                {t.titleViPrefix}{' '}
                <span className="bg-gradient-to-r from-lotus-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                  {t.titleViHighlight}
                </span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Bento Grid Layout cho 6 di tích */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {masterpieceList.map((m, index) => {
            const isSpeaking = speakingId === m.id;
            const isHeroCard = index === 0; // KDT Nguyễn Sinh Sắc
            const isSecondaryHero = index === 1; // KDT Gò Tháp
            const isPanoramic = index === 5; // Chùa Kiến An Cung

            // Xác định phân bổ cột Bento
            let colSpanClasses = 'lg:col-span-4';
            if (isHeroCard) colSpanClasses = 'lg:col-span-8';
            else if (isSecondaryHero) colSpanClasses = 'lg:col-span-4';
            else if (isPanoramic) colSpanClasses = 'lg:col-span-12';

            const imageSrc =
              m.thumbnail ||
              `/images/monuments/monument_${m.id}.jpg` ||
              (m.gallery && m.gallery[0]) ||
              m.wikimediaUrl;

            const isSpecialNational =
              m.ranking?.includes('đặc biệt') ||
              m.ranking?.includes('Special') ||
              m.displayRanking?.includes('Special');

            return (
              <div
                key={m.id || index}
                className={`group relative rounded-3xl overflow-hidden bg-slate-900/90 border border-white/10 hover:border-lotus-500/50 shadow-xl hover:shadow-2xl hover:shadow-lotus-900/30 transition-all duration-500 flex flex-col justify-between backdrop-blur-md ${colSpanClasses}`}
              >
                {/* Khối Hình ảnh & Overlay Nghệ thuật */}
                <div
                  className={`relative w-full overflow-hidden bg-slate-950 ${
                    isPanoramic
                      ? 'h-64 sm:h-72 lg:h-80'
                      : isHeroCard
                      ? 'h-72 sm:h-80 lg:h-96'
                      : 'h-64 sm:h-72'
                  }`}
                >
                  <img
                    src={imageSrc}
                    alt={m.displayName || m.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `/images/monuments/monument_${m.id}.jpg`;
                    }}
                  />

                  {/* Gradient tối tạo độ tương phản cho chữ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Huy hiệu trên góc ảnh */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md shadow-md ${
                          isSpecialNational
                            ? 'bg-lotus-600/90 text-white border border-lotus-400/50'
                            : 'bg-slate-900/80 text-amber-300 border border-amber-400/30'
                        }`}
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>{m.displayRanking || m.ranking}</span>
                      </span>

                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-slate-200 backdrop-blur-md border border-white/10">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        <span>{m.displayDistrict || m.district}</span>
                      </span>
                    </div>

                    {/* Huy hiệu Di sản chuẩn hóa */}
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-600/90 text-white backdrop-blur-md shadow-sm border border-emerald-400/30">
                      <ShieldCheck className="w-3 h-3" />
                      <span className="hidden xs:inline">{t.statusLive}</span>
                    </div>
                  </div>

                  {/* Tiêu đề & Thông tin nằm đè trên nền ảnh */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <p className="text-xs font-medium uppercase tracking-wider text-rose-300 mb-1 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      <span>{m.displayCategory || m.category}</span>
                    </p>
                    <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold leading-snug drop-shadow-md text-white group-hover:text-amber-200 transition-colors duration-300">
                      {m.displayName || m.name}
                    </h3>
                    {m.displayOtherName && (
                      <p className="text-xs sm:text-sm text-slate-300 italic line-clamp-1 mt-0.5 opacity-90">
                        {m.displayOtherName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phần Thân thẻ: Tóm tắt Văn hóa & Nút Nghe Thử */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-slate-900/90">
                  <div>
                    {/* Đoạn tóm tắt giá trị văn hóa lịch sử */}
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-4">
                      {m.displayHistory || m.history}
                    </p>

                    {/* Thông số phụ: Giờ mở cửa & Số lượt tương tác */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 py-2.5 border-y border-white/10 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{m.displayOpeningHours || m.openingHours || '07:00 - 17:00'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-sky-400" />
                        <span>{(m.views || 4500).toLocaleString()} {t.viewsCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cụm Nút Tương tác & Audio Thuyết minh */}
                  <div className="space-y-3 pt-2">
                    {/* NÚT ĐẶC BIỆT: Nghe thử thuyết minh / Audio Preview */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleAudio(m, e)}
                      aria-label={isSpeaking ? t.stopAudio : t.listenAudio}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-all duration-300 border ${
                        isSpeaking
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg ring-2 ring-rose-400/40 animate-pulse'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 hover:text-white shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isSpeaking ? (
                          <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-sm">
                            <Square className="w-3.5 h-3.5 fill-current" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-lg bg-white/10 text-rose-400 flex items-center justify-center">
                            <Volume2 className="w-4 h-4" />
                          </div>
                        )}
                        <span className="font-medium">
                          {isSpeaking ? t.stopAudio : t.listenAudio}
                        </span>
                      </div>

                      {/* Hiệu ứng sóng âm thanh động khi đang phát */}
                      {isSpeaking ? (
                        <div className="flex items-center gap-1 h-4 px-2 bg-rose-900/60 rounded-md border border-rose-500/30">
                          <span className="w-1 bg-rose-400 rounded-full h-3 animate-[bounce_0.6s_infinite]" />
                          <span className="w-1 bg-rose-400 rounded-full h-4 animate-[bounce_0.8s_infinite]" />
                          <span className="w-1 bg-rose-400 rounded-full h-2 animate-[bounce_0.5s_infinite]" />
                          <span className="w-1 bg-rose-400 rounded-full h-3.5 animate-[bounce_0.7s_infinite]" />
                        </div>
                      ) : (
                        <span className="text-[11px] font-normal text-slate-400">
                          {lang === 'en' ? 'Natural AI Voice' : 'Giọng đọc AI'}
                        </span>
                      )}
                    </button>

                    {/* 2 NÚT HÀNH ĐỘNG CHÍNH */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Nút 1: [Xem Không Gian Di Tích] (Link tới /di-tich/:id) */}
                      <Link
                        to={`/di-tich/${m.id}`}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-lotus-600 to-rose-600 hover:from-lotus-500 hover:to-rose-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center"
                      >
                        <Eye className="w-3.5 h-3.5 text-white" />
                        <span className="truncate">{t.viewHeritageSpace}</span>
                      </Link>

                      {/* Nút 2: [Định Vị Trên Bản Đồ] (Gọi callback onLocateMonument) */}
                      <button
                        type="button"
                        onClick={() => onLocateMonument && onLocateMonument(m)}
                        className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/20 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 text-center"
                      >
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span className="truncate">{t.locateOnMap}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
