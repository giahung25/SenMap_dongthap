# 🗺️ PAGE DESIGN SPECIFICATION: WEBGIS MAP (TRANG BẢN ĐỒ SỐ /ban-do)

> **Phạm vi file:** `frontend/src/pages/MapView.jsx` và toàn bộ component bản đồ trong `frontend/src/components/map/` (`WebGisMap.jsx`, `MapSidebar.jsx`, `TourPlannerModal.jsx`, `leafletIcons.jsx`)  
> **Kế thừa:** Kế thừa toàn bộ token toàn cục từ `design-system/senmap-dong-thap/MASTER.md`.  
> **Định hướng phong cách:** Bản đồ WebGIS Sáng Rõ & Trầm Ấm (Light Heritage WebGIS). Chuyển hóa toàn bộ thanh sidebar, floating panels, controls và popups từ tông đen tối sang kính mờ ngà sáng (`bg-white/95 backdrop-blur-md border border-[#EAE3D9]`).

---

## 1. THIẾT LẬP BẢN ĐỒ NỀN & KHUNG NHÌN ĐỊA LÝ

### 1.1. Lớp Bản Đồ Nền Mặc Định (Default Basemaps)
1. **Google Street Map (Mặc định):** Hiển thị mạng lưới giao thông đường bộ, cầu cống, sông Tiền, sông Hậu và kênh rạch Đồng Tháp sáng rõ, nhãn tiếng Việt chuẩn xác.
2. **Carto Voyager / OpenStreetMap:** Phong cách tối giản, màu kem thanh nhã, tôn vinh các ghim di sản.
3. **Google Satellite Hybrid:** Ảnh vệ tinh độ phân giải cao phục vụ khảo sát cảnh quan thực địa (VQG Tràm Chim, Gò Tháp, Xẻo Quýt).

### 1.2. Đường Biên Giới Tỉnh Đồng Tháp Mới Kép Sắc Nét
- Giữ nguyên 2 lớp Polyline bao bọc trọn vẹn lãnh thổ Tỉnh Đồng Tháp Mới (từ biên giới Campuchia đến biển Gò Công):
  - Lớp phát sáng mềm ben dưới: `color: '#f43f5e'`, `weight: 5`, `opacity: 0.25`.
  - Lớp nét đứt sang trọng ben trên: `color: '#e11d48'`, `weight: 2.5`, `opacity: 0.85`, `dashArray: '8, 6'`.
- Nút Bật/Tắt Ranh giới (`data-testid="toggle-province-mask"`): Cho phép du khách ẩn/hiện đường viền tùy nhu cầu quan sát.
- Mở khóa kéo trượt tự do (Free Panning): Không đặt `maxBounds` gò bó, hỗ trợ cuộn mượt khắp vùng ĐBSCL.
- Nút Về Toàn Tỉnh (`data-testid="reset-dongthap-view"`): Gọi `map.fitBounds(DONG_THAP_PROVINCE_POLYGON, { padding: [24, 24] })` tự động co giãn vừa khít lãnh thổ tỉnh mới.

---

## 2. QUY CHUẨN CÁC PHẦN TỬ NỔI (FLOATING UI CONTROLS)

### 2.1. Thanh Bên Danh Mục Di Tích (Map Sidebar / Drawer)
- **Nền & Viền:** Nền trắng ngà (`bg-[#FAF7F2] md:bg-white/95 md:backdrop-blur-md border-r border-[#EAE3D9] shadow-lg`).
- **Thanh Tìm Kiếm & Lọc:**
  - Ô input tìm kiếm: Nền trắng `#FFFFFF`, viền `#EAE3D9`, focus ring hồng sen `#E11D48`.
  - Bộ lọc Huyện/TP và Phân hạng: Chip bo tròn viên thuốc (`rounded-full`), khi active chuyển sang nền Hồng Sen `#E11D48` hoặc Vàng Tatami `#D5C390` với chữ trắng/nâu đậm.
- **Thẻ Di Tích trong Danh Sách (Monument List Item):**
  - Nền thẻ: `#FFFFFF`, viền `#EAE3D9`, hover chuyển màu nền nhẹ `#F4ECE7` và border `#D5C390`.
  - Ảnh thumbnail: Tỉ lệ 1:1 hoặc 4:3, bo góc `rounded-xl`, badge phân hạng mạ vàng nhỏ gọn.
  - Tên di tích: Phông `Noto Serif`, 15px, font-bold, chữ đen than `#1E1B18`.

