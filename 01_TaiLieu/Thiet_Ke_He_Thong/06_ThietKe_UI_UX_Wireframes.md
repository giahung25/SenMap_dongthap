# ĐẶC TẢ THIẾT KẾ UI/UX & WIREFRAMES CHI TIẾT
**Dự án:** Xây dựng hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp.  
**Triết lý thiết kế:** **Map-Centric (Bản đồ làm trung tâm)** kết hợp **Mobile-First (Tối ưu quét mã QR ngoài trời)**.  
**Hệ thống thiết kế:** Tailwind CSS Grid System & Responsive Tokens.

---

## 1. NGUYÊN TẮC THIẾT KẾ & HỆ THỐNG LƯỚI TỶ LỆ (DESIGN SYSTEM & GRID)

### 📐 1.1. Hệ thống Lưới & Breakpoints (Responsive Grid)
*   **Mobile (< 768px - Viewport chuẩn 375px - 430px):**
    *   Lưới: 4 cột, lề viền (margin) 16px, khoảng cách cột (gutter) 12px.
    *   Bản đồ luôn chiếm toàn màn hình chiều cao thực tế (`height: 100dvh`).
    *   Các bảng điều khiển, bộ lọc và chi tiết di tích hiển thị dưới dạng **Bottom Sheet (Ngăn kéo vuốt từ dưới lên)**.
*   **Desktop (≥ 1024px - Viewport chuẩn 1440px / 1920px):**
    *   Lưới: 12 cột, bố cục chia 2 khối chức năng bất đối xứng:
        *   **Khối Sidebar tra cứu (Bên trái):** Rộng cố định `380px` (hoặc 4/12 cột), cuộn nội dung độc lập.
        *   **Khối Bản đồ Web GIS (Bên phải):** Chiếm toàn bộ không gian còn lại `calc(100vw - 380px)`, cố định `100vh`.

### 🎨 1.2. Thang đo Kích thước & Khoảng cách (Spacing Scale)
Tuân thủ tỷ lệ chuẩn 4px/8px:
- `p-2` / `m-2`: 8px (Khoảng cách giữa các chip tag, icon nhỏ).
- `p-4` / `m-4`: 16px (Khoảng cách đệm tiêu chuẩn cho card, khung tìm kiếm).
- `p-6` / `m-6`: 24px (Khoảng cách giữa các phân đoạn nội dung lớn).
- `radius-lg`: 12px (Bo góc card, thanh tìm kiếm tạo cảm giác thân thiện, hiện đại).

### 🌸 1.3. Bảng màu Nhận diện Bản đồ Đồng Tháp (Color Palette)
- **Primary (Màu chủ đạo):** `#E11D48` (Hồng sen Đồng Tháp - Rose-600) dùng cho Nút hành động chính (CTA), Marker di tích Quốc gia đặc biệt.
- **Secondary (Màu bổ trợ):** `#059669` (Xanh tràm sinh thái - Emerald-600) dùng cho di tích danh lam thắng cảnh, nút chỉ đường GPS.
- **Neutral (Màu nền):** `#0F172A` (Slate-900 cho text tiêu đề) và `#F8FAFC` (Slate-50 cho nền card).

---

## 2. PHÁC THẢO THÔ (LOW-FIDELITY WIREFRAMES)

### 🖥️ 2.1. Phác thảo thô: Giao diện Desktop (Màn hình Tra cứu & Bản đồ)
```text
+----------------------------------------------------------------------------------------------------+
|  [LOGO ĐỒNG THÁP] WEB GIS DI TÍCH VĂN HÓA         | [Tìm kiếm di tích...] | (Admin Login) |
+-----------------------------------+----------------------------------------------------------------+
|  SIDEBAR DANH SÁCH (380px)        |  BẢN ĐỒ SỐ TƯƠNG TÁC (LEAFLET.JS - 100vh)                      |
|  +-----------------------------+  |                                                                |
|  | [🔍 Nhập tên di tích...]     |  |                         [+] Zoom In                            |
|  +-----------------------------+  |                         [-] Zoom Out                           |
|  | Bộ lọc: [Tất cả] [Huyện v]  |  |                                                                |
|  | [Quốc gia] [Cấp tỉnh]       |  |                                                                |
|  +-----------------------------+  |              ( 5 ) [Gom cụm Marker]                            |
|  | KẾT QUẢ: 20 Di tích         |  |                                                                |
|  | +-------------------------+ |  |                                                                |
|  | | [Ảnh] Khu Di Tích Gò Tháp| |  |                               [📍 Marker Di tích]              |
|  | | Cấp: Quốc gia đặc biệt  | |  |                             +--------------------------+       |
|  | | Huyện Tháp Mười         | |  |                             | [Ảnh] Mộ Cụ Nguyễn Sinh..|       |
|  | +-------------------------+ |  |                             | Địa chỉ: TP Cao Lãnh     |       |
|  | +-------------------------+ |  |                             | [Xem chi tiết] [Chỉ đường|       |
|  | | [Ảnh] Xẻo Quýt          | |  |                             +--------------------------+       |
|  | | Cấp: Quốc gia           | |  |                                                                |
|  | | Huyện Cao Lãnh          | |  |                                                                |
|  | +-------------------------+ |  |                                                                |
|  | ... Cuộn xem tiếp ...       |  |                                              [🎯 GPS của tôi]  |
+--+-----------------------------+--+----------------------------------------------------------------+
```

