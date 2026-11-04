import React, { useState, useEffect } from 'react';

/**
 * =========================================================================================
 * CulturalHeritageBackdrop.jsx - Nền Văn Hóa Mặt Trống Đồng Đông Sơn
 * - Mặt Trống Đồng Đông Sơn thực tế đặt ở góc trên bên phải Hero
 * - Tự động xoay chậm liên tục và xoay chuyển mượt mà theo nhịp cuộn trang của người dùng
 * - Giữ không gian thanh lịch, sạch sẽ, không bị rối mắt
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
  // Trống Đồng ở góc trên bên phải Hero: xoay tròn tự động và tăng tốc theo scroll
  const drumRotation = scrollY * 0.22;
  const drumTranslateY = scrollY * 0.12;

  // Nếu là chế độ sides ở HomePage mà không cần hiển thị gì thì trả về null
  if (mode === 'sides') {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ============================================================== */}
      {/* MẶT TRỐNG ĐỒNG ĐÔNG SƠN ĐẶT Ở GÓC TRÊN BÊN PHẢI HERO          */}
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
    </div>
  );
}
