# SƠ ĐỒ TUẦN TỰ (SEQUENCE DIAGRAM)
**Tiến trình:** Quét mã QR tại thực địa để tra cứu chi tiết và xin chỉ đường
**Actor:** Du khách (Mobile Browser), Frontend (React), Backend API (FastAPI), CSDL (PostGIS), Routing Service (OSRM/Mapbox)

```mermaid
sequenceDiagram
    autonumber
    actor User as 📱 Du khách
    participant Web as 💻 Frontend Web GIS (React)
    participant API as ⚙️ Backend API (FastAPI)
    participant DB as 🗄️ Database (PostGIS)
    participant OSRM as 🗺️ Routing Service (OSRM)

    %% Giai đoạn 1: Quét QR & Truy xuất thông tin
    rect rgb(240, 248, 255)
    note right of User: Giai đoạn 1: Quét mã QR & Xem chi tiết
    User->>Web: Quét mã QR (Mở URL: /di-tich/:id)
    activate Web
    Web->>API: GET /api/di-tich/:id
    activate API
    API->>DB: SELECT * FROM di_tich WHERE id = :id
    activate DB
    DB-->>API: Trả về bản ghi di tích + tọa độ GIS
    deactivate DB
    API-->>Web: 200 OK (Dữ liệu JSON)
    deactivate API
    Web-->>User: Hiển thị bài viết, hình ảnh & bản đồ vị trí
    deactivate Web
    end

    %% Giai đoạn 2: Định vị & Chỉ đường
    rect rgb(245, 255, 250)
    note right of User: Giai đoạn 2: Định vị & Dẫn đường
    User->>Web: Bấm nút "Chỉ đường đến đây"
    activate Web
    Web->>User: Yêu cầu quyền truy cập GPS thiết bị
    User-->>Web: Cấp quyền (Tọa độ Lat, Lng hiện tại)
    Web->>OSRM: GET /route (Tọa độ xuất phát -> Tọa độ di tích)
    activate OSRM
    OSRM-->>Web: Trả về lộ trình ngắn nhất (Polyline)
    deactivate OSRM
    Web-->>User: Vẽ đường đi ngắn nhất trên bản đồ số
    deactivate Web
    end
```

## Diễn giải sơ đồ tuần tự:
1. **Quét mã QR tại thực địa:** Du khách quét mã QR bằng camera điện thoại, hệ thống điều hướng trực tiếp đến route chi tiết di tích trên Frontend mà không cần tìm kiếm thủ công.
2. **Truy vấn CSDL Không gian:** FastAPI nhận ID từ Frontend, truy xuất bản ghi trong PostgreSQL/PostGIS và trả về thông tin chi tiết kèm tọa độ chuẩn WGS84.
3. **Định vị & Chỉ đường tự động:** Khi người dùng yêu cầu chỉ đường, ứng dụng lấy tọa độ GPS thời gian thực từ trình duyệt và gọi API dịch vụ định tuyến (OSRM/Mapbox) để vẽ lộ trình ngắn nhất trên nền bản đồ Leaflet.
