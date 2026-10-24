# 🏛️ BỘ QUY TẮC QUẢN TRỊ & ĐIỀU PHỐI ĐA TÁC NHÂN (PROJECT AGENT RULES)

**Dự án:** Xây dựng hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp  
**Sinh viên thực hiện:** Phan Trần Gia Hưng (MSSV: 0024417689 - Lớp: ĐHCNTT24B-IT)  
**Giảng viên hướng dẫn:** ThS. GVC. Huỳnh Lê Uyên Minh  

---

## 1. ⚠️ QUY TẮC GHI NHẬT KÝ & TIẾN ĐỘ BẮT BUỘC (MANDATORY LOGGING RULE)

Bất kỳ AI Agent hoặc Lập trình viên nào khi nhận nhiệm vụ và thực hiện bất kỳ thay đổi nào trên không gian dự án này **BẮT BUỘC PHẢI TUÂN THỦ**:

1. **Ghi lại Nhật ký thao tác vào `NHAT_KY_HOAT_DONG.md`:**
   - Mỗi khi thực hiện tạo mới file/thư mục, sửa đổi nội dung, tái cấu trúc, cài đặt thư viện hay fix bug, **BẮT BUỘC** phải append một dòng vào bảng lịch sử tại `NHAT_KY_HOAT_DONG.md`.
   - Định dạng chuẩn:
     `| **YYYY-MM-DD HH:mm:ss** | [Tên Agent / Vai trò] | [Loại thao tác: Tạo mới/Sửa đổi/Xóa/Sửa lỗi/Cấu hình/Kiểm thử] | [Nội dung chi tiết & Kết quả] |`
   - Ghi rõ ngày, tháng, năm và giờ, phút, giây thực tế tại thời điểm thực thi.

2. **Cập nhật Tiến độ vào `TIEN_DO_DU_AN.md`:**
   - Nếu thao tác hoàn thành một đầu mục công việc (task), phải đồng thời cập nhật trạng thái checklist và phần trăm hoàn thành trong file `TIEN_DO_DU_AN.md`.

3. **Giữ gìn vệ sinh thư mục (Directory Hygiene):**
   - **TUYỆT ĐỐI KHÔNG** tạo các file tạm, file nháp, hoặc file log bừa bãi ở thư mục gốc `D:\KLTN24`.
   - Mọi tài liệu, dữ liệu và mã nguồn phải được lưu đúng vào 4 phân khu quy chuẩn:
     - `01_TaiLieu/` — Hồ sơ đề cương, báo cáo KLTN, tài liệu thiết kế hệ thống & sơ đồ (`99_File_Bo_Tro/` chứa file phụ trợ).
     - `02_DuLieu_GIS/` — Dữ liệu tọa độ khảo sát (`Toa_Do/`), hình ảnh tư liệu (`Hinh_Anh/`), và mẫu tem QR (`QR_Code/`).
     - `03_MaNguon/` — Mã nguồn phần mềm (`Backend_API/`, `Frontend_WebGIS/`, và `docker-compose.yml`).
     - `04_CoSoDuLieu/` — Thiết kế CSDL vật lý, script khởi tạo (`Scripts/`) và dữ liệu mẫu (`Mock_Data/`).

---

## 2. 🎛️ MÔ HÌNH ĐIỀU PHỐI ĐA TÁC NHÂN TRÊN HERDR (MULTI-AGENT ORCHESTRATION)

Toàn bộ không gian làm việc của dự án trên **Herdr Workspace `w2` (`KLTN24`)** được vận hành theo mô hình **Chỉ huy – Thực thi – Kiểm định (Orchestrator – Coder – Tester)**:

| Pane ID | Định danh (`label`) | Engine | Vai trò & Trách nhiệm chính | Phạm vi File (File Ownership) |
| :--- | :--- | :--- | :--- | :--- |
| **`w2:p1`** | **`main` (Orchestrator)** | `pi` | **Trung tâm Chỉ huy & Giám sát:** Phân rã yêu cầu của người dùng thành các task nguyên tử (atomic tasks), giao việc cho các agent qua `herdr`, kiểm tra chéo kết quả (Review/Verify), quản lý khóa file và phê duyệt cập nhật tiến độ. | Toàn quyền điều phối, quản trị `AGENTS.md`, `TIEN_DO_DU_AN.md`, `NHAT_KY_HOAT_DONG.md`. |
| **`w2:p5`** | **`coder` (Builder)** | `omp` | **Kỹ sư Phát triển Mã nguồn & Dữ liệu:** Trực tiếp viết code Backend FastAPI, Frontend React/Leaflet, script SQL PostGIS, và vẽ sơ đồ kiến trúc (`archify`) theo đúng đặc tả từ Orchestrator. | `03_MaNguon/`, `04_CoSoDuLieu/`, `02_DuLieu_GIS/`. |
| **`w2:p4`** | **`tester` (QA & Docs)** | `agy` | **Kỹ sư Kiểm thử, Rà soát & Tài liệu:** Thực hiện kiểm thử độc lập (Unit/API/E2E test, truy vấn không gian PostGIS), kiểm tra chuẩn UI/UX Design System, rà soát bảo mật và hỗ trợ biên soạn báo cáo/LaTeX. | `01_TaiLieu/`, các thư mục `tests/` trong `03_MaNguon/`. |
| **`w2:p6`** | **`shell` (Runner)** | `pwsh` | **Môi trường Thực thi Lệnh:** Chạy Docker Compose, khởi tạo/migrate PostGIS, chạy server phát triển và chạy bộ test thực tế qua `herdr pane run`. | Không sửa file trực tiếp; chỉ chạy tiến trình. |

