# 🌸 PAGE DESIGN SPECIFICATION: HOMEPAGE (TRANG CHỦ SENMAP ĐỒNG THÁP)

> **Phạm vi file:** `frontend/src/pages/HomePage.jsx` và các component con trong `frontend/src/components/home/`  
> **Kế thừa:** Kế thừa toàn bộ token toàn cục từ `design-system/senmap-dong-thap/MASTER.md`.  
> **Định hướng phong cách:** Cổng Văn hóa Di sản Tươi Sáng & Trầm Ấm (Vietnam Travel `#FAF7F2`, `#F4ECE7` + Kyoto Travel `#FFFFFF`, Vàng Tatami `#D5C390` + Hồn cốt Mâm Cơm Việt).  
> **Chỉ số thiết kế (Design Dials):** `--variance 7` (Bento Grid bất đối xứng hiện đại), `--motion 4` (Chuyển động mượt mà 300ms, không giật lắc), `--density 2` (Spacious Breathing Room kiểu Kyoto, khoảng trắng thoáng đãng 48px - 96px).

---

## 1. THIẾT LẬP KHÔNG GIAN & KHOẢNG TRẮNG (DENSITY 2 SPACING SCALE)

Theo chuẩn `--density 2` từ `ui-ux-pro-max`, loại bỏ hoàn toàn sự dồn ép chật chội:

| Token Khoảng cách | Giá trị Pixels / Rem | Áp dụng trên Trang Chủ |
| :--- | :--- | :--- |
| `--space-page-px` | `16px` (Mobile) / `32px` (Tablet) / `48px` (Desktop) | Padding lề 2 bên khung nhìn trang chủ |
| `--space-section-py` | `64px` (Mobile) / `96px` (Tablet) / `128px` (Desktop) | Khoảng cách dọc đệm giữa 6 tầng nội dung |
| `--space-card-gap` | `24px` (Mobile) / `32px` (Tablet) / `40px` (Desktop) | Khoảng cách lưới giữa các thẻ di tích / tuyến du lịch |
| `--space-card-p` | `20px` (Card nhỏ) / `32px` (Card Bento lớn) | Padding bên trong các thẻ nội dung |

---

## 2. QUY TẮC BỐ CỤC 6 TẦNG TRẢI NGHIỆM TRANG CHỦ

### 2.1. Tầng 1 — Cổng Đón Chào Đất Sen Hồng (Hero Portal Section)
- **Nền:** Ảnh toàn cảnh Đồng Tháp Mười (Bình minh Tràm Chim hoặc hồ sen Tháp Mười) phủ lớp gradient kép ấm áp: `linear-gradient(to bottom, rgba(250, 247, 242, 0.85), #FAF7F2)`.
- **Typography:**
  - Kicker: `Be Vietnam Pro` in hoa, 12px, `tracking-[0.2em]`, màu Hồng Sen `#E11D48`.
  - H1 Tiêu đề: `Noto Serif Display`, 48px - 56px (Desktop) / 34px (Mobile), chữ đen than trầm `#1E1B18`, `leading-tight`.  
    *Ví dụ:* *"ĐẤT SEN HỒNG — Nơi Hội Tụ Trăm Năm Di Sản Văn Hóa & Lịch Sử"*
  - Subtitle: `Be Vietnam Pro`, 18px, màu Nâu đất nung `#4A453E`, `leading-relaxed`.
- **Thanh Tìm Kiếm Nổi (Floating Search Capsule):**
  - Bố cục viên thuốc bo tròn tuyệt đối (`rounded-full`), nền trắng ngà kính mờ (`bg-white/95 backdrop-blur-md shadow-lg border border-[#EAE3D9]`).
  - Tích hợp 3 phân vùng: [Địa điểm / Từ khóa] + [Widget Thời tiết Đồng Tháp: 28°C Nắng Nhẹ] + [Nút Tìm kiếm Hồng Sen `#E11D48`].
  - Chip gợi ý nhanh bên dưới: 5 di tích biểu tượng (Nguyễn Sinh Sắc, Gò Tháp, Xẻo Quýt, Huỳnh Thủy Lê, Tràm Chim).

### 2.2. Tầng 2 — Bản Đồ Vùng Miền & 4 Tuyến Du Lịch Chủ Đề (Split-Screen Theme Map)
- **Cảm hứng trực tiếp:** Phân đoạn *"Explore Vietnam by Region"* của `vietnam.travel`.
- **Bố cục 2 Cột Song Hành (Desktop 12 cột: 5 cột Bản đồ + 7 cột Thẻ Tuyến):**
  - **Cột Trái (Bản đồ WebGIS Thu nhỏ):** Khung bản đồ `h-[580px] rounded-3xl border border-[#EAE3D9] shadow-md overflow-hidden sticky top-24`. Khi người dùng click vào thẻ tuyến bên phải, bản đồ tự động highlight các điểm dừng và vẽ đường TSP 2-Opt mượt mà.
  - **Cột Phải (4 Thẻ Tuyến Du Lịch Chủ Đề):** Dạng thẻ bìa Tạp chí Du lịch cao cấp (`bg-white rounded-2xl p-6 border border-[#EAE3D9] hover:border-[#D5C390] transition-all duration-300 shadow-sm hover:shadow-md`).
    1. *Tuyến 1:* Dấu ấn Văn hóa Vương quốc cổ Phù Nam — Óc Eo (Gò Tháp).
    2. *Tuyến 2:* Hành trình Đỏ — Địa chỉ Đỏ Cách mạng Đồng Tháp Mười (Xẻo Quýt, KDT Nguyễn Sinh Sắc, Giồng Thị Đam).
    3. *Tuyến 3:* Di sản Kiến trúc & Làng hoa Sa Đéc (Nhà cổ Huỳnh Thủy Lê, Kiến An Cung, Làng hoa Sa Đéc).
    4. *Tuyến 4:* Sinh thái Mùa Nước Nổi & Rừng tràm Nguyên sinh (VQG Tràm Chim, KDL Gáo Giồng).