### 2.2. Cụm Điều Khiển Góc Bản Đồ (Floating Map Controls Capsule - Bottom Right)
- **Thiết kế:** Nằm ở góc phải dưới (`absolute bottom-6 right-4 z-20 flex flex-col gap-2.5`).
- **Hộp chuyển đổi Basemap (Basemap Switcher Capsule):**
  - Khối kính mờ trắng ngà: `bg-white/90 backdrop-blur-md p-1 rounded-2xl shadow-md border border-[#EAE3D9]`.
  - 3 nút (Đường phố / OSM / Vệ tinh): Nút được chọn mang nền Hồng Sen `#E11D48` hoặc Vàng Tatami `#D5C390` chữ trắng.
- **Các Nút Tròn Viên Thuốc (Icon Action Buttons):**
  - Kích thước: `w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-[#EAE3D9] flex items-center justify-center hover:bg-[#F4ECE7] active:scale-95 transition-all`.
  - Nút Bật/Tắt Ranh giới: Icon `Sparkles` màu hồng sen `#E11D48`.
  - Nút Định vị GPS: Icon `Crosshair` màu xanh tràm `#059669`.
  - Nút Về Toàn Tỉnh: Icon `Compass` màu vàng nâu `#E3A94A`.

---

## 3. THẺ XEM NHANH & POPUP DI TÍCH (LEAFLET POPUP SPEC)

- **Cấu trúc Khung Popup:**
  - Nền trắng `#FFFFFF`, bo góc `rounded-2xl`, viền mỏng `#EAE3D9`, shadow đa tầng mềm mại.
  - Header ảnh thực địa tỉ lệ 16:9 sắc nét, phủ gradient tối nhẹ ở chân ảnh để tôn vinh tiêu đề di tích.
  - Badge phân hạng: Màu Vàng Tatami `#D5C390` (Quốc gia đặc biệt) hoặc Hồng Sen `#E11D48` (Quốc gia).
  - Tên di tích: `Noto Serif`, 16px, chữ trắng nổi trên ảnh hoặc `#1E1B18` trên nền card.
- **Hàng Nút Hành Động (CTA Buttons):**
  - Nút 1 [Chỉ Đường WebGIS OSRM/A*]: Nền Xanh Tràm `#059669`, chữ trắng, bo tròn `rounded-xl`.
  - Nút 2 [Google Maps]: Nền kem nhạt `#F4ECE7`, chữ nâu than `#1E1B18`, border `#EAE3D9`.
  - Nút 3 [Chi Tiết & Audio Tour]: Nền Hồng Sen `#E11D48`, chữ trắng, hiệu ứng phát sáng nhẹ.

---

## 4. BANNER LỘ TRÌNH TSP & HỘP HÀNH TRÌNH ĐIỂM DỪNG (TOUR BANNER)

- **Hộp Hành Trình Nổi (Floating Route Summary Banner):**
  - Đặt tại góc trên bên trái (`top-4 left-4 right-4 md:right-auto md:w-[420px] z-20`).
  - Nền trắng ngà kính mờ: `bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#D5C390]`.
  - Huy hiệu Tuyến Du Lịch Chủ Đề: Màu Vàng Tatami `#D5C390` viền đỏ son.
  - Chuỗi điểm dừng có đánh số thứ tự: `1 -> 2 -> 3 -> 4...` với icon tròn màu hồng sen `#E11D48`.
  - Nút [Đóng Lộ Trình] & [Xem Chi Tiết Từng Chặng].

---

## 5. CHECKLIST KIỂM THỬ TRANG WEBGIS (DoD)

- [ ] Toàn bộ Sidebar, Popups, Floating Panels mang màu nền sáng ấm `#FAF7F2` và `#FFFFFF`.
- [ ] Đường biên giới Tỉnh Đồng Tháp Mới hiển thị sắc nét, nút toggle bật/tắt hoạt động tức thì.
- [ ] Bản đồ kéo trượt êm ái, không bị khựng hoặc giới hạn cứng khung nhìn.
- [ ] Nút Reset View co giãn mượt mà qua `fitBounds` bao trọn tỉnh mới.
- [ ] Đạt chuẩn tương phản 4.5:1 cho toàn bộ chữ trên các bảng điều khiển.