### 📱 2.2. Phác thảo thô: Giao diện Mobile (Tối ưu quét mã QR & Ngoài trời)
```text
  +-----------------------------------+   +-----------------------------------+
  | MÀN HÌNH BẢN ĐỒ (MOBILE CHÍNH)    |   | MÀN HÌNH CHI TIẾT (QUÉT QR XONG)  |
  +-----------------------------------+   +-----------------------------------+
  | [=]  [🔍 Tìm kiếm di tích...]     |   | [< Quay lại]         [Chia sẻ ➦]  |
  | [Tất cả] [Gần tôi] [Quốc gia]     |   |                                   |
  |-----------------------------------|   | +-------------------------------+ |
  |                                   |   | |        HÌNH ẢNH HERO          | |
  |         BẢN ĐỒ FULL MÀN HÌNH      |   | |    KHU DI TÍCH GÒ THÁP        | |
  |              (100dvh)             |   | +-------------------------------+ |
  |                                   |   | KHU DI TÍCH KHẢO CỔ GÒ THÁP       |
  |              📍 [Marker]          |   | ⭐ Xếp hạng: Quốc gia đặc biệt     |
  |                                   |   | 📍 Vị trí: Xã Tân Kiều, Tháp Mười |
  |                   [🎯 Nút Vị trí] |   | --------------------------------- |
  | +-------------------------------+ |   | 🕒 Giờ mở cửa: 07:00 - 17:00      |
  | | ^ VUỐT LÊN: BOTTOM SHEET      | |   | 🎟️ Giá vé: Miễn phí               |
  | | 🏛️ Đang chọn: Khu DT Xẻo Quýt | |   | --------------------------------- |
  | | Cách bạn: 3.2 km              | |   | 📖 TÓM TẮT LỊCH SỬ & GIÁ TRỊ:     |
  | | [XEM CHI TIẾT]   [🚗 CHỈ ĐƯỜNG]| |   | Nền văn hóa Óc Eo cổ đại...       |
  | +-------------------------------+ |   | ================================= |
  +-----------------------------------+   | [🚗 BẮT ĐẦU CHỈ ĐƯỜNG ĐẾN ĐÂY]    |  <-- Nút dính đáy (Sticky CTA)
                                          +-----------------------------------+
```

---

## 3. CẤU TRÚC CHI TIẾT (HIGH-FIDELITY WIREFRAME SPECIFICATIONS)

### 🗺️ 3.1. Màn hình 1: Giao diện Bản đồ số công khai (Public Web GIS)

#### A. Định vị thành phần & Phân tầng hiển thị (Z-Index Hierarchy):
- **Tầng 0 (`z-index: 0`):** Bản đồ nền Leaflet map container (`width: 100%`, `height: 100%`).
- **Tầng 1 (`z-index: 10`):** Các marker di tích và cụm gom nhóm (Marker Cluster).
- **Tầng 2 (`z-index: 20`):** Các nút điều khiển nổi (Floating Controls) như Nút GPS, Zoom buttons.
- **Tầng 3 (`z-index: 30`):** Thanh tìm kiếm (Header Search Bar) và Sidebar/Bottom Sheet.
- **Tầng 4 (`z-index: 50`):** Modal/Popup chi tiết di tích và thông báo lỗi.

#### B. Thông số chi tiết các Component:
1. **Thanh Tìm kiếm & Lọc nổi (Floating Search Bar):**
   - Vị trí: `top: 16px`, `left: 16px` (trên Mobile nằm ngang `width: calc(100% - 32px)`).
   - Chiều cao: `48px`, `border-radius: 9999px` (dạng con nhộng pill), đổ bóng `box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)`.
   - Chứa: Icon kính lúp, Input placeholder *"Tìm tên di tích, anh hùng dân tộc..."*, Nút xóa nhanh text.
2. **Thanh Chip lọc nhanh (Filter Chips):**
   - Vị trí: Ngay dưới thanh search (`top: 72px`), cuộn ngang cảm ứng (`overflow-x: auto`).
   - Kích thước chip: Chiều cao `32px`, padding ngang `12px`, khoảng cách giữa các chip `8px`.
   - Danh sách: `[Tất cả]`, `[📍 Gần tôi nhất]`, `[Quốc gia đặc biệt]`, `[TP Cao Lãnh]`, `[TP Sa Đéc]`.
