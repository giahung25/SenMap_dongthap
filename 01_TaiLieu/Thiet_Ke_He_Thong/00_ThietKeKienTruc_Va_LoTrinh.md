# TÀI LIỆU THIẾT KẾ KIẾN TRÚC & LỘ TRÌNH TRIỂN KHAI (2 GIAI ĐOẠN)
**Dự án:** Xây dựng hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp.  
**Tác giả:** Phan Trần Gia Hưng (MSSV: 0024417689)  
**Chiến lược kỹ thuật:** Dual-Track Strategy (Chiến lược 2 giai đoạn: MVP Cốt lõi ➔ Nâng cấp Thực nghiệm)

---

## 1. Bảng Chốt Kiến Trúc Toàn Diện (Final Architecture Stack)

| Thành phần | Giai đoạn 1: MVP Cốt lõi (Bảo hiểm Đồ án) | Giai đoạn 2: Tối ưu & Thực nghiệm (Bứt phá Điểm số) |
| :--- | :--- | :--- |
| **Kiến trúc tổng thể** | Decoupled Client - Server (3-Tier) | Decoupled Client - Server có Caching Layer |
| **Frontend** | React.js (Vite) + Leaflet.js + Tailwind CSS | Giữ nguyên (giao diện ổn định) |
| **Backend API** | Python (FastAPI) + GeoAlchemy2 + Pydantic | Rust (Axum) + SQLx + GeoZero |
| **Cơ sở dữ liệu** | PostgreSQL 16 + PostGIS Extension (Docker) | PostgreSQL/PostGIS + Redis In-Memory Cache |
| **Giao thức mạng** | RESTful API (JSON / GeoJSON RFC 7946) | RESTful API có HTTP Caching & Nén Gzip/Brotli |
| **Môi trường chạy** | Docker Compose (Cục bộ & Server) | Docker Compose Multi-Container (App + DB + Redis) |
| **Mục tiêu đạt được** | Hệ thống chạy trơn tru, nộp đúng hạn, không lỗi | Benchmark so sánh hiệu năng: Python vs Rust, Cache vs No-Cache |

---

## 2. Chi Tiết Giai Đoạn 1: Xây Dựng Bản MVP Cốt Lõi (Safe Track)

### 2.1. Mục tiêu trọng tâm
Xây dựng một hệ thống hoàn chỉnh từ đầu đến cuối (End-to-End) theo đúng cam kết trong đề cương, đảm bảo 100% điều kiện bảo vệ Khóa luận tốt nghiệp với chất lượng ổn định và không phát sinh lỗi vặt.

### 2.2. Các bước triển khai cụ thể
1. **Bước 1.1: Thiết lập Hạ tầng CSDL (Database Setup)**
   - Khởi tạo `docker-compose.yml` chạy cụm container PostgreSQL 16 kèm PostGIS extension.
   - Chạy script tạo bảng (`schema.sql`): `di_tich`, `danh_muc`, `huyen_tp`, `hinh_anh`, `qr_code`, `quan_tri_vien`.
   - Thiết lập chỉ mục không gian (Spatial Index `GiST`) trên cột hình học `geom (Point, WGS84 - SRID 4326)`.
   - Nạp dữ liệu mẫu (Mock data) của 20 di tích tiêu biểu tại Đồng Tháp.

2. **Bước 1.2: Xây dựng Backend API (FastAPI MVP)**
   - Khởi tạo dự án FastAPI với kiến trúc module phân tầng: `api/`, `core/`, `models/`, `schemas/`, `services/`.
   - Xây dựng các Endpoints công khai cho Du khách:
     - `GET /api/v1/di-tich`: Danh sách di tích kèm lọc theo Huyện/Cấp xếp hạng, trả về GeoJSON.
     - `GET /api/v1/di-tich/{id}`: Chi tiết một di tích phục vụ điều hướng khi quét mã QR.
     - `GET /api/v1/di-tich/nearby?lat=...&lng=...&radius=...`: Tìm di tích lân cận bằng hàm `ST_DWithin`.
   - Xây dựng các Endpoints quản trị (CMS) kèm xác thực JWT:
     - `POST /api/v1/auth/login`: Đăng nhập cấp Token.
     - `POST /api/v1/admin/di-tich`: Thêm di tích mới (nhận tọa độ ghim trên bản đồ).
     - `PUT`, `DELETE`: Cập nhật và xóa di tích.
   - Module sinh mã QR: Dùng thư viện Python `qrcode` tạo ảnh PNG gắn link `/di-tich/{id}`.

3. **Bước 1.3: Xây dựng Frontend Web GIS (React + Leaflet)**
   - Khởi tạo dự án React bằng Vite, tích hợp Tailwind CSS theo chuẩn Mobile-First.
   - Cài đặt `leaflet` và `react-leaflet`:
     - Tải bản đồ nền OpenStreetMap miễn phí, không giới hạn quota.
     - Hiển thị 20 ghim di tích (Marker) có gom cụm (`leaflet.markercluster`).
     - Thanh tìm kiếm và bộ lọc nhanh theo huyện/thị.
     - Popup tóm tắt thông tin và trang chi tiết di tích (`/di-tich/:id`).
   - Tích hợp HTML5 Geolocation API: Lấy tọa độ GPS người dùng và vẽ đường đi bằng Leaflet Routing Machine / OSRM.

4. **Bước 1.4: Tích hợp và Kiểm thử hoàn thiện**
   - Kết nối Frontend và Backend thông qua Axios.
   - Kiểm thử quét mã QR trên điện thoại thực tế qua mạng nội bộ hoặc ngrok.

