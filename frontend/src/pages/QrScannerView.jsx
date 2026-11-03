import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { monumentApi } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedMonument } from '../data/monumentsTranslationsEn';
import {
  ArrowLeft,
  Flashlight,
  FlashlightOff,
  Volume2,
  VolumeX,
  Scan,
  QrCode,
  CheckCircle2,
  Camera,
  MapPin,
  Sparkles,
} from 'lucide-react';

/**
 * =========================================================================================
 * COMPONENT: QrScannerView (Trang Quét Mã QR Thực Địa Di Tích Đồng Tháp)
 * =========================================================================================
 * Định hướng thiết kế: Heritage Warm Editorial Style (Vietnam Travel & Kyoto Travel)
 * - Nền sáng ấm Giấy Dó #FAF7F2, chữ Mực Than #1E1B18, phụ đề Nâu Cổ #4A453E
 * - Top Header: Kính mờ ngà sáng #FAF7F2/95, viền #E6DEC8, nút Back .btn-washi-outline,
 *   tiêu đề H1 font-serif (Noto Serif Display) cùng icon QrCode Đỏ Son #9E1B32
 * - Khung ngắm Camera: Khung thẻ trang trọng viền kép Vàng Tatami #D5C390 & #E6DEC8,
 *   bên trong giữ nền tối (#1E1B18/95) tôn vinh tia quét laser Đỏ Son #9E1B32 & 4 góc ngắm Vàng Kim #D5C390
 * - Khay mô phỏng quét nhanh: Nền Đất Nung Phù Sa #F4ECE7, viền #E6DEC8, 20 thẻ Washi #FFFFFF
 * - Bảo toàn 100% logic camera, ghi nhận lượt quét recordQrScan và điều hướng chi tiết
 * =========================================================================================
 */
