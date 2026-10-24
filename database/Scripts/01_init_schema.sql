-- ==============================================================================
-- DỰ ÁN: HỆ THỐNG BẢN ĐỒ SỐ DI TÍCH VĂN HÓA TỈNH ĐỒNG THÁP (WEB GIS)
-- TẬP LỆNH: KHỞI TẠO CẤU TRÚC CƠ SỞ DỮ LIỆU (DDL SCHEMA)
-- HỆ THỐNG: PostgreSQL 16 + PostGIS Extension 3.4 (SRID: 4326 - WGS 84)
-- ==============================================================================

-- 1. BẬT CÁC EXTENSION CẦN THIẾT
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. XÓA BẢNG CŨ NẾU TỒN TẠI (THEO THỨ TỰ PHỤ THUỘC KHÓA NGOẠI)
DROP TABLE IF EXISTS nhat_ky_quet_qr CASCADE;
DROP TABLE IF EXISTS qr_code CASCADE;
DROP TABLE IF EXISTS hinh_anh CASCADE;
DROP TABLE IF EXISTS di_tich CASCADE;
DROP TABLE IF EXISTS quan_tri_vien CASCADE;
DROP TABLE IF EXISTS huyen_tp CASCADE;
DROP TABLE IF EXISTS danh_muc CASCADE;

-- ------------------------------------------------------------------------------
-- 3. TẠO CÁC BẢNG DỮ LIỆU DANH MỤC & PHÂN QUYỀN
-- ------------------------------------------------------------------------------

-- Bảng: danh_muc (Loại hình di tích)
CREATE TABLE danh_muc (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ten_danh_muc VARCHAR(100) NOT NULL UNIQUE,
    mo_ta TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Bảng: huyen_tp (Đơn vị hành chính tỉnh Đồng Tháp)
CREATE TABLE huyen_tp (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ten_huyen_tp VARCHAR(100) NOT NULL UNIQUE,
    loai VARCHAR(20) DEFAULT 'huyen' CHECK (loai IN ('thanh_pho', 'huyen'))
);

-- Bảng: quan_tri_vien (Tài khoản quản trị viên CMS)
CREATE TABLE quan_tri_vien (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    ho_ten VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 4. BẢNG TRUNG TÂM: di_tich (LƯU TRỮ DỮ LIỆU THUỘC TÍNH VÀ KHÔNG GIAN)
-- ------------------------------------------------------------------------------
CREATE TABLE di_tich (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_danh_muc INT NOT NULL REFERENCES danh_muc(id) ON DELETE RESTRICT,
    id_huyen_tp INT NOT NULL REFERENCES huyen_tp(id) ON DELETE RESTRICT,
    ten_di_tich VARCHAR(255) NOT NULL,
    ten_khac VARCHAR(255),
    cap_xep_hang VARCHAR(50) NOT NULL CHECK (cap_xep_hang IN ('Quốc gia đặc biệt', 'Quốc gia', 'Cấp tỉnh', 'Điểm du lịch/Làng nghề')),
    dia_chi VARCHAR(255) NOT NULL,
    
    -- Cột Không gian PostGIS: Điểm tọa độ theo hệ quy chiếu quốc tế WGS 84
    geom GEOMETRY(Point, 4326) NOT NULL CONSTRAINT chk_dong_thap_bbox CHECK (
        ST_X(geom) BETWEEN 105.15 AND 105.95
        AND ST_Y(geom) BETWEEN 10.10 AND 10.95
    ),
    
    lich_su TEXT NOT NULL,
    thoi_gian_mo_cua VARCHAR(100) DEFAULT 'Tự do tham quan',
    gia_ve NUMERIC(12, 2) DEFAULT 0.00,
    luu_y_tham_quan TEXT,
    trang_thai VARCHAR(20) NOT NULL DEFAULT 'published' CHECK (trang_thai IN ('published', 'draft', 'archived')),
    luot_xem INT NOT NULL DEFAULT 0,
    luot_quet_qr INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 5. BẢNG MEDIA & MÃ QR LIÊN KẾT
-- ------------------------------------------------------------------------------

-- Bảng: hinh_anh (Thư viện ảnh di tích)
CREATE TABLE hinh_anh (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_di_tich INT NOT NULL REFERENCES di_tich(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    chu_thich VARCHAR(255),
    is_thumbnail BOOLEAN DEFAULT FALSE,
    thu_tu INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Bảng: qr_code (Mã QR động định danh cho từng di tích - Quan hệ 1:1)
CREATE TABLE qr_code (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_di_tich INT NOT NULL UNIQUE REFERENCES di_tich(id) ON DELETE CASCADE,
    qr_url VARCHAR(500) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Bảng: nhat_ky_quet_qr (Ghi vết truy cập thực địa phục vụ thống kê phân tích)
CREATE TABLE nhat_ky_quet_qr (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_di_tich INT REFERENCES di_tich(id) ON DELETE SET NULL,
    thoi_gian TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    user_agent VARCHAR(255),
    ip_address VARCHAR(45)
);

-- ------------------------------------------------------------------------------
-- 6. TỐI ƯU HÓA CHỈ MỤC (INDEXING STRATEGY)
-- ------------------------------------------------------------------------------

-- A. Chỉ mục không gian GiST (Tối ưu truy vấn khoảng cách và bán kính lân cận)
CREATE INDEX idx_di_tich_geom ON di_tich USING GIST (geom);

-- B. Chỉ mục Trigram GIN (Tối ưu tìm kiếm mờ tên di tích tiếng Việt)
CREATE INDEX idx_di_tich_ten_trgm ON di_tich USING GIN (ten_di_tich gin_trgm_ops);

-- C. Chỉ mục B-Tree trên các Khóa ngoại và điều kiện Lọc
CREATE INDEX idx_di_tich_danh_muc ON di_tich (id_danh_muc);
CREATE INDEX idx_di_tich_huyen_tp ON di_tich (id_huyen_tp);
CREATE INDEX idx_di_tich_cap_xep_hang ON di_tich (cap_xep_hang);
CREATE INDEX idx_di_tich_trang_thai ON di_tich (trang_thai);
CREATE INDEX idx_hinh_anh_di_tich ON hinh_anh (id_di_tich);

-- D. Chỉ mục một phần (Partial Index) lấy nhanh ảnh đại diện Thumbnail
CREATE INDEX idx_hinh_anh_thumbnail ON hinh_anh (id_di_tich) WHERE is_thumbnail = TRUE;

-- ------------------------------------------------------------------------------
-- 7. TRIGGER TỰ ĐỘNG CẬP NHẬT THỜI GIAN (TRIGGER UPDATED_AT)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION trigger_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_di_tich
BEFORE UPDATE ON di_tich
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

CREATE TRIGGER set_timestamp_qr_code
BEFORE UPDATE ON qr_code
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

-- ==============================================================================
-- HOÀN TẤT KHỞI TẠO SCHEMA CƠ SỞ DỮ LIỆU
-- ==============================================================================
