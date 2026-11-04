import React, { useState, useEffect } from 'react';

/**
 * =========================================================================================
 * COMPONENT: CulturalHeritageBackdrop
 * =========================================================================================
 * Nền Văn Hóa Chuyển Động Theo Cuộn Trang (Scroll-Driven Bronze Drum & Red-Crowned Cranes)
 * - Mặt Trống Đồng Đông Sơn - Óc Eo kết hợp Cánh Sen Đồng Tháp (14 Cánh Sao, 8 Chim Lạc, 16 Cánh Sen)
 * - Đàn Sếu Đầu Đỏ Tràm Chim sải cánh bay lượn (Hiệu ứng Parallax mượt 60fps)
 * - 3 Mặt Trống Đồng: 1 Mặt Lớn Trung Tâm Hero + 2 Mặt Bán Nguyệt Lăn/Xoay từ mép trái & phải
 * =========================================================================================
 */

// Tọa độ 14 Cánh Sao Tâm Trống Đồng
const STAR_14_POINTS = (() => {
  const cx = 300, cy = 300, rOuter = 58, rInner = 22, points = 14;
  const pts = [];
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? rOuter : rInner;
    const x = (cx + r * Math.cos(angle)).toFixed(1);
    const y = (cy + r * Math.sin(angle)).toFixed(1);
    pts.push(`${x},${y}`);
  }
  return pts.join(' ');
})();

// Tọa độ Tam Giác Răng Cưa Vành 2 (28 Răng)
const SAWTOOTH_28_POINTS = (() => {
  const cx = 300, cy = 300, rOut = 114, rIn = 100, teeth = 28;
  const pts = [];
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (i * Math.PI) / teeth;
    const r = i % 2 === 0 ? rOut : rIn;
    const x = (cx + r * Math.cos(angle)).toFixed(1);
    const y = (cy + r * Math.sin(angle)).toFixed(1);
    pts.push(`${x},${y}`);
  }
  return pts.join(' ');
})();