export default function QrScannerView() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scanner State
  const [torchOn, setTorchOn] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanSuccessItem, setScanSuccessItem] = useState(null);

  const videoRef = useRef(null);

  // Load all 20 monuments for quick testing/simulation
  useEffect(() => {
    monumentApi.getAll().then((data) => {
      setMonuments(data);
      setLoading(false);
    });
  }, []);

  // Try to start live camera
  useEffect(() => {
    let stream = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play().catch(() => {});
            setCameraActive(true);
          }
        })
        .catch((err) => {
          console.info('Live camera not available or permission denied, using simulation viewfinder.', err);
          setCameraActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((trk) => trk.stop());
      }
    };
  }, []);

  // Localize monuments list
  const localizedMonuments = useMemo(() => {
    return monuments.map((m) => getLocalizedMonument(m, lang));
  }, [monuments, lang]);

  // Simulate scanning a monument's QR code
  const handleScanMonument = async (m) => {
    // Record scan in API
    await monumentApi.recordQrScan(m.id);
    setScanSuccessItem(m);

    // After 1.2s show effect, redirect to monument detail with language preserved
    setTimeout(() => {
      navigate(`/di-tich/${m.id}?lang=${lang}`);
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF7F2] text-[#1E1B18] flex flex-col justify-between relative overflow-hidden select-none">
      {/* ============================================================== */}
      {/* 1. TOP HEADER CONTROLS (Back, Title, Flash, Sound)             */}
      {/* ============================================================== */}
      <header className="px-4 sm:px-6 py-4 z-20 flex items-center justify-between bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DEC8] shadow-xs">
        {/* Nút Back Washi Outline */}
        <Link
          to="/"
          className="p-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#F4ECE7] border border-[#E6DEC8] hover:border-[#D5C390] text-[#1E1B18] transition-all flex items-center justify-center shadow-2xs active:scale-95"
          title="Quay lại"
        >
          <ArrowLeft className="w-5 h-5 text-[#1E1B18]" />
        </Link>

        {/* Tiêu đề H1 Noto Serif Display & Icon Đỏ Son */}
        <div className="text-center px-2">
          <h1 className="text-base sm:text-lg font-serif font-bold tracking-tight text-[#1E1B18] flex items-center justify-center gap-2">
            <QrCode className="w-5 h-5 text-[#9E1B32]" />
            <span>{t('qrScannerTitle')}</span>
          </h1>
          <p className="text-[11px] text-[#4A453E] font-sans mt-0.5">
            {t('qrScannerSubtitle')}
          </p>
        </div>

        {/* Cụm Nút Flash & Âm Thanh */}
        <div className="flex items-center gap-2">
          {/* Nút Flash / Đèn Pin */}
          <button
            type="button"
            onClick={() => setTorchOn(!torchOn)}
            className={`p-2.5 rounded-full border transition-all shadow-2xs active:scale-95 ${
              torchOn
                ? 'bg-[#D5C390] text-[#1E1B18] border-[#D5C390] shadow-sm shadow-[#D5C390]/40'
                : 'bg-[#FFFFFF] hover:bg-[#FAF7F2] text-[#4A453E] border-[#E6DEC8] hover:border-[#D5C390]'
            }`}
            title="Đèn flash"
          >
            {torchOn ? (
              <Flashlight className="w-5 h-5 text-[#1E1B18]" />
            ) : (
              <FlashlightOff className="w-5 h-5" />
            )}
          </button>

          {/* Nút Âm Thanh Thuyết Minh */}
          <button
            type="button"
            onClick={() => setSoundOn(!soundOn)}
            className={`p-2.5 rounded-full border bg-[#FFFFFF] hover:bg-[#FAF7F2] border-[#E6DEC8] hover:border-[#D5C390] transition-all shadow-2xs active:scale-95 ${
              soundOn ? 'text-[#1E5631]' : 'text-[#4A453E] opacity-60'
            }`}
            title="Âm thanh"
          >
            {soundOn ? (
              <Volume2 className="w-5 h-5 text-[#1E5631]" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. CENTER SCANNER VIEWPORT WITH HERITAGE RETICLE & LASER LINE  */}
      {/* ============================================================== */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-4 sm:p-6 my-auto">
        {/* Khung Thẻ Viền Kép Vàng Tatami #D5C390 & #E6DEC8 */}
        <div className="p-2 sm:p-2.5 rounded-3xl sm:rounded-[2rem] bg-[#FFFFFF] border-2 border-[#D5C390] shadow-xl ring-4 ring-[#E6DEC8]/60 transition-all">
          {/* Viewfinder Target Frame (Ống kính camera giữ nền tối kỹ thuật theo MASTER.md Mục 5.1) */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-[#1E1B18]/95 flex items-center justify-center shadow-inner">
            {/* Live Video Feed or Fallback Poster */}
            {cameraActive ? (
              <video
                ref={videoRef}
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#1E1B18]/90">
                <div className="w-14 h-14 rounded-2xl bg-[#FFFFFF]/10 border border-[#D5C390]/40 flex items-center justify-center mb-3">
                  <Camera className="w-7 h-7 text-[#D5C390] animate-pulse" />
                </div>
                <p className="text-xs text-white font-serif font-bold tracking-wide">
                  {t('cameraReady')}
                </p>
                <p className="text-[10px] text-[#D5C390]/80 mt-1 max-w-[220px] font-sans leading-relaxed">
                  {t('cameraHint')}
                </p>
              </div>
            )}

            {/* 4 Góc Ngắm Vàng Kim Hoàng Triều (#D5C390) */}
            <div className="absolute top-2.5 left-2.5 w-7 h-7 border-t-4 border-l-4 border-[#D5C390] rounded-tl-xl pointer-events-none shadow-xs" />
            <div className="absolute top-2.5 right-2.5 w-7 h-7 border-t-4 border-r-4 border-[#D5C390] rounded-tr-xl pointer-events-none shadow-xs" />
            <div className="absolute bottom-2.5 left-2.5 w-7 h-7 border-b-4 border-l-4 border-[#D5C390] rounded-bl-xl pointer-events-none shadow-xs" />
            <div className="absolute bottom-2.5 right-2.5 w-7 h-7 border-b-4 border-r-4 border-[#D5C390] rounded-br-xl pointer-events-none shadow-xs" />

            {/* Tia Quét Laser Đỏ Son Thếp Vàng (#9E1B32) */}
            <div className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#9E1B32] to-transparent shadow-[0_0_10px_#9E1B32] animate-[bounce_2.5s_infinite] pointer-events-none" />

            {/* Tâm Ngắm Trung Tâm (Center Reticle) */}
            <div className="w-12 h-12 border border-[#D5C390]/50 rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-[#9E1B32]" />
            </div>

            {/* Thông Báo Quét Thành Công (Scan Success Toast) trên Thẻ Washi #FFFFFF */}
            {scanSuccessItem && (
              <div className="absolute inset-3 sm:inset-4 rounded-2xl bg-[#FFFFFF]/95 backdrop-blur-md border-2 border-[#1E5631] shadow-2xl flex flex-col items-center justify-center text-center p-4 animate-in fade-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#1E5631]/40 flex items-center justify-center mb-2 shadow-2xs">
                  <CheckCircle2 className="w-7 h-7 text-[#1E5631] animate-bounce" />
                </div>
                <h3 className="text-sm sm:text-base font-serif font-bold text-[#1E1B18]">
                  {t('scanSuccess')}
                </h3>
                <p className="text-xs text-[#9E1B32] font-serif font-bold truncate max-w-[230px] mt-1">
                  {scanSuccessItem.displayName || scanSuccessItem.name}
                </p>
                <span className="text-[10px] text-[#4A453E] mt-2 font-sans">
                  {t('openingDetailMsg')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Lời Nhắc Nhở Người Dùng */}
        <p className="text-xs text-[#4A453E] font-medium text-center mt-4 max-w-sm px-4 leading-relaxed font-sans">
          {t('qrAimGuidance')}
        </p>
      </div>

      {/* ============================================================== */}
      {/* 3. KHAY MÔ PHỎNG QUÉT NHANH 20 MÃ QR DI TÍCH (BOTTOM TRAY)     */}
      {/* ============================================================== */}
      <div className="z-20 bg-[#F4ECE7] border-t border-[#E6DEC8] rounded-t-3xl shadow-lg p-4 sm:p-5 max-h-[46vh] flex flex-col">
        {/* Header khay */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E6DEC8]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#9E1B32]">
              qr_code_scanner
            </span>
            <span className="text-xs font-serif font-bold text-[#1E1B18] uppercase tracking-wider">
              {t('quickTestTitle')}
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FFFFFF] text-[#4A453E] border border-[#E6DEC8] shadow-2xs">
            {t('fieldMode')}
          </span>
        </div>

        {/* Danh sách cuộn 20 Thẻ Di Tích Washi Card */}
        <div className="flex-1 overflow-y-auto pt-3 space-y-2.5 no-scrollbar">
          {localizedMonuments.map((m) => {
            const isSpecial =
              m.ranking === 'Quốc gia đặc biệt' ||
              m.cap_xep_hang === 'Quốc gia đặc biệt' ||
              m.displayRanking?.includes('Special');

            return (
              <div
                key={m.id}
                onClick={() => handleScanMonument(m)}
                className="p-3 rounded-2xl bg-[#FFFFFF] hover:bg-[#FAF7F2] border border-[#E6DEC8] hover:border-[#D5C390] cursor-pointer transition-all flex items-center justify-between gap-3 group shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Thumbnail di tích */}
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E6DEC8] shrink-0">
                    <img
                      src={m.thumbnail || `/images/monuments/monument_${m.id}.jpg`}
                      alt={m.displayName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `/images/monuments/monument_${m.id}.jpg`;
                      }}
                    />
                  </div>

                  {/* Thông tin di tích */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                          isSpecial
                            ? 'bg-[#FAF7F2] text-[#9E1B32] border-[#E6DEC8]'
                            : 'bg-[#FAF7F2] text-[#1E5631] border-[#E6DEC8]'
                        }`}
                      >
                        {m.displayRanking}
                      </span>
                      <span className="text-[10px] text-[#4A453E] truncate flex items-center gap-0.5">
                        <MapPin className="w-2.5 h-2.5 text-[#9E1B32] shrink-0" />
                        <span className="truncate">{m.displayDistrict || m.district}</span>
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1E1B18] truncate group-hover:text-[#9E1B32] transition-colors">
                      {m.displayName}
                    </h4>
                  </div>
                </div>

                {/* Nút quét nhanh */}
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl bg-[#9E1B32] group-hover:bg-[#831427] text-white font-bold text-[11px] shrink-0 flex items-center gap-1 shadow-2xs transition-all active:scale-95"
                >
                  <Scan className="w-3.5 h-3.5" />
                  <span>{t('scanBtn')}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
