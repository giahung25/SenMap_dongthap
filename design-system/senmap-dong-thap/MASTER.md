# Design System Master File — SenMap Đồng Tháp
## Chuẩn Mực Thiết Kế Văn Hóa Di Sản (Vietnam Travel & Kyoto Travel Heritage Style)

> **QUY TẮC BẮT BUỘC (GOVERNANCE RULE):**
> 1. Khi xây dựng trang cụ thể, kiểm tra file ghi đè `design-system/senmap-dong-thap/pages/[page-name].md` trước.
> 2. Nếu file trang riêng biệt tồn tại, quy tắc trang sẽ **ghi đè (override)** file Master này.
> 3. Nếu không, toàn bộ lập trình viên và AI Agents **bắt buộc tuân thủ 100%** các quy chuẩn trong tài liệu Master này.

---

**Dự án:** SenMap Đồng Tháp — Cổng Bản Đồ Số Di Tích & Di Sản Văn Hóa  
**Phiên bản:** 2.0 (Bản nâng cấp Giao diện Sáng Ấm Di sản Á Đông)  
**Tài liệu tham chiếu:** `ui-ux-pro-max-skill` (NextLevelBuilder)  
**Chỉ số thiết kế (Design Dials):**
- **Độ biến thiên bố cục (Variance):** `7/10` (Editorial Magazine / Cân bằng & Bất đối xứng tinh tế)
- **Mật độ hiển thị (Density):** `2/10` (Spacious / Thoáng đãng chuẩn Kyoto Travel & Tạp chí Du lịch)
- **Mô hình kiến trúc (Pattern):** `Scroll-Triggered Storytelling` (Kể chuyện di sản theo chiều cuộn)

---

## 1. HỆ THỐNG MÀU SẮC SÁNG ẤM (VIETNAM & KYOTO TRAVEL PALETTE)

Lấy cảm hứng từ chất liệu **Giấy Dó cổ truyền Tháp Mười** hòa quyện với phong vị **Wabi-sabi Cố đô Kyoto**, bảng màu triệt tiêu hoàn toàn sự lạnh lẽo của giao diện công nghệ và loại bỏ màu đen điện tử, tôn vinh hình ảnh và giá trị tâm linh của 20 di tích.

### 1.1. Bảng màu Semantic Tokens Chuẩn

| Token | Mã HEX | Tên gọi văn hóa | Ứng dụng cụ thể trong hệ thống |
| :--- | :---: | :--- | :--- |
| `--color-background` | **`#FAF7F2`** | **Nền Giấy Dó (Warm Ivory Canvas)** | Màu nền chính toàn trang web, tạo chiều sâu ấm áp, êm dịu cho mắt |
| `--color-section-alt` | **`#F4ECE7`** | **Đất Nung Phù Sa (Section Alt)** | Màu nền xen kẽ các phân tầng (Tuyến chủ đề, Ẩm thực, Mùa lễ hội) |
| `--color-card` | **`#FFFFFF`** | **Giấy Thủ Công (Washi Card)** | Màu nền thẻ di tích, bảng điều khiển, thẻ bài viết, ô thông số |
| `--color-foreground` | **`#1E1B18`** | **Mực Tàu Than Ấm (Heading Ink)** | Màu chữ tiêu đề H1..H4, tên di tích, khẳng định sự đĩnh đạc |
| `--color-muted-foreground` | **`#4A453E`** | **Xám Tro Đá Cổ (Body Muted)** | Màu chữ nội dung thuyết minh, đoạn văn kể chuyện, địa chỉ |
| `--color-primary` | **`#9E1B32`** | **Đỏ Son Thếp Vàng (Lotus Crimson)** | Nút hành động chính (Primary CTA), Huy hiệu Di tích Quốc gia Đặc biệt |
| `--color-on-primary` | **`#FFFFFF`** | **Trắng Tinh Khôi** | Chữ và icon trên nền nút Primary |
| `--color-secondary` | **`#1E5631`** | **Xanh Tràm Chim (Tram Chim Emerald)** | Tuyến sinh thái, nút Chỉ đường bản đồ, dẫn đường GPS, chip mùa nước nổi |
| `--color-on-secondary` | **`#FFFFFF`** | **Trắng Tinh Khôi** | Chữ và icon trên nền nút Secondary |
| `--color-accent` | **`#D5C390`** | **Hoàng Kim Chiếu Cói (Kyoto Tatami Gold)** | Điểm nhấn di sản Óc Eo, viền mạ vàng, huy hiệu Hộ chiếu Di sản |
| `--color-on-accent` | **`#1E1B18`** | **Mực Than Đậm** | Chữ trên nền điểm nhấn hoàng kim |
| `--color-border` | **`#E6DEC8`** | **Sợi Tre Chỉ Mảnh (Hairline Border)** | Viền thẻ, đường phân cách thanh mảnh tựa sợi chỉ dệt chiếu Định Yên |
| `--color-muted` | **`#EFE8DC`** | **Gốm Men Tro (Surface Muted)** | Nền chip tag chưa chọn, nền ô tìm kiếm chưa focus |
| `--color-destructive` | **`#DC2626`** | **Đỏ Báo Động (Cảnh báo)** | Nút hủy tour, cảnh báo vi phạm Bounding Box ngoài tỉnh |
| `--color-ring` | **`#9E1B32`** | **Vòng Focus Tiếp Cận** | Vòng sáng báo hiệu focus bàn phím (WCAG 2.1 AA) |

