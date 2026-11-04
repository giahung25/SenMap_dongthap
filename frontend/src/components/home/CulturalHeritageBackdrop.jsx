import React, { useState, useEffect } from 'react';

/**
 * =========================================================================================
 * DANH MỤC 8 ĐỐI TƯỢNG VĂN HÓA & NHÃN TƯ THẾ / HÀNH ĐỘNG (POSE & ACTION TAXONOMY)
 * =========================================================================================
 * Nguồn ảnh thực tế đã tách nền trong suốt 100% bằng OpenCV và đổi màu Di sản (Đỏ Son & Đồng Cổ)
 * Lưu trữ tại: /images/cultural_motifs/
 */
export const CRANE_POSE_CATALOG = [
  {
    id: 'bronze-drum-dong-son',
    name: 'Mặt Trống Đồng Đông Sơn - Óc Eo',
    file: '/images/cultural_motifs/bronze_drum_dong_son.png',
    taxonomy: 'sacred-bronze-drum',
    action: 'Mặt Trống Đồng Đông Sơn (Sao 12 cánh, chim Lạc, hồi văn sóng nước, vòng chấm đồng tâm) đổi màu Đỏ Son #9E1B32 & Đồng Cổ #924A12',
    placement: 'Trung tâm Hero & 2 rìa bán nguyệt cuộn mở hai bên trang',
  },
  {
    id: 'crane-diving-swoop',
    name: 'Sếu Đầu Đỏ Sải Cánh Lượn Đáp',
    file: '/images/cultural_motifs/crane_1_diving_swoop.png',
    taxonomy: 'pose: diving-swoop',
    action: 'Sếu Đầu Đỏ sải cánh lượn đáp xuống đầm sen (cổ uốn cong nhìn xuống, đôi cánh giang rộng phía trên)',
    placement: 'Góc trên bên phải Hero lướt chéo đón dòng tiêu đề',
  },
  {
    id: 'crane-ascending-glide',
    name: 'Sếu Đầu Đỏ Vươn Cổ Bay Vút Lên',
    file: '/images/cultural_motifs/crane_2_ascending_glide.png',
    taxonomy: 'pose: ascending-glide',
    action: 'Sếu Đầu Đỏ vươn cổ bay vút lên bầu trời (cánh nâng cao, đầu hướng về phía trước)',
    placement: 'Góc trên bên trái Hero vút bay về hướng trung tâm',
  },
  {
    id: 'crane-ink-soaring-up',
    name: 'Sếu Thủy Mặc Đập Cánh Vươn Cao',
    file: '/images/cultural_motifs/crane_3_soaring_wings_up.png',
    taxonomy: 'pose: ink-soaring-up',
    action: 'Sếu thủy mặc đập cánh vươn cao dẫn đầu đàn',
    placement: 'Tầng mây cao bên trái Hero (lớp không gian 1)',
  },
  {
    id: 'crane-ink-cruising-down',
    name: 'Sếu Thủy Mặc Hạ Cánh Lướt Gió',
    file: '/images/cultural_motifs/crane_4_cruising_wings_down.png',
    taxonomy: 'pose: ink-cruising-down',
    action: 'Sếu thủy mặc hạ cánh lướt gió bay ngang',
    placement: 'Tầng mây trung bên trái Hero (lớp không gian 2)',
  },
  {
    id: 'crane-ink-distant-glider',
    name: 'Sếu Thủy Mặc Tầng Mây Xa',
    file: '/images/cultural_motifs/crane_5_distant_flock_follower.png',
    taxonomy: 'pose: ink-distant-glider',
    action: 'Sếu nhỏ bay theo đàn ở tầng mây xa (tạo chiều sâu không gian)',
    placement: 'Tầng mây xa bên trái Hero (lớp không gian 3)',
  },
  {
    id: 'crane-wading-water-reflection',
    name: 'Sếu Thủy Mặc Đứng Soi Bóng Nước',
    file: '/images/cultural_motifs/crane_6_wading_reflection.png',
    taxonomy: 'pose: wading-water-reflection',
    action: 'Sếu thủy mặc đứng trầm mặc soi bóng dưới mặt nước mùa nước nổi',
    placement: 'Góc dưới rìa trái toàn trang cố định tao nhã',
  },
  {
    id: 'crane-noble-one-leg-stance',
    name: 'Sếu Đầu Đỏ Đứng Co Một Chân Uy Nghi',
    file: '/images/cultural_motifs/crane_7_noble_one_leg_stance.png',
    taxonomy: 'pose: noble-one-leg-stance',
    action: 'Sếu Đầu Đỏ đứng độc lập co một chân uy nghi, thanh cao bên bờ di tích',
    placement: 'Góc dưới rìa phải toàn trang cố định thanh cao',
  },
];

