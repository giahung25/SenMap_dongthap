# 📊 BÁO CÁO TIẾN ĐỘ THỰC HIỆN DỰ ÁN
**Đề tài:** Xây dựng hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp.  
**Sinh viên thực hiện:** Phan Trần Gia Hưng (MSSV: 0024417689)  
**Cập nhật lần cuối:** 2026-10-24

---

## 📈 TỔNG QUAN TIẾN ĐỘ HIỆN TẠI

- **Tiến độ tổng thể:** ~**50%** (Hoàn thành 100% toàn bộ giai đoạn Khảo sát, 10 Sơ đồ Hệ thống, CSDL vật lý, Wireframes và Design System).
- **Giai đoạn hiện tại:** Chuyển giao từ **Thiết kế CSDL** sang **Khởi chạy CSDL Docker & Lập trình Backend API**.
- **Trạng thái:** Vượt tiến độ kế hoạch đề cương (Ahead of schedule).

---

## 🗓️ TIẾN ĐỘ CHI TIẾT THEO CÁC MỐC ĐỀ CƯƠNG

| STT | Mốc thời gian | Hạng mục công việc theo Kế hoạch | Trạng thái | Chi tiết sản phẩm bàn giao |
| :---: | :---: | :--- | :---: | :--- |
| **1** | 01/09 – 10/09/2025 | Khảo sát bài toán, xác định phạm vi Web GIS | ✅ **Hoàn thành** | Đã duyệt ý tưởng và phạm vi đề tài |
| **2** | 16/09 – 30/09/2025 | Lập kế hoạch KLTN chi tiết, nộp Mẫu 2 | ✅ **Hoàn thành** | Đã nộp Mẫu 2 bản giấy cho GVHD |
| **3** | 01/10 – 30/10/2025 | Xây dựng đề cương chi tiết (Mẫu 3) | ✅ **Hoàn thành** | Đã nộp và lưu trữ bản Mẫu 3 mới nhất |
| **4** | 01/11 – 30/11/2025 | Chuẩn hóa dữ liệu & Thiết kế kiến trúc, CSDL | ✅ **Hoàn thành** | Đã hoàn thành 100% hồ sơ thiết kế, ERD, Schema DDL |
| **5** | **Hiện tại** | **Khởi chạy CSDL PostGIS & Lập trình Backend API** | 🚀 **Bắt đầu triển khai** | Chuẩn bị chạy Docker PostGIS và code API FastAPI |
| **6** | Dự kiến | Lập trình Frontend Web GIS (React + Leaflet) | ⏳ Chưa bắt đầu | Tích hợp bản đồ và tìm kiếm |
| **7** | Dự kiến | Phân hệ Quản trị CMS, QR Code, Routing | ⏳ Chưa bắt đầu | Module quản trị và xuất tem QR |
| **8** | Dự kiến | Kiểm thử thực địa (Cao Lãnh) & Viết báo cáo | ⏳ Chưa bắt đầu | Thử nghiệm quét mã thực tế |
| **9** | Dự kiến | Hoàn thiện báo cáo, nộp quyển & Bảo vệ | ⏳ Chưa bắt đầu | Bảo vệ trước Hội đồng chấm điểm |

---

## 📋 CHI TIẾT CÁC HẠNG MỤC ĐÃ HOÀN THÀNH

### 1. Tổ chức và Dọn dẹp Không gian Dự án
- [x] Thiết lập cấu trúc thư mục quy chuẩn: `01_TaiLieu`, `02_DuLieu_GIS`, `03_MaNguon`, `04_CoSoDuLieu`.
- [x] Tạo thư mục lưu trữ tài liệu tham khảo: `01_TaiLieu/Tai_Lieu_Tham_Khao/`.
- [x] Dọn sạch toàn bộ file rác, file tạm vào `01_TaiLieu/Thiet_Ke_He_Thong/99_File_Bo_Tro/`.
- [x] Thiết lập Bộ Quy tắc Quản trị & Điều phối Đa Tác nhân trên Herdr (`AGENTS.md`): phân quyền Orchestrator (`w2:p1`), Coder (`w2:p5`), Tester (`w2:p4`), Shell Runner (`w2:p6`).

### 2. Thu thập & Chuẩn hóa Dữ liệu Khảo sát
- [x] Lập danh mục và cấu trúc bảng khảo sát 20 di tích tiêu biểu tỉnh Đồng Tháp (`01_DanhSach_KhaoSat_20DiTich.csv`).

### 3. Tài liệu Yêu cầu & Kiến trúc Hệ thống
- [x] Báo cáo xác định Yêu cầu Chức năng (FR01 - FR13) và Phi chức năng (`02_XacDinhYeuCau.md`).
- [x] Tài liệu Thiết kế Kiến trúc & Lộ trình 2 Giai đoạn (`00_ThietKeKienTruc_Va_LoTrinh.md`): Chiến lược MVP (Python) trước, bứt phá thực nghiệm (Rust + Redis) sau.

