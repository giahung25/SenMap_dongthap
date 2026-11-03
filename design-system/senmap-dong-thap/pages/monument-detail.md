# 🏛️ PAGE DESIGN SPECIFICATION: MONUMENT DETAIL (TRANG CHI TIẾT DI TÍCH /di-tich/:id)

> **Phạm vi file:** `frontend/src/pages/MonumentDetail.jsx` và các component hỗ trợ (Audio Player, Photo Gallery, Micro-GIS Precinct Map, QR Badge Card)  
> **Kế thừa:** Kế thừa toàn bộ token toàn cục từ `design-system/senmap-dong-thap/MASTER.md`.  
> **Định hướng phong cách:** Tạp chí Di sản Văn hóa & Lịch sử Cao cấp (Editorial Heritage Magazine) kết hợp Sơ đồ Chi tiết Nội khu (Micro-GIS Precinct Map). Chuyển hóa toàn bộ giao diện từ tông đen tối sang màu Giấy Điệp sáng ấm `#FAF7F2` và Kem ngà `#F4ECE7`.

---

## 1. CẤU TRÚC 6 KHỐI NỘI DUNG TẠP CHÍ DI SẢN

### 1.1. Khối 1 — Hero Bìa Tạp Chí & Thông Tin Định Danh (Editorial Header)
- **Hình ảnh Bìa:** Ảnh chụp thực địa góc rộng độ phân giải cao tỉ lệ 21:9 hoặc 16:9, phủ gradient chuyển tiếp mượt mà xuống nền `#FAF7F2`.
- **Huy Hiệu Xếp Hạng Di Tích (Heritage Classification Badge):**
  - Di tích Quốc gia Đặc biệt: Nền Vàng Chiếu Tatami `#D5C390` với chữ đen than `#1E1B18` in hoa, viền vàng rực rỡ, icon ngôi sao di sản.
  - Di tích Quốc gia: Nền Hồng Sen `#E11D48` với chữ trắng, viền sang trọng.
  - Di tích Cấp Tỉnh: Nền Xanh Tràm `#059669` chữ trắng.
- **Tên Di Tích (Headline H1):**
  - Phông chữ: `Noto Serif Display`, cỡ chữ `36px - 44px` (Desktop) / `26px - 30px` (Mobile).
  - Trọng lượng: `font-bold` (700), màu đen than trầm `#1E1B18`.
  - Tên phụ / Tên dân gian: Phông nghiêng `italic`, màu nâu đất `#4A453E`.
- **Thanh Tác Vụ Nổi Nhanh (Floating Action Bar):**
  - Nút [Chỉ Đường WebGIS] (Xanh Tràm `#059669`).
  - Nút [Nghe Audio Tour Thuyết Minh] (Hồng Sen `#E11D48`).
  - Nút [Lưu Yêu Thích] & [Chia Sẻ Hồ Sơ Di Tích].

### 1.2. Khối 2 — Trình Phát Audio Tour Thuyết Minh Di Sản (SenMap Audio Player)
- **Thiết kế:** Dạng thanh phát âm thanh thanh lịch phong cách Tạp chí cao cấp (`bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-md`).
- **Thành phần:**
  - Nút Play/Pause lớn tròn: Màu Hồng Sen `#E11D48` với icon sóng âm động.
  - Thanh sóng âm / Tiến độ: Màu Vàng Lúa Chín `#E3A94A` kết hợp Hồng Sen.
  - Bộ chọn giọng đọc AI (Voice Selector): Hỗ trợ giọng Nữ Nam Bộ dịu ngọt (Đồng Tháp), Nam Nam Bộ ấm áp, và giọng Anh chuẩn quốc tế (US/UK).
  - Khung xem bản ghi lời bình (Audio Narration Transcript): Hiển thị phụ đề đồng bộ chạy theo giọng đọc.

