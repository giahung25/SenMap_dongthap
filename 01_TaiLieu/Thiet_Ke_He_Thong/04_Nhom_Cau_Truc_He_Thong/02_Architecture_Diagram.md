# SƠ ĐỒ KIẾN TRÚC HỆ THỐNG (ARCHITECTURE DIAGRAM)
**Nhóm sơ đồ:** Cấu trúc Hệ thống
**Mục tiêu:** Mô tả kiến trúc tổng thể các phân tầng (Client - API Server - GIS Service - Database) của hệ thống Web GIS Đồng Tháp.

```mermaid
flowchart TB
    %% Các Subgraph phân tầng
    subgraph ClientLayer ["1. TẦNG NGƯỜI DÙNG & GIAO DIỆN (CLIENT TIER)"]
        direction LR
        User["📱 Du khách (Mobile / Browser)"]
        Admin["👑 Quản trị viên (CMS Dashboard)"]
        ReactApp["💻 Frontend Web GIS (React.js + Leaflet.js)"]
        
        User -->|"Quét QR / Tra cứu"| ReactApp
        Admin -->|"Quản trị bài viết & Ghim bản đồ"| ReactApp
    end

    subgraph ServiceLayer ["2. TẦNG DỊCH VỤ BÊN THỨ 3 (EXTERNAL SERVICES)"]
        OSM["🗺️ OpenStreetMap (Bản đồ nền)"]
        RoutingService["🚗 OSRM / Mapbox Routing (Chỉ đường)"]
    end

    subgraph ServerLayer ["3. TẦNG MÁY CHỦ ỨNG DỤNG (BACKEND API TIER)"]
        direction TB
        APIServer["⚙️ FastAPI Application Server (Python 3.x)"]
        AuthModule["🔒 Module Xác thực & Phân quyền (JWT Auth)"]
        GISModule["📍 Module Xử lý Dữ liệu Không gian (GeoAlchemy2)"]
        QRModule["🔲 Module Sinh mã QR Động (QRCode / ZXing)"]

        APIServer --- AuthModule
        APIServer --- GISModule
        APIServer --- QRModule
    end

    subgraph DataLayer ["4. TẦNG DỮ LIỆU & LƯU TRỮ (DATABASE & STORAGE TIER)"]
        direction LR
        PostGIS[("🗄️ PostgreSQL + PostGIS<br/>Lưu trữ dữ liệu thuộc tính & Không gian (Point WGS84)")]
        FileStorage[("📁 File Storage (Uploads)<br/>Lưu trữ ảnh tư liệu & File tem QR Code")]
    end

    %% Kết nối liên tầng
    ReactApp -.->|"Tải Map Tiles"| OSM
    ReactApp -.->|"Tính lộ trình"| RoutingService
    ReactApp ===|"RESTful API (JSON / GeoJSON)"| APIServer

    APIServer <-->|"Truy vấn SQL / Không gian"| PostGIS
    APIServer <-->|"Lưu / Đọc file ảnh & QR"| FileStorage
```

## Diễn giải kiến trúc phân tầng:
1. **Tầng Giao diện (Client Tier):** Ứng dụng Single Page Application (SPA) viết bằng React.js + Tailwind CSS, tích hợp thư viện bản đồ Leaflet.js. Tối ưu hóa giao diện Mobile-First phục vụ du khách quét mã QR tại thực địa.
2. **Tầng Dịch vụ bên thứ ba (External Services):** Bản đồ nền được tải trực tiếp từ OpenStreetMap (OSM) về trình duyệt du khách, giúp giảm tải băng thông cho máy chủ chính. Dịch vụ chỉ đường OSRM/Mapbox cung cấp thuật toán tìm đường ngắn nhất.
3. **Tầng Máy chủ (Backend Tier):** Xây dựng bằng Python FastAPI hiệu năng cao, phân tách các module nghiệp vụ rõ ràng: xác thực JWT, xử lý tọa độ không gian và module sinh mã QR động chèn logo nhận diện.
4. **Tầng Dữ liệu (Database Tier):** PostgreSQL kết hợp phần mở rộng PostGIS lưu trữ dữ liệu không gian chuẩn quốc tế (WGS 84 / SRID 4326), đánh chỉ mục không gian R-Tree/GiST đảm bảo thời gian phản hồi truy vấn dưới 1 giây.