### 1.2. Khai báo CSS Variables Cho Toàn Ứng Dụng
```css
:root {
  --color-background: #FAF7F2;
  --color-section-alt: #F4ECE7;
  --color-card: #FFFFFF;
  --color-card-foreground: #1E1B18;
  --color-foreground: #1E1B18;
  --color-muted: #EFE8DC;
  --color-muted-foreground: #4A453E;
  --color-primary: #9E1B32;
  --color-on-primary: #FFFFFF;
  --color-secondary: #1E5631;
  --color-on-secondary: #FFFFFF;
  --color-accent: #D5C390;
  --color-on-accent: #1E1B18;
  --color-border: #E6DEC8;
  --color-destructive: #DC2626;
  --color-on-destructive: #FFFFFF;
  --color-ring: #9E1B32;
}
```

---

## 2. HỆ THỐNG TYPOGRAPHY 100% TIẾNG VIỆT (NATIVE VIETNAMESE FONT STACK)

Nhằm chấm dứt hoàn toàn lỗi tách rời dấu thanh tiếng Việt (`nhấ´ t`, `Hô` `, `Tuye^ ́ n`) thường gặp trên phông serif hệ thống Windows (`Georgia` / `Times New Roman`), hệ thống sử dụng **Bộ tứ Phông chữ Quốc gia**:

### 2.1. Phân vai Phông chữ
1. **Phông Tiêu Đề Di Sản & Trích Dẫn (Headings & Quotes):**
   - **`Noto Serif Display`** & **`Spectral`** (hỗ trợ 100% subset `vietnamese` trên Google Fonts).
   - Tôn vinh nét chữ đục đẽo trên bia đá Phù Nam và phong cách tạp chí du lịch hàn lâm.
2. **Phông Chữ Thân Bài & Đọc Nội Dung (Body Text):**
   - **`Be Vietnam Pro`** (Google Fonts).
   - Được thiết kế bởi các nhà tạo phông Việt Nam, các dấu mũ, sắc, huyền, hỏi, ngã, nặng được căn chỉnh hoàn hảo ở mọi kích thước từ 12px đến 18px.
3. **Phông Nhãn Giao Diện & Điều Hướng (Eyebrows, Badges, Navigation):**
   - **`Plus Jakarta Sans`** (Google Fonts).
   - Hiện đại, thoáng đãng, sắc sảo cho thanh điều hướng, nút bấm, chip lọc và phụ đề.
4. **Phông Bản Đồ Số & Dữ Liệu Tọa Độ (GIS & Data):**
   - **`JetBrains Mono`** (Google Fonts).
   - Cố định độ rộng chữ số, hiển thị chuyên nghiệp tọa độ WGS-84, khoảng cách km, mã con dấu di tích.

### 2.2. Nhúng Phông Chữ Trực Tiếp (HTML `<head>`)
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&family=Noto+Serif+Display:ital,wght@0,500;0,600;0,700;0,800;1,500;1,600&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Spectral:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap" rel="stylesheet" />
```

### 2.3. Cấu hình `tailwind.config.js`
```javascript
fontFamily: {
  serif: ['"Noto Serif Display"', 'Spectral', '"Be Vietnam Pro"', 'serif'],
  sans: ['"Be Vietnam Pro"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
  display: ['"Plus Jakarta Sans"', '"Be Vietnam Pro"', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'monospace'],
}
```

---

## 3. QUY TẮC KHOẢNG TRẮNG ĐẬM CHẤT THOÁNG ĐÃNG (DENSITY 2/10 — SPACIOUS)

Theo tinh thần mỹ học Kyoto và Tạp chí Du lịch Quốc tế, khoảng trắng là một **yếu tố thị giác chủ động**, mang lại cảm giác an yên và chiều sâu tư lự cho du khách.

### 3.1. Bảng phân cấp nhịp điệu không gian
| Quy mô | Giá trị Tailwind | Thông số thực tế | Ứng dụng quy chuẩn |
| :--- | :--- | :--- | :--- |
| **Section Y-Padding** | `py-20 md:py-28 lg:py-32` | `80px - 128px` | Khoảng cách đỉnh và đáy giữa 6 tầng trải nghiệm văn hóa |
| **Section Content Gap** | `space-y-12 md:space-y-16` | `48px - 64px` | Khoảng cách giữa tiêu đề phân đoạn và lưới nội dung |
| **Card Grid Gap** | `gap-8 md:gap-10 lg:gap-12` | `32px - 48px` | Khoảng cách giữa các thẻ di tích, thẻ tuyến đường, thẻ ẩm thực |
| **Container Width** | `max-w-6xl` / `max-w-7xl` | `1152px - 1280px` | Khung đọc tối ưu, căn giữa trang, lề hai bên `px-4 sm:px-6 lg:px-8` |
| **Card Padding** | `p-6 sm:p-8` | `24px - 32px` | Độ đệm bên trong các thẻ Washi Card |

---

## 4. QUY CÁCH THÀNH PHẦN GIAO DIỆN CHUẨN (UI COMPONENTS)

### 4.1. Cụm Nút Hành Động (Buttons)
```css
/* Nút Chính — Đỏ Son Thếp Vàng (Primary CTA) */
.btn-lotus-crimson {
  background-color: #9E1B32;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 14px rgba(158, 27, 50, 0.22);
  transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-lotus-crimson:hover {
  background-color: #831427;
  transform: translateY(-1.5px);
  box-shadow: 0 8px 20px rgba(158, 27, 50, 0.3);
}

/* Nút Dẫn Đường — Xanh Rừng Tràm (Secondary / Routing) */
.btn-tram-emerald {
  background-color: #1E5631;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 13px;
  box-shadow: 0 4px 14px rgba(30, 86, 49, 0.2);
  transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-tram-emerald:hover {
  background-color: #164024;
  transform: translateY(-1.5px);
}

/* Nút Viền Mảnh Giấy Dó (Washi Outline Button) */
.btn-washi-outline {
  background-color: #FFFFFF;
  color: #1E1B18;
  border: 1.5px solid #E6DEC8;
  padding: 10px 20px;
  border-radius: 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 12px;
  transition: all 200ms ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.btn-washi-outline:hover {
  border-color: #D5C390;
  background-color: #FAF7F2;
  color: #9E1B32;
}
```

### 4.2. Thẻ Di Sản Giấy Dó (Heritage Washi Card)
```css
.card-heritage-washi {
  background-color: #FFFFFF;
  border: 1px solid #E6DEC8;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(30, 27, 24, 0.04);
  transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}
.card-heritage-washi:hover {
  transform: translateY(-3px);
  border-color: #D5C390;
  box-shadow: 0 16px 36px rgba(30, 27, 24, 0.08);
}
```

### 4.3. Con Dấu Mộc Đỏ Hộ Chiếu Di Sản (Heritage Seal Stamp)
- Vòng tròn hoặc bát giác kép với nét mực chu sa đỏ (`#9E1B32` / `#B91C1C`).
- Hiệu ứng đóng dấu mộc: Xoay nhẹ ngẫu nhiên `-2deg` đến `+3deg` tạo cảm giác thủ công truyền thống.

---

## 5. DANH MỤC CẤM KỴ TUYỆT ĐỐI (ANTI-PATTERNS CHECKLIST)

Bất kỳ AI Agent hoặc Lập trình viên nào phát triển SenMap Đồng Tháp **CẤM TUYỆT ĐỐI** vi phạm các điều sau:

1. 🚫 **CẤM dùng màu nền đen thuần công nghệ (`bg-slate-950` / `bg-black` / `bg-slate-900`):**
   - Ngoại trừ chế độ Dark Mode có chủ đích hoặc khung ống kính Camera Quét QR thực địa ban đêm, toàn bộ Trang chủ văn hóa phải sử dụng nền sáng ấm `#FAF7F2` và `#F4ECE7`.
2. 🚫 **CẤM ánh sáng phát quang điện tử (Neon Glow / Cyberpunk Cyan):**
   - Loại bỏ triệt để các lớp viền phát sáng kiểu sci-fi (`shadow-[0_0_12px_#E11D48]`). Chỉ dùng bóng đổ khuếch tán quang học tự nhiên (`rgba(30, 27, 24, 0.05)`).
3. 🚫 **CẤM sử dụng Emoji làm icon giao diện chính:**
   - Tuyệt đối không dùng emoji `🏛️, 🌸, 🌿, 🏺, 🚩` thay cho iconography; 100% sử dụng icon vector SVG chuẩn mực từ `Lucide React` hoặc `Material Symbols Outlined`.
4. 🚫 **CẤM hiển thị quá 4 chỉ số / trường dữ liệu trên 1 thẻ di tích:**
   - Thẻ di tích chỉ giữ 4 thông tin vàng: *Tên di tích, Cấp xếp hạng, Địa bàn Huyện/Thị, Khoảng cách km* kèm cụm 2 nút hành động. Mọi chi tiết khác phải đưa vào Trang chi tiết `/di-tich/:id` hoặc Drawer mở rộng.
5. 🚫 **CẤM dùng phông chữ Serif hệ thống chưa bản địa hóa tiếng Việt:**
   - Tuyệt đối không gọi `font-serif` tự do để tránh rơi vào `Georgia` / `Times New Roman` / `Cinzel` gây tách dấu `nhấ´ t`. Bắt buộc dùng `font-sans` (`Be Vietnam Pro`) hoặc bộ đôi `Noto Serif Display` / `Spectral`.

---

## 6. DANH SÁCH KIỂM ĐỊNH TRƯỚC KHI BÀN GIAO (PRE-DELIVERY QA CHECKLIST)

- [ ] Toàn bộ màu nền các Section đã chuyển về `#FAF7F2` (Warm Ivory) và `#F4ECE7` (Section Alt).
- [ ] Không còn bất kỳ từ tiếng Việt nào bị lỗi tách rời dấu thanh (`Tuye^' n`, `nhấ´ t`).
- [ ] Tỷ lệ tương phản chữ đạt tối thiểu **4.5:1** trên nền sáng ấm (WCAG 2.1 AA).
- [ ] Mọi nút bấm và thẻ tương tác có trạng thái hover 200–300ms mượt mà, `cursor-pointer` đầy đủ.
- [ ] Đệm lề Section Y-padding tuân thủ `--density 2` (`py-20 md:py-28`).
- [ ] Khoảng cách lưới Card Grid gaps đạt chuẩn `gap-8 md:gap-12`.
- [ ] Hệ thống hoạt động trơn tru không phát sinh thanh cuộn ngang trên màn hình di động (375px).
- [ ] `npm run build` biên dịch 100% thành công không có cảnh báo hoặc lỗi cú pháp.
