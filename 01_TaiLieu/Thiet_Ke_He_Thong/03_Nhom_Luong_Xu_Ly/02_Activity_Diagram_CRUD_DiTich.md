# SƠ ĐỒ HOẠT ĐỘNG (ACTIVITY DIAGRAM)
**Tiến trình:** Thêm mới hoặc Cập nhật thông tin Di tích
**Actor:** Quản trị viên (Admin), Hệ thống (Frontend & Backend)

```mermaid
flowchart TD
    %% Định nghĩa các Lane
    subgraph Admin[Quản trị viên]
        A1([Bắt đầu]) --> A2(Đăng nhập CMS)
        A2 --> A3{Xác thực?}
        A4(Mở Form Quản lý Di tích)
        A5(Nhập Tên, Lịch sử, Giờ mở cửa)
        A6(Ghim vị trí trên Bản đồ thu nhỏ)
        A7(Tải ảnh Thumbnail lên)
        A8(Bấm nút Lưu dữ liệu)
    end

    subgraph Frontend[Giao diện React]
        F1(Hiển thị màn hình Dashboard)
        F2(Hiển thị Form nhập liệu)
        F3(Validate Form Frontend)
        F4(Hiển thị thông báo Lỗi)
        F5(Hiển thị thông báo Thành công)
    end

    subgraph Backend[Hệ thống API & PostGIS]
        B1(Xác thực Token JWT)
        B2(Validate Dữ liệu Backend)
        B3(Tự động phát sinh QR Code)
        B4(Lưu tọa độ & Dữ liệu vào PostGIS)
    end

    %% Luồng kết nối
    A3 -- Thất bại --> A2
    A3 -- Thành công --> F1
    F1 --> A4
    A4 --> F2
    F2 --> A5
    A5 --> A6
    A6 --> A7
    A7 --> A8
    
    A8 --> F3
    F3 -- Thiếu thông tin --> F4
    F4 --> A5
    
    F3 -- Hợp lệ --> B1
    B1 --> B2
    B2 -- Dữ liệu không hợp lệ --> F4
    B2 -- Hợp lệ --> B3
    B3 --> B4
    B4 --> F5
    F5 --> A9([Kết thúc])
```

## Diễn giải quy trình:
1. **Khởi tạo:** Admin đăng nhập vào hệ thống CMS. Sau khi xác thực thành công, hệ thống hiển thị Dashboard.
2. **Nhập liệu:** Admin mở form Thêm mới/Cập nhật di tích.
3. **Thao tác bản đồ (Quan trọng):** Thay vì nhập thủ công Vĩ độ / Kinh độ, Admin ghim (click) trực tiếp vào vị trí di tích trên bản đồ thu nhỏ. Frontend tự động lấy tọa độ (Lat, Lng) điền vào form.
4. **Xử lý:** Sau khi gửi dữ liệu, Backend kiểm tra tính hợp lệ. Nếu hợp lệ, một mã QR động (chứa URL trỏ về trang di tích) sẽ được tự động tạo ra.
5. **Lưu trữ:** Toàn bộ thông tin, tọa độ không gian và file QR được lưu vào cơ sở dữ liệu PostGIS. Giao diện báo thành công.