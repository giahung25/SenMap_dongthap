# 🌿 BỘ QUY TẮC QUẢN LÝ MÃ NGUỒN BẰNG GIT (KLTN24 — SENMAP ĐỒNG THÁP)

---

## 1. 🌲 CHIẾN LƯỢC PHÂN NHÁNH (BRANCHING STRATEGY)
Hệ thống áp dụng **GitHub Flow** tinh gọn, tối ưu cho đồ án cá nhân điều phối đa Agent:

* `main`: **Nhánh Bất Khả Xâm Phạm (Production Ready)**
  - Luôn luôn ở trạng thái build thành công, chạy được 100%, không có lỗi cú pháp.
  - Đây là nhánh dùng để trình chiếu trực tiếp trước Hội đồng chấm khóa luận và Giảng viên hướng dẫn.
  - Cấm commit trực tiếp các tính năng thử nghiệm dở dang vào `main`.

* `feat/<tên-tính-năng>`: **Nhánh Phát Triển Tính Năng Mới**
  - Tách nhánh từ `main`: `git checkout -b feat/api-monuments`
  - Quy ước đặt tên:
    * `feat/postgis-docker`: Khởi tạo CSDL PostGIS
    * `feat/api-monuments`: Xây dựng CRUD di tích
    * `feat/webgis-leaflet`: Giao diện bản đồ tương tác
    * `feat/spatial-routing`: Thuật toán định tuyến đường đi

* `fix/<tên-lỗi>`: **Nhánh Sửa Lỗi Cấp Tốc**
  - Ví dụ: `fix/bounding-box-coords`, `fix/cors-backend`

* `docs/<nội-dung>`: **Nhánh Tài Liệu & Thuyết Minh**
  - Ví dụ: `docs/thuyet-minh-chuong-3`, `docs/api-swagger-spec`

---

## 2. 📝 QUY TẮC THÔNG ĐIỆP COMMIT (CONVENTIONAL COMMITS V1.0)
Mỗi commit là một bản ghi minh bạch, phục vụ chấm điểm quá trình thực hiện KLTN.

### Cú pháp bắt buộc:
```
<type>(<scope>): <mô tả ngắn gọn hành động bằng tiếng Anh hoặc tiếng Việt>
```

### Bảng phân loại `type`:
| Type | Ý nghĩa & Mục đích sử dụng | Ví dụ thực tế |
| :--- | :--- | :--- |
| **`feat`** | Thêm một tính năng mới hoàn chỉnh | `feat(api): add spatial query for nearby monuments` |
| **`fix`** | Sửa một lỗi / bug trong hệ thống | `fix(gis): correct coordinate order to lon lat` |
| **`docs`** | Thay đổi tài liệu, thuyết minh, README | `docs(readme): add installation guide and badges` |
| **`refactor`**| Tái cấu trúc mã nguồn nhưng không đổi chức năng | `refactor(db): optimize GiST spatial index on geom` |
| **`test`** | Viết thêm hoặc sửa test case (pytest, vitest) | `test(api): add 5 test scenarios for monument CRUD` |
| **`chore`** | Cấu hình lặt vặt, package, .gitignore, Docker | `chore(docker): update postgis container port to 5432` |
| **`perf`** | Cải thiện hiệu năng xử lý / tốc độ load | `perf(webgis): debounce map pan event to reduce API calls` |

### Bảng phân loại `scope`:
* `db`: CSDL PostgreSQL, PostGIS, migrations, seed data.
* `api`: FastAPI routers, services, middleware, CORS.
* `web`: React, Tailwind, Leaflet, MapLibre, UI components.
* `gis`: Xử lý toạ độ, GeoJSON, Shapefile, hệ quy chiếu EPSG.
* `auth`: Phân quyền, JWT, bảo mật Admin CMS.

---

