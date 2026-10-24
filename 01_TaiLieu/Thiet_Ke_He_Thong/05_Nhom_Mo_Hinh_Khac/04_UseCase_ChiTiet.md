# SƠ ĐỒ USE CASE CHI TIẾT (UML)
**Nhóm sơ đồ:** Dữ liệu & Quy trình
**Mục tiêu:** Đặc tả tương tác chi tiết giữa Người dùng và Hệ thống, có sử dụng các liên kết chuẩn UML `<<include>>` (Bắt buộc) và `<<extend>>` (Mở rộng).

```mermaid
flowchart LR
    %% Định nghĩa Style giả lập chuẩn UML Use Case
    classDef actor fill:#ececff,stroke:#9370db,stroke-width:2px;
    classDef usecase fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,shape:ellipse;

    %% Khai báo Actors
    Guest([🧑‍💻 Du khách]):::actor
    Admin([👑 Quản trị viên]):::actor

    %% Đường viền hệ thống (System Boundary)
    subgraph System [HỆ THỐNG WEB GIS ĐỒNG THÁP]
        direction TB
        
        %% Phân hệ Public
        UC_TraCuu([Tra cứu Bản đồ]):::usecase
        UC_Loc([Lọc & Tìm kiếm]):::usecase
        UC_GPS([Định vị & Chỉ đường]):::usecase
        UC_ChiTiet([Xem chi tiết Di tích]):::usecase
        UC_QuetQR([Quét mã QR tại thực địa]):::usecase
        
        %% Phân hệ Admin
        UC_Login([Đăng nhập CMS]):::usecase
        UC_QuanLy([Quản lý CSDL Di tích]):::usecase
        UC_GhimMap([Ghim tọa độ trên Map]):::usecase
        UC_GenQR([Tự động sinh QR Code]):::usecase
        UC_ThongKe([Xem Dashboard Thống kê]):::usecase
    end

    %% Tương tác của Actor với Use Case (Đường liền)
    Guest --- UC_TraCuu
    Guest --- UC_ChiTiet
    Guest --- UC_QuetQR

    Admin --- UC_QuanLy
    Admin --- UC_ThongKe

    %% Liên kết <<extend>> (Tính năng tùy chọn / mở rộng)
    UC_Loc -.->|<< extend >>| UC_TraCuu
    UC_GPS -.->|<< extend >>| UC_TraCuu
    UC_GhimMap -.->|<< extend >>| UC_QuanLy

    %% Liên kết <<include>> (Tính năng bắt buộc / bao hàm)
    UC_QuetQR -.->|<< include >>| UC_ChiTiet
    UC_QuanLy -.->|<< include >>| UC_Login
    UC_ThongKe -.->|<< include >>| UC_Login
    UC_QuanLy -.->|<< include >>| UC_GenQR
```

## Giải thích các liên kết UML (Dùng cho Báo cáo):
1. **Liên kết `<<include>>` (Bao hàm - Bắt buộc xảy ra):**
   - Mũi tên trỏ từ `Quản lý CSDL Di tích` đến `Đăng nhập CMS`: Có nghĩa là để quản lý được di tích, hệ thống *bắt buộc* phải bắt Admin đi qua bước đăng nhập.
   - Mũi tên từ `Quản lý CSDL Di tích` đến `Tự động sinh QR Code`: Khi Admin bấm lưu thông tin thành công, nghiệp vụ sinh QR sẽ tự động bị gọi (bắt buộc chạy ngầm).
   - Mũi tên từ `Quét mã QR` đến `Xem chi tiết`: Khi quét QR thành công, hành động bắt buộc tiếp theo là chuyển hướng tải trang chi tiết.

2. **Liên kết `<<extend>>` (Mở rộng - Không bắt buộc):**
   - Mũi tên trỏ từ `Lọc & Tìm kiếm` về `Tra cứu Bản đồ`: Du khách có thể chỉ kéo xem bản đồ đơn thuần. Việc dùng thanh tìm kiếm hoặc bộ lọc là một chức năng dùng thêm (mở rộng).
   - Tương tự với `Định vị & Chỉ đường`, đây là công cụ tùy chọn khi du khách muốn bật GPS tìm đường.
   - Mũi tên trỏ từ `Ghim tọa độ trên Map` về `Quản lý CSDL Di tích`: Khi nhập liệu, Admin có thể nhập tay số Vĩ độ/Kinh độ, HOẶC dùng tính năng mở rộng là Click ghim thẳng lên bản đồ thu nhỏ.
