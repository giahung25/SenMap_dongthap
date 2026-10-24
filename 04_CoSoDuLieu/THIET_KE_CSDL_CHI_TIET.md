# ĐẶC TẢ THIẾT KẾ CƠ SỞ DỮ LIỆU VẬT LÝ (PHYSICAL DATABASE DESIGN)
**Hệ quản trị CSDL:** PostgreSQL 16 + PostGIS Extension 3.4  
**Hệ quy chiếu tọa độ:** WGS 84 (EPSG:4326)  
**Mục tiêu:** Chuyển đổi mô hình ERD thành các bảng vật lý chuẩn hóa (3NF), tối ưu hóa khóa chính, khóa ngoại, ràng buộc toàn vẹn và chiến lược đánh chỉ mục (Indexing) cho Web GIS.

---

## 1. TỔNG QUAN CÁC BẢNG DỮ LIỆU (DATABASE SCHEMA)

Hệ thống bao gồm **6 bảng cốt lõi** và **1 bảng nhật ký phân tích**:
1. `danh_muc`: Phân loại di tích (Lịch sử, Khảo cổ, Kiến trúc nghệ thuật...).
2. `huyen_tp`: Danh mục đơn vị hành chính tỉnh Đồng Tháp (12 Huyện/TP).
3. `di_tich`: Bảng trung tâm lưu trữ thông tin di tích và tọa độ hình học GIS.
4. `hinh_anh`: Quản lý thư viện hình ảnh và ảnh đại diện (Thumbnail).
5. `qr_code`: Quản lý định danh mã QR động liên kết với di tích.
6. `quan_tri_vien`: Quản lý tài khoản và phân quyền quản trị CMS.
7. `nhat_ky_quet_qr`: Ghi nhận nhật ký lượt quét thực địa để phục vụ biểu đồ thống kê.

---

## 2. ĐẶC TẢ CHI TIẾT TỪNG BẢNG DỮ LIỆU (DATA DICTIONARY)

### 📌 Bảng 1: `danh_muc` (Phân loại di tích)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa / Ghi chú |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | `PK, GENERATED ALWAYS AS IDENTITY` | Khóa chính tự tăng |
| `ten_danh_muc` | `VARCHAR(100)` | `NOT NULL, UNIQUE` | Tên loại hình (VD: Di tích khảo cổ) |
| `mo_ta` | `TEXT` | `NULL` | Giới thiệu tóm tắt về loại hình |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo |

---

### 📌 Bảng 2: `huyen_tp` (Đơn vị hành chính)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa / Ghi chú |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | `PK, GENERATED ALWAYS AS IDENTITY` | Khóa chính tự tăng |
| `ten_huyen_tp` | `VARCHAR(100)` | `NOT NULL, UNIQUE` | Tên địa phương (VD: TP Cao Lãnh, Sa Đéc...) |
| `loai` | `VARCHAR(20)` | `CHECK IN ('thanh_pho', 'huyen')` | Cấp hành chính |

---

