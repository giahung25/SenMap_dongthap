# 🗺️ SenMap Đồng Tháp — Hệ thống Bản đồ số Di tích & Văn hóa (Web GIS)

**Tên đề tài:** Xây dựng hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp.

---

## 👨‍🎓 Thông tin Sinh viên & Giảng viên Hướng dẫn
- **Sinh viên thực hiện:** Phan Trần Gia Hưng (MSSV: 0024417689 - Lớp: ĐHCNTT24B-IT)
- **Giảng viên hướng dẫn:** ThS. GVC. Huỳnh Lê Uyên Minh
- **Khóa đào tạo:** 2024 – 2028 | Khoa Công nghệ và Kỹ Thuật - Trường Đại học Đồng Tháp.
- **Thời gian thực hiện:** Tháng 09/2026 – Tháng 05/2027.

---

## 🎯 Mục tiêu cốt lõi (Core Objectives)
Dự án tập trung vào việc số hóa và trực quan hóa các di tích lịch sử, văn hóa tại Đồng Tháp thông qua nền tảng Web GIS, giải quyết bài toán tra cứu rời rạc hiện tại. Bao gồm:
1. **Web GIS tương tác:** Bản đồ số hiển thị 20 di tích tiêu biểu, gom cụm (marker cluster), lọc và tìm kiếm.
2. **Định vị & Chỉ đường (Routing):** Tích hợp GPS tìm đường đi ngắn nhất đến di tích.
3. **Mã QR Động:** Tự động sinh tem mã QR, hỗ trợ du khách quét bằng điện thoại tại thực địa để xem thông tin ngay lập tức.
4. **Hệ thống Quản trị (CMS):** Giao diện quản lý thông tin di tích, tọa độ không gian, hình ảnh và thống kê.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)
- **Frontend (Web GIS):** React.js (Vite) + Tailwind CSS (Thiết kế Mobile-First, Design System Đất Sen Hồng).
- **Thư viện Bản đồ:** Leaflet.js + OpenStreetMap (`EPSG:4326`).
- **Backend API:** Python (FastAPI) + Pydantic v2 + SQLAlchemy 2.0 / GeoAlchemy2.
- **Cơ sở dữ liệu:** PostgreSQL 16 kết hợp Extension **PostGIS 3.4** để lưu trữ và tính toán tọa độ địa lý.

---

## 📂 Cấu trúc Thư mục Dự án (Project Structure)

```text
SenMap_dongthap/
├── backend/                # Mã nguồn Backend API (FastAPI + GeoAlchemy2)
├── frontend/               # Mã nguồn Frontend Web GIS (React + Vite + Tailwind + Leaflet)
├── database/               # Thiết kế CSDL vật lý & Script khởi tạo PostGIS
│   ├── Mock_Data/          # Dữ liệu mẫu (seed script) cho 20 di tích
│   ├── Scripts/            # Tập lệnh DDL khởi tạo bảng, index GiST/GIN & trigger
│   └── THIET_KE_CSDL_CHI_TIET.md
├── gis_data/               # Tài nguyên số hóa không gian của 20 di tích
│   ├── Hinh_Anh/           # Ảnh tư liệu, logo
│   ├── QR_Code/            # Các mẫu tem QR xuất từ hệ thống
│   └── Toa_Do/             # File tổng hợp tọa độ khảo sát (CSV, GeoJSON)
└── docs/                   # Tài liệu phân tích & thiết kế hệ thống
    └── Thiet_Ke_He_Thong/  # Use Case, ERD, Class Diagram, UI/UX Wireframes, Design System
```

---

## 🚀 Tiến trình thực hiện (Roadmap)
- [x] Giai đoạn 1: Lập kế hoạch và phê duyệt đề cương chi tiết.
- [x] Giai đoạn 2: Khảo sát danh sách 20 di tích tiêu biểu tỉnh Đồng Tháp.
- [x] Giai đoạn 3: Phân tích và đặc tả hệ thống (13 Use Cases & 10 sơ đồ UML/BPMN/ERD).
- [x] Giai đoạn 4: Thiết kế CSDL vật lý PostGIS và Hệ thống Thiết kế UI/UX (Design System).
- [ ] Giai đoạn 5: Triển khai CSDL PostGIS (Docker) & Lập trình Backend API (FastAPI).
- [ ] Giai đoạn 6: Lập trình Web GIS Frontend (ReactJS + Leaflet).
- [ ] Giai đoạn 7: Tích hợp QR Code, CMS và Kiểm thử thực địa.
- [ ] Giai đoạn 8: Hoàn thiện báo cáo & Bảo vệ KLTN.
