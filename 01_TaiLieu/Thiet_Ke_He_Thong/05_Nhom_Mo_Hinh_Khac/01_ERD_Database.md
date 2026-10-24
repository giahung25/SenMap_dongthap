# SƠ ĐỒ THỰC THỂ MỐI QUAN HỆ (ERD - LOGICAL DATABASE)
**Nhóm sơ đồ:** Dữ liệu & Quy trình
**Hệ quản trị CSDL:** PostgreSQL + PostGIS Extension

```mermaid
erDiagram
    DANH_MUC ||--o{ DI_TICH : "được phân loại vào"
    HUYEN_TP ||--o{ DI_TICH : "định vị thuộc địa bàn"
    DI_TICH ||--|{ HINH_ANH : "có bộ sưu tập ảnh"
    DI_TICH ||--|| QR_CODE : "tạo ra 1 mã định danh"

    DI_TICH {
        int id PK "Khóa chính"
        int id_danh_muc FK "Khóa ngoại"
        int id_huyen_tp FK "Khóa ngoại"
        string ten_di_tich "Tên địa danh"
        string cap_xep_hang "Quốc gia đặc biệt, Quốc gia, Cấp tỉnh"
        string dia_chi "Địa chỉ dạng text"
        geometry geom "Cột Không Gian: Point(SRID 4326)"
        text lich_su "Nội dung bài viết"
        string thoi_gian_mo_cua 
        float gia_ve 
        string trang_thai "Published, Draft, Archived"
    }

    DANH_MUC {
        int id PK
        string ten_danh_muc "Lịch sử - Cách mạng, Khảo cổ..."
        text mo_ta
    }

    HUYEN_TP {
        int id PK
        string ten_huyen_tp "VD: TP Cao Lãnh, TP Sa Đéc..."
    }

    HINH_ANH {
        int id PK
        int id_di_tich FK
        string url "Đường dẫn file ảnh"
        boolean is_thumbnail "True nếu là ảnh đại diện"
    }

    QR_CODE {
        int id PK
        int id_di_tich FK "Đảm bảo 1 di tích có 1 QR duy nhất"
        string qr_url "Link lưu file ảnh QR đã gen"
        string logo_path "Đường dẫn logo ốp vào QR"
        date ngay_tao 
    }

    QUAN_TRI_VIEN {
        int id PK
        string username
        string password_hash
        string role "Admin hoặc Editor"
    }
```

## Diễn giải mô hình CSDL:
1. **Thiết kế Chuẩn hóa (Normalization):** Các thông tin lặp lại như Tên huyện, Tên loại hình di tích được tách ra thành các bảng `HUYEN_TP` và `DANH_MUC` riêng biệt để dễ dàng lọc (Filter) và tìm kiếm trên giao diện Web GIS.
2. **Cột Dữ liệu Không gian (Spatial Column):** Điểm nhấn của DB này là cột `geom` trong bảng `DI_TICH`. Nó sử dụng kiểu dữ liệu `geometry` của extension **PostGIS** thay vì lưu `lat` và `lng` bằng 2 cột float riêng biệt. Thiết kế này giúp Database có thể chạy các hàm nội tại như `ST_Distance()` để quét bán kính 5km lân cận cực kỳ nhanh.
3. **Mối quan hệ 1-1 (One-to-One):** `DI_TICH` và `QR_CODE` có quan hệ 1-1 chặt chẽ. ID của di tích chính là hạt giống (seed) để thuật toán sinh ra URL và tạo ảnh mã QR.