### 📌 Bảng 3: `di_tich` (Bảng trung tâm - Core Spatial Table)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa / Ghi chú |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | `PK, GENERATED ALWAYS AS IDENTITY` | Khóa chính tự tăng |
| `id_danh_muc` | `INT` | `FK -> danh_muc(id) ON DELETE RESTRICT` | Không cho xóa danh mục nếu đang có di tích |
| `id_huyen_tp` | `INT` | `FK -> huyen_tp(id) ON DELETE RESTRICT` | Không cho xóa huyện nếu đang có di tích |
| `ten_di_tich` | `VARCHAR(255)` | `NOT NULL` | Tên chính thức của di tích |
| `ten_khac` | `VARCHAR(255)` | `NULL` | Tên gọi dân gian/tên cũ |
| `cap_xep_hang` | `VARCHAR(50)` | `NOT NULL, CHECK` | Giá trị: 'Quốc gia đặc biệt', 'Quốc gia', 'Cấp tỉnh', 'Điểm du lịch' |
| `dia_chi` | `VARCHAR(255)` | `NOT NULL` | Địa chỉ dạng chuỗi văn bản |
| **`geom`** | **`GEOMETRY(Point, 4326)`** | **`NOT NULL`** | **Tọa độ không gian Point WGS 84 (Kinh độ, Vĩ độ)** |
| `lich_su` | `TEXT` | `NOT NULL` | Nội dung bài viết lịch sử & văn hóa |
| `thoi_gian_mo_cua` | `VARCHAR(100)` | `DEFAULT 'Tự do tham quan'` | Giờ mở cửa đón khách |
| `gia_ve` | `NUMERIC(12, 2)` | `DEFAULT 0.00` | Giá vé tham quan (VNĐ), 0 = Miễn phí |
| `luu_y_tham_quan` | `TEXT` | `NULL` | Trang phục, quy định chụp ảnh... |
| `trang_thai` | `VARCHAR(20)` | `DEFAULT 'published', CHECK` | Giá trị: 'published' (hiện), 'draft' (nháp), 'archived' (ẩn) |
| `luot_xem` | `INT` | `DEFAULT 0` | Số lượt xem trực tuyến trên website |
| `luot_quet_qr` | `INT` | `DEFAULT 0` | Số lượt quét mã từ biển bảng thực địa |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo |
| `updated_at` | `TIMESTAMPTZ` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm cập nhật cuối (Auto trigger) |

---

### 📌 Bảng 4: `hinh_anh` (Thư viện media di tích)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa / Ghi chú |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | `PK, GENERATED ALWAYS AS IDENTITY` | Khóa chính tự tăng |
| `id_di_tich` | `INT` | `FK -> di_tich(id) ON DELETE CASCADE` | Di tích bị xóa thì ảnh bị xóa theo |
| `url` | `VARCHAR(500)` | `NOT NULL` | Đường dẫn file ảnh (`/uploads/...`) |
| `chu_thich` | `VARCHAR(255)` | `NULL` | Chú thích bức ảnh |
| `is_thumbnail` | `BOOLEAN` | `DEFAULT FALSE` | Đánh dấu ảnh đại diện trên popup bản đồ |
| `thu_tu` | `INT` | `DEFAULT 0` | Thứ tự sắp xếp hiển thị ảnh |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm upload |

---

### 📌 Bảng 5: `qr_code` (Mã QR động định danh)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa / Ghi chú |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | `PK, GENERATED ALWAYS AS IDENTITY` | Khóa chính tự tăng |
| `id_di_tich` | `INT` | `FK -> di_tich(id) ON DELETE CASCADE, UNIQUE` | Quan hệ 1-1 chặt chẽ với di tích |
| `qr_url` | `VARCHAR(500)` | `NOT NULL` | URL nhúng trong mã: `https://domain/di-tich/:id?src=qr` |
| `file_path` | `VARCHAR(500)` | `NOT NULL` | Đường dẫn lưu file ảnh QR sinh tự động |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo |
| `updated_at` | `TIMESTAMPTZ` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm cập nhật cuối |

---

### 📌 Bảng 6: `quan_tri_vien` (Tài khoản người dùng CMS)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa / Ghi chú |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | `PK, GENERATED ALWAYS AS IDENTITY` | Khóa chính tự tăng |
| `username` | `VARCHAR(50)` | `NOT NULL, UNIQUE` | Tên đăng nhập |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Mật khẩu mã hóa bằng bcrypt |
| `ho_ten` | `VARCHAR(100)` | `NOT NULL` | Tên hiển thị của cán bộ quản lý |
| `role` | `VARCHAR(20)` | `DEFAULT 'editor', CHECK` | Quyền: 'admin' (toàn quyền), 'editor' (chỉ sửa bài) |
| `is_active` | `BOOLEAN` | `DEFAULT TRUE` | Trạng thái kích hoạt |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo |

---

