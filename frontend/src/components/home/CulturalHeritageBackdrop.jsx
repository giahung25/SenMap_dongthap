import React, { useState, useEffect } from 'react';

/**
 * =========================================================================================
 * CulturalHeritageBackdrop.jsx - Nền Văn Hóa Mặt Trống Đồng & Sếu Đầu Đỏ Tràm Chim
 * - Mặt Trống Đồng Đông Sơn thực tế đặt ở góc trên bên phải Hero (xoay mở mượt theo scroll)
 * - Sếu Đầu Đỏ Tràm Chim chuẩn loài (đầu đỏ thắm, lông xám tro) lượn bay thanh thoát góc trên trái
 * - Bố cục không gian thoáng đãng, tôn nghiêm, hoàn toàn không che chữ
 * =========================================================================================
 */
export default function CulturalHeritageBackdrop({ mode = 'hero' }) {
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
  const drumRotation = scrollY * 0.22;
  const drumTranslateY = scrollY * 0.12;

  // Nếu là chế độ sides ở HomePage mà không cần hiển thị gì thì trả về null
  if (mode === 'sides') {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ============================================================== */}
      {/* 1. MẶT TRỐNG ĐỒNG ĐÔNG SƠN ĐẶT Ở GÓC TRÊN BÊN PHẢI HERO          */}
      {/* ============================================================== */}
      <div
        className="absolute -top-[120px] sm:-top-[150px] -right-[120px] sm:-right-[160px] w-[540px] h-[540px] sm:w-[680px] sm:h-[680px] opacity-[0.16] sm:opacity-[0.20] transition-transform duration-100 ease-out will-change-transform z-0 pointer-events-none"
        style={{
          transform: `translateY(${drumTranslateY}px) rotate(${drumRotation}deg)`,
        }}
      >
        <div className="w-full h-full animate-[spin_240s_linear_infinite]">
          <img
            src="/images/cultural_motifs/bronze_drum_dong_son.png"
            alt="Mặt Trống Đồng Đông Sơn Góc Phải"
            className="w-full h-full object-contain filter contrast-125"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. SẾU ĐẦU ĐỎ TRÀM CHIM SẢI CÁNH BAY LƯỢN Ở GÓC TRÊN BÊN TRÁI   */}
      {/* Loài chuẩn: Đầu đỏ thắm, lông xám tro, sải cánh rộng uy nghi   */}
      {/* Di chuyển Parallax bay lướt nhẹ khi người dùng vuốt cuộn chuột */}
      {/* ============================================================== */}
      <div
        className="absolute top-8 sm:top-14 left-4 sm:left-10 w-44 sm:w-64 md:w-72 opacity-[0.75] sm:opacity-[0.85] transition-transform duration-100 ease-out will-change-transform z-10 pointer-events-none"
        style={{
          transform: `translate(${scrollY * 0.10}px, -${scrollY * 0.12}px) rotate(${Math.sin(scrollY * 0.003) * 3}deg)`,
        }}
      >
        <img
          src="/images/cultural_motifs/sarus_cranes/sarus_crane_flight_soaring.png"
          alt="Sếu Đầu Đỏ Tràm Chim sải cánh bay lượn"
          className="w-full h-full object-contain filter drop-shadow-md transform -scale-x-100 rotate-6"
        />
      </div>
    </div>
  );
}