### 2.3. Tầng 3 — Vitrin Kiệt Tác Di Sản Quốc Gia Đặc Biệt (Editorial Bento Grid)
- **Cảm hứng:** Triết lý Zen của `kyoto.travel` kết hợp Bento Grid bất đối xứng (`ui-ux-pro-max --variance 7`).
- **Phân bổ 4 Quần thể Trọng điểm:**
  - Card 1 (Hero Bento - Chiếm 2 cột 2 hàng): Khu di tích Nguyễn Sinh Sắc (Ảnh vòm mộ hoa sen trắng lớn, trích dẫn âm hưởng lịch sử, nút Audio Tour nghe thử).
  - Card 2: Khu di tích Khảo cổ Gò Tháp (Ảnh nền văn hóa Óc Eo, di tích QGĐB).
  - Card 3: Khu di tích Căn cứ Xẻo Quýt (Ảnh chèo xuồng ba lá xuyên rừng tràm).
  - Card 4: Vườn Quốc gia Tràm Chim (Khu Ramsar thế giới, ảnh sếu đầu đỏ).
- **Quy chuẩn thẻ:** Nền trắng `#FFFFFF`, viền ấm mỏng `#EAE3D9`, ảnh tỷ lệ 16:9 hoặc 4:3 độ phân giải cao, nút bấm dạng viên thuốc bo tròn (`rounded-full`) màu kem ngà.

### 2.4. Tầng 4 — Hộ Chiếu Di Sản Sen Hồng (Digital Heritage Passport)
- **Cảm hứng:** Tương tác văn hóa truyền thống của *The Family Rice Tray*.
- **Cơ chế:**
  - Mô phỏng cuốn Hộ chiếu Du lịch bìa xanh tràm gân vải hoặc hồng sen trầm.
  - Du khách click trải nghiệm "Đóng dấu mộc đỏ kỹ thuật số" (Hiệu ứng con dấu xoay nhẹ 12 độ, đóng xuống kêu tiếng *cộp* nhẹ kèm hạt sen bung tỏa).
  - Thống kê tiến độ khám phá 20 di tích của du khách (`X / 20 Di tích`).

### 2.5. Tầng 5 — Lịch 4 Mùa Trải Nghiệm & 12 Hương Vị Đồng Tháp (Seasonal & Culinary Guide)
- **Lịch 4 Mùa (Kyoto Seasonal Rhythms):**
  - Mùa Sen Nở Tháp Mười (Tháng 5 - Tháng 8): Tông hồng sen `#E11D48`.
  - Mùa Nước Nổi (Tháng 9 - Tháng 11): Tông xanh tràm `#059669`.
  - Mùa Hoa Xuân Sa Đéc (Tháng 12 - Tháng 2): Tông vàng hoa `#E3A94A`.
  - Mùa Trái Cây & Quýt Hồng Lai Vung (Tháng 3 - Tháng 4): Tông cam ấm.
- **12 Đặc sản Gắn với Di tích:** Trình bày dạng danh thiếp ẩm thực tinh tế, click để xem nguồn gốc món ăn và di tích liên quan.

### 2.6. Tầng 6 — Cổng Chuyển Tiếp WebGIS Bản Đồ Toàn Năng (Full WebGIS Portal CTA)
- Banner toàn cảnh mở rộng, lời mời du khách mở bản đồ số toàn màn hình để tra cứu 20 di tích, định vị GPS và chỉ đường thời gian thực.

---

## 3. CHECKLIST KIỂM THỬ GIAO DIỆN HOMEPAGE (DoD)

- [ ] **Màu sắc:** 100% diện tích trang chủ nằm trên hệ màu ấm `#FAF7F2`, `#F4ECE7`, `#FFFFFF`. Không còn sót `bg-slate-950`.
- [ ] **Typography:** Toàn bộ H1/H2 dùng phông Serif (`Noto Serif Display` hoặc `Lora`). Toàn bộ thân bài dùng `Be Vietnam Pro`.
- [ ] **Khoảng trắng:** Padding tối thiểu giữa các section là 96px trên Desktop, đảm bảo nhịp thở thị giác.
- [ ] **Accessibility:** Độ tương phản chữ trên nền đạt chuẩn tối thiểu 4.5:1 (đạt 11:1 với `#1E1B18` trên `#FAF7F2`).
- [ ] **Mobile Touch:** Mọi nút bấm có kích thước tối thiểu 44x44px, khoảng cách giữa các phần tử tương tác tối thiểu 8px.