### Quy tắc Giao tiếp & Điều phối Liên Agent (Inter-Agent Rules)
1. **Chống xung đột ghi file (Single-Writer Lock):** Tại một thời điểm, **chỉ một Agent** được phép chỉnh sửa trên cùng một file hoặc một module. Orchestrator (`w2:p1`) chịu trách nhiệm phân vùng file rõ ràng trong lệnh prompt giao việc.
2. **Giao thức Prompt Giao việc Chuẩn (Task Dispatch Format):**
   Khi Orchestrator giao việc cho `coder` (`w2:p5`) hoặc `tester` (`w2:p4`), prompt phải bao gồm đủ 4 mục:
   - **[MỤC TIÊU]:** Mô tả ngắn gọn sản phẩm cần hoàn thành.
   - **[PHẠM VI FILE]:** Danh sách đường dẫn file được phép tạo/sửa và các tài liệu thiết kế cần tham chiếu.
   - **[YÊU CẦU KỸ THUẬT]:** Các ràng buộc cụ thể về schema, API contract, hoặc UI/UX token.
   - **[TIÊU CHÍ NGHIỆM THU (DoD)]:** Cách thức kiểm tra kết quả và yêu cầu báo cáo ngắn gọn khi hoàn tất.
3. **Không tự ý ghi đè Log khi chạy song song:** Nếu nhiều agent cùng thực thi song song, các agent thực thi báo cáo kết quả về cho Orchestrator (`w2:p1`) để Orchestrator tổng hợp và ghi nhận đồng bộ vào `NHAT_KY_HOAT_DONG.md` và `TIEN_DO_DU_AN.md` (tránh race condition trên file Markdown). Khi chạy đơn lẻ tuần tự, agent thực thi có thể tự ghi log hoặc để Orchestrator ghi sau bước nghiệm thu.

---

## 3. 🔄 QUY TRÌNH 5 BƯỚC THỰC THI MỖI HẠNG MỤC (5-STEP WORKFLOW)

Mọi tính năng hoặc đầu mục công việc của dự án đều phải đi qua 5 bước chuẩn:

1. **Bước 1 — Đối chiếu Thiết kế (Spec Alignment):**
   - Trước khi viết bất kỳ dòng code nào, phải đối chiếu với bộ tài liệu thiết kế đã duyệt tại `01_TaiLieu/Thiet_Ke_He_Thong/` và `04_CoSoDuLieu/THIET_KE_CSDL_CHI_TIET.md`.
2. **Bước 2 — Phân công & Khởi tạo (Dispatch & Build):**
   - Orchestrator giao task cho `coder` (`w2:p5`) hoặc thực thi trực tiếp các cấu hình nền tảng.
3. **Bước 3 — Chạy thử trên Môi trường Thật (Runtime Execution):**
   - Sử dụng pane `w2:p6` (hoặc terminal kiểm thử) để chạy câu lệnh SQL, khởi động API hoặc build giao diện nhằm đảm bảo code chạy thực tế, không chỉ đúng trên lý thuyết.
4. **Bước 4 — Kiểm định Độc lập (QA & Verification):**
   - Giao cho `tester` (`w2:p4`) hoặc Orchestrator kiểm tra đầu ra (response code, cấu trúc GeoJSON, tốc độ truy vấn index PostGIS, giao diện responsive).
5. **Bước 5 — Ghi Nhật ký & Chốt Tiến độ (Audit & Commit):**
   - Cập nhật `NHAT_KY_HOAT_DONG.md` và `TIEN_DO_DU_AN.md` ngay sau khi nghiệm thu đạt 100%.

---

## 4. 🛠️ QUY CHUẨN KỸ THUẬT CỐT LÕI (TECHNICAL STANDARDS)