3. **Card xem nhanh trên Marker (Popup Window):**
   - Kích thước: Rộng cố định `280px`, tối đa `320px`.
   - Cấu trúc:
     - Ảnh thumbnail phía trên: Tỷ lệ 16:9 (`height: 120px`, `object-fit: cover`).
     - Tiêu đề: Font Semibold 16px, giới hạn 2 dòng.
     - Badge cấp xếp hạng: Màu hồng sen cho cấp Quốc gia, màu xanh cho cấp Tỉnh.
     - Nút hành động đôi: Nút "Chi tiết" (Nền xám) và Nút "Chỉ đường" (Nền xanh lá nổi bật).

---

### 📱 3.2. Màn hình 2: Giao diện Chi tiết Di tích (Heritage Detail View)
*(Màn hình đích đến khi du khách quét mã QR tại thực địa)*

#### A. Kích thước & Khoảng cách (Spacing Specs):
- **Hero Image (Ảnh bìa di tích):** Chiều cao `260px` trên mobile, `380px` trên desktop. Có hiệu ứng làm mờ chuyển dần vào nền tối (Gradient Overlay `from-black/60 to-transparent`).
- **Nút Back (Quay lại bản đồ):** Tròn `40px x 40px`, vị trí `top: 16px`, `left: 16px`, nền kính mờ `backdrop-blur-md bg-white/70`.
- **Thẻ Thông số Nhanh (Quick Facts Grid):**
  - Bố cục: Grid 2 cột trên điện thoại (`grid-cols-2 gap-3`).
  - Hộp 1: Cấp xếp hạng & Năm công nhận.
  - Hộp 2: Đơn vị quản lý hành chính (Huyện/TP).
  - Hộp 3: Thời gian mở cửa tham quan.
  - Hộp 4: Giá vé (Nếu 0đ hiển thị nhãn xanh lá *"Miễn phí"*).
- **Khối Nội dung Thuyết minh Lịch sử (Editorial Article):**
  - Font size: `16px` (chuẩn đọc mobile), chiều cao dòng `line-height: 1.75` (tránh mỏi mắt khi đọc ngoài trời nắng).
  - Bộ sưu tập ảnh (Image Carousel): Hiển thị ảnh chụp hiện trạng có chú thích bên dưới.
- **Nút Kêu gọi Hành động Cố định (Sticky Bottom Action Bar):**
  - Vị trí: `position: fixed`, `bottom: 0`, `left: 0`, `width: 100%`, `padding: 12px 16px`, nền trắng có viền trên.
  - Nút chính: **"🚗 BẮT ĐẦU CHỈ ĐƯỜNG"** (Chiều cao `48px`, font bold 16px, màu xanh lục `#059669`). Nhấn vào sẽ tự động kích hoạt GPS và mở dẫn đường trên bản đồ.

---

### 👑 3.3. Màn hình 3: Phân hệ Quản trị CMS (Admin Di tích & Ghim bản đồ)

#### A. Bố cục Form Nhập liệu (2 Cột Responsive):
- **Cột Trái (Dữ liệu Văn bản - Chiếm 60% chiều rộng):**
  - Input Tên di tích, tên gọi khác.
  - Select Dropdown: Danh mục và Huyện/Thành phố.
  - Radio Buttons: Cấp xếp hạng di tích.
  - Textarea: Lịch sử, giờ mở cửa, giá vé, lưu ý.
  - Khối Upload ảnh: Kéo thả nhiều ảnh (Drag & Drop), chọn 1 ảnh làm Thumbnail.
- **Cột Phải (Dữ liệu Không gian & Mã QR - Chiếm 40% chiều rộng):**
  - **Bản đồ Thu nhỏ Chọn Tọa độ (Interactive Coordinate Picker Map):**
    - Chiều cao cố định `320px`, bo góc `12px`, có viền nổi bật.
    - Ban đầu load tọa độ trung tâm tỉnh Đồng Tháp.
    - **Cơ chế tương tác:** Admin click chuột vào bất kỳ điểm nào trên bản đồ, một marker đỏ sẽ nhảy tới đó ➔ Hệ thống tự động điền 2 ô input bên dưới: `Vĩ độ (Lat): 10.46...` và `Kinh độ (Lng): 105.63...`. (Không cho phép gõ tay để chống lỗi sai format).
  - **Khối Xem trước & Xuất Tem QR Code (QR Print Preview Card):**
    - Hiển thị bản vẽ tem in mô phỏng khổ A5: Có Quốc huy/Logo, Tên di tích, Mã QR có logo ở giữa.
    - Nút bấm: *"📥 Tải Tem in PDF/PNG khổ A5"* và *"Tải mã QR gốc"*.