### 4. Hệ thống 10 Sơ đồ Thiết kế (Đã kiểm thử cú pháp 100% không lỗi)
- [x] **Nhóm Luồng Xử Lý:**
  - Sơ đồ Tuần tự (Sequence Diagram): `01_Sequence_Diagram_QuetQR.md` & `.html`
  - Sơ đồ Hoạt động (Activity Diagram): `02_Activity_Diagram_CRUD_DiTich.md`
  - Sơ đồ Trạng thái (State Machine Diagram): `03_StateMachine_DiTich.md`
- [x] **Nhóm Cấu Trúc Hệ Thống:**
  - Sơ đồ Lớp (Class Diagram): `01_Class_Diagram.md`
  - Sơ đồ Kiến trúc (Architecture Diagram): `02_Architecture_Diagram.md` & `.html`
  - Sơ đồ Triển khai (Deployment Diagram): `03_Deployment_Diagram.md`
- [x] **Nhóm Dữ Liệu & Quy Trình:**
  - Sơ đồ Cơ sở Dữ liệu (ERD Logical): `01_ERD_Database.md`
  - Sơ đồ Luồng Dữ liệu (DFD Mức 1): `02_DataFlow_Diagram.md`
  - Sơ đồ Quy trình Nghiệp vụ (BPMN 2.0): `03_BPMN_Diagram.md`
  - Sơ đồ Use Case Chi tiết (UML): `04_UseCase_ChiTiet.md`


### 5. Thiết kế Cơ sở Dữ liệu Vật lý (Physical DB Design)
- [x] Biên soạn Từ điển Dữ liệu (Data Dictionary): `04_CoSoDuLieu/THIET_KE_CSDL_CHI_TIET.md` (6 bảng chính + 1 bảng nhật ký).
- [x] Xây dựng tập lệnh DDL hoàn chỉnh: `04_CoSoDuLieu/Scripts/01_init_schema.sql`.
- [x] Tối ưu hóa khóa chính (`IDENTITY`), khóa ngoại (`CASCADE`/`RESTRICT`), ràng buộc `CHECK`.
- [x] Tối ưu hóa chỉ mục không gian: GiST Index trên `geom` Point (WGS 84).
- [x] Tối ưu hóa chỉ mục tìm kiếm mờ: Trigram GIN Index trên `ten_di_tich`.
- [x] Trigger tự động cập nhật thời gian: `set_timestamp_di_tich`, `set_timestamp_qr_code`.

### 6. Thiết kế Giao diện UI/UX & Wireframes
- [x] Đặc tả Hệ thống Thiết kế & Lưới tỷ lệ Responsive (Desktop 12 cột, Mobile 4 cột `100dvh`).
- [x] Phác thảo thô (Low-fidelity Wireframes ASCII) cho Desktop và Mobile.
- [x] Cấu trúc chi tiết (High-fidelity Specifications): Định vị Z-Index, kích thước nút, padding, bảng màu hồng sen `#E11D48`.
- [x] Thiết kế tối ưu Mobile-First cho màn hình Quét mã QR thực địa (`/di-tich/:id` có sticky CTA chỉ đường).
- [x] Thiết kế Form Quản trị CMS: Bản đồ mini click chọn tọa độ GPS tự động + Khối xem trước tem in A5.
- [x] Xuất tài liệu đầy đủ: `01_TaiLieu/Thiet_Ke_He_Thong/06_ThietKe_UI_UX_Wireframes.md`.

### 7. Hệ thống Thiết kế Thương hiệu (Design System)
- [x] Bảng màu Đất Sen Hồng: Primary `#E11D48` (Hồng Sen Rose-600), Secondary `#059669` (Xanh Tràm Emerald-600).
- [x] Hệ thống màu ngữ nghĩa (Success, Warning, Error, Info) và màu nền Surface chuẩn WCAG 2.1 AA.
- [x] Hệ thống kiểu chữ Typography: Phông chính `Be Vietnam Pro` tối ưu tiếng Việt, thang chia từ H1 (32px) đến Caption (12px).
- [x] Đặc tả chi tiết UI Components: Button (Chỉ đường, Primary, FAB), Floating Search Capsule, Mobile Bottom Sheet, Input, Cards.
- [x] Đoạn mã mẫu cấu hình Tailwind CSS (`tailwind.config.js`) sẵn sàng cho lập trình viên tái sử dụng.
- [x] Xuất tài liệu đầy đủ: `01_TaiLieu/Thiet_Ke_He_Thong/07_HeThong_ThietKe_Design_System.md`.
---

## 🎯 CÔNG VIỆC TIẾP THEO CẦN LÀM (NEXT ACTIONS)

1. **Khởi tạo Docker Compose:** Dựng container PostgreSQL 16 + PostGIS 3.4 (`docker-compose.yml`).
2. **Thực thi script khởi tạo CSDL:** Chạy `01_init_schema.sql` vào PostGIS để tạo bảng và index.
3. **Nạp dữ liệu mẫu:** Viết script SQL insert tọa độ 20 di tích vào PostGIS (`02_mock_data_20_di_tich.sql`).
4. **Khởi tạo Backend FastAPI:** Xây dựng các router API phục vụ dữ liệu GeoJSON cho bản đồ.