### 4.1. Chuẩn Cơ sở dữ liệu & Không gian Địa lý (PostGIS & GIS)
- **Hệ quy chiếu bắt buộc:** WGS 84 (`SRID = 4326`), chuyển đổi đo đạc hành chính VN-2000 Đồng Tháp (`EPSG:9210` / kinh tuyến trục `105°00'`).
- **Bounding Box Guard Đồng Tháp (BẮT BUỘC):**
  - Kinh độ (`Lon` / $X$): `105.15° <= Lon <= 105.95°`
  - Vĩ độ (`Lat` / $Y$): `10.10° <= Lat <= 10.95°`
  - Mọi dữ liệu seed SQL và mọi request tạo/sửa di tích qua API nếu nằm ngoài khung tọa độ này phải bị chặn ngay lập tức (`HTTP 422 Unprocessable Entity` hoặc `CHECK` constraint).
- **Quy ước thứ tự tọa độ (CỰC KỲ QUAN TRỌNG):**
  - **Trong PostGIS & GeoJSON (`RFC 7946`):** Luôn dùng **`(Kinh độ / Longitude, Vĩ độ / Latitude)`** — ví dụ: `ST_SetSRID(ST_MakePoint(kinh_do, vi_do), 4326)` với Đồng Tháp khoảng `(105.63, 10.45)`.
  - **Trong Leaflet.js (Frontend UI):** Luôn dùng **`[Vĩ độ / Latitude, Kinh độ / Longitude]`** — ví dụ: `[10.45, 105.63]`.
- **Ràng buộc toàn vẹn:** Tuân thủ nghiêm ngặt schema trong `04_CoSoDuLieu/Scripts/01_init_schema.sql` (6 bảng chính + 1 bảng nhật ký, GiST spatial index, Trigram GIN index).

### 4.4. Nguyên tắc Kim Cương từ PM Hermes (`QUY_TAC_DAT_GACH_KLTN.md` & `QUY_TAC_GIT_KLTN.md`)
1. **Working Software Over Documentation:** Mọi thiết kế phải chứng minh bằng code chạy thật, pass test tự động 100%, lên sóng được trên port `:5432` (PostGIS), `:8000` (FastAPI), `:5173` (WebGIS).
2. **Clean Architecture 4 tầng:** `Models/Schemas` ➔ `Repositories/CRUD (PostGIS)` ➔ `Services` ➔ `Routers/Endpoints`. Không hardcode biến nhạy cảm (`.env` + `.env.example`).
3. **Zero-Deletion Policy (Cấm xóa vĩnh viễn):** Tuyệt đối không dùng `rm` xóa file dữ liệu `.geojson`, `.shp`, tài liệu thiết kế. Nếu thay thế phiên bản cũ, phải di chuyển vào `_Archive/` kèm timestamp.
4. **Conventional Commits & GitHub Flow:** Mọi commit tuân thủ `<type>(<scope>): <message>` (`feat|fix|docs|refactor|test|chore` với scope `db|api|web|gis|auth`), nhánh `main` luôn xanh (Green Build), cấm `git push --force` lên `main`.

### 4.2. Chuẩn Backend API (`03_MaNguon/Backend_API/`)
- **Stack:** Python 3.11+ với **FastAPI**, **Pydantic v2**, **SQLAlchemy 2.0 / GeoAlchemy2** (hoặc `asyncpg`), cấu hình biến môi trường qua `.env` (có `.env.example` đi kèm, không hardcode mật khẩu trong code).
- **Chuẩn API GeoJSON:** Các endpoint bản đồ phải trả về chuẩn `FeatureCollection` hoặc cấu trúc JSON đồng nhất kèm HTTP status code chuẩn xác (`200`, `201`, `400`, `401`, `404`, `422`).
- **Tài liệu tự động:** Mọi router FastAPI phải có `summary`, `description`, và `response_model` rõ ràng để hiển thị đầy đủ trên Swagger UI (`/docs`).

### 4.3. Chuẩn Frontend Web GIS (`03_MaNguon/Frontend_WebGIS/`)
- **Stack:** React (Vite) + Tailwind CSS + Leaflet.js (`react-leaflet` + `react-leaflet-cluster`).
- **Hệ thống Thiết kế (Design System Đất Sen Hồng):**
  - Tuân thủ tuyệt đối `01_TaiLieu/Thiet_Ke_He_Thong/07_HeThong_ThietKe_Design_System.md` và `06_ThietKe_UI_UX_Wireframes.md`.
  - **Bảng màu chủ đạo:** Hồng Sen Đồng Tháp (`#E11D48` / `rose-600`) và Xanh Tràm Gáo Giồng (`#059669` / `emerald-600`).
  - **Typography:** Font chữ `Be Vietnam Pro` hiển thị tiếng Việt chuẩn xác.
  - **Mobile-First:** Khung nhìn bản đồ `100dvh`, hỗ trợ Bottom Sheet Drawer trên thiết bị di động và trang chi tiết tối ưu cho người dùng quét mã QR tại thực địa (`/di-tich/:slug`).