### 2.3. Tiêu chí nghiệm thu Giai đoạn 1 (Checklist bàn giao)
- [ ] Database khởi động bằng 1 lệnh `docker compose up -d`.
- [ ] Trang Swagger UI (`/docs`) hoạt động 100%, test đủ các API CRUD.
- [ ] Web GIS hiển thị mượt mà 20 điểm di tích trên bản đồ.
- [ ] Quét mã QR bằng điện thoại nhảy vào đúng trang chi tiết di tích.

---

## 3. Chi Tiết Giai Đoạn 2: Nâng Cấp Hiệu Năng & Thực Nghiệm Học Thuật (High-Performance Track)

### 3.1. Mục tiêu trọng tâm
Nâng tầm đề tài từ một "ứng dụng tốt nghiệp thông thường" thành một **bài nghiên cứu khoa học có thực nghiệm và số liệu đối chứng**, tạo điểm nhấn xuất sắc khi chấm điểm Khóa luận.

### 3.2. Hạng mục 1: Tích hợp Redis Caching Layer
*   **Mô hình hoạt động:**
    - Khởi chạy Redis Container cùng mạng Docker với PostgreSQL.
    - Cấu hình Cache-Aside Pattern: Khi có yêu cầu tìm kiếm hoặc lấy danh sách di tích, Backend kiểm tra trong Redis trước.
    - Nếu có (Cache Hit): Trả về ngay trong < 1 mili-giây.
    - Nếu không (Cache Miss): Truy vấn PostGIS, lưu kết quả vào Redis với thời gian TTL = 3600s rồi trả về Client.
    - Khi Admin thêm/sửa di tích: Tự động xóa cache (Invalidate Cache) để dữ liệu luôn chính xác.

### 3.3. Hạng mục 2: Viết phiên bản Backend hiệu năng cao bằng Rust (Axum)
*   Tạo thư mục độc lập `03_MaNguon/Backend_Rust/`.
*   Sử dụng framework **Axum** + **Tokio** runtime + **SQLx** để viết lại các API đọc dữ liệu chính:
    - API lấy toàn bộ danh sách di tích.
    - API truy vấn di tích lân cận qua PostGIS.
*   **Lợi thế khi viết ở bước này:** Đã có bản Python chạy chuẩn làm mẫu (tên bảng, câu query SQL, định dạng JSON đầu ra), chỉ việc chuyển đổi logic sang cú pháp Rust mà không lo bị tắc nghẽn tiến độ dự án chung.

### 3.4. Hạng mục 3: Kế hoạch Kiểm thử Tải & Đo lường Hiệu năng (Benchmarking)
*   **Công cụ thực nghiệm:** Sử dụng `k6` (Grafana) hoặc `wrk` để giả lập tải đồng thời.
*   **Kịch bản đo tải (Test Scenarios):**
    - Kịch bản A: 100 người dùng đồng thời quét mã QR truy cập trang chi tiết.
    - Kịch bản B: 500 người dùng đồng thời tải bản đồ và tìm kiếm di tích lân cận.
    - Kịch bản C: Stress Test tăng dần từ 100 -> 2.000 requests/giây.
*   **Các chỉ số đo lường (Metrics):**
    1. **Thông lượng (Throughput):** Requests Per Second (RPS).
    2. **Độ trễ phản hồi (Latency):** p50, p95, p99 (ms).
    3. **Tiêu thụ tài nguyên:** CPU Usage (%), RAM Consumption (MB).

### 3.5. Cấu trúc nội dung đưa vào Báo cáo Khóa luận (Chương 4)
*   **Mục 4.1:** Thiết kế kịch bản thử nghiệm và môi trường phần cứng đo tải.
*   **Mục 4.2:** Bảng số liệu và Biểu đồ đối chứng:
    - *Biểu đồ 1:* So sánh thời gian phản hồi giữa **Python FastAPI** và **Rust Axum**.
    - *Biểu đồ 2:* So sánh thông lượng khi **Có Redis Cache** và **Không có Redis Cache**.
    - *Biểu đồ 3:* Mức độ chiếm dụng bộ nhớ RAM của từng kiến trúc.
*   **Mục 4.3:** Phân tích, đánh giá và kết luận về tính khả thi, chi phí vận hành máy chủ thực tế.

---

## 4. Kế Hoạch Quản Trị Rủi Ro (Risk Management)

| Rủi ro tiềm ẩn | Mức độ ảnh hưởng | Biện pháp giảm thiểu |
| :--- | :--- | :--- |
| Kẹt lỗi cú pháp / Borrow checker khi code Rust | Trung bình | Đã có sẵn Backend Python hoàn chỉnh 100%. Nếu không kịp viết xong Rust trước ngày nộp bài, chỉ cần nộp bản Python + Redis, vẫn đạt điểm giỏi. |
| Bản đồ chậm khi dùng mạng 4G yếu | Cao | Leaflet chỉ tải tiles xung quanh vị trí nhìn thấy; nén Gzip cho toàn bộ chuỗi GeoJSON trả về. |
| Tọa độ GPS của du khách bị lệch | Thấp | Bổ sung cơ chế fallback: nếu người dùng không bật định vị, mặc định lấy tâm bản đồ tại TP Cao Lãnh. |

---

## 5. Kết luận
Chiến lược 2 giai đoạn này loại bỏ hoàn toàn rủi ro "cháy đồ án" vì Giai đoạn 1 sẽ hoàn tất một hệ thống hoàn chỉnh trong thời gian ngắn. Giai đoạn 2 đóng vai trò là "bệ phóng" giúp bài khóa luận đạt chất lượng chuyên môn vượt trội so với mặt bằng chung.
