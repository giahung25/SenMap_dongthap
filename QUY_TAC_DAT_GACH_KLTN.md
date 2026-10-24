# 🏛️ BỘ QUY TẮC ĐẶT GẠCH KHÓA LUẬN TỐT NGHIỆP (KLTN24)
**Đề tài:** Hệ thống bản đồ số tra cứu di tích và địa điểm văn hóa tỉnh Đồng Tháp (WebGIS Đồng Tháp)  
**Tác giả:** Phan Trần Gia Hưng (MSSV: 0024417689) — Lớp ĐHCNTT24B-IT  
**Giảng viên hướng dẫn:** ThS. GVC. Huỳnh Lê Uyên Minh  
**Mục tiêu bảo vệ:** Điểm A / Xuất sắc (≥ 9.0)  

---

## 📌 NGUYÊN TẮC KIM CƯƠNG: "WORKING SOFTWARE OVER DOCUMENTATION"
> Mọi lý thuyết, sơ đồ, mô hình thiết kế đều phải được chứng minh bằng **MÃ NGUỒN CHẠY THẬT (Working Code)**, có API test pass 100%, có giao diện tương tác thật trên bản đồ. Tuyệt đối không lưu giữ code chết (dead code) hoặc file nháp không sử dụng.

---

## 1. 🎛️ QUY TẮC ĐIỀU PHỐI ĐA AGENT TRÊN HERDR (WORKSPACE W2)
* **Hermes (Agent Tổng chỉ huy / PM từ xa):** Quản trị kiến trúc vĩ mô, đánh giá chất lượng học thuật, phân bổ task lớn và kiểm soát tiến độ đề cương.
* **`w2:p1` (pi - Lead Orchestrator):** Chỉ huy trực tiếp trên laptop, phân task nguyên tử (atomic task), kiểm tra chéo và phê duyệt commit.
* **`w2:p5` (omp - Builder / Coder):** Chuyên trách code Backend (FastAPI, PostGIS SQL, Pydantic, GeoAlchemy2) và Frontend WebGIS.
* **`w2:p4` (agy - Tester / Auditor):** Viết pytest, API test, kiểm tra độ hợp lệ của tọa độ không gian, audit code Clean Architecture và chuẩn học thuật.
* **`w2:p6` (shell - Runner):** Chạy Docker Compose, migrate CSDL, chạy server dev, kiểm tra port (`:8000`, `:5432`, `:5173`).

---

## 2. 🗄️ QUY TẮC DỮ LIỆU & TỌA ĐỘ KHÔNG GIAN (SPATIAL DATA INTEGRITY)
1. **Hệ quy chiếu chuẩn:**
   * Lưu trữ CSDL & API: **WGS84 (EPSG:4326)** — định dạng `[Longitude, Latitude]` (Kinh độ trước, Vĩ độ sau theo chuẩn GeoJSON RFC 7946).
   * Chuyển đổi khi đo đạc hành chính: **VN-2000 Đồng Tháp (EPSG:9210 hoặc kinh tuyến trục 105°00')**.
2. **Bounding Box Guard (Hàng rào tọa độ Đồng Tháp):**
   * Mọi điểm di tích nạp vào hệ thống **BẮT BUỘC** phải nằm trong phạm vi địa lý tỉnh Đồng Tháp:
     - Kinh độ ($X$ / Lon): `105.15°` $\le \text{Lon} \le$ `105.95°`
     - Vĩ độ ($Y$ / Lat): `10.10°` $\le \text{Lat} \le$ `10.95°`
   * Bất kỳ bản ghi nào có tọa độ nằm ngoài Bounding Box trên phải bị API chặn lại ngay lập tức (Validation Error 422).
3. **Chuẩn dữ liệu đầu ra:**
   * Mọi API danh sách di tích trả về bản đồ bắt buộc tuân thủ chuẩn **GeoJSON FeatureCollection**.

---

## 3. 🏗️ QUY TẮC KIẾN TRÚC & MÃ NGUỒN (CLEAN ARCHITECTURE & SOLID)
1. **Phân tầng rõ rệt (Strict Layering):**
   * `Domain / Models`: Khai báo thực thể CSDL (SQLAlchemy/GeoAlchemy2) và lược đồ dữ liệu (Pydantic schemas). Không chứa logic truy vấn phức tạp.
   * `Repositories / CRUD`: Thực thi truy vấn PostGIS thuần túy (`ST_DWithin`, `ST_Distance`, `ST_AsGeoJSON`).
   * `Services / Business Logic`: Xử lý nghiệp vụ (tính lộ trình, lọc theo loại di tích, tính khoảng cách người dùng).
   * `Routers / Endpoints`: Tiếp nhận HTTP Request, validate dữ liệu và trả response kèm HTTP status code chuẩn.
2. **Bảo mật biến môi trường (Zero Hardcode):**
   * Toàn bộ cấu hình DB (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `DATABASE_URL`, `JWT_SECRET`) phải đọc từ file `.env`.
   * Luôn duy trì file `.env.example` với dữ liệu mẫu an toàn.
3. **Tài liệu hóa API tự động:**
   * 100% Endpoint FastAPI phải có `summary`, `description`, `response_model` và docstring rõ ràng hiển thị trên Swagger UI (`/docs`).

---

## 4. 🔒 QUY TẮC BẢO TOÀN TÀI LIỆU & AUDIT TRAIL (ZERO-DELETION POLICY)
1. **Tuyệt đối không xóa file (No Hard Deletes):**
   * Cấm chạy lệnh `rm` hoặc xóa vĩnh viễn các file dữ liệu `.geojson`, `.shp`, tài liệu thiết kế.
   * Nếu có phiên bản cũ cần thay thế: Chuyển bản cũ vào thư mục `_Archive/` kèm timestamp.
2. **Nhật ký bắt buộc sau mỗi thao tác:**
   * Ghi nhận tức thì vào `NHAT_KY_HOAT_DONG.md`.
   * Cập nhật checklist trong `TIEN_DO_DU_AN.md` khi xong task.
3. **Chuẩn Commit Git (Conventional Commits):**
   * Tuân thủ: `feat|fix|docs|refactor|test|chore(scope): message`.

---

## 5. ✅ TIÊU CHUẨN NGHIỆM THU TỪNG VIÊN GẠCH (DEFINITION OF DONE - DOD)
Một task chỉ được đánh dấu là **HOÀN THÀNH** khi đáp ứng đủ 5 điều kiện:
1. [ ] Mã nguồn sạch, không còn warning cú pháp, không còn hardcode.
2. [ ] Đã có ít nhất 1 bài test tự động chạy PASS 100%.
3. [ ] Chạy thực tế thành công trên môi trường cục bộ (Docker / Local Server).
4. [ ] Đã ghi nhận dòng nhật ký vào `NHAT_KY_HOAT_DONG.md`.
5. [ ] Đã commit git với thông điệp chuẩn Conventional Commits.