/**
 * =========================================================================================
 * COMPONENT: CulturalHeritageBackdrop
 * =========================================================================================
 * Tích hợp 8 file ảnh PNG thực tế độ phân giải cao đã xử lý trong suốt:
 * - Mặt Trống Đồng Đông Sơn thực tế: tự xoay và xoay nở ra khi cuộn trang
 * - 7 Tư thế Sếu Đầu Đỏ Tràm Chim: bố trí theo chiều sâu không gian và hiệu ứng Parallax
 * =========================================================================================
 */
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
  // Trống Đồng ở góc trên bên phải Hero: xoay tròn tự động và tăng tốc theo scroll
  const drumRotation = scrollY * 0.22;
  const drumTranslateY = scrollY * 0.12;

  const showHero = mode === 'full' || mode === 'hero';
  const showSides = mode === 'full' || mode === 'sides';

  return (
    <div
      className={
        mode === 'sides'
          ? 'fixed inset-0 overflow-hidden pointer-events-none select-none z-20'
          : 'absolute inset-0 overflow-hidden pointer-events-none select-none z-0'
      }
    >
      {/* ============================================================== */}
      {/* 1. KHU VỰC HERO: MẶT TRỐNG ĐỒNG GÓC TRÊN PHẢI & ĐÀN SẾU BAY    */}
      {/* ============================================================== */}
      {showHero && (
        <>
          {/* MẶT TRỐNG ĐỒNG ĐÔNG SƠN ĐẶT Ở GÓC TRÊN BÊN PHẢI HERO */}
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

          {/* GÓC TRÊN TRÁI HERO: SẾU VƯƠN CỔ BAY LÊN + ĐÀN SẾU THỦY MẶC TẦNG MÂY XA */}
          <div
            className="absolute top-8 sm:top-14 left-4 sm:left-12 flex items-start gap-2 z-10 transition-transform duration-100 ease-out will-change-transform"
            style={{
              transform: `translate(${scrollY * 0.12}px, -${scrollY * 0.14}px)`,
            }}
          >
            {/* Sếu đầu đàn vươn cổ bay vút lên */}
            <img
              src="/images/cultural_motifs/crane_2_ascending_glide.png"
              alt="Sếu Đầu Đỏ vươn cổ bay lên"
              className="w-32 sm:w-48 object-contain drop-shadow-md transform -scale-x-100 rotate-6"
            />

            {/* Đàn sếu thủy mặc bay theo ở 3 tầng không gian xa */}
            <div className="flex flex-col gap-1 -mt-2">
              <img
                src="/images/cultural_motifs/crane_3_soaring_wings_up.png"
                alt="Sếu thủy mặc đập cánh vươn cao"
                className="w-10 sm:w-14 object-contain opacity-75 transform -scale-x-100"
              />
              <img
                src="/images/cultural_motifs/crane_4_cruising_wings_down.png"
                alt="Sếu thủy mặc lướt gió"
                className="w-8 sm:w-11 object-contain opacity-65 ml-2 transform -scale-x-100"
              />
              <img
                src="/images/cultural_motifs/crane_5_distant_flock_follower.png"
                alt="Sếu thủy mặc tầng mây xa"
                className="w-6 sm:w-8 object-contain opacity-50 ml-4 transform -scale-x-100"
              />
            </div>
          </div>

          {/* GÓC TRÊN PHẢI HERO: SẾU SẢI CÁNH LƯỢN ĐÁP XUỐNG VỀ PHÍA TIÊU ĐỀ */}
          <div
            className="absolute top-14 sm:top-20 right-4 sm:right-14 z-10 transition-transform duration-100 ease-out will-change-transform"
            style={{
              transform: `translate(-${scrollY * 0.10}px, ${scrollY * 0.08}px)`,
            }}
          >
            <img
              src="/images/cultural_motifs/crane_1_diving_swoop.png"
              alt="Sếu Đầu Đỏ sải cánh lượn đáp"
              className="w-32 sm:w-46 object-contain opacity-80 sm:opacity-90 drop-shadow-md -rotate-6"
            />
          </div>
        </>
      )}

      {/* ============================================================== */}
      {/* 2. KHU VỰC TOÀN TRANG KHI CUỘN XUỐNG (CHỈ GIỮ SẾU SOI BÓNG NƯỚC RÌA TRÁI) */}
      {/* ============================================================== */}
      {showSides && (
        <>
          {/* SẾU THỦY MẶC ĐỨNG TRẦM MẶC SOI BÓNG NƯỚC (Nép sát rìa trái, mờ nhẹ không che chữ) */}
          <div
            className="fixed bottom-1 left-0 sm:left-1 w-24 sm:w-32 opacity-25 pointer-events-none z-10 transition-transform duration-100 ease-out will-change-transform hidden xl:block"
            style={{
              transform: `translateY(${Math.sin(scrollY * 0.004) * 6}px)`,
            }}
          >
            <img
              src="/images/cultural_motifs/crane_6_wading_reflection.png"
              alt="Sếu đứng soi bóng nước"
              className="w-full h-full object-contain filter drop-shadow-xs"
            />
          </div>
        </>
      )}
    </div>
  );
}
