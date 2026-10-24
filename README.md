# 🪷 SenMap Đồng Tháp — Hệ Thống Bản Đồ Số Di Tích & Văn Hóa Đất Sen Hồng
> **Khóa Luận Tốt Nghiệp Ngành Công Nghệ Thông Tin (IN4299N) — Trường Đại Học Đồng Tháp**

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![PostGIS](https://img.shields.io/badge/PostGIS-3.4-green?logo=postgis&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)

---

## 📌 Giới Thiệu Đề Tài
* **Tên đề tài:** Xây dựng hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp.
* **Tên thương mại:** **SenMap Đồng Tháp**
* **Sinh viên thực hiện:** Phan Trần Gia Hưng — MSSV: `0024417689` (Lớp ĐHCNTT24B-IT)
* **Giảng viên hướng dẫn:** ThS. GVC. Huỳnh Lê Uyên Minh
* **Khoa:** Công nghệ và Kỹ thuật — Trường Đại học Đồng Tháp (DThU)

---

## 🏛️ Kiến Trúc Hệ Thống (Clean Architecture & GIS)

```
                     ┌────────────────────────────────────────┐
                     │   Frontend WebGIS (React + Leaflet)    │
                     │  - Bản đồ tương tác di tích            │
                     │  - Tra cứu, bộ lọc & định tuyến lộ trình│
                     │  - Design System: Đất Sen Hồng         │
                     └───────────────────▲────────────────────┘
                                         │ REST API / GeoJSON
                                         ▼
                     ┌────────────────────────────────────────┐
                     │       Backend API (FastAPI)            │
                     │  - Router: /api/v1/monuments, /routes  │
                     │  - Services: Spatial queries, GeoJSON  │
                     │  - Domain Models & Schemas (Pydantic)  │
                     └───────────────────▲────────────────────┘
                                         │ SQLAlchemy / GeoAlchemy2
                                         ▼
                     ┌────────────────────────────────────────┐
                     │   Database: PostgreSQL 16 + PostGIS    │
                     │  - Hệ tọa độ chuẩn: WGS84 (EPSG:4326)  │
                     │  - Bounding Box Guard: Tỉnh Đồng Tháp  │
                     │  - Spatial Indexing: GiST Index        │
                     └────────────────────────────────────────┘
```

---

## 📂 Cấu Trúc Thư Mục Chuẩn

```
KLTN24/
├── 01_TaiLieu/                 # Đề cương, thuyết minh, 10 sơ đồ hệ thống & Wireframes
├── 02_DuLieu_GIS/              # Dữ liệu không gian, ranh giới hành chính & tọa độ di tích
├── 03_MaNguon/                 # Mã nguồn toàn bộ hệ thống
│   ├── Backend_API/            # FastAPI + GeoAlchemy2 + PostGIS
│   └── Frontend_WebGIS/        # React (Vite) + Tailwind + Leaflet.js
├── 04_CoSoDuLieu/              # Script DDL, Seed Data, Migration & Docker Compose
├── AGENTS.md                   # Quy tắc điều phối đa tác nhân trên Herdr
├── NHAT_KY_HOAT_DONG.md        # Nhật ký kiểm toán thao tác (Audit Trail)
├── TIEN_DO_DU_AN.md            # Báo cáo tiến độ chi tiết từng mốc đề cương
└── README.md                   # Tài liệu tổng quan dự án
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Nhanh

### 1. Khởi chạy CSDL PostGIS qua Docker:
```bash
cd 04_CoSoDuLieu/Docker
docker compose up -d
```

### 2. Khởi chạy Backend FastAPI:
```bash
cd 03_MaNguon/Backend_API
python -m venv .venv
source .venv/bin/activate  # Trên Windows: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Swagger UI tài liệu API: `http://localhost:8000/docs`

### 3. Khởi chạy Frontend WebGIS:
```bash
cd 03_MaNguon/Frontend_WebGIS
npm install
npm run dev
```

---
*Bản quyền khóa luận tốt nghiệp thuộc về Phan Trần Gia Hưng — Trường Đại học Đồng Tháp.*