// Chi tiết Vector Mặt Trống Đồng & Cánh Sen Mandala SVG
export function BronzeDrumMandala({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        {/* Vàng Kim Cổ Điển Đông Sơn */}
        <linearGradient id="bronzeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C59B27" />
          <stop offset="45%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        {/* Đỏ Chu Sa & Hồng Sen */}
        <linearGradient id="lotusCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E11D48" />
          <stop offset="60%" stopColor="#BE123C" />
          <stop offset="100%" stopColor="#9E1B32" />
        </linearGradient>

        {/* Gradient Cánh Sen Nở */}
        <linearGradient id="lotusPetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E11D48" stopOpacity="0.32" />
          <stop offset="65%" stopColor="#D5C390" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0.02" />
        </linearGradient>

        {/* Vầng Thái Dương Tỏa Sáng Trung Tâm */}
        <radialGradient id="sunCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.38" />
          <stop offset="55%" stopColor="#E11D48" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Vầng hào quang trung tâm */}
      <circle cx="300" cy="300" r="148" fill="url(#sunCenterGlow)" />

      {/* ============================================================== */}
      {/* VÀNH NGOÀI CÙNG (VÒNG 5): 16 CÁNH SEN ĐỒNG THÁP MANDALA         */}
      {/* ============================================================== */}
      <circle cx="300" cy="300" r="294" stroke="url(#bronzeGoldGrad)" strokeWidth="2.5" />
      <circle cx="300" cy="300" r="286" stroke="url(#lotusCrimsonGrad)" strokeWidth="1.2" strokeDasharray="3, 4" />
      <circle cx="300" cy="300" r="268" stroke="url(#bronzeGoldGrad)" strokeWidth="1.8" />

      {/* 16 Cánh Sen Đồng Tháp uốn lượn trang nhã */}
      {[...Array(16)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 22.5} 300 300)`}>
          <path
            d="M 285 32 C 291 8 309 8 315 32 C 308 40 292 40 285 32 Z"
            fill="url(#lotusPetalGrad)"
            stroke="url(#bronzeGoldGrad)"
            strokeWidth="1.4"
          />
          <line x1="300" y1="12" x2="300" y2="34" stroke="url(#lotusCrimsonGrad)" strokeWidth="1" />
        </g>
      ))}

      {/* ============================================================== */}
      {/* VÒNG 4: HOA VĂN RĂNG LƯỢC & ĐƯỜNG TRÒN ĐỒNG TÂM                */}
      {/* ============================================================== */}
      <circle cx="300" cy="300" r="256" stroke="url(#bronzeGoldGrad)" strokeWidth="1.6" />
      <circle cx="300" cy="300" r="240" stroke="url(#lotusCrimsonGrad)" strokeWidth="1.2" strokeDasharray="4, 5" />
      <circle cx="300" cy="300" r="226" stroke="url(#bronzeGoldGrad)" strokeWidth="1.8" />

      {/* ============================================================== */}
      {/* VÒNG 3: 8 CHIM LẠC / SẾU ĐẦU ĐỎ SẢI CÁNH BAY QUANH MẶT TRỜI   */}
      {/* Bay ngược chiều kim đồng hồ theo chuẩn văn hóa Đông Sơn         */}
      {/* ============================================================== */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 300 300)`}>
          {/* Thân & Cánh Sếu đầu đỏ */}
          <path
            d="M 234 112 Q 254 109 270 114 C 275 92 288 77 318 83 C 304 98 296 108 294 115 C 304 114 316 114 328 112 C 322 115 318 117 314 119 L 350 120 L 348 122 L 312 121 C 306 124 298 136 312 140 C 290 144 280 130 286 118 Q 260 118 248 115 Z"
            fill="url(#bronzeGoldGrad)"
            stroke="url(#lotusCrimsonGrad)"
            strokeWidth="0.8"
          />
          {/* Mỏ & Mắt Sếu */}
          <circle cx="245" cy="111" r="2.4" fill="#E11D48" />
        </g>
      ))}

      {/* ============================================================== */}
      {/* VÒNG 2: HỒI VĂN CHỮ S / SÓNG NƯỚC ÓC EO & TAM GIÁC RĂNG CƯA     */}
      {/* ============================================================== */}
      <circle cx="300" cy="300" r="162" stroke="url(#bronzeGoldGrad)" strokeWidth="1.6" />
      <circle cx="300" cy="300" r="148" stroke="url(#lotusCrimsonGrad)" strokeWidth="1.2" strokeDasharray="3, 3" />
      
      {/* Hồi văn chữ S / vòng xoáy sóng nước Óc Eo */}
      {[...Array(16)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 22.5} 300 300)`}>
          <circle cx="300" cy="155" r="3.5" stroke="url(#bronzeGoldGrad)" strokeWidth="1" fill="#FAF7F2" />
          <path d="M 297 155 Q 300 152 303 155 Q 300 158 297 155" stroke="url(#lotusCrimsonGrad)" strokeWidth="0.8" />
        </g>
      ))}

      <circle cx="300" cy="300" r="126" stroke="url(#bronzeGoldGrad)" strokeWidth="1.6" />
      {/* Tam giác răng cưa Đông Sơn 28 răng */}
      <polygon points={SAWTOOTH_28_POINTS} stroke="url(#bronzeGoldGrad)" strokeWidth="1.2" fill="url(#bronzeGoldGrad)" fillOpacity="0.25" />
      <circle cx="300" cy="300" r="92" stroke="url(#bronzeGoldGrad)" strokeWidth="1.6" />

      {/* ============================================================== */}
      {/* VÒNG 1: CHẤM NHỎ ĐỒNG TÂM & TÂM NGÔI SAO 14 CÁNH SẮC NÉT       */}
      {/* ============================================================== */}
      <circle cx="300" cy="300" r="76" stroke="url(#lotusCrimsonGrad)" strokeWidth="1.5" strokeDasharray="2, 4" />
      <circle cx="300" cy="300" r="66" stroke="url(#bronzeGoldGrad)" strokeWidth="1.8" />

      {/* Ngôi sao 14 cánh biểu tượng Mặt trời Đông Sơn */}
      <polygon points={STAR_14_POINTS} fill="url(#bronzeGoldGrad)" stroke="url(#lotusCrimsonGrad)" strokeWidth="1.5" />

      {/* Lõi trung tâm */}
      <circle cx="300" cy="300" r="13" fill="#FAF7F2" stroke="url(#lotusCrimsonGrad)" strokeWidth="2.2" />
      <circle cx="300" cy="300" r="4.5" fill="#9E1B32" />
    </svg>
  );
}

// Cụm 3 Chú Sếu Đầu Đỏ Tràm Chim Bay Lượn (Red-Crowned Cranes Line Art)
export function RedCrownedCranesFlock({ className = '', style = {}, flipped = false }) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        ...style,
        transform: `${style.transform || ''} ${flipped ? 'scaleX(-1)' : ''}`,
      }}
    >
      <svg
        viewBox="0 0 280 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="craneBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C59B27" />
            <stop offset="60%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#9E1B32" />
          </linearGradient>
        </defs>

        {/* Chú Sếu 1 (Sếu Dẫn Đầu - Lớn nhất, vỗ cánh uy nghi) */}
        <g transform="translate(10, 15) scale(0.95)">
          {/* Đầu & Mỏ Sếu */}
          <path d="M 12 70 L 32 68 Q 45 66 56 74" stroke="url(#craneBodyGrad)" strokeWidth="2.2" strokeLinecap="round" />
          {/* Chỏm đỏ rực trên đỉnh đầu sếu */}
          <circle cx="36" cy="67" r="3.2" fill="#E11D48" />
          <circle cx="36" cy="67" r="1.5" fill="#FFE4E6" />
          {/* Cổ cong chữ S thanh mảnh */}
          <path d="M 56 74 Q 72 86 86 82 Q 98 78 110 84" stroke="url(#craneBodyGrad)" strokeWidth="2.4" fill="none" />
          {/* Thân mình thon mượt */}
          <path d="M 110 84 Q 130 82 155 88 Q 140 98 120 96 Z" fill="url(#craneBodyGrad)" fillOpacity="0.25" stroke="url(#craneBodyGrad)" strokeWidth="1.8" />
          {/* Cánh trên giương cao */}
          <path d="M 118 84 C 114 42 136 18 168 12 C 158 38 144 62 135 84 Z" fill="url(#craneBodyGrad)" fillOpacity="0.3" stroke="url(#craneBodyGrad)" strokeWidth="1.8" />
          {/* Lông vũ đầu cánh xòe */}
          <path d="M 168 12 L 180 16 M 164 18 L 176 24 M 158 26 L 170 32" stroke="#9E1B32" strokeWidth="1.5" strokeLinecap="round" />
          {/* Cánh dưới lướt gió */}
          <path d="M 124 94 C 130 118 148 132 172 130 C 158 116 146 102 138 94 Z" fill="url(#craneBodyGrad)" fillOpacity="0.25" stroke="url(#craneBodyGrad)" strokeWidth="1.6" />
          {/* Chân dài thanh mảnh duỗi thẳng về sau */}
          <path d="M 155 88 L 225 102 M 155 90 L 220 106" stroke="#9E1B32" strokeWidth="1.4" strokeLinecap="round" />
        </g>

        {/* Chú Sếu 2 (Bay kèm phía trên - Vừa phải) */}
        <g transform="translate(110, 5) scale(0.68)">
          <path d="M 12 70 L 32 68 Q 45 66 56 74" stroke="url(#craneBodyGrad)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="36" cy="67" r="2.8" fill="#E11D48" />
          <path d="M 56 74 Q 72 86 86 82 Q 98 78 110 84" stroke="url(#craneBodyGrad)" strokeWidth="2" fill="none" />
          <path d="M 110 84 Q 130 82 155 88 Q 140 98 120 96 Z" fill="url(#craneBodyGrad)" fillOpacity="0.2" stroke="url(#craneBodyGrad)" strokeWidth="1.5" />
          <path d="M 118 84 C 114 42 136 18 168 12 C 158 38 144 62 135 84 Z" fill="url(#craneBodyGrad)" fillOpacity="0.25" stroke="url(#craneBodyGrad)" strokeWidth="1.5" />
          <path d="M 124 94 C 130 118 148 132 172 130 C 158 116 146 102 138 94 Z" fill="url(#craneBodyGrad)" fillOpacity="0.2" stroke="url(#craneBodyGrad)" strokeWidth="1.4" />
          <path d="M 155 88 L 225 102 M 155 90 L 220 106" stroke="#9E1B32" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Chú Sếu 3 (Bay lượn phía sau - Nhỏ nhắn) */}
        <g transform="translate(35, 78) scale(0.52)">
          <path d="M 12 70 L 32 68 Q 45 66 56 74" stroke="url(#craneBodyGrad)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="36" cy="67" r="2.6" fill="#E11D48" />
          <path d="M 56 74 Q 72 86 86 82 Q 98 78 110 84" stroke="url(#craneBodyGrad)" strokeWidth="2" fill="none" />
          <path d="M 110 84 Q 130 82 155 88 Q 140 98 120 96 Z" fill="url(#craneBodyGrad)" fillOpacity="0.2" stroke="url(#craneBodyGrad)" strokeWidth="1.4" />
          <path d="M 118 84 C 114 42 136 18 168 12 C 158 38 144 62 135 84 Z" fill="url(#craneBodyGrad)" fillOpacity="0.22" stroke="url(#craneBodyGrad)" strokeWidth="1.4" />
          <path d="M 155 88 L 225 102" stroke="#9E1B32" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

export default function CulturalHeritageBackdrop({ mode = 'full' }) {
  const [scrollY, setScrollY] = useState(0);

  // Hook lắng nghe scroll thụ động 60fps với requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || window.pageYOffset || 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tính toán biến đổi hình học theo độ cuộn
  const centerRotation = scrollY * 0.18;
  const centerScale = 1 + Math.min(scrollY * 0.0004, 0.25);
  const centerTranslateY = scrollY * 0.15;

  const rightTranslateX = Math.max(0, 120 - scrollY * 0.15);
  const rightRotation = -scrollY * 0.15;

  const leftTranslateX = -Math.max(0, 100 - scrollY * 0.12);
  const leftRotation = scrollY * 0.12;

  const showHero = mode === 'full' || mode === 'hero';
  const showSides = mode === 'full' || mode === 'sides';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ============================================================== */}
      {/* 1. MẶT TRỐNG ĐỒNG TRUNG TÂM Ở HERO (Scroll-Linked + Auto Spin)  */}
      {/* Tự động xoay chậm liên tục và tăng tốc xoay to ra khi cuộn      */}
      {/* ============================================================== */}
      {showHero && (
        <div
          className="absolute top-[10px] sm:top-[20px] left-1/2 w-[560px] h-[560px] sm:w-[780px] sm:h-[780px] opacity-[0.14] sm:opacity-[0.16] transition-transform duration-100 ease-out will-change-transform"
          style={{
            transform: `translate(-50%, ${centerTranslateY}px) rotate(${centerRotation}deg) scale(${centerScale})`,
            maskImage: 'radial-gradient(circle, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,0.8) 100%)',
            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,0.8) 100%)',
          }}
        >
          <BronzeDrumMandala className="w-full h-full drop-shadow-xs animate-[spin_160s_linear_infinite]" />
        </div>
      )}

      {/* ============================================================== */}
      {/* 2 & 3. MẶT TRỐNG ĐỒNG BÁN NGUYỆT RÌA PHẢI & RÌA TRÁI (Fixed)    */}
      {/* ============================================================== */}
      {showSides && (
        <>
          <div
            className="fixed -right-[220px] sm:-right-[260px] top-1/4 w-[480px] h-[480px] sm:w-[540px] sm:h-[540px] opacity-18 transition-transform duration-100 ease-out will-change-transform z-0"
            style={{
              transform: `translateX(${rightTranslateX}px) rotate(${rightRotation}deg)`,
            }}
          >
            <BronzeDrumMandala className="w-full h-full" />
          </div>

          <div
            className="fixed -left-[240px] sm:-left-[280px] bottom-16 w-[460px] h-[460px] sm:w-[520px] sm:h-[520px] opacity-16 transition-transform duration-100 ease-out will-change-transform z-0"
            style={{
              transform: `translateX(${leftTranslateX}px) rotate(${leftRotation}deg)`,
            }}
          >
            <BronzeDrumMandala className="w-full h-full" />
          </div>
        </>
      )}

      {/* ============================================================== */}
      {/* 4. ĐÀN SẾU ĐẦU ĐỎ TRÀM CHIM SẢI CÁNH BAY (Parallax Drift)       */}
      {/* ============================================================== */}
      {showHero && (
        <>
          {/* Cụm 1: Góc trên bên trái Hero */}
          <div
            className="absolute top-12 sm:top-20 left-4 sm:left-14 w-44 sm:w-64 opacity-30 transition-transform duration-100 ease-out will-change-transform z-10"
            style={{
              transform: `translate(${scrollY * 0.08}px, -${scrollY * 0.12}px)`,
            }}
          >
            <RedCrownedCranesFlock />
          </div>

          {/* Cụm 2: Góc trên bên phải Hero (Bay đối xứng sang ngang) */}
          <div
            className="absolute top-24 sm:top-36 right-4 sm:right-16 w-36 sm:w-56 opacity-25 transition-transform duration-100 ease-out will-change-transform z-10"
            style={{
              transform: `translate(-${scrollY * 0.06}px, -${scrollY * 0.10}px)`,
            }}
          >
            <RedCrownedCranesFlock flipped={true} />
          </div>
        </>
      )}
    </div>
  );
}