### 📌 Bảng 7: `nhat_ky_quet_qr` (Phục vụ biểu đồ thống kê)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa / Ghi chú |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | `PK, GENERATED ALWAYS AS IDENTITY` | Khóa chính tự tăng |
| `id_di_tich` | `INT` | `FK -> di_tich(id) ON DELETE SET NULL` | Di tích được quét |
| `thoi_gian` | `TIMESTAMPTZ` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm quét thực tế |
| `user_agent` | `VARCHAR(255)` | `NULL` | Trình duyệt / Thiết bị (iOS, Android, Zalo...) |
| `ip_address` | `VARCHAR(45)` | `NULL` | Địa chỉ IP người dùng |

---

## 3. CHIẾN LƯỢC TỐI ƯU HÓA KHÓA VÀ CHỈ MỤC (INDEXING STRATEGY)

Hệ thống được thiết kế chiến lược Indexing chuyên biệt cho bài toán **Web GIS và Tìm kiếm tốc độ cao**:

### ⚡ 3.1. Chỉ mục Không gian (Spatial Index - R-Tree/GiST)
```sql
CREATE INDEX idx_di_tich_geom ON di_tich USING GIST (geom);
```
*   **Mục đích:** Tối ưu hóa truy vấn không gian. Khi người dùng bấm *"Tìm di tích trong bán kính 5km/10km"*, PostGIS sử dụng chỉ mục cây không gian `GiST` để lọc hình hộp biên (Bounding Box) trong **2 - 5 mili-giây**, không cần quét toàn bộ bảng (Table Scan).

### 🔍 3.2. Chỉ mục Tìm kiếm mờ tiếng Việt (Full-Text / Trigram Index)
```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_di_tich_ten_trgm ON di_tich USING GIN (ten_di_tich gin_trgm_ops);
```
*   **Mục đích:** Khi du khách gõ từ khóa tìm kiếm (kể cả gõ không dấu như *"go thap"* hoặc *"xeo quyt"*), chỉ mục `GIN` Trigram hỗ trợ toán tử `LIKE '%...%'` và tìm kiếm tương đồng (similarity) với tốc độ tức thì.

### 🎯 3.3. Chỉ mục B-Tree trên các Khóa ngoại và Cột lọc đa tiêu chí
```sql
CREATE INDEX idx_di_tich_danh_muc ON di_tich (id_danh_muc);
CREATE INDEX idx_di_tich_huyen_tp ON di_tich (id_huyen_tp);
CREATE INDEX idx_di_tich_cap_xep_hang ON di_tich (cap_xep_hang);
CREATE INDEX idx_di_tich_trang_thai ON di_tich (trang_thai);
CREATE INDEX idx_hinh_anh_di_tich ON hinh_anh (id_di_tich);
CREATE INDEX idx_hinh_anh_thumbnail ON hinh_anh (id_di_tich) WHERE is_thumbnail = TRUE;
```
*   **Mục đích:** 
    *   Tối ưu hóa các thao tác JOIN bảng giữa Di tích với Danh mục và Địa phương.
    *   Tối ưu các bộ lọc lọc theo Huyện/Thị và Cấp xếp hạng trên thanh điều hướng Web GIS.
    *   Chỉ mục có điều kiện (`Partial Index`) `idx_hinh_anh_thumbnail` giúp lấy ngay ảnh đại diện mà không quét qua hàng loạt ảnh con.

---

## 4. QUẢN LÝ RÀNG BUỘC TOÀN VẸN (INTEGRITY & TRIGGER)

1. **Ràng buộc Khóa ngoại (Referential Integrity):**
   - Xóa `di_tich`: Tự động xóa sạch toàn bộ `hinh_anh` và `qr_code` liên quan (`ON DELETE CASCADE`).
   - Xóa `danh_muc` hoặc `huyen_tp`: Bị chặn lại nếu đang có di tích trực thuộc (`ON DELETE RESTRICT`), bảo vệ dữ liệu không bị mồ côi.
2. **Trigger tự động cập nhật thời gian (`updated_at`):**
   - Viết hàm trigger `update_modified_column()` tự động gán `updated_at = CURRENT_TIMESTAMP` mỗi khi bảng `di_tich` hoặc `qr_code` có lệnh `UPDATE`.