### 1.3. Khối 3 — Trường Thiên Lịch Sử & Giá Trị Kiến Trúc (Historical Narrative)
- **Bố cục Văn bản Báo chí (Editorial Prose Layout):**
  - Chữ cái mở đầu to hoa mỹ (Drop Cap): Chiều cao 3 dòng, phông `Noto Serif`, màu Hồng Sen `#E11D48` hoặc Đỏ Son `#8B1D1D`.
  - Thân bài: `Be Vietnam Pro`, cỡ `16px`, `line-height: 1.8`, màu nâu đất nung `#4A453E` giúp du khách đọc say mê không mỏi mắt.
  - Hộp trích dẫn nổi bật (Pull Quote Block): Viền trái 4px màu Vàng Tatami `#D5C390`, phông chữ `Noto Serif Italic` trích dẫn ca dao, sự kiện lịch sử hoặc nhận định của nhà nghiên cứu.
- **Bộ Sưu Tập Ảnh Thực Địa (Authentic Photo Gallery):**
  - Lưới ảnh Masonry 3-4 cột, bo góc `rounded-2xl`, hiệu ứng phóng to Lightbox toàn màn hình khi nhấp chuột.

### 1.4. Khối 4 — Bản Đồ Sơ Đồ Chi Tiết Nội Khu (Micro-GIS Precinct Site Map)
- **Kiến trúc Bản đồ 2 Tầng (Dual-Scale GIS):**
  - Chuyển đổi linh hoạt giữa:
    - **Macro-GIS:** Vị trí di tích trên bản đồ toàn tỉnh Đồng Tháp.
    - **Micro-GIS (Zoom 17-19):** Sơ đồ chi tiết khuôn viên di tích (Đền thờ, Mộ phần, Nhà trưng bày, Hầm bí mật, Bến xuồng, Quầy lưu niệm, Nhà vệ sinh).
  - Lộ trình đi bộ tham quan nội khu (Walking Tour Itinerary): Đánh dấu chuỗi điểm dừng nội bộ `A -> B -> C -> D`.

### 1.5. Khối 5 — Cẩm Nang & Lưu Ý Tham Quan Thực Địa (Visitor Practical Guide)
- Bảng thông tin 4 thẻ tiện ích dạng lưới (`bg-[#F4ECE7] rounded-2xl p-5 border border-[#EAE3D9]`):
  1. *Thời gian mở cửa:* 07:00 - 17:00 hàng ngày (kể cả Lễ, Tết).
  2. *Giá vé tham quan:* Miễn phí vé vào cổng / Mức giá niêm yết (VNĐ).
  3. *Trang phục & Ứng xử:* Khuyến nghị trang phục lịch sự, tôn nghiêm nơi thờ tự.
  4. *Thời điểm đẹp nhất:* Gợi ý tháng hoặc khung giờ tham quan lý tưởng.

### 1.6. Khối 6 — Thẻ Tem Mã QR Di Sản Thông Minh (Heritage QR Identifier)
- Khối hiển thị mã QR vector sắc nét chuẩn bị sẵn sàng cho du khách in ấn hoặc quét thử.
- 2 nút tiện ích: [Tải mã QR PNG chất lượng cao] + [In thẻ A5 gắn tại di tích].

---

## 2. CHECKLIST KIỂM THỬ TRANG CHI TIẾT (DoD)

- [ ] Toàn bộ trang nằm trên nền sáng ấm `#FAF7F2` và `#F4ECE7`, tạo cảm giác trang trọng như đọc sách nghiên cứu văn hóa cổ.
- [ ] Tiêu đề chính H1 và các Heading dùng phông có chân `Noto Serif Display`.
- [ ] Đoạn văn dài dùng phông `Be Vietnam Pro` với độ giãn dòng `leading-[1.8]` chuẩn mực.
- [ ] Trình phát Audio Tour hoạt động ổn định, có phụ đề đồng bộ.
- [ ] Khung sơ đồ nội khu Micro-GIS hỗ trợ phóng to và xem rõ các hạng mục nội bộ.
- [ ] Độ tương phản màu đạt chuẩn WCAG 2.1 AA tối thiểu 4.5:1.
