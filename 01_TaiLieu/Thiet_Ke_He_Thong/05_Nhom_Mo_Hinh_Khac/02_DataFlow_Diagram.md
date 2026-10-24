# SƠ ĐỒ LUỒNG DỮ LIỆU (DATA FLOW DIAGRAM - DFD MỨC 1)
**Nhóm sơ đồ:** Dữ liệu & Quy trình
**Mục tiêu:** Trình bày luồng di chuyển của dữ liệu giữa các Thực thể (Người dùng), Tiến trình xử lý (Hệ thống) và Kho lưu trữ (Database).

```mermaid
flowchart LR
    %% Định nghĩa các Style cho DFD
    classDef entity fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef process fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef store fill:#fff3e0,stroke:#f57c00,stroke-width:2px;

    %% 1. Các Thực thể ngoài (External Entities)
    DuKhach["💻 Du khách"]:::entity
    Admin["👑 Quản trị viên"]:::entity

    %% 2. Các Kho dữ liệu (Data Stores)
    DB_DiTich[("D1. CSDL Di Tích<br/>PostgreSQL/PostGIS")]:::store
    DB_Media[("D2. Kho Media<br/>Storage Ảnh và QR")]:::store

    %% 3. Các Tiến trình (Processes)
    P1(("1.0<br/>Tra cứu và Bản đồ")):::process
    P2(("2.0<br/>Quét mã QR Code")):::process
    P3(("3.0<br/>Quản lý Di tích")):::process

    %% ----------------------------------
    %% LUỒNG DỮ LIỆU (DATA FLOWS)
    %% ----------------------------------

    %% Luồng 1.0: Tra cứu
    DuKhach -->|"Tiêu chí tìm kiếm / Tọa độ GPS"| P1
    P1 -->|"Query Không gian"| DB_DiTich
    DB_DiTich -->|"Danh sách Di tích (JSON)"| P1
    P1 -->|"Hiển thị Bản đồ & Kết quả"| DuKhach

    %% Luồng 2.0: Quét QR
    DuKhach -->|"Scan URL QR"| P2
    P2 -->|"Query theo ID Di tích"| DB_DiTich
    DB_DiTich -->|"Dữ liệu bài viết chi tiết"| P2
    P2 -->|"Trang chi tiết Di tích"| DuKhach

    %% Luồng 3.0: Quản lý (Admin)
    Admin -->|"Dữ liệu Form + Tọa độ Ghim"| P3
    Admin -->|"File Ảnh Thumbnail"| P3
    
    P3 -->|"Lưu Tọa độ GIS & Nội dung"| DB_DiTich
    P3 -->|"Lưu File Ảnh"| DB_Media
    P3 -->|"Tự động sinh File QR"| DB_Media
    
    P3 -->|"Thông báo thành công"| Admin

    %% Tích hợp External Map
    OSM["Dịch vụ Map (OSM/Mapbox)"]:::entity
    P1 -.->|"Lấy Map Tiles & Routing"| OSM
    OSM -.->|"Dữ liệu Bản đồ nền"| P1
```

## Diễn giải Sơ đồ Luồng dữ liệu (DFD):
- **Thực thể ngoài (Hình chữ nhật):** `Du khách`, `Quản trị viên`, và dịch vụ bên thứ 3 `OSM`. Đây là nơi bắt nguồn và kết thúc của dữ liệu.
- **Tiến trình (Hình tròn/Elip):** Hệ thống được chia làm 3 cụm tiến trình chính: Tra cứu, Quét QR (dành cho người dùng public) và Quản lý Di tích (dành cho Admin).
- **Kho dữ liệu (Hình trụ hở):** Hệ thống có 2 kho dữ liệu tách biệt. `D1` lưu trữ các dữ liệu có cấu trúc (văn bản, tọa độ GIS). `D2` là kho lưu trữ file tĩnh (File ảnh upload và File ảnh QR sinh tự động).
- **Luồng dữ liệu (Mũi tên):** Mô tả chính xác *dữ liệu gì* đang được truyền đi. Ví dụ: Tiến trình `1.0` truyền `Query Không gian` tới `D1`, và nhận lại `Danh sách Di tích (JSON)`.