## 3. 🛡️ QUY TẮC NGUYÊN TỬ & BẢO TOÀN (ATOMIC & GREEN COMMITS)
1. **Nguyên tử (Atomic Commit):**
   - Mỗi commit chỉ giải quyết đúng **1 vấn đề duy nhất**.
   - Cấm gộp vừa sửa lỗi API vừa sửa tài liệu Word vào cùng 1 commit.
2. **Commit Xanh (Never Break the Build):**
   - Trước khi gõ `git commit`, bắt buộc code phải pass cú pháp (`python -m py_compile`, linter, tests).
   - Tuyệt đối không commit mã nguồn đang báo lỗi đỏ lên kho lưu trữ.
3. **Kiểm tra kỹ trước khi `git add`:**
   - Dùng `git status` và `git diff` để xem chính xác các file đã thay đổi.
   - Tránh `git add .` bừa bãi khi trong thư mục có file rác, file `.bak`, file export ảnh tạm.

---

## 4. 🔒 BẢO MẬT BIẾN MÔI TRƯỜNG & CHỐNG RÒ RỈ DỮ LIỆU (SECRETS PROTECTION)
1. **Tuyệt đối cấm commit:**
   - File cấu hình môi trường: `.env`, `.env.local`
   - Mật khẩu DB, JWT Secret Key, Google Maps / Mapbox API Key.
   - Thư mục phụ thuộc: `node_modules/`, `.venv/`, `__pycache__/`
2. **Quy trình chuẩn cho cấu hình:**
   - Mọi cấu hình nhạy cảm được mô tả trong `.env.example` với giá trị giả lập:
     ```env
     DATABASE_URL=postgresql://postgres:password123@localhost:5432/senmap_db
     JWT_SECRET=your_super_secret_key_here
     ```
3. **Xử lý dữ liệu GIS dung lượng lớn:**
   - File `.geojson` nhẹ (< 15MB) được phép lưu trong `02_DuLieu_GIS/`.
   - File Shapefile thô, ảnh viễn thám, dữ liệu raster nặng > 50MB **KHÔNG ĐƯỢC COMMIT LÊN GIT** — lưu trữ trên Google Drive dự án.

---

## 5. 🔄 QUY TRÌNH LÀM VIỆC CHUẨN KHI VIẾT CODE (DEV WORKFLOW)

```bash
# Bước 1: Luôn cập nhật code mới nhất từ remote
git checkout main
git pull origin main

# Bước 2: Tạo nhánh tính năng mới
git checkout -b feat/api-monument-crud

# Bước 3: Code và kiểm thử tại chỗ
pytest tests/

# Bước 4: Kiểm tra trạng thái và stage các file sạch
git status
git add app/routers/monuments.py tests/test_monuments.py

# Bước 5: Commit thông điệp chuẩn
git commit -m "feat(api): implement monument CRUD with GeoJSON response"

# Bước 6: Đẩy nhánh lên GitHub
git push origin feat/api-monument-crud

# Bước 7: Merge vào main sau khi hoàn tất kiểm thử
git checkout main
git merge feat/api-monument-crud
git push origin main
```

---

## 6. 🚨 NGUYÊN TẮC CỨU HỘ & XỬ LÝ SỰ CỐ (SAFETY & ROLLBACK)
1. **Cấm tuyệt đối `git push --force` lên nhánh `main`:**
   - Hành vi này có thể xóa mất lịch sử commit của các ngày trước, làm mất minh chứng chấm điểm quá trình học thuật.
2. **Sửa commit vừa gõ (chưa push):**
   - Dùng `git commit --amend` để gộp hoặc sửa thông điệp commit.
3. **Rollback khi phát hiện tính năng bị lỗi sau khi đã push:**
   - Luôn sử dụng `git revert <commit-hash>` thay vì `git reset --hard`.
   - `git revert` tạo một commit mới đảo ngược thay đổi, bảo toàn 100% lịch sử kiểm toán (audit trail) nguyên vẹn.
