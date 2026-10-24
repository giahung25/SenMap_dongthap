# SƠ ĐỒ TRIỂN KHAI (DEPLOYMENT DIAGRAM)
**Nhóm sơ đồ:** Cấu trúc Hệ thống
**Mục tiêu:** Trình bày mô hình vật lý/logic khi đưa hệ thống Web GIS vào hoạt động thực tế (Production) trên máy chủ.

```mermaid
flowchart TB
    %% Khai báo Node thiết bị Client
    subgraph Client_Tier ["Thiết bị người dùng (Client)"]
        Mobile["📱 Mobile Browser<br/>Trải nghiệm quét QR ngoài trời"]
        PC["💻 Desktop Browser<br/>Truy cập Web GIS tra cứu"]
    end

    %% Khai báo Internet & DNS
    DNS(("Internet / DNS"))

    %% Khai báo Server vật lý/VPS
    subgraph Server_Tier ["Máy chủ Ubuntu/Linux - Cục bộ hoặc VPS"]
        direction TB
        Firewall{{"Tường lửa / UFW Firewall"}}

        subgraph Docker_Host ["Môi trường Docker (Docker Engine)"]
            Nginx["Nginx Web Server<br/>Port 80 / 443"]
            
            subgraph App_Zone ["Application Layer"]
                React["Frontend React Build<br/>Cung cấp Static Files"]
                FastAPI["FastAPI Container<br/>Uvicorn - Port 8000"]
            end

            subgraph DB_Zone ["Data & Storage Layer"]
                PostGIS[("PostgreSQL + PostGIS<br/>Port 5432")]
                Volume[("Docker Volume<br/>Lưu trữ File Ảnh & Mã QR")]
            end
        end
    end

    %% Dịch vụ bên ngoài
    External["Dịch vụ bản đồ bên thứ 3<br/>OpenStreetMap / OSRM"]

    %% Các luồng kết nối triển khai
    Client_Tier -->|"HTTPS"| DNS
    DNS --> Firewall
    Firewall --> Nginx

    Nginx -->|"Phân phối File tĩnh / Route"| React
    Nginx -->|"Reverse Proxy /api/*"| FastAPI

    FastAPI <-->|"Truy vấn SQL / GeoAlchemy2"| PostGIS
    FastAPI <-->|"Đọc / Ghi file cục bộ"| Volume

    React -.->|"Fetch Map Tiles trực tiếp"| External
```

## Diễn giải kiến trúc triển khai:
1. **Kiến trúc Container hóa (Docker):** Để đảm bảo tính ổn định và dễ dàng cài đặt lại, hệ thống Backend (FastAPI) và CSDL Không gian (PostGIS) sẽ được đóng gói thành các Docker Container.
2. **Web Server Nginx (Reverse Proxy):** Nginx đóng vai trò là "người gác cổng" duy nhất. 
   - Nếu người dùng truy cập trang chủ (VD: `dongthapgis.vn`), Nginx sẽ trả về file tĩnh của ReactJS. 
   - Nếu có các yêu cầu gọi dữ liệu từ React gửi tới đường dẫn `/api/*`, Nginx sẽ đóng vai trò Reverse Proxy, chuyển tiếp (forward) luồng dữ liệu đó vào trong FastAPI Container (Port 8000).
3. **Lưu trữ dữ liệu (Volume):** Ảnh do Admin tải lên và Mã QR do hệ thống tự sinh sẽ không nằm trong container (tránh mất dữ liệu khi restart máy chủ), mà được mapping ra một phân vùng ổ cứng thật của Server thông qua Docker Volume.
4. **Tối ưu băng thông:** Các dữ liệu bản đồ nặng (Map Tiles) được trình duyệt của du khách tải trực tiếp từ máy chủ OpenStreetMap (OSM) thông qua Internet, giúp máy chủ hệ thống không bị quá tải băng thông.